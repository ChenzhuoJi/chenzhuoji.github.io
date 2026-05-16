# 研究大纲：JavaScript：十天与十年

## 叙事弧线

- **开头切入点**：以 1995 年 4 月 Brendan Eich 第一脚踏进 Netscape 办公室开始。他以为自己是来把 Scheme"塞进浏览器"的——一种优雅的、函数式的 Lisp 方言。但他很快发现 Netscape 要的不是这个。他的经理 Marc Andreessen 说："你的语言要让网页设计师也能写代码。"Sun 在隔壁正忙着把 Java 小应用（applet）塞进同一个浏览器。Eich 的"脚本语言"被要求看起来像 Java。10 天。他只有 10 天做出第一个编译器。

- **主体故事线**：
  1. Eich 在 Netscape 的 10 天冲刺——从 Mocha 到 LiveScript 到 JavaScript 的命名闹剧
  2. 浏览器大战——Netscape Navigator vs Internet Explorer，JScript 逆向工程、DOM 的碎片化
  3. 黑暗年代——1999-2004 年，IE 占 95%，JavaScript 被当作"玩具语言"（弹出窗口、跑马灯、状态栏滚动文字）
  4. 2005 年转折——Jesse James Garrett 在一篇白皮书中定义了"AJAX"，Google Maps 和 Gmail 证明了 JavaScript 能做真正的"应用"
  5. 2008 年 V8——Google Chrome 带着 JIT 编译的 V8 引擎出现，JavaScript 从一个解释型脚本语言变成了性能竞赛的主战场
  6. 2009 年 Node.js——Ryan Dahl 说"为什么不能在服务器上跑 JavaScript？"——互联网的每一层开始被 JS 覆盖
  7. 2015 年 ES6——JavaScript 从"10 天赶出来的语言"变成了世界上最大的编程社区的标准；从此每年一个大版本

- **结尾（暗线升华）**：JavaScript 的一切都仿佛是"无心插柳"——10 天赶工、碰巧赶上了 Java 热潮的名字、被当作玩具的十年、突然通过 AJAX 翻身、通过 Node.js 溢出到服务器。它不完美，它有很多"糟糕的部分"（Douglas Crockford 这样说过），但它是"互联网的语言"。2025 年，98.9% 的网站用 JavaScript。从表单验证到全栈应用，从浏览器到服务器到桌面（Electron）——它走完了一场从"附属脚本"到"无处不在"的漫长旅程。暗线钩子：下一篇 PHP——"不，普通人的网站不是用 JavaScript 做的——是用 PHP。"

## 关键人物

- **Brendan Eich（1961–）** — JavaScript 的创造者。匹兹堡出生，伊利诺伊大学厄巴纳-香槟分校硕士。先在 Silicon Graphics 做了 7 年操作系统和网络代码，1995 年 4 月加入 Netscape。核心矛盾：他本人想做 Scheme in the browser，但管理层要的是"像 Java 的脚本语言"。10 天内做出了第一个 JS 引擎（Mocha）。后来 co-founded Mozilla 项目，2014 年短暂出任 Mozilla CEO 后因政治捐款争议辞职。随后创办 Brave 浏览器和 Basic Attention Token（BAT）。

- **Marc Andreessen（1971–）** — Netscape 联合创始人，Mosaic 的创造者之一。要求 Eich 的脚本语言"看起来像 Java"的决定性人物。1995 年这个决定被广泛认为是 JavaScript 名称混乱的根源。

- **Bill Joy（1954–）** — Sun Microsystems 联合创始人。支持 Eich 在浏览器中嵌入脚本语言。JavaScript 的命名借用 Java 品牌，是 Sun 和 Netscape 的联合营销决策。

- **Jesse James Garrett** — Adaptive Path 的创始人。2005 年 2 月发表白皮书《Ajax: A New Approach to Web Applications》，给 JavaScript 的异步网络请求模式正式命名。这个词引爆了"Web 2.0"时代。

- **Ryan Dahl（1981–）** — Node.js 的创造者。2009 年把 V8 引擎和事件循环结合起来，让 JavaScript 跑在服务器上。他的核心洞见："I/O 是瓶颈，事件驱动是解。"

