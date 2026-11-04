# 网页外观与布局微调方法

这份文档做两件事：**让页面看起来不一样，以及让内容摆得不一样**。

颜色、字体、字号、行高、间距、边框、圆角、阴影、显隐、动效，属于外观。
宽度、列数、对齐、顺序、粘性、溢出、桌面/手机切换，属于布局。
路由、链接目标、页面跳转、文章排序、搜索索引、PWA 缓存策略，仍然不要在这里动。

> 一句话原则：**优先只改 CSS；需要改 JSX 时，也只加 `className`、改可见文字，或加一层纯布局的包裹元素，不改 `to` / `path` / `onClick`。**

主战场是 [src/index.css](src/index.css)。`npm run dev` / `npm run build` 走的是 React + Vite；`themes/PaperMod` 是 Hugo 子模块，不是这套页面的样式来源，不要跑去那里找 `.post-title`。

怎么用这份文档：

- 想马上试一下：看 §0。
- 想找某个区域改哪里：看 §2 和附录 A。
- 想换颜色、字号、宽度：看 §3 和 §4。
- 想改列数、顺序、页边位置、桌面/手机布局：看 §5。
- 怕改坏：先看 §2 的“外观、布局和逻辑的分界线”，改完照 §7 检查。

---

## 0. 十分钟上手

```sh
npm run dev
# 打开默认地址 http://localhost:5173（端口被占用时以终端输出为准）
```

然后：

1. 在编辑器里打开 [src/index.css](src/index.css)。
2. 搜索 `── 文章页`，找到 `.post-body`。
3. 把它的 `max-width: 40rem` 改成 `44rem`，同时把 `.post-head`、`.post-foot` 也改成 `44rem`。
4. 保存。Vite 会热更新，浏览器里立刻能看到正文变宽。
5. 用浏览器开发者工具切到手机宽度（约 390px），再看一眼。
6. 满意后执行 `npm run build`，确认能构建。想看生产构建的效果，再跑 `npm run build && npm run preview`。

只改 CSS 不需要 `npm run images`；那个命令是给新增图片生成 WebP 变体和清单用的。

想练布局：把 §5.2 的“文章页页边换到右边”那段贴到 `src/index.css` 末尾，看桌面；再把窗口缩到 860px 以下，确认它自动回到单列。

这就是完整循环：**改一条 → 看亮色 → 看暗色 → 看手机 → 再改下一条。**

---

## 1. 先备份，再动手

如果 `git status` 显示有未提交的改动（这个仓库目前就有配色、字体、页面结构等方面的改动），**不要**随手执行 `git checkout .` 或 `git restore .`，那会把已有的未提交修改一起清掉。

推荐二选一：

```sh
# 方式一：先看清 git status，确认要保留的内容后再提交
git status
git add -A
git commit -m "chore: 保存当前改动"

# 方式二：只备份样式文件到仓库外
cp src/index.css /tmp/index.css.bak
```

改之前看一眼：

```sh
git status
git diff --stat
```

---

## 2. 哪个文件管什么

| 想做的事 | 去哪里 | 能不能动 |
|---|---|---|
| 颜色、字体、字号、间距、边框、圆角、阴影、显隐、动效 | [src/index.css](src/index.css) | **首选，放心改** |
| 宽度、列数、对齐、顺序、粘性、桌面/手机布局 | [src/index.css](src/index.css) 的 `.shell`、`.spread`、各区块 | **首选；先试纯 CSS** |
| 给某个元素加一个样式类 | 对应 `.tsx` 的 `className` | 只加/换类名；不改元素结构 |
| 加一层纯布局包裹元素、移动 DOM 顺序 | 对应 `.tsx` | 属于结构改动；可以，但要检查阅读/键盘顺序 |
| 换整套字体 | `--font-*` 变量；必要时同步 `src/data/fonts.ts`、`tailwind.config.ts` | 可以，但先改 CSS 变量 |
| 手机状态栏 / 安装图标底色 | `index.html`、`src/hooks/useTheme.ts`、`vite.config.ts` | 只改颜色值；别动脚本逻辑 |
| 路由、页面跳转 | [src/App.tsx](src/App.tsx) | **不要动** |
| 导航链接、页脚链接、前后篇链接 | `Header.tsx`、`Footer.tsx`、`Post.tsx` | **不要动 `to` / `path` / `match`** |
| 文章排序、筛选、搜索索引 | `src/utils/posts.ts`、`src/hooks/useSearch.ts` | **不要动** |
| 文章内容 | `content/posts/*.md` | 属于内容，不是外观 |
| 图片清单 | `src/data/image-manifest.json` | 构建生成，不要手改 |
| 构建产物 | `dist/` | 自动生成，改了会被覆盖 |

### 外观、布局和逻辑的分界线

| 这样改 | 性质 |
|---|---|
| `.site-nav a { font-size: 0.8rem; }` | 外观 |
| `.masthead-note { display: none; }` | 外观（视觉上不显示；DOM 里还在） |
| `.post-body { max-width: 44rem; }` | 布局 |
| `.spread { grid-template-columns: 16rem minmax(0, 1fr); }` | 布局 |
| `.article-page .rail { grid-column: 2; }` | 布局（视觉换边，DOM 顺序不变） |
| 在 `Home.tsx` 里加一层 `<div className="home">` | 布局结构（允许，但属于结构改动） |
| `order: 2` 把某个区块提前 | 布局；视觉顺序会与读屏/键盘顺序不一致，谨慎 |
| 把 `<Link to="/posts">` 改成 `<Link to="/gallery">` | **跳转逻辑，别改** |
| 删掉 `<Route path="posts/:slug">` | **路由，别改** |
| 改 `navItems` 里的 `path` 或 `match` | **导航逻辑，别改** |

