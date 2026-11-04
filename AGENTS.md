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

## 前端架构

```
src/
├── fonts.css                 # 自托管英文字体 @font-face（public/fonts/）
├── index.css                 # 设计变量、版式、prose、灯箱、搜索、响应式
├── data/
│   ├── site.ts               # 站点名、时区、首页头像与社交链接
│   ├── photos.ts             # 「影」使用的照片
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
│   ├── TOC.tsx               # 正文上方的「目录」窄卡（只取 h2）
│   ├── PostTimeline.tsx      # 文末「修改记录」，可纵向 / 横向
│   ├── PostEndnote.tsx       # 文章尾注：最后更新日期
│   ├── Callout.tsx           # 正文定制引用块：美西螈（粉）/ GPT 回复（灰）
│   ├── TopDoodles.tsx        # 首页 top 的手绘笔触
│   ├── WaveEdge.tsx          # 首页 / 文章页 hero 的波浪下缘
│   ├── SearchDialog.tsx      # Cmd+K / Ctrl+K
│   ├── GalleryLightbox.tsx   # 「影」的灯箱
│   ├── ResponsiveImage.tsx   # 按清单输出 srcset
│   ├── PwaPrompts.tsx        # 安装与更新提示
│   └── ThemeToggle.tsx       # 夜 / 日
├── pages/
│   ├── Home.tsx              # / — top（标题+头像+链接）+ body（筛选+文章卡）
│   ├── AllPosts.tsx          # /posts — 记，按年份
│   ├── Post.tsx              # /posts/:slug — hero + 窄栏正文 + 目录 + 尾注 + 时间线
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

整页按 `top` / `body` 两段组织，首屏只有 top：

1. **页眉**：ChenzhuoJi；导航 `笔记 / Gallery / 阅读`；搜索与夜/日切换。
   窄屏（≤720px）时导航另起一行。
2. **top（粉底 `--pink`，占满首屏）**：居中大标题 `ChenzhuoJi`（`Ji` 走砖红，下面一条红色手绘横线）、
   头像（`site.avatar`）、`site.social` 的链接胶囊、底部「向下看笔记 ↓」。
   装饰是黑 / 黄两色的手绘笔触（弧线、短划、四角星、十字），见 `src/components/TopDoodles.tsx`；
   只在大字两侧和页面四边点几笔，窄屏自动收起只为星与大字旁两笔。
   `min-height: calc(100svh - 页眉高度)`，向下滚动才看得到 body。
3. **body（纯白 `--body-bg`）**：居中「最新笔记」+ 左上角一道手绘短线、门类筛选 tab
   （全部 / 随笔 / 技术 / 共写，纯前端过滤）、两栏文章卡（2px 黑边 + 蓝色偏移阴影 + 砖红日期与标题 +
   摘要 + 门类胶囊）、末尾「全部 N 篇」。
4. **页脚**。

首页不再有题记、轮播按钮和 Gallery；Gallery 只从导航进入。
「摘」的句子仍手写在 `src/data/lines.ts`，别自动抓取。

### 记 `/posts`

按年份分组，日期 + 标题 + 门类。全部文章按时间倒序，不再按门类分区。

### 文章 `/posts/:slug`

整页分 hero 与正文两段，居中窄栏，不再有左侧页边：

1. **hero（粉底 `--pink`，通栏）**：居中的返回胶囊（栏目存在时并排一个）、居中标题
   （`max-width: 22ch`）、摘要、元信息行（门类链接 · `2026.10.24` · 字数 / 阅读时间）。
   底部由 `WaveEdge` 画两层波浪，把粉底收进 `--body-bg`。
2. **正文**：`.post-main` 46rem 居中；有 ≥2 个 h2 时，目录以「目录」窄卡（上下细线）出现在正文之前，
   不再是页边小字。
3. **文末**：先是尾注（英文标签 `Last updated` + 日期，不带分隔线），再是标签胶囊，最后是横向的「Revision history」
   （只在文章 frontmatter 有 `timeline` 时出现）。前后篇卡片与本机阅读次数都已移除。

#### 定制引用块（美西螈 / GPT）

正文里两种彩色引用块。直接写一个 div 就行，里面照常用 Markdown（列表、代码都行）：

```html
<div class="callout callout--axolotl" data-title="世上无完美恋人">

