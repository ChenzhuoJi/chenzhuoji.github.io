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

- **React + Vite + TypeScript**（主）—— 博客前端 SPA
- **Hugo + PaperMod**（次）—— `themes/PaperMod` 是 git 子模块，保持脏状态，有大量本地修改

站点名：**ChenzhuoJi**。它是一册按时间编排的个人记录，不是作品集，也不是知识库。

## 设计原则

改版后的页面只保留四件事：纸、墨、一色冷翠、字。

- **纸墨色**：纸 `#F6F3EB`、墨 `#1E1D19`、次要文字 `#6F695D`、线 `#DDD6C6`、强调色冷翠 `#435B4D`。
  暗色是暖黑 `#141512`，不另起一套彩色。
- **字为主角**：标题和正文用宋体，引用/按语用仿宋（缺字退回黑体，不倾斜），
  导航/小标签用 Open Sans，日期/编号/代码用 JetBrains Mono。
  不再使用楷体、手写体、英文装饰衬线或夸张字重。
- **页边版式**：左侧一条 8.75rem 的页边（日期、类别、目次），右侧是正文；
  页面右侧刻意留白。宽度 ≤860px 时页边折叠为一行元信息。
- **克制**：不要卡片、圆角、投影、渐变、emoji、手绘插画、漂浮气泡。
  分隔只用 1px 细线；图片不使用圆角。只有搜索弹窗与灯箱允许极轻的阴影/模糊。
- **文案**：首页题记、摘句只用作者自己的句子；界面文案要短、要平实。
  不要写「欢迎来到我的数字花园」「在这里，遇见更好的自己」这类 AI 腔。
- **动效**：只保留 hover 下划线、颜色过渡和滚动。尊重 `prefers-reduced-motion`。

## 前端架构

```
src/
├── fonts.css                 # 自托管英文字体 @font-face（public/fonts/）
├── index.css                 # 设计变量、版式、prose、灯箱、搜索、响应式
├── data/
│   ├── site.ts               # 站点名、题记、摄影引句、时区
│   ├── photos.ts             # 首页与「影」使用的照片
│   ├── lines.ts              # 首页「摘」的句子
│   ├── artworks.ts           # 画
│   ├── books.ts              # 读
│   ├── genres.ts             # 门类中文名
│   ├── columns.ts            # 栏目别名配置
│   └── fonts.ts              # 字体栈（与 index.css / tailwind.config.ts 同步）
├── utils/
│   ├── posts.ts              # import.meta.glob 读取 content/posts/*.md
│   ├── format.ts             # 中文日期、时辰、纯文本摘要
│   └── cjkSpacing.ts         # 中英混排补空格
├── hooks/
│   ├── useTheme.ts           # localStorage + prefers-color-scheme
│   ├── usePosts.ts           # 文章数据（memo）
│   └── useSearch.ts          # Fuse.js 全文搜索
├── components/
│   ├── Header.tsx            # ChenzhuoJi / 记 影 读 / 搜 夜
│   ├── Footer.tsx            # 版权、索引、RSS、GitHub、安装 App
│   ├── ArchiveRows.tsx       # 日期 + 标题 + 门类的文章行
│   ├── MarkdownRenderer.tsx  # react-markdown + KaTeX + 代码高亮 + 图组
│   ├── Filmstrip.tsx         # 正文里的横向照片条与灯箱
│   ├── TOC.tsx               # 桌面端固定页边目次（只取 h2）
│   ├── SearchDialog.tsx      # Cmd+K / Ctrl+K
│   ├── GalleryLightbox.tsx   # 「影」的灯箱
│   ├── ResponsiveImage.tsx   # 按清单输出 srcset
│   ├── PwaPrompts.tsx        # 安装与更新提示
│   └── ThemeToggle.tsx       # 夜 / 日
├── pages/
│   ├── Home.tsx              # / — 题记 + 记 + 一张照片 + 摘句
│   ├── AllPosts.tsx          # /posts — 记，按年份
│   ├── Post.tsx              # /posts/:slug — 页边 + 正文 + 目次 + 前后篇
│   ├── GenrePosts.tsx        # /genre/:name
│   ├── ColumnPosts.tsx       # /columns/:name
│   ├── TagList.tsx           # /tags — 索引
│   ├── TagPosts.tsx          # /tags/:tag
│   ├── Gallery.tsx           # /gallery — 照片 + 画
│   ├── Reading.tsx           # /reading
│   ├── BookNote.tsx          # /reading/:slug
│   └── NotFound.tsx          # * — 404
├── layouts/BaseLayout.tsx
├── types/index.ts
└── App.tsx
```