- **Douglas Crockford（1955–）** — JSON 的推广者（"发现者"），JavaScript 社区的早期布道者。2008 年写了《JavaScript: The Good Parts》——这本书承认 JS 有很多糟糕的部分，但教人用好它。Yahoo! 的工程师，在 JavaScript 从"玩具"变成"专业语言"的转型中起了关键作用。

- **John Resig（1984–）** — jQuery 的创造者。2006 年发布，让 JavaScript 的 DOM 操作变得极简单。"`$(document).ready(function(){})`"——这句话定义了 2000 年代末的网页开发。

## 时间线

- **1995.04**: Brendan Eich 加入 Netscape
- **1995.05**: Eich 用 10 天完成了第一个 JS 引擎（Mocha）
- **1995.09**: Netscape Navigator 2 beta 发布，语言名为"LiveScript"
- **1995.12.04**: Netscape 和 Sun 联合发布"JavaScript"——正式名，声明中强调 Java 兼容性
- **1996.03**: Netscape Navigator 2.0 正式发布，JavaScript 1.0 面世
- **1996.08**: Internet Explorer 3.0 发布，包含 JScript（Microsoft 逆向工程的 JS 实现）
- **1996.11**: Netscape 向 Ecma International 提交 JavaScript 标准化提案
- **1997.06**: ECMAScript 1（ECMA-262）发布——第一个标准
- **1998.06**: ECMAScript 2 发布
- **1999.12**: ECMAScript 3 发布——稳定了语言的核心（此后长达 10 年没有大版本更新）
- **1999–2004**: IE 统治期，JavaScript 停滞——"黑暗年代"
- **2005.02**: Jesse James Garrett 发表白皮书定义"AJAX"
- **2005**: Google Maps 和 Gmail 发布——证明 JavaScript 能做复杂的客户端应用
- **2006.01**: jQuery 1.0 发布——DOM 操作从此简单
- **2008.09**: Google Chrome 发布，包含 V8 JavaScript 引擎（JIT 编译）
- **2009.05**: Ryan Dahl 在 JSConf 上展示 Node.js
- **2009.12**: ECMAScript 5 发布
- **2010**: npm 包管理器发布
- **2015.06**: ECMAScript 6（ES2015）发布——现代 JavaScript 的起点（let/const, arrow functions, promises, class, modules）
- **2016–2025**: 每年一个大版本（ES2016 到 ES2025）
- **2025**: 98.9% 的网站使用 JavaScript（W3Techs 数据）

## 篇章规划

### 第一章：Mocha——5 月，10 天

- **叙事目标**：以 1995 年 4 月 Eich 入职 Netscape 的"文化冲突"开场：他是一个想做 Scheme 的 Lisp 黑客，却进了被 Java 狂热席卷的 Netscape。管理层要求"浏览器需要一门脚本语言"——但不能选 Scheme（太陌生），不能选 Python（当时不知名），必须"像 Java"。展示 Eich 在 5 月关起门来写编译器的 10 天冲刺。从第一行字节码解释器开始。时间是 Netscape 2.0 的 beta 截止日期的压力。最初的代号叫"Mocha"——这个名字暗示了什么？"一个浓缩、苦涩、提神的东西。"
- **配图关键词**：Brendan Eich portrait (young, 1995), Netscape campus Mountain View (1995), Netscape Navigator 2.0 beta screenshot, Mocha coffee cup + code motif

### 第二章：从 LiveScript 到 JavaScript——命名是一场营销

- **叙事目标**：1995 年 9 月，Navigator 2 beta 搭载了这门新语言，名字叫"LiveScript"。但在 12 月 4 日的新闻发布会上，它突然变成了"JavaScript"。Sun 和 Netscape 在利用 Java 的热度——Java applet 在当时备受关注，但实际体验很差（下载慢、崩溃多）。JavaScript 是一个"聪明的寄生"——它借 Java 的名字进入市场，但和 Java 没有一点关系。展示 Eich 本人对这个名字的感受：他在后来的采访中说"JavaScript 是被强加的名字"，"我本来想叫它 Mocha 或者 LiveScript"。1996 年《纽约时报》的一篇文章已经注意到"JavaScript 和 Java 除了名字，几乎没有共同点"——混乱由此开始，至今不绝。
- **配图关键词**：Netscape + Sun joint press release (Dec 1995), Java logo vs JavaScript logo, LiveScript beta screenshot, "Netscape and Sun announce JavaScript" press release scan