一句话：**“长什么样、摆在哪”优先留在 CSS；“要加包裹层、换 DOM 顺序”当成结构改动单独做；一旦改到“点了去哪”，就停手。**

---

## 3. 三种改法

### 3.1 改变量（最推荐）

[src/index.css](src/index.css) 顶部有亮色和暗色两套变量：

```css
:root {
  --paper: #ffffff;
  --paper-2: #efeadf;
  --ink: #1e1d19;
  --ink-soft: #45423a;
  --muted: #6f695d;
  --faint: #9b9486;
  --line: #ddd6c6;
  --line-strong: #c6bda9;
  --pine: #435b4d;
}

.dark {
  --paper: #141512;
  --paper-2: #1c1d18;
  --ink: #e8e2d5;
  --ink-soft: #c7c1b3;
  --muted: #948e80;
  --faint: #6b665c;
  --line: #2d2e28;
  --line-strong: #3f4037;
  --pine: #a4b9a9;
}
```

常用变量的含义：

| 变量 | 用在哪里 |
|---|---|
| `--paper` | 页面底色、搜索面板 |
| `--paper-2` | 图片占位底、代码块、行内代码 |
| `--ink` | 标题、加粗、当前项 |
| `--ink-soft` | 正文默认颜色 |
| `--muted` | 次要文字、日期、说明 |
| `--faint` | 更弱的标签、编号、边注 |
| `--line` / `--line-strong` | 1px 细线、分隔线、边框 |
| `--pine` | 强调色、hover、当前稿日期 |
| `--selection` | 选中文字的背景 |

只改一处时，优先改变量，不要到处找规则。改完记得**亮色和暗色都看一眼**。

灯箱（`.lightbox`）是固定深色 `rgba(11, 12, 10, 0.985)`，不跟 `--paper`；想改灯箱要单独改 `.lightbox` 的 `background` 和 `color`。

### 3.2 改已有规则

CSS 文件按区块组织，每个区块前都有注释：

```
/* ── 骨架 ── */
/* ── 页眉 ── */
/* ── 首页：题记 ── */
/* ── 文章条目 ── */
/* ── 页脚 ── */
/* ── 文章页 ── */
/* ── 影 ── */
/* ── 读 ── */
/* ── 搜索 ── */
/* ── 正文排版 ── */
```

在编辑器里搜 `── 文章页` 这样的注释，就能跳到对应位置。
找到类名后，直接改数值即可：

```css
/* 正文加宽 */
.post-head,
.post-body,
.post-foot {
  max-width: 44rem;
}

/* 正文字号略大 */
.prose-ink {
  font-size: clamp(1.06rem, 0.55vw + 0.95rem, 1.2rem);
  line-height: 2.05;
}
```

### 3.3 个人覆盖区（试验用）

如果只是想试一下，不想动原有规则，可以在 [src/index.css](src/index.css) **最末尾**加一个带注释的区块：

```css
/* ── 个人调整（只放外观） ───────────────────────────── */

/* 2026-11-03：正文略宽 */
.post-head,
.post-body,
.post-foot {
  max-width: 44rem;
}
```

说明：

- 这段在 `@layer` 外面，优先级高于文件里 `@layer components` 的规则，通常能直接覆盖。
- 因为它写在 860px 那条媒体查询后面，可能连手机端的规则一起覆盖。如果只想在手机上生效，自己再包一层 `@media`。
- 试验结束后把整段删掉即可，不影响其他样式。
- 不要用 `!important` 硬压；先看开发者工具的 Computed 面板，确认是优先级、顺序还是选择器没写对。

---

## 4. 常用微调配方

### 4.1 换纸色 / 墨色 / 强调色

改 `:root` 和 `.dark` 里的变量：

```css
:root {
  --paper: #fffdf8;      /* 页面底色 */
  --paper-2: #f2ede2;    /* 代码块、图片占位 */
  --ink: #1b1a16;        /* 标题 */
  --pine: #3f5a4a;       /* 强调色 */
}

.dark {
  --paper: #121310;
  --paper-2: #1b1c17;
  --ink: #e9e3d6;
  --pine: #a8bdad;
}
```

注意：

- 当前亮色 `--paper` 是纯白 `#ffffff`，而 `--paper-2` 仍是暖灰。这是有意的：图片还没加载、代码块、行内代码会有层次。如果全改白，页面会变平。
- 改了 `--paper`，搜索遮罩的 `color-mix(... var(--paper) ...)` 会自动跟随。
- 改了底色后，去 `/gallery` 看一眼「画」：它用了 `mix-blend-mode: multiply`（亮色）/ `lighten`（暗色），底色变化会影响融合效果。
- 改了底色后，手机状态栏和安装图标底色不会自动跟，见 §8。

### 4.2 正文宽度和字号

文章页有三处硬编码的 `40rem`：

```css
.post-head { max-width: 40rem; }
.post-body { max-width: 40rem; }
.post-foot { max-width: 40rem; }
```

要一起改，否则标题、正文、文末会错位。`40rem` 约等于 640px，`44rem` 约 704px。

再往外会碰到 `.spread-main` 的上限：

```css
.spread-main { max-width: var(--measure); }  /* --measure: 44rem */
```

所以：

- 改到 `44rem`：只改上面三处即可。
- 想超过 `44rem`：还要把 `--measure` 或 `.spread-main` 一起放大，并确认 `.shell` 的 1120px 还装得下。`--measure` 也管首页和归档的主栏，改大了这些页面会一起变宽。