旧的关系图谱 `/graph`、手绘首页组件、ArticleCard / ArticleList / GalleryCard 已移除，不要恢复。

## 页面结构

### 首页 `/`

1. **页眉**：ChenzhuoJi + 天津 · 二〇二六；导航 `记 / 影 / 读`；搜索与夜/日切换。
2. **题记**：`在白塔倾颓之前，留住安静等候某某的它。` 来源《一段惬意的时光》。
   左页边显示「此刻」的天津日期、时辰、时间，例如「日影偏西 · 17:06」。
3. **记**：取最近一篇 `genre: my` 的文章作为领读，下面按日期列 3 篇，末尾「全部 N 篇」。
   首页不由技术笔记领读；这是刻意的编辑选择。
4. **影**：一张照片 + 编号、图注、地点；链接到 `/gallery`。
5. **摘**：3 句来自正文的句子，链接回原文章。
6. **页脚**：原创声明、索引、RSS、GitHub、安装 App。

### 记 `/posts`

按年份分组，日期 + 标题 + 门类。全部文章按时间倒序，不再按门类分区。

### 文章 `/posts/:slug`

左侧粘性页边：返回、中文日期、类别、字数/阅读时间、栏目（可选）、h2 目次。
右侧：标题、摘要、正文。文末是标签与「前一篇 / 后一篇」。
正文阅读宽度 40rem，字号约 18.7px，行高 2.02。

### 影 `/gallery`

照片与画分两段。照片为两列 contact sheet，图注只写看见的东西；
画使用 CSS 混合：亮色 `multiply` 让纸融入页面，暗色反相后 `lighten`。
所有照片/画共用灯箱，键盘 ← → Esc。

### 读 `/reading`

书的列表（封面 + 书名 + 作者 + 一句介绍），单本笔记页沿用文章版式。

### 索引 `/tags`

按标签计数，两列索引；正文里仍可点击标签进入。

## 内容组织

```
门类 (genre)          my / tech / vibe
  └─ 栏目 (column)     可选，连载容器
       └─ 系列 (series) 可选
标签 (tags)            扁平，可交叉
```

文章存放在 `content/posts/*.md`：

```markdown
---
title: 文章标题
date: 2026-10-24
genre: my              # my / tech / vibe
column: 栏目名           # 可选
series: 系列名           # 可选
order: 1               # 可选；同一天内的先后（升序，未写的排后）
tags: [标签1, 标签2]     # 可选
description: 摘要
draft: true            # 可选，草稿不出现
pin: true              # 可选，当前页面不依赖
---

正文，支持 Markdown、$...$ / $$...$$、代码高亮、`.filmstrip` 图组。
```

- `content/posts/` 新增 `.md` 即自动进入构建，无需注册路由。
- 文章先按日期倒序；同一天的多篇按 `order` 升序（数字小的在前），没写 `order` 的排在同日已编号文章之后。调换同日顺序只需改 `order`。
- 首页领读固定取「最近一篇 `my`」，所以生活记录始终比技术笔记先出现。
- 首页 `摘` 的句子在 `src/data/lines.ts` 手工维护，不要自动抓取。
- 照片在 `src/data/photos.ts` 手工维护，首页只用 `photos[0]`。
- 未完成、非文章的笔记请加 `draft: true`，不要发布半句话。

## 图片与胶片条

- 原图放 `public/images/`；文章图 `public/images/original/`，画 `public/images/art/`。
- 所有图片格式由 Git LFS 管理；克隆后 `git lfs pull`。
- `npm run dev` / `npm run build` 前自动生成 WebP 变体与 `src/data/image-manifest.json`。
- Markdown 写原图路径即可：