### 第三章：浏览器大战的第一行脚本

- **叙事目标**：1996 年，微软发布了 Internet Explorer 3.0，内部包含一个名叫"JScript"的逆向工程实现。Netscape 和微软开始了一场肮脏的战争——Netscape 不断给 JavaScript 加私有 API，微软在 JScript 中对应复制并偶尔发明自己的。网页设计师被迫在页面顶部写 `<script language="JavaScript">` 或 `<!--` + `//-->` 的 hack。整个 1996-1997 年，Eich 在维护 Mocha 引擎的同时，被迫充当 Netscape 浏览器和微软浏览器之间"差距的填补者"。1997 年 6 月，ECMAScript 1 标准出台——但这并不能阻止两家公司各自为政。"Best viewed in Netscape" 和 "Best viewed in Internet Explorer"——这两块图标是这场战争最诚实的纪念碑。
- **配图关键词**：Netscape Navigator 4 vs IE 4 screenshot comparison, "Best viewed in Netscape" badge image, "Best viewed in IE" badge image, Brendan Eich at Netscape office (1996-97), ECMA-262 first edition cover

### 第四章：被遗忘的十年——JavaScript 是玩具

- **叙事目标**：1999 年底 ECMAScript 3 发布后，JavaScript 进入了长达近 10 年的"进化停滞期"。微软的 IE 在 2002 年达到 95% 市场份额——微软停止了 IE 的改进。JavaScript 被降格到"弹出窗口、鼠标跟踪、状态栏跑马灯"的水平。程序员不把它当作"真正的语言"——它慢、没有好的调试工具、没有作用域、没有模块。Douglas Crockford 在 2000 年代初做了一场著名的演讲"JavaScript: The World's Most Misunderstood Programming Language"——他在 TED 式的会议上告诉听众：JS 有闭包、有函数式能力、有原型继承——你们以为它是玩具，它其实藏着好东西。关键是没人听。
- **配图关键词**：IE 6 logo (2001), early JavaScript popup ad examples, Douglas Crockford portrait (2000s), early JS calendar widgets / mouse-trailer effects, Netscape 6 screenshot (disaster)

### 第五章：AJAX——Google Maps 改变了什么

- **叙事目标**：2005 年是 JavaScript 命运的转折点。2 月，Jesse James Garrett 在白皮书中提出了"AJAX"（Asynchronous JavaScript and XML）这个术语——但技术本身不是新的（XMLHttpRequest 出现在 1999 年的 IE 5 中，只是一直没人知道）。关键事件：2004 年 Google 发布了 Gmail（一个完全用 AJAX 的邮件客户端），2005 年 Google Maps 发布（用户可以拖拽地图——不需要刷新页面）。世界突然意识到——JavaScript 可以做出真正的应用。2006 年 John Resig 发布 jQuery，将"从 DOM 取出元素并修改它们"这件事简化成一行 `$("#id").hide()`。JavaScript 从"网页脚本"变成了"Web 应用"的语言。
- **配图关键词**：Google Maps screenshot (2005), Jesse James Garrett white paper first page, XMLHttpRequest object reference (MSDN 1999), jQuery 1.0 release announcement, "Ajax: A New Approach to Web Applications" screenshot

### 第六章：V8 与性能战争