正文字号：

```css
.prose-ink {
  font-size: clamp(1.06rem, 0.55vw + 0.95rem, 1.2rem);
  line-height: 2.05;
}
```

`clamp(最小值, 随屏幕变化的值, 最大值)` 比直接写死 `px` 更适合手机和桌面。只想整体放大一点，就同时调中间项和最大值；不要只改最小值，否则大屏没变化。

### 4.3 首页

| 选择器 | 控制什么 |
|---|---|
| `.home-hero` | 题记区的上下留白 |
| `.epigraph` | 题记字号、行高、最大宽度 |
| `.epigraph-source` | 出处那一行 |
| `.section` | 每个分栏的上边距和顶部分隔线 |
| `.lead-entry` / `.lead-title` / `.lead-excerpt` | 首页领读 |
| `.entry` / `.entry-title` / `.entry-desc` | 下面的文章行 |
| `.home-photo img` | 首页照片的比例和裁切 |
| `.quote-list` / `.quote-text` | 「摘」的句子 |

例子：

```css
.home-hero {
  padding-top: clamp(2.8rem, 7vw, 5.5rem);
  padding-bottom: clamp(3.2rem, 7vw, 5rem);
}

.epigraph {
  max-width: 22em;
  font-size: clamp(1.6rem, 3.8vw, 2.4rem);
}
```

### 4.4 页眉和导航

| 选择器 | 控制什么 |
|---|---|
| `.masthead` | 页眉上留白 |
| `.wordmark` | 左侧站名字号 |
| `.masthead-note` | 「天津 · 二〇二六」 |
| `.site-nav` | 导航项间距 |
| `.site-nav a` / `.nav-button` | 导航字号、字距、颜色 |
| `.nav-sep` | 导航和「搜索」之间的竖线 |

例子：

```css
.masthead { padding-top: 1.4rem; }
.wordmark { font-size: 1.3rem; }
.site-nav a,
.nav-button { font-size: 0.8rem; letter-spacing: 0.16em; }
```

当前导航的选中下划线是 `::after` 做的。如果你改 `padding` 或 `line-height`，检查下划线是否还贴在文字下方。

如果只想改导航的**文字**（不改大小、颜色）：在 [src/components/Header.tsx](src/components/Header.tsx) 的 `navItems` 里改 `label`，**不要改**同一行的 `path` / `match`。站名在 [src/data/site.ts](src/data/site.ts)，页脚名字在 [src/components/Footer.tsx](src/components/Footer.tsx)。这类改动不涉及跳转，但属于文案，不是纯 CSS。

**不要**为了让某个导航项消失去改 `navItems` 的 `path`。如果只是暂时不想看见它，可以给那个链接单独加一个类再 `display: none`，但这已经是在隐藏入口，想清楚再动。

### 4.5 文章页

| 选择器 | 控制什么 |
|---|---|
| `.article-page` | 文章页顶部留白 |
| `.post-rail` | 左侧粘性页边 |
| `.rail-key` / `.rail-value` | 页边的小标签和值 |
| `.toc` | 目次 |
| `.post-title` | 文章标题 |
| `.post-dek` | 摘要 |
| `.post-body` | 正文容器宽度 |
| `.prose-ink` | 正文排版本身 |
| `.post-foot` | 文末区域 |
| `.post-timeline` | 修改记录 |
| `.post-tags` | 标签 |
| `.post-nav` | 前一篇 / 后一篇 |

标题：

```css
.post-title {
  font-size: clamp(2.1rem, 4.8vw, 3rem);
  line-height: 1.42;
}
```

修改记录：

```css
.post-timeline li {
  grid-template-columns: 6rem minmax(0, 1fr);
}

.post-timeline time {
  font-size: 0.7rem;
}

.post-timeline li p {
  font-size: 1rem;
}
```

如果把日期字号调大，记得把 `grid-template-columns` 的第一列也加宽，否则日期会换行，左侧竖线的位置也会显得别扭。

### 4.6 正文排版

`prose-ink` 这一块控制文章正文里的所有 Markdown 元素：

| 选择器 | 控制什么 |
|---|---|
| `.prose-ink` | 正文字号、行高、颜色 |
| `.prose-ink h2/h3/h4` | 小标题 |
| `.prose-ink a` | 正文链接（默认松绿下划线） |
| `.prose-ink strong` | 加粗 |
| `.prose-ink em` | 按语/仿宋斜体位（实际不倾斜） |
| `.prose-ink blockquote` | 引用 |
| `.prose-ink ul/ol` | 列表 |
| `.prose-ink hr` | 分隔线 |
| `.prose-ink figure` / `img` / `figcaption` | 图片和图注 |
| `.prose-ink :not(pre) > code` | 行内代码 |
| `.prose-ink pre` | 代码块 |
| `.prose-ink table` | 表格 |

常用例子：

```css
/* 正文链接更明显 */
.prose-ink a {
  text-decoration-thickness: 2px;
  text-underline-offset: 0.3em;
}

/* 图片加一点圆角（站点原本不用圆角，这里只是示例） */
.prose-ink img {
  border-radius: 2px;
}

/* 代码块更松 */
.prose-ink pre {
  padding: 1.3rem 1.4rem;
  line-height: 1.9;
}
```

注意：`MarkdownRenderer` 会把图片包成 `<figure>`，图注用 `<figcaption>`；如果你改 `.prose-ink img` 的 `width`，也要检查 `.prose-ink figure` 的边距，不要只看单张图。