```html
<div class="filmstrip">
  <img src="/images/original/IMG_7502.JPG" alt="羞羞的猫咪">
  <img src="/images/original/IMG_7525.JPG" alt="物美超市">
</div>
```

`MarkdownRenderer` 会把 `.filmstrip` 交给 `Filmstrip`，渲染成横向可滑的照片条与灯箱。
新增图片后重启 dev 或 `npm run images`。

## 字体与主题

- 宋体：`Noto Serif SC / Songti SC / STSong / SimSun`
- UI：`Open Sans` + 系统黑体
- 引用/按语（`_..._`）：`FangSong / STFangsong` 优先，系统没有仿宋时退到黑体；始终不倾斜
- 等宽：`JetBrains Mono`
- 字体变量在 `src/index.css`，字体栈在 `src/data/fonts.ts`，Tailwind 映射在 `tailwind.config.ts`，需同步。
- 主题：`blog-theme` localStorage；`index.html` 有内联脚本在首屏前加 `.dark`，避免闪白。
- 切换按钮显示「夜」/「日」；同时更新 `meta[name=theme-color]`。
- 暗色不要加滤镜到照片；只有「画」使用反相混合。

## PWA

- `vite-plugin-pwa`，`registerType: 'prompt'`；更新提示在 `src/components/PwaPrompts.tsx`。
- 名称「ChenzhuoJi」，主题纸色 `#F6F3EB`，图标由 `public/favicon.svg`（墨底「记」，取「记录」之意，不是名字）生成。
- 快捷方式：记 `/posts`、影 `/gallery`、读 `/reading`。
- 图片走运行时 CacheFirst，构建产物预缓存；导航回退 `index.html`。
- 手机适配：`.safe-top` / `.safe-bottom`，灯箱与搜索用 `dvh`。

## Git 提交约定

```text
<type>: <英文简短描述>

<中文详细描述>
```

| Type | 使用场景 |
|------|---------|
| feat | 新功能 |
| fix | 修 bug |
| refactor | 重构，无功能变化 |
| style | 样式/排版变更，不影响逻辑 |
| docs | 文档 |
| chore | 构建、依赖、配置等 |

- 不提交 `dist/`、`node_modules/`、`.shots/`、`.npm-cache/`。
- 不提交 `themes/PaperMod` 子模块的脏修改。
- 推送前确保 `npm run build` 通过。

## 配置参考

- `src/index.css` —— 设计变量、版式、prose、灯箱、搜索、响应式
- `tailwind.config.ts` —— 旧组件的色阶别名；新页面主要用 CSS 变量
- `src/data/fonts.ts` —— 字体栈
- `src/data/site.ts` —— 站名、题记、摄影引句、时区
- `src/data/columns.ts` —— 栏目英文别名
- `index.html` —— 初始 title、meta、主题色、防闪白脚本
- `vite.config.ts` —— Vite + PWA manifest
- `scripts/generate-rss.mjs` —— RSS 标题「ChenzhuoJi」、描述「ChenzhuoJi：文章与照片。」
- `scripts/optimize-images.mjs` —— WebP 变体与图片清单

## 常见问题

- **`Buffer is not defined`** —— `gray-matter` 需要 Node Buffer，已由 `vite-plugin-node-polyfills` 注入。
- **构建产物** —— `dist/`、`node_modules/` 已忽略。
- **主题子模块脏状态** —— 不要 `git submodule update` 覆盖 `themes/PaperMod`。
- **新增图片 404** —— 变体是构建期生成的，重启 dev 或 `npm run images`。
- **手机上看不到新文章** —— Service Worker 缓存了 `index.html`；页面重新可见时会检查更新，也可手动刷新。
- **React Router 警告** —— `v7_startTransition` / `v7_relativeSplatPath` 未来标志警告不影响运行。
- **旧页面** —— `/graph` 已移除，会由 `NotFound` 接住；不要重新加入导航。
