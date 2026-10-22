# AGENTS.md

## 快速开始

```zsh
git submodule update --init --recursive  # 首次克隆后拉主题子模块
npm install                              # 安装前端依赖
npm run dev                              # 开发服务器 http://localhost:5173（自动优化图片）
npm run build                            # 构建：优化图片 -> tsc -> vite build -> 生成 RSS
npm run preview                          # 预览生产构建
npm run images                           # 手动重跑图片优化
```

## 项目构成

双框架并存：

- **React + Vite + TypeScript**（主）—— 博客前端 SPA
- **Hugo + PaperMod**（次）—— `themes/PaperMod` 是 git 子模块，保持脏状态，有大量本地修改

## 前端架构

```
src/
├── fonts.css               # 自托管英文字体 @font-face（public/fonts/）
├── index.css               # Tailwind 入口 + CSS 变量 + 报刊/胶片样式
├── data/
│   ├── columns.ts          # 栏目别名配置（可选英文 URL slug）
│   ├── fonts.ts            # 字体栈（Tailwind / CSS 变量共用）
│   ├── artworks.ts         # 画廊作品数据
│   └── books.ts            # 读书频道数据
├── utils/posts.ts          # import.meta.glob 读取 content/posts/*.md
├── hooks/
│   ├── useTheme.ts         # localStorage + prefers-color-scheme 持久化主题
│   ├── usePosts.ts         # 文章数据（memo 缓存）
│   └── useSearch.ts        # Fuse.js 全文搜索
├── components/
│   ├── MarkdownRenderer.tsx # react-markdown + KaTeX + 代码高亮 + 胶片条
│   ├── Filmstrip.tsx        # .filmstrip 图组 → 可横向滑动的胶片条
│   ├── TOC.tsx              # 桌面端固定侧边目录
│   ├── SearchDialog.tsx     # Cmd+K / Ctrl+K 搜索弹窗
│   ├── ArticleGraph.tsx     # 标签关系图谱
│   ├── GalleryLightbox.tsx  # 画廊灯箱
│   ├── BubbleCircle.tsx     # 首页手绘气泡入口（弹动 + 水泡动效）
│   ├── ThoughtCloud.tsx     # 从门缝里冒出来的三团思绪（缓慢上浮 + 弯曲烟迹）
│   ├── HandDrawnDoor.tsx    # 首页手绘门入口（悬停开门，露出「全部文章」）
│   └── ThemeToggle.tsx
├── pages/                   # 路由页面
│   ├── Home.tsx             # / — 从门缝里冒出的思绪气泡 + 手绘的门
│   ├── AllPosts.tsx         # /posts — 全部文章
│   ├── Post.tsx             # /posts/:slug — 文末连载导航
│   ├── GenrePosts.tsx       # /genre/:name — 按门类过滤
│   ├── ColumnPosts.tsx      # /columns/:name — 栏目文章列表
│   ├── TagList.tsx          # /tags
│   ├── TagPosts.tsx         # /tags/:tag
│   ├── Graph.tsx            # /graph — 标签关系图谱
│   ├── Gallery.tsx          # /gallery — 绘画作品
│   ├── Reading.tsx          # /reading — 读书清单
│   └── BookNote.tsx         # /reading/:slug — 单本书笔记
└── App.tsx                  # React Router v6 路由定义
```

## 内容组织层级

文章内容分四个维度组织，前三级为树状层级，标签为扁平交叉：

```
门类 (genre)          vibe / my / tech         # 最顶级，首页展示 my / tech / gallery 入口
  └─ 栏目 (column)     栏目名                   # 连载栏目，文末自动导航
       └─ 系列 (series) 系列名                  # 栏目内的子分组（可选）

标签 (tags)           [标签1, 标签2]            # 扁平，跨门类/栏目/系列
```

文章存放在 `content/posts/*.md`，每个文件格式：

```markdown
---
title: 文章标题
date: 2026-05-13
genre: vibe             # vibe / my / tech，必填。首页据此分栏
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
- 门类有三个：`vibe`（AI 辅助写作）、`my`（纯手写）、`tech`（论文与技术学习）
- 栏目是连载容器，同栏目文章按 order 排序（不设则按 date 排），文末自动生成上下篇导航
- 栏目 URL 默认使用中文名（如 `/columns/代码的故事`），栏目完结后在 `src/data/columns.ts` 中配置 `slug` 可切换为英文 URL（如 `code-stories`），页面显示名不受影响
- 系列是栏目内的子分组，一个栏目可含多个系列
- 标签是扁平的，跨门类/栏目/系列自由组合
- 首页显示：三个半透明的思绪气泡从门缝里缓缓冒出，沿弯曲烟迹上浮，边缘轻微扭曲并带玻璃高光 → 手绘的门（悬停打开，露出「全部文章」）
- 画廊 (`/gallery`) 数据在 `src/data/artworks.ts`，读书 (`/reading`) 数据在 `src/data/books.ts`，均不在 Markdown 中管理

## 图片与胶片条

- 图片放在 `public/images/`，Markdown 中用 `/images/xxx.jpg` 引用（写原图路径，渲染时自动换成 WebP 变体）
- 文章配图统一放 `public/images/original/`，画廊配图放 `public/images/art/`
- 所有图片格式（jpg/jpeg/png/gif/webp/svg）由 Git LFS 管理（见 `.gitattributes`），克隆后需 `git lfs pull`
- 多图并排使用 `.filmstrip` 容器，`MarkdownRenderer` 会将其渲染为可横向滑动、点击放大的胶片条：

```html
<div class="filmstrip">
  <img src="/images/original/IMG_7502.JPG" alt="图注">
  <img src="/images/original/IMG_7525.JPG" alt="图注">