### 4.7 影 / 读 / 索引

| 页面 | 选择器 | 控制什么 |
|---|---|---|
| 影 | `.photo-grid` | 照片两列/几列 |
| 影 | `.photo-item img` | 照片比例、裁切 |
| 影 | `.art-grid` | 画的两列瀑布流 |
| 影 | `.art-item img` | 画的混合模式 |
| 读 | `.book-row` | 封面宽度和文字区 |
| 读 | `.book-cover img` | 封面 |
| 索引 | `.tag-list` | 标签两列 |
| 索引 | `.tag-list .count` | 标签计数 |

例子：

```css
.photo-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.book-row {
  grid-template-columns: 8.5rem minmax(0, 1fr);
}
```

注意：

- 照片默认 `aspect-ratio: 3 / 2; object-fit: cover`，改比例会改变裁切，先确认照片主体没被切掉。
- 「画」的 `mix-blend-mode` 和 `.dark` 下的 `invert/grayscale` 是刻意做的纸墨融合。改底色、改滤镜前，去 `/gallery` 看亮色和暗色两种状态。
- 手机端已有 `@media (max-width: 860px)` 把照片和标签改成单列；你在末尾加桌面规则时，别把手机规则一起覆盖掉。

### 4.8 页脚

```css
.site-footer {
  margin-top: clamp(5.5rem, 12vw, 9rem);
  padding-block: 2.2rem max(3rem, env(safe-area-inset-bottom));
  border-top: 1px solid var(--line);
}
```

- `.footer-top` 是左右两栏：左侧名字和说明，右侧链接。
- `.footer-name` / `.footer-note` / `.footer-links` 分别控制名字、说明、链接。
- 页脚有 `env(safe-area-inset-bottom)`，别把它删掉，否则 iPhone 底部会贴边。

### 4.9 手机端

主断点是 `860px`：

```css
@media (max-width: 860px) {
  :root {
    --rail: auto;
    --gap: 0;
  }

  .spread {
    display: block;
  }

  /* ...很多手机端覆盖... */
}
```

想加自己的手机规则，可以在这个块里加，或在文件末尾新开一个：

```css
@media (max-width: 520px) {
  .post-title {
    font-size: 1.85rem;
  }

  .post-timeline li {
    grid-template-columns: 1fr;
    gap: 0.15rem;
  }
}
```

检查宽度至少看 **390px**（手机）和 **768px**（平板/窄桌面）。
860px 是页面从“左页边 + 正文”折成单列的分界点，改 `--rail`、`--gap`、`.spread` 时一定要在这个宽度附近来回拖一下。
`--rail` 和 `--gap` 也管首页、归档的页边，别只看文章页。

### 4.10 动效

站点主要用了很轻的过渡：hover 颜色、下划线展开、搜索/灯箱淡入。
改 `transition`、`animation` 时，保留文件末尾的：

```css
@media (prefers-reduced-motion: reduce) {
  /* 全局把动画和过渡压到几乎为 0 */
}
```

不要为了让某个动效“更明显”而删掉它。系统里开了“减少动态效果”的读者，应该仍然能正常阅读。

---

## 5. 布局调整

布局是“东西放在哪里、占多宽、怎么排”。它和颜色不一样：颜色改坏了顶多难看，布局改坏了会重叠、溢出，或者让键盘顺序和视觉顺序对不上。

先记住三层：

| 改动 | 做法 | 风险 |
|---|---|---|
| 宽度、列数、间距、对齐、粘性、溢出、桌面/手机切换 | 纯 CSS | 低，优先 |
| 加包裹层、移动 DOM 顺序、增删区块 | JSX 结构 | 中；不动 `to` / `path`，但要检查阅读和键盘顺序 |
| 改路由、链接目标、页面跳转 | 不在本文范围 | 高，别做 |

### 5.1 先认页面骨架

```text
.shell                         max-width: 1120px；左右 padding
└─ .spread                     grid: var(--rail) + minmax(0, 1fr)
   ├─ .rail                    左页边，宽 8.75rem
   └─ .spread-main             max-width: var(--measure)，44rem
      ├─ .post-head            文章标题区，40rem
      ├─ .post-body            正文，40rem
      └─ .post-foot            文末，40rem
```

对应 CSS：

```css
.shell {
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: clamp(1.25rem, 5vw, 3rem);
}

.spread {
  display: grid;
  grid-template-columns: var(--rail) minmax(0, 1fr);
  column-gap: var(--gap);
}

.spread-main {
  max-width: var(--measure);
}
```

关键点：

- `.spread` 同时用于首页、归档、影、读和文章页。只改 `.spread`，所有页面都会变；只改 `.article-page .spread`，才只影响文章页。
- 860px 以下，`.spread` 变成 `display: block`，页边折到内容上方。**改桌面布局时，一定要回到 860px 以下看一遍。**
- `.post-head` / `.post-body` / `.post-foot` 的 `40rem` 是文章页自己的上限；`--measure: 44rem` 是主栏上限。两者不是同一个东西，前面 §4.2 已经踩过这个坑。
- `.page` 只负责页面顶部留白；`.page-head`、`.section`、`.gallery-section` 这些是区块自己的上下间距。

### 5.2 布局配方

#### A. 整体加宽或收窄

```css
.shell {
  max-width: 1280px;
}

:root {
  --measure: 48rem;
}

.post-head,
.post-body,
.post-foot {
  max-width: 48rem;
}
```

说明：