- **叙事目标**：2008 年 9 月，Google Chrome 发布，同时发布了 V8 JavaScript 引擎。V8 比当时任何 JS 引擎快数倍——它的秘密是 JIT（Just-In-Time Compilation），把 JavaScript 编译成机器码，而不是逐行解释。Safari 的 JavaScriptCore（SquirrelFish Extreme）、Firefox 的 SpiderMonkey（TraceMonkey）立刻迎战。浏览器性能竞赛开始了——这对 JavaScript 来说是一场彻底的"身份重塑"：它从一个解释型脚本语言，变成了一个经过 JIT 编译、性能接近原生代码的语言。这为后来的一切——Node.js、大型单页应用——铺好了硬件基础。
- **配图关键词**：Chrome V8 logo, Google Chrome launch screenshot (2008), Brendan Eich + Andreas Gal TraceMonkey, JS engine speed benchmark comparison chart (2008-2010), SpiderMonkey logo

### 第七章：Node.js——JavaScript 走出浏览器

- **叙事目标**：2009 年 11 月，Ryan Dahl 在 JSConf 欧洲大会上展示了一个东西——他把 Google 的 V8 引擎从 Chrome 里抽出来，加上一个事件循环（event loop）和一组 I/O API，给 JavaScript 造了一个"在外面"的运行时。他称之为 Node.js。Dahl 的核心洞察很精妙：Web 应用的主要瓶颈不是 CPU，是 I/O——等待数据库、等待磁盘、等待网络。传统的 Apache 服务器为每个连接开一个线程——当连接数达到一万，操作系统就炸了。Node 用单个线程 + 事件循环来处理成千上万的并发连接。这恰好是 JavaScript 诞生时就有的能力（回调、事件驱动），但 14 年来一直被困在浏览器里。Node.js 让 JavaScript 工程师可以在服务器上用同一门语言写前端和后端——"JavaScript Everywhere"开始不是一个口号，是现实。
- **配图关键词**：Ryan Dahl portrait (2009), Node.js logo, JSConf 2009 presentation screenshot, "Node.js is JavaScript on the server" concept, npm logo

### 第八章：ES6——回到标准委员会

- **叙事目标**：2015 年 6 月，ECMAScript 6（又名 ES2015）发布了。这是 JavaScript 有史以来最大的一次版本更新：let/const、箭头函数、类（class 语法糖——不是真的类，但看上去像）、Promise、模板字符串、模块化（import/export）。ES6 标志着 JavaScript 从一个"误打误撞"做出来的语言，变成一个经过深思熟虑、由社区驱动的现代语言。TC39（技术委员会）的工作方式变成了"每年发布"——不再等 10 年。TypeScript（微软 2012 年发布的静态类型 JS 超集）也在同期崛起——它不是一门新语言，它是 JavaScript + 类型——承认了"JavaScript 需要工具来管理规模"。2015 年之后，JavaScript 生态（Babel、Webpack、React、Vue、Angular）以一种难以置信的速度膨胀。2025 年，npm 的包数量超过 200 万——全球最大的包管理器。
- **配图关键词**：ES6 / ES2015 spec cover, Babel logo (transpiler), TypeScript logo, TC39 committee meeting photo, npm packages growth chart (2009-2025)

### 第九章：遗产——"10 天的错误"如何变得无处不在

