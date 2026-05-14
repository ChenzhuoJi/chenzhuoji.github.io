---
title: 个人博客（React+Vite）开发&部署落地全记录
date: 2026-05-14
genre: my
tags: [技术, 项目复盘, 博客]
description: 从零搭建 React + Vite + TypeScript + TailwindCSS 个人博客，完整记录内容架构设计、UI 优化、CI/CD 自动部署全流程及踩坑解决过程。
pin: true
---

## 项目概览

| 项目 | 信息 |
|------|------|
| 技术栈 | React + Vite + TypeScript + TailwindCSS |
| 源码 | https://github.com/ChenzhuoJi/chenzhuoji.github.io |
| 线上地址 | https://chenzhuoji.github.io/ |
| 开发周期 | 2026-05-13 ~ 2026-05-14 |

---

## 一、内容架构设计

摒弃传统博客单一分类模式，设计三级属性 + 置顶标记的精细化内容管理体系。

### 1.1 核心属性体系

**一级 · 门类（最高优先级）** — `genre: vibe / my`

首页双卡片入口，两大创作体系独立归档：

- **Vibe Writing**：AI 辅助共创、润色、灵感扩写、AI 技术相关
- **My Writing**：纯个人原生思考、生活随笔、学习复盘、原创干货

**置顶标记** — `pin: true`

支持文章置顶，首页顶部优先展示，用于重点优质内容曝光。

**二级 · 栏目** — `column: 栏目名`（可选）

仅用于连载、专题系列文章。无栏目的文章自动归为单篇随笔。同栏目文章按时间升序排列，详情页文末自动生成上下篇导航。

**三级 · 标签** — `tags: [标签1, 标签2]`（可选，可多选）

自由多标签配置，用于跨门类、跨栏目主题聚合。

### 1.2 首页布局

```
置顶星标文章 → 双门类入口卡片 → 最新 10 篇 + 「浏览更多」
```

### 1.3 Frontmatter 规范

```markdown
---
title: 文章标题
date: 2026-05-14
genre: vibe           # vibe / my，必填
column: 栏目名        # 可选，连载栏目
tags: [标签1, 标签2]  # 可选
description: 摘要
pin: true             # 可选，置顶
---
```

### 1.4 路由规划

| 路由 | 页面 | 说明 |
|------|------|------|
| `/` | Home | 置顶 → 门类入口 → 最新文章 |
| `/posts/:slug` | Post | 文章详情，文末连载导航 |
| `/explore` | Explore | 栏目 + 标签气泡总览 |
| `/genre/:name` | GenrePosts | 按门类过滤 |
| `/columns/:name` | ColumnPosts | 栏目文章列表 |
| `/tags`, `/tags/:tag` | TagList / TagPosts | 标签系统 |

---

## 二、UI 样式优化

### 2.1 代码块视觉升级

初始版本日间模式代码框存在深色背景 + 深色文字的问题，对比度极低。完成全局代码样式适配：

| 项 | 改前 | 改后 |
|-----|------|------|
| 日间代码框背景 | `ink.800`（深褐） | `ink.100`（暖白） |
| 日间代码文字 | 浅色（被 hljs 覆盖） | 深色，清晰可读 |
| 夜间代码框背景 | `ink.900` | `ink.950`（更深） |
| 高亮样式 | 外挂 `github.css` 固定浅色主题 | 自定义 token 颜色，深浅各一套 |
| 代码框边框 | 无 | 淡边框划分区域 |
| 内联代码 | 默认色 | `vermilion` 朱红自适应 |

---

## 三、CI/CD 自动部署

### 3.1 方案选型

放弃手动构建部署和 `/docs` 目录方案，采用 **GitHub Actions 自动构建 + gh-pages 分支部署**，push 即上线。

### 3.2 填坑全记录

#### 问题 1：Git 推送权限报错

```
fatal: could not read Username for 'https://github.com'
```

**原因**：本地 remote 为 HTTPS 模式，未配置令牌。

**解决**：切换为 SSH 模式，绑定本地公钥到 GitHub 账号。

#### 问题 2：双工作流冲突

同时存在自定义 `Deploy to GitHub Pages` 和内置 `pages build and deployment` 两个工作流互相冲突，Jekyll 构建器试图解析 React 源码必然失败。

**解决**：Settings → Pages → 部署源从「Deploy from a branch」切换为「GitHub Actions」。

#### 问题 3：子模块残留报错

```
fatal: No url found for submodule path 'public' in .gitmodules
```

**原因**：从 Hugo 迁移后，Git 索引中残留 `public` 子模块条目，但 `.gitmodules` 中无对应 URL。

**解决**：CI 中移除 `submodules: true`，React 项目无需 Hugo 子模块。

#### 问题 4：找不到 Run workflow 按钮

**原因**：仓库默认分支被错误设置为部署分支 `gh-pages`，而非代码主分支 `master`。

**解决**：Settings → General → Default branch 改为 `master`。

### 3.3 最终部署配置

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run build
      - name: SPA fallback
        run: cp dist/index.html dist/404.html
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist
      - uses: actions/deploy-pages@v4
```

核心要点：

- **SPA 路由兼容**：复制 `dist/404.html`，解决 GitHub Pages 不支持 History API 的问题
- **分支分工**：`master` 存源码，`gh-pages` 存编译产物
- **自动触发**：push 到 `master` 即自动构建部署

---

## 四、项目结构

```
myblog/
├── .github/workflows/deploy.yml   # CI/CD
├── content/posts/                  # Markdown 源文件
├── scripts/generate-rss.mjs        # RSS 生成
├── src/
│   ├── utils/posts.ts              # 文章加载 & 解析
│   ├── hooks/
│   │   ├── useTheme.ts             # 暗色模式
│   │   ├── usePosts.ts             # 数据缓存
│   │   └── useSearch.ts            # Fuse.js 全文搜索
│   ├── components/                 # UI 组件
│   │   ├── MarkdownRenderer.tsx     # KaTeX + 代码高亮
│   │   ├── TOC.tsx                  # 侧边目录
│   │   ├── SearchDialog.tsx         # Cmd+K 搜索
│   │   └── ThemeToggle.tsx
│   ├── pages/                      # 路由页面
│   ├── types/                      # TypeScript 类型
│   ├── App.tsx                     # 路由定义
│   └── index.css                   # 全局样式 & token 配色
├── vite.config.ts                  # Vite + node polyfills
├── tailwind.config.ts              # 日式配色
└── package.json
```

---

## 五、后续维护

- **新增文章**：在 `content/posts/` 新建 `.md` 文件，配置 frontmatter 即可自动归类展示
- **更新上线**：本地修改 → `git push` → 自动部署
- **内容拓展**：新增栏目、标签无需改动底层代码，复用现有架构