- `.shell` 是外层最大宽度，改它只影响“页面可用宽度”，不会自动把正文拉宽。
- 正文还受 `.spread-main`（`--measure`）和文章页三个 `40rem` 限制。三处要一起改。
- `--measure` 也管首页和归档的主栏，改大了这些页面会一起变宽。
- 这个站刻意在右侧留白。`.spread` 的第二列是 `1fr`，会把剩余宽度吃满，所以只加 `justify-content: center` 不会让内容居中；真要居中，得把第二列改成有上限的轨道，例如 `grid-template-columns: var(--rail) minmax(0, var(--measure));` 再加 `justify-content: center`。这会影响所有页面的页边位置，改前想清楚。

#### B. 文章页页边换到右边

只影响文章页，桌面端把左页边换到右边；手机端保持原样：

```css
@media (min-width: 861px) {
  .article-page .spread {
    grid-template-columns: minmax(0, 1fr) var(--rail);
  }

  .article-page .spread > .rail {
    grid-column: 2;
    grid-row: 1;
  }

  .article-page .spread > .spread-main {
    grid-column: 1;
    grid-row: 1;
  }
}
```

说明：

- 这里只是视觉换边，DOM 顺序仍然是“页边在前、正文在后”。键盘 Tab 和读屏仍然先遇到页边里的链接。
- 如果你要求键盘顺序也跟着换，就必须在 `Post.tsx` 里把 `<aside>` 移到 `<div className="spread-main">` 后面。那是结构改动，不是纯 CSS；改完要检查所有文章页。
- 换到右边后，页边和正文之间的 `--gap` 仍然生效；觉得太远就改 `--gap`，但首页和归档也会一起变。如果觉得页边被推得太靠右，把第一列从 `1fr` 改成 `minmax(0, var(--measure))`，页边就会紧跟在正文后面，右侧留白。

只改页边宽度：

```css
:root {
  --rail: 10rem;
}
```

它同时影响首页、归档、影、读和文章页；860px 以下 `--rail` 会变成 `auto`，手机端不受影响。栏间距则改 `--gap`，同样会影响所有页面。

#### C. 首页和归档的行列宽

```css
.entry {
  grid-template-columns: 5rem minmax(0, 1fr) auto;
  column-gap: 1.2rem;
}

.archive-row {
  grid-template-columns: 4.5rem minmax(0, 1fr) auto;
}
```

说明：

- 第一列是日期，第二列是标题，第三列是箭头/门类；`minmax(0, 1fr)` 是为了让长标题能收缩，不把网格撑破。
- 手机端已有 `.entry { grid-template-columns: 3.3rem minmax(0, 1fr); }` 和 `.archive-row { grid-template-columns: 3.2rem minmax(0, 1fr); }`。改现有的桌面规则，手机规则会继续覆盖；如果加在文件末尾，记得自己补 `@media (max-width: 860px)`。
- 日期列太窄会换行，太宽会把标题挤到右边。改完用一篇长标题的文章看。

#### D. 照片、画改三列

```css
.photo-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.art-grid {
  columns: 3;
}
```

说明：

- 照片是三列网格，画是三列瀑布流（`columns`），两者机制不同。
- 手机端已有单列规则。加在文件末尾的话，补一层：

```css
@media (max-width: 860px) {
  .photo-grid {
    grid-template-columns: 1fr;
  }

  .art-grid {
    columns: 1;
  }
}
```

- 三列会让单张照片变小，先确认图注和地点没有挤成两行；画的 `columns` 变多会让单幅更窄，注意留白。

#### E. 页脚、前后篇改上下

```css
.footer-top {
  flex-direction: column;
  gap: 1.2rem;
}

.post-nav {
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.post-nav .next {
  text-align: left;
}
```

说明：

- 页脚原本左右分栏；改成上下后，右侧链接会落到名字下面，可能需要再调 `.footer-links` 的 `margin-top`。
- 前后篇原本左右两栏；改成上下后，`后一篇` 不再右对齐，所以要覆盖 `.post-nav .next { text-align: left; }`。

#### F. 粘性页边的位置

```css
@media (min-width: 861px) {
  .post-rail {
    top: 1.25rem;
    max-height: calc(100dvh - 2.5rem);
  }
}
```

说明：

- `top` 是页边距离视口顶部的距离；`max-height` 是它最多能占多高，超出的部分在页边内部滚动。
- 如果粘性突然失效，先检查 `.post-rail` 的祖先有没有 `overflow: hidden` / `overflow: auto`；有的话，`position: sticky` 会被限制在那个容器里。
- 手机端已有 `.post-rail { position: static; }`；所以这里包了一层桌面媒体查询，别把 `max-height` 带到手机上。

#### G. 让正文图片稍微出血

只让图片比正文左右各宽 1.5rem，不碰页边：

```css
@media (min-width: 861px) {
  .post-body .prose-ink figure {
    width: calc(100% + 3rem);
    margin-left: -1.5rem;
  }
}
```

说明：

- 左右各 1.5rem，正好在 `--gap` 的最小值以内，不会撞到页边。
- 如果你把 `--gap` 改小，或者给 `.post-body` 加了 `overflow: hidden`，这个出血会被裁掉。
- **不要**直接套 `width: 100vw; margin-left: calc(50% - 50vw)`。文章主栏左边有页边，不在视口正中，这样算会偏，还容易出横向滚动。
- 想要真正的全屏出血，需要单独处理页边和滚动条；那是另一类改动，先不要在外观微调里做。

#### H. 顺序：什么时候必须动 JSX

CSS 的 `order` 只在**同一个 flex/grid 容器**里有效，而且不会改变 DOM 顺序、键盘顺序和读屏顺序。