正文，可以有多段。

</div>

<div class="callout--gpt" title="幻灭 · 内省 · 启示">
一句话的短引用可以写成一行。
</div>
```

- `callout--axolotl` / `callout--gpt` 决定配色；只写 `class="callout--gpt"` 也可以，不必带 `callout`。
- 标题用 `data-title` 或 `title`，省略则默认「美西螈说」「GPT 回复」。
- 属性写法宽松：`class = "..."`（等号两边有空格）、单引号都认；万一没被认出来，
  也会按 class 里的 `callout--gpt` / `callout--axolotl` 上色，不至于全变成美西螈。
- 开标签单独一行、`</div>` 也单独一行；中间的空行就是分段。写成一行也行（内容里不能换行）。
- 仍然兼容原来的块引用写法：`> [!axolotl] 标题` 加 `> 正文`。
- 代码块（``` / ~~~）里的 `<div class="callout...">` 不会被当引用块处理，可以放心写示例。
- 美西螈是粉色（砖红左色边），GPT 是灰色（灰左色边）；图标装在一枚奶油底、黑边、
  带硬阴影的圆角方牌里，骑在卡片左上角（`.callout__icon`），窄屏时改为静态排在标题上方。
- 图标：美西螈是手绘 SVG（圆脸 + 六片腮，和首页头像同款），
  GPT 用 OpenAI 的结形标志（来自 svgl 的官方路径，viewBox 裁到 `80 80 451 451` 以免贴边）。
- 解析在 `MarkdownRenderer.tsx` 的 `remarkCallout`（块引用 → 带 class 的 div），
  渲染在 `src/components/Callout.tsx`，样式在 `src/index.css` 末尾「文章定制引用块」一段。
- 只认 `axolotl` / `gpt` 两种；div 的标签和标题不会进首页摘要（`toPlainText` 会去掉）。
- 颜色走 `--callout-*` 变量（亮暗各一套），别在组件里写死。
- 字号只认四个变量（写在 `.callout` 上，都相对正文）：`--callout-size`（默认 `1em`，跟正文同号）、
  `--callout-leading`（默认 `1.85`）、`--callout-font`（默认正文字）、`--callout-title-size`（默认 `0.8em`）。
  想只把某一块缩小，class 里加 `callout--small`（`0.9em` / `1.72`）；想改全局就改 `:root` 或 `.callout` 那几行。

正文类名是 `.prose-ink`（不是 `.prose`）。阅读字号走变量：`--read-size`
（桌面 24px / 窄屏 18.4px）、`--read-leading 1.85`、`--quote-size`（约 17px）；
标题阶梯比正文大一档（h2 ≈ 37px、h3 ≈ 28px）。
书笔记 `/reading/:slug` 复用同一套 hero：封面与书名并排，其余相同。

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
timeline:              # 可选，修改记录；一行一条，按日期升序显示
  - 2026-10-24：初稿
  - 2026-10-26：补写第二节，改正几处措辞
---

正文，支持 Markdown、$...$ / $$...$$、代码高亮、`.filmstrip` 图组。
```

- `content/posts/` 新增 `.md` 即自动进入构建，无需注册路由。
- 文章先按日期倒序；同一天的多篇按 `order` 升序（数字小的在前），没写 `order` 的排在同日已编号文章之后。调换同日顺序只需改 `order`。
- 首页 `摘` 的句子在 `src/data/lines.ts` 手工维护，不要自动抓取。
- 照片在 `src/data/photos.ts` 手工维护，「影」按数组顺序展示。
- 未完成、非文章的笔记请加 `draft: true`，不要发布半句话。
- `timeline` 只记录「日期 + 一句概要」，不存版本、不存正文快照；一行一条，日期与概要之间用「：」或空格隔开。文章页脚按日期升序横向排列成一条线：粉底黑边的圆点 + 竖排说明，最后一稿的圆点与日期用砖红标出。
圆点和连线都套了 SVG `feTurbulence + feDisplacementMap` 滤镜（`#revision-rough`），做出手绘笔触感。
尾注与修改记录的样式**只在 `src/index.css` 末尾定义一份**（`.post-endnote` / `.post-timeline*`），
改字号直接改那里；之前重复定义过两遍，改前面的会被后面的覆盖。不需要修改记录的文章不要写这个字段。想写得更明确时，也可以用 `- { date: 2026-10-24, note: 初稿 }`。

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