</div>
```

## PWA / 手机安装

站点本身就是一个完整 PWA：手机上「添加到主屏幕」即得到独立窗口 App，内容与网页共用同一份构建产物，发文章后两端自动同步，无需单独维护 App 版本。

- Service Worker 由 `vite-plugin-pwa` 生成（`registerType: 'prompt'`），配置在 `vite.config.ts`
- 注册、更新提示、安装引导在 `src/components/PwaPrompts.tsx`，安装状态管理在 `src/utils/pwa.ts`
- 更新策略：发现新版本时底部弹出「有新版本」，点击后 `skipWaiting` + 刷新，避免阅读中途被静默刷新；页面重新可见时检查更新（10 分钟节流）
- 安装入口：移动端首次访问 4 秒后提示一次，拒绝后 30 天内不再提示；页脚始终保留「安装 App」。iOS 没有 `beforeinstallprompt`，改为展示 Safari「分享 → 添加到主屏幕」步骤
- 缓存：构建产物与图标预缓存（`globPatterns` 不含 jpg，`globIgnores` 排除 `images/**`），`/images/` 图片走 `CacheFirst` 运行时缓存（120 条 / 60 天），RSS 走 `StaleWhileRevalidate`
- 导航回退：`navigateFallback: '/index.html'` 让深层链接离线可开，`navigateFallbackDenylist` 放行 RSS、manifest、图片等非页面请求
- 图标：`pwa-192x192.png`、`pwa-512x512.png`、`pwa-maskable-512.png`（安全区内缩，用于安卓自适应图标）、`apple-touch-icon.png`（180）
- 手机适配：`.safe-top` / `.safe-bottom` 处理刘海屏安全区；Header 在 360px 宽度下保持单行；胶片条使用 `snap-x` 横滑；灯箱用 `dvh` 而非 `vh`

## 图片优化

原图（常是 10MB+ 的手机照片）不直接发给浏览器。`scripts/optimize-images.mjs` 会在 `npm run dev` / `npm run build` 前自动执行：

- 扫描 `public/images/`（跳过 `opt/`），生成 480 / 960 / 1600 / 2048 宽的 WebP 到 `public/images/opt/`
- 只生成比原图小的尺寸（不放大）；按 EXIF 方向摆正；默认剥除元数据（含 GPS）
- 文件名带内容哈希（`<路径>-<hash>-<宽>.webp`），换图即换名，浏览器缓存自然失效
- 生成 `src/data/image-manifest.json`（需提交入库），记录原图尺寸与可用变体
- `ResponsiveImage` 组件查清单输出 `srcset` / `sizes`，并按需懒加载；清单里没有的外链或 SVG 原样输出
- 构建完成后 `--prune` 从 `dist/` 删除已被替换的原图，`dist` 从约 78MB 降到约 10MB
- `public/images/opt/` 是生成产物（已 `.gitignore`），原图仍由 Git LFS 管理并在 CI 中还原

Markdown 和 `artworks.ts` / `books.ts` 里继续写原图路径即可：

```md
![图注](/images/original/IMG_7502.JPG)
```

渲染时自动换成变体。新增或替换图片后重启 dev（或手动 `npm run images`）；CI 每次构建都会重新扫描，只处理有变化的图片。

## 字体与排版

- 英文（Open Sans / JetBrains Mono）**自托管**于 `public/fonts/`，`@font-face` 声明在 `src/fonts.css`
- 中文使用系统字体回退（PingFang SC / 微软雅黑 / 思源宋体等），**无 Google Fonts 外链**
- 字体栈定义在 `src/data/fonts.ts`，需同步三处：`tailwind.config.ts`、`src/index.css` 的 `--font-*` 变量、`src/fonts.css`
- 排版为报刊编辑风格：`paper` 纸白底色、`ink` 墨色正文、`vermilion` 朱红强调，配合 `.kicker` / `.rule-heavy` / `.filmstrip` 等工具类

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
- **手机上文章没更新** —— Service Worker 的导航回退会优先返回缓存的 `index.html`，新内容要等新版本激活。页面重新可见时会自动检查并弹出「有新版本」；也可以关掉 App 重开，或在浏览器里刷新一次。
- **新加的图片页面里 404 / 不显示** —— 变体是构建期生成的，新增图片后需重启 `npm run dev` 或手动 `npm run images`；`npm run build` 会通过 `prebuild` 自动重扫，不会漏。

## 配置参考

- `vite.config.ts` —— Vite 构建配置 + node polyfills
- `tailwind.config.ts` —— 报刊配色（ink 墨色 / vermilion 朱红 / paper 纸白 / frost）+ 字体栈
- `src/data/fonts.ts` —— 字体栈定义，与 `tailwind.config.ts`、`src/index.css`、`src/fonts.css` 同步
- `src/data/columns.ts` —— 栏目别名配置，新栏目默认无 slug，写完后可添加英文别名
- `hugo.toml` —— Hugo 配置（仅用于 Hugo 构建路径）
- `scripts/generate-rss.mjs` —— 构建后生成 `dist/rss.xml`
- `scripts/optimize-images.mjs` —— 生成 WebP 变体与 `src/data/image-manifest.json`，`--prune` 清理 dist 原图