首页的三个区块目前是 `main.shell` 的直接子元素（`Home.tsx` 返回的是 fragment），但 `main` 同时用于其他页面。想只调首页顺序，通常要在 `Home.tsx` 里加一层包裹：

```tsx
<div className="home">
  <section className="home-hero">...</section>
  <section className="section">...</section>
  <section className="section">...</section>
</div>
```

然后：

```css
.home {
  display: flex;
  flex-direction: column;
}

.home > .home-hero {
  order: 1;
}

.home > .section:nth-of-type(2) {
  order: 3; /* 笔记 */
}

.home > .section:nth-of-type(3) {
  order: 2; /* Gallery */
}
```

说明：

- 这是结构改动：只加了包裹层，没有改任何 `Link` / `Route`，但会改变 DOM 顺序和 CSS 选择器的匹配，改完要完整看首页。
- 没写 `order` 的项默认是 `0`，会排到最前面。要调顺序，最好给同一层的每个子项都写清楚；否则容易出现“只改了一个，别的全跑前面”的情况。
- `order` 只改视觉顺序，Tab 和读屏仍然按 DOM 走。如果视觉顺序和阅读顺序差太多，宁可改 JSX 里的区块顺序，也不要只靠 `order`。
- 现代浏览器也可以用 `main.shell:has(> .home-hero)` 只给首页加 flex，不必改 JSX；但 `:has` 的可读性和兼容性要自己权衡。

### 5.3 布局改动怎么选

| 你想改 | 最稳的做法 | 注意 |
|---|---|---|
| 宽一点、窄一点 | 改 `.shell`、`--measure`、`.post-*` 的 `max-width` | 三处文章宽度要一起改 |
| 多一列、少一列 | 改 `grid-template-columns` / `columns` | 补手机端单列规则 |
| 左右换边 | 改 `grid-template-columns` + `grid-column` | DOM/键盘顺序不变 |
| 上下顺序 | 先看父容器是不是 flex/grid；不是就加包裹层 | 结构改动，检查 Tab 顺序 |
| 粘住/跟随 | `position: sticky` + `top` | 祖先 `overflow` 会破坏 sticky |
| 图片出血 | 小范围负 margin | 不要用 `100vw` 硬套 |
| 隐藏整块 | `display: none` | 内容从视觉和读屏里一起消失，想清楚 |

### 5.4 布局检查

- 390px、768px、860px 附近、1024px、1280px、1440px 各看一遍。
- 没有横向滚动。可以在控制台跑：

```js
document.documentElement.scrollWidth <= window.innerWidth
```

返回 `true` 才算没有横向溢出。

- 用开发者工具的网格/盒模型叠加层，看列宽和间距是不是你以为的那样。
- 用 `Tab` 走一遍，确认焦点顺序和视觉顺序没有严重错位。
- 浏览器缩放到 200%，看文字有没有重叠、按钮有没有被挤出屏幕。
- 用一篇长标题、一篇没有标签的文章、一个空结果（例如搜索一个不存在的词）各看一遍。
- 文章页滚到底，确认粘性页边没有盖住页脚，也没有在途中消失。
- 图片还没加载时，占位背景是否正常（`--paper-2`）。
- 亮色、暗色都看。
- `npm run build` 通过。

### 5.5 常见布局坑

- **`100vw` 出横向滚动**：`100vw` 包含滚动条宽度。优先用 `100%`；确实要视口宽度时，接受 `100vw` 的代价并测试桌面滚动条。
- **网格/弹性子项撑破容器**：子项默认 `min-width: auto`，长标题会把 `1fr` 撑开。用 `minmax(0, 1fr)` 或给子项 `min-width: 0`。
- **`order` 改变视觉顺序**：Tab 和读屏仍按 DOM 走。视觉顺序和阅读顺序差太多就不要用。
- **绝对定位造成重叠**：能不用 `position: absolute` 就不用；布局优先用 grid/flex。
- **祖先 `overflow` 破坏 sticky**：`overflow: hidden/auto/scroll` 的祖先会让 `position: sticky` 失效或只在祖先内部粘。
- **手机上的 `100vh`**：地址栏伸缩会让 `100vh` 跳动，用 `100dvh`。
- **固定列宽配长中文**：日期列、封面列、页边列都要用长标题和长日期试。
- **加删网格项后位置变了**：`grid-auto-flow` 和自动放置会重新排；明确写出每个区域的 `grid-column` / `grid-row`。
- **媒体查询顺序**：末尾的个人覆盖区在 860px 媒体查询之后，会盖掉手机规则；手机专用规则要么写进 860px 块，要么自己在末尾再包一层 `@media`。
- **`z-index` 叠层**：搜索是 80，灯箱是 90，跳到正文的 skip-link 是 100；加固定定位元素时别随便压过它们。

---

## 6. 怎么找到要改的选择器

1. 浏览器里右键 → **检查**。
2. 在 Elements 面板选中元素，看它的 `class`。
3. 在 [src/index.css](src/index.css) 里搜这个类名，或搜区块注释（`── 页眉`、`── 文章页`）。
4. 在 Styles 面板里直接改数值试效果；满意后抄回 CSS 文件。
5. 看 **Computed** 面板，确认最终生效的是哪条规则、字号/颜色/宽度是多少。
6. 改布局时，重点看 Computed 里的 `display`、`grid-template-columns`、`gap`、`max-width`，并打开开发者工具的网格叠加层；比盯着 CSS 文件猜要快。

几个常见元素对应：