全站黑体，设计语言来自 Pixso 落地页「Pod of Cast」（`/landing`）。

- 双黑体：展示字 `Montserrat Alternates`（标题、按钮、导航、`--font-serif`），
  正文字 `IBM Plex Sans`（阅读内容、`--font-sans`）；中文都退到苹方 / 思源黑体。
  想换正文字体只改 `--font-sans` 一处并替换 `public/fonts/` 里的 woff2。
- 等宽：`JetBrains Mono`（日期、字数一类数字）
- 引用与按语：同一族，靠奶油底卡片和留白区分，**不倾斜**
- 字体文件：`public/fonts/montserrat-alternates-{500,700}-latin.woff2`、
  `public/fonts/ibm-plex-sans-{400,500,600,700}-latin.woff2`，
  `@font-face` 在 `src/fonts.css`；字体栈在 `src/data/fonts.ts`、`tailwind.config.ts` 需同步。
- 色板：奶油 `#F7EDE8`（页面底）、纸白 `#FFFFFF`（卡片）、砖红 `#CD4631`（强调）、
  浅蓝 `#EDF3F7`、锡蓝 `#81ADC8`（次强调）。变量见 `src/index.css` 的 `:root`。
- 首页分段：`--pink #F9DFD9`（top 粉底）、`--body-bg #FFFFFF`（body 纯白）、
  `--card-shadow #C3DBE8`（文章卡的偏移阴影）。暗色分别映射到 `#241B18 / #171512 / #2F3F49`。
- 形状：圆角 `--r-sm 8 / md 12 / lg 16 / xl 24 / pill 999`；主按钮带硬阴影 `3px 3px 0`。
- 阅读字号：`--read-size`（正文，桌面 24px）、`--quote-size`（引用 ≈17px）、`--read-leading 1.85`；
  阅读栏宽 46rem，改字号时三个值一起调。
- 页眉导航字号：`--nav-size`（`:root`，1rem；≤900px 在 `.site-nav` 上改为 0.78rem）。
  `.site-nav a` 与 `.nav-button`（搜索 / 夜）共用这一个值，改一处即可；
  `@layer base` 里旧的 `font-size` 声明已删除，别再往那里加。
- 主题：`blog-theme` localStorage；`index.html` 有内联脚本在首屏前加 `.dark`，避免闪白。
- 暗色映射：`--paper #14120F`、`--paper-2 #1E1B17`、`--cream #221E1A`、`--red #E2604A`；
  暗色不要加滤镜到照片；只有「画」使用反相混合。
- 切换按钮显示「夜」/「日」；同时更新 `meta[name=theme-color]`（亮 `#F7EDE8` / 暗 `#14120F`）。
- 重构层集中在 `src/index.css` 末尾（两段「重构层」注释），写在整个 `@layer base` 之外，
  所以能覆盖旧规则；新增样式请沿用那里的 token，不要再写死颜色。

## PWA

- `vite-plugin-pwa`，`registerType: 'prompt'`；更新提示在 `src/components/PwaPrompts.tsx`。
- 名称「ChenzhuoJi」，主题纸色 `#F7EDE8`，图标由 `public/favicon.svg`（墨底「记」，取「记录」之意，不是名字）生成。
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
- `01-web-adjustment-method.md` —— 外观与布局微调方法（不动路由）
- `tailwind.config.ts` —— 旧组件的色阶别名；新页面主要用 CSS 变量
- `src/data/fonts.ts` —— 字体栈
- `src/data/site.ts` —— 站名、时区、首页头像 `avatar`、社交链接 `social`
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
- **修改记录没显示** —— 确认 `timeline:` 下面是一组以日期开头的列表项；写错日期或漏写概要的条目会被跳过，并在控制台留下 `[timeline]` 警告。
- **旧页面** —— `/graph` 已移除，会由 `NotFound` 接住；不要重新加入导航。
