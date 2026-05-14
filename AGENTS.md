# AGENTS.md

## 快速开始

```zsh
git submodule update --init --recursive  # 首次克隆后拉主题子模块
npm install                              # 安装前端依赖
npm run dev                              # 开发服务器 http://localhost:5173
npm run build                            # 构建：tsc -> vite build -> 生成 RSS
npm run preview                          # 预览生产构建
```

## 项目构成

双框架并存：

- **React + Vite + TypeScript**（主）—— 博客前端 SPA
- **Hugo + PaperMod**（次）—— `themes/PaperMod` 是 git 子模块，保持脏状态，有大量本地修改

## 前端架构

```
src/
├── utils/posts.ts          # import.meta.glob 读取 content/posts/*.md
├── hooks/
│   ├── useTheme.ts         # localStorage + prefers-color-scheme 持久化主题
│   ├── usePosts.ts         # 文章数据（memo 缓存）
│   └── useSearch.ts        # Fuse.js 全文搜索
├── components/
│   ├── MarkdownRenderer.tsx # react-markdown + KaTeX + 代码高亮
│   ├── TOC.tsx              # 桌面端固定侧边目录
│   ├── SearchDialog.tsx     # Cmd+K / Ctrl+K 搜索弹窗
│   └── ThemeToggle.tsx
├── pages/                   # 路由页面
│   ├── Home.tsx             # / — 置顶区 + 门类入口卡片 + 最新 10 篇
│   ├── Post.tsx             # /posts/:slug — 文末连载导航
│   ├── Explore.tsx          # /explore — 栏目 + 标签气泡总览
│   ├── GenrePosts.tsx       # /genre/:name — 按门类过滤
│   ├── ColumnPosts.tsx      # /columns/:name — 栏目文章列表
│   ├── TagList.tsx          # /tags
│   ├── TagPosts.tsx         # /tags/:tag
│   └── About.tsx            # /about（硬编码，不在 MD 中管理）
└── App.tsx                  # React Router v6 路由定义
```

## 内容管理

文章存放在 `content/posts/*.md`，每个文件格式：

```markdown
---
title: 文章标题
date: 2026-05-13
genre: vibe             # vibe / my，必填。首页据此分两类入口
tags: [标签1, 标签2]
column: 栏目名           # 可选，归属连载栏目。文末自动生成上下篇导航
description: 摘要（首页卡片展示）
draft: true             # 草稿，不会出现在首页和搜索中
pin: true               # 可选，置顶文章。首页顶部展示，带星标
---

正文内容，支持 Markdown、数学公式（$...$ / $$...$$）、代码高亮。
```

- 新文章直接在 `content/posts/` 下创建 `.md` 文件即可，无需注册路由
- 标签自动从 frontmatter 的 `tags` 字段提取
- 栏目文章按日期升序排列，同栏目的前后篇在文章底部导航
- 首页显示置顶文章 → 门类入口卡片 → 最新 10 篇 + 「浏览更多」
- 关于页 (`/about`) 内容在 `src/pages/About.tsx` 中硬编码，不在 Markdown 中管理

## Git 提交约定

```text
<type>: <英文简短描述>

<中文详细描述>
```

| Type | 使用场景 |
|------|---------|
| `feat` | 新功能 |
| `fix` | 修 bug |
| `refactor` | 重构，无功能变化 |
| `style` | 样式/排版变更，不影响逻辑 |
| `docs` | 文档（含 AGENTS.md） |
| `chore` | 构建、依赖、配置等杂项 |

示例：

```
feat: add dark mode toggle

新增深色/亮色主题切换，通过 localStorage 持久化用户偏好。
```

- 不提交 `dist/`、`node_modules/`（已 `.gitignore`）
- 不提交 `themes/PaperMod` 子模块的脏修改
- 推送前确保 `npm run build` 通过

## 常见问题

- **`Buffer is not defined`** —— `gray-matter` 依赖 Node.js Buffer，已通过 `vite-plugin-node-polyfills` 在 `vite.config.ts` 中注入 polyfill。如果遇到类似问题，检查 `vite.config.ts` 中的 `nodePolyfills()` 配置。
- **构建产物** —— `dist/` 和 `node_modules/` 已被 `.gitignore` 排除，不要手动提交。
- **React Router 警告** —— 控制台可能出现 `v7_startTransition` / `v7_relativeSplatPath` 未来标志警告，不影响运行。
- **主题子模块脏状态** —— `themes/PaperMod` 有大量本地修改，**不要** `git submodule update` 覆盖。

## 配置参考

- `vite.config.ts` —— Vite 构建配置 + node polyfills
- `tailwind.config.ts` —— 日式配色（ink 墨色 / vermilion 朱红）+ 中文字体
- `hugo.toml` —— Hugo 配置（仅用于 Hugo 构建路径）
- `scripts/generate-rss.mjs` —— 构建后生成 `dist/rss.xml`