| 你看到的 | 选择器 |
|---|---|
| 左上角站名 | `.wordmark` |
| 导航「笔记 / Gallery / 阅读」 | `.site-nav a` |
| 页面整体宽度 | `.shell` |
| 页边 + 正文两栏 | `.spread` |
| 页边宽度 / 栏间距 | `--rail` / `--gap` |
| 正文主栏上限 | `--measure` / `.spread-main` |
| 文章页页边 | `.post-rail` |
| 首页大题记 | `.epigraph` |
| 首页文章行 | `.entry` |
| 归档行 | `.archive-row` |
| 文章标题 | `.post-title` |
| 文章正文 | `.prose-ink` |
| 文末修改记录 | `.post-timeline` |
| 前后篇 | `.post-nav` |
| 照片两列 | `.photo-grid` |
| 标签索引 | `.tag-list` |
| 搜索弹窗 | `.search-panel` |
| 灯箱 | `.lightbox` |

如果类名很多（例如 `rail section-rail`），优先搜更具体的那个（`section-rail`），再看基础类（`rail`）。

---

## 7. 改完检查清单

- [ ] 亮色下看一遍。
- [ ] 点右上角「夜」，暗色下再看一遍。
- [ ] 390px 宽看一遍。
- [ ] 768px 宽看一遍。
- [ ] 860px 附近看一遍（布局在这里折成单列）。
- [ ] 1280px 以上看一遍。
- [ ] 首页 `/`。
- [ ] 归档 `/posts`。
- [ ] 一篇带修改记录的文章，例如 `/posts/love-life`。
- [ ] 影 `/gallery`。
- [ ] 读 `/reading`。
- [ ] 索引 `/tags`。
- [ ] 搜索：`Cmd+K` / `Ctrl+K`。
- [ ] 灯箱：点开一张照片，按 `←` `→` `Esc`。
- [ ] 手机上没有横向滚动条，文字没有被裁掉。
- [ ] 如果这次改了列数或页边位置：860px 上下都正常。
- [ ] 如果这次加了包裹层或换了 DOM 顺序：`Tab` 顺序没有严重错位。
- [ ] 浏览器缩放到 200%，文字没有重叠。
- [ ] 文章页滚到底，粘性页边没有盖住页脚。
- [ ] 用 `Tab` 键走一遍，焦点框仍然看得见。
- [ ] 开发者工具里模拟 `prefers-reduced-motion: reduce`，页面仍然可读。
- [ ] `npm run build` 通过。
- [ ] 本次改动没有多出对路由/链接文件的修改。

最后一条要对照“动手前”和“改完后”。动手前先记一下：

```sh
git diff --stat -- src/App.tsx src/components/Header.tsx src/components/Footer.tsx src/pages/Post.tsx
```

改完再跑一次。如果这几个文件比开始时多了改动，说明外观调整越界了，改回去。
（这个仓库本来就可能已经有这些文件的改动，所以看的是“有没有变多”，不是“有没有”。）

---

## 8. 改了底色后，还要同步的地方

页面的底色由 `--paper` 控制，但手机状态栏、PWA 安装底色是另外写死的。截至目前，它们还是旧的纸色 `#F6F3EB`，而页面亮色已经是纯白 `#ffffff`，所以本来就有一点不一致。

如果你在意这一圈颜色，改完 `--paper` 后同步这几处：

| 文件 | 改什么 | 作用 |
|---|---|---|
| [src/index.css](src/index.css) | `:root` 的 `--paper`、`.dark` 的 `--paper` | 页面本身 |
| [index.html](index.html) | `<meta name="theme-color">` 和防闪白脚本里的亮色值 | 手机浏览器状态栏 |
| [src/hooks/useTheme.ts](src/hooks/useTheme.ts) | 切换主题时写入的亮/暗色值 | 切换后状态栏跟随 |
| [vite.config.ts](vite.config.ts) | manifest 的 `theme_color` / `background_color` | 安装到桌面后的启动底色 |

只改颜色值，不要动 `index.html` 里的防闪白脚本结构，也不要动 `vite.config.ts` 里的 `navigateFallback`、`globPatterns` 等缓存配置。

---

## 9. 常见坑

布局类的坑在 §5.5 单独列了；这里主要是外观和通用问题。

### 改了变量，暗色没变

`:root` 和 `.dark` 是两套值。只改 `:root`，暗色不会自动跟随。要么两套都改，要么在 `.dark` 里单独覆盖。

### 改了 CSS，浏览器没反应

- 开发时：确认 `npm run dev` 还在跑；保存后看终端有没有报错；必要时硬刷新。
- 生产/部署后：Service Worker 会缓存旧 CSS。页面里出现「有新版本」提示时点「立即更新」；或者开发者工具 → Application → Service Workers → Update / Unregister，再刷新。
- 别改 `dist/`，下次构建会被覆盖。

### 规则写了但不生效

按顺序查：

1. 选择器拼错了没有。
2. 开发者工具里这条规则是不是被划掉了（优先级不够）。
3. 是不是写在 `@layer components` 里，被后面的无层规则覆盖了。
4. 是不是被 `@media` 里的规则覆盖了。
5. 最后才考虑加一点 specificity，尽量不要用 `!important`。

### 新加的类名被 Tailwind 删了

`tailwind.config.ts` 的 `content` 会扫描 `src/**/*.{js,ts,jsx,tsx}`。
如果你只在 CSS 里写了一个新类名、却没在 JSX 里用过，`@layer components` 里的规则可能被 tree-shake 掉。

解决办法：