- **叙事目标**：JavaScript 的成功很大程度上是"错误"的产物。10 天做出的糟糕设计（`==` 的类型转换、`typeof null === 'object'`、全局变量默认污染、没有模块系统）成了数以百万计程序员每天面对的现实。Eich 本人多次承认："如果给我更多时间，我会做得更好。"但正是这种"紧急性"成就了它：如果 Netscape 当时等到一个设计完美的语言，浏览器脚本的窗口可能已经关闭了。JavaScript 的故事表明：在互联网这个生态里，**"先到"比"完美"重要**。2025 年，98.9% 的网站用 JavaScript，Node.js 统治了后端工具链，Electron 让桌面应用也可以用 JS 写，React Native 把触角伸到了移动端。它成了计算机史上蔓延最广的语言。暗线升华：JavaScript 是一个关于"偶然"的故事——偶然的命名、偶然的性能突破、偶然的 AJAX、偶然的 Node。但互联网本身就是一个关于多种偶然的产品。也许没有"必然"的语言——只有"恰好在那里"的语言。下一篇预告：PHP——"不，普通人做网站用的不是 JavaScript，是 PHP。Rasmus Lerdorf 在 1994 年用 Perl 写了一套个人主页工具——他没想到它在 2025 年仍然运行着 75% 的网站。"
- **配图关键词**：Brendan Eich recent portrait (2020s), "JavaScript: The Good Parts" book cover, Electron logo, "98.9% of websites use JavaScript" screenshot, Brave browser logo (Eich's latest project)

---

## 推荐阅读

1. **Brendan Eich, "New JavaScript Engine Module Owner" (2011)** — https://brendaneich.com/2011/06/new-javascript-engine-module-owner/
   Eich 自己的 JS 早期历史回忆——10 天设计的故事、标准化的经历、Mozilla 的诞生。一手史料。

2. **Wikipedia: JavaScript** — https://en.wikipedia.org/wiki/JavaScript
   JavaScript 的完整历史、语法、引擎、标准化历程、使用数据。事实性参考。

3. **Wikipedia: Brendan Eich** — https://en.wikipedia.org/wiki/Brendan_Eich
   Eich 生平——Netscape、Mozilla、CEO 争议、Brave。包含"10 天设计"的权威说明。

4. **Wikipedia: ECMAScript** — https://en.wikipedia.org/wiki/ECMAScript
   ECMAScript 标准化的完整历史——ES1 到 ES2025 的版本沿革。

5. **Wikipedia: Ajax (programming)** — https://en.wikipedia.org/wiki/Ajax_(programming)
   AJAX 的完整历史——从 IE5 的 XMLHTTP 到 2005 年 Garrett 的白皮书。JavaScript 命运的转折点。

6. **Wikipedia: Node.js** — https://en.wikipedia.org/wiki/Node.js
   Node.js 的完整历史——Ryan Dahl 2009 年的欧洲 JSConf 演示、npm、与 io.js 的合并。

7. **Jesse James Garrett, "Ajax: A New Approach to Web Applications" (2005)** — https://adaptivepath.org/ideas/ajax-new-approach-web-applications/
   "Ajax" 一词的源头。这篇白皮书定义了 Web 2.0 的技术基础。

8. **Charles Severance, "JavaScript: Designing a Language in 10 Days" (2012)** — https://ieeexplore.ieee.org/document/6145258 (Computer 杂志，第 45 卷第 2 期)
   计算机学会的短文，权威介绍了 10 天冲刺的细节。付费墙但摘要足够。

9. **Wirfs-Brock & Eich, "JavaScript: The First 20 Years" (2020)** — https://dl.acm.org/doi/10.1145/3386327
   ACM HOPL 论文（编程语言历史顶级会议）。Eich 和 Wirfs-Brock 合著——JS 前 20 年的权威技术史。将近 200 页。

10. **Netscape & Sun, "Netscape and Sun announce JavaScript" (Dec 4, 1995)** — 存档于 https://web.archive.org/web/20020606002913/http://wp.netscape.com/newsref/pr/newsrelease67.html
    原始新闻稿。JavaScript 名字的官方发布声明——"Open, cross-platform object scripting language"。

11. **Douglas Crockford, "JavaScript: The World's Most Misunderstood Programming Language" (2001)** — https://crockford.com/javascript/javascript.html
    2001 年的经典文章——在 JS 被当作玩具的时代，Crockford 在告诉世界：这是一门有闭包和函数式能力的正经语言。

12. **Sheon Han, "JavaScript Runs the World—Maybe Even Literally" (Wired, 2024)** — https://www.wired.com/story/javascript-runs-the-world-maybe-literally/
    最新的长篇报道——覆盖从 1995 年到 2024 年的完整 JavaScript 叙事，Wired 风格。

13. **Ryan Dahl, "Original Node.js presentation" at JSConf 2009** — https://www.youtube.com/watch?v=ztspvPYybIY
    Ryan Dahl 在 2009 年 JSConf 上首次展示 Node.js 的视频——历史性的一刻。

14. **Lex Fridman Podcast #160: Brendan Eich (2021)** — https://www.youtube.com/watch?v=krB0enBeSiE
    Lex Fridman 对 Brendan Eich 的深度访谈（约 3 小时）。覆盖了 Eich 的人生、JS 的设计决策、Mozilla、Brave、加密货币。非常详细的素材。
