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
├── data/columns.ts         # 栏目别名配置（可选英文 URL slug）
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

## 内容组织层级

文章内容分四个维度组织，前三级为树状层级，标签为扁平交叉：

```
门类 (genre)          vibe / my                # 最顶级，首页分两列入口
  └─ 栏目 (column)     栏目名                   # 连载栏目，文末自动导航
       └─ 系列 (series) 系列名                  # 栏目内的子分组（可选）

标签 (tags)           [标签1, 标签2]            # 扁平，跨门类/栏目/系列
```

文章存放在 `content/posts/*.md`，每个文件格式：

```markdown
---
title: 文章标题
date: 2026-05-13
genre: vibe             # vibe / my，必填。首页据此分两列
column: 栏目名           # 可选，归属连载栏目。文末自动生成上下篇导航
series: 系列名           # 可选，栏目内子分组
order: 1                # 可选，column 内排序依据。不设则按 date 排
tags: [标签1, 标签2]    # 可选，扁平标签
description: 摘要
draft: true             # 草稿，不出现在首页和搜索中
pin: true               # 可选，置顶文章
---

正文内容，支持 Markdown、数学公式（$...$ / $$...$$）、代码高亮。
```

- 新文章直接在 `content/posts/` 下创建 `.md` 文件即可，无需注册路由
- 门类只有两个：`vibe`（AI 辅助写作）和 `my`（纯手写）
- 栏目是连载容器，同栏目文章按 order 排序（不设则按 date 排），文末自动生成上下篇导航
- 栏目 URL 默认使用中文名（如 `/columns/代码的故事`），栏目完结后在 `src/data/columns.ts` 中配置 `slug` 可切换为英文 URL（如 `code-stories`），页面显示名不受影响
- 系列是栏目内的子分组，一个栏目可含多个系列
- 标签是扁平的，跨门类/栏目/系列自由组合
- 首页显示：置顶文章 → 门类入口卡片 → 最新 10 篇 + 「浏览更多」
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
- `src/data/columns.ts` —— 栏目别名配置，新栏目默认无 slug，写完后可添加英文别名
- `hugo.toml` —— Hugo 配置（仅用于 Hugo 构建路径）
- `scripts/generate-rss.mjs` —— 构建后生成 `dist/rss.xml`