- 优先复用已有类名。
- 确实要新类名，就在 JSX 里加上 `className="你的类名"`，让 Tailwind 扫到。
- 或者把个人覆盖写在第 3.3 节的“无层个人区”，不要放进 `@layer components`。

### `--measure` 改了，文章没变宽

`.post-head`、`.post-body`、`.post-foot` 里是硬编码的 `40rem`，不直接读 `--measure`。
要改文章宽度，先改这三处；要超过 `44rem`，再动 `.spread-main` / `--measure`。

### 字体换了，中文没变

中文字体依赖系统字体。`--font-serif` 当前是 `Georgia, 'Times New Roman', 'Songti SC', ...` 这样的顺序；如果你把某个只含拉丁字形的字体放在最前面，中文会继续往后面的字体栈找，这是正常的。

要换中文字体，把目标字体加到对应字体栈的**中文部分**，并确认你的系统/读者系统里真的有这个字体。自托管字体放在 `public/fonts/`，再在 `src/fonts.css` 里加 `@font-face`；不要直接改 `dist`。

### 画作在暗色下发灰/消失

`.art-item img` 亮色用 `mix-blend-mode: multiply`，暗色用 `invert/grayscale`。改底色、改滤镜、改 `opacity` 都会影响它。改完一定去 `/gallery` 看两种主题。

### 点导航 404 了

说明改到了路由或链接，不是外观问题。检查：

- `src/App.tsx` 的 `<Route path=...>` 是否还在。
- `Header.tsx` 的 `navItems` 里 `path` / `match` 是否被改。
- 页面里的 `<Link to=...>` 是否被改。

这也是为什么这份文档建议：外观调整不要碰 `.tsx` 里的 `to` / `path` / `onClick`。

### 想隐藏某个入口

`display: none` 会让它在视觉、键盘和读屏里都消失，但 DOM 里的链接还在，功能没有被移除。如果只是视觉上不想要，可以；如果是想取消功能，那属于功能改动，不在本文范围。反过来，只想淡出但仍保留布局，可以用 `opacity`；但透明又仍可聚焦的元素对键盘用户不友好，记得同时处理焦点样式。

### 不要用 `git checkout .` 回滚

如果 `git status` 显示有未提交的改动，回滚外观时优先手动改回，或只对 `src/index.css` 做局部恢复：

```sh
git diff -- src/index.css
```

看清楚再决定，别把字体、页面结构等其他改动一起清掉。

---

## 10. 回滚

- 只改了一条规则：编辑器里改回去，或删掉第 3.3 节的个人区块。
- 想按文件恢复：先看 `git diff -- src/index.css`，确认没有别人的改动，再考虑 `git checkout -p -- src/index.css`（交互式，只挑自己的 hunk）。
- 整批试验前最好先 commit 或复制文件到仓库外；出问题时回到那个点。

---

## 附录 A：CSS 区段速查

在 [src/index.css](src/index.css) 里搜这些注释：

| 注释 | 内容 |
|---|---|
| `── 骨架` | `.shell`、`.spread`、`.rail`、页面基础网格 |
| `── 页眉` | `.masthead`、`.wordmark`、`.site-nav` |
| `── 首页：题记` | `.home-hero`、`.epigraph` |
| `── 首页：分栏` | `.section`、`.section-rail` |
| `── 文章条目` | `.lead-entry`、`.entry` |
| `── 首页：照片` | `.home-photo` |
| `── 首页：摘句` | `.quote-list`、`.quote-text` |
| `── 页脚` | `.site-footer` |
| `── 一般页面头` | `.page`、`.page-title`、`.page-dek` |
| `── 记（归档）` | `.archive-row`、`.year-head` |
| `── 文章页` | `.article-page`、`.post-*`、`.post-timeline` |
| `── 影` | `.gallery-section`、`.photo-grid`、`.art-grid` |
| `── 读` | `.book-row`、`.book-*` |
| `── 标签索引` | `.tag-list` |
| `── 搜索` | `.search-*` |
| `── 胶片条（文章配图）` | `.strip-*` |
| `── 灯箱` | `.lightbox-*` |
| `── 正文排版` | `.prose-ink` 及其子元素 |
| `── 杂项` | `.empty`、`.meta-line`、`.tag` 等 |
| 文件末尾 | `@media (max-width: 860px)`、`prefers-reduced-motion`、代码高亮 |

## 附录 B：变量速查

| 变量 | 默认亮色 | 默认暗色 |
|---|---|---|
| `--paper` | `#ffffff` | `#141512` |
| `--paper-2` | `#efeadf` | `#1c1d18` |
| `--ink` | `#1e1d19` | `#e8e2d5` |
| `--ink-soft` | `#45423a` | `#c7c1b3` |
| `--muted` | `#6f695d` | `#948e80` |
| `--faint` | `#9b9486` | `#6b665c` |
| `--line` | `#ddd6c6` | `#2d2e28` |
| `--line-strong` | `#c6bda9` | `#3f4037` |
| `--pine` | `#435b4d` | `#a4b9a9` |
| `--selection` | `#d6e0d5` | `#2c3a30` |
| `--rail` | `8.75rem` | 同左（手机为 `auto`） |
| `--gap` | `clamp(1.5rem, 5vw, 4rem)` | 同左（手机为 `0`） |
| `--measure` | `44rem` | 同左 |

---

## 最后

外观调整不需要一次改完。**一次只改一个变量或一条规则，保存，看一眼，再继续。**

如果拿不准某个改动算不算“外观”，问自己一句：
**它会不会改变用户点哪里、看到哪一页、哪些文章出现？**
会，就别放进这份文档的范围；不会，就放心改 CSS。
