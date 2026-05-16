---
title: "JavaScript：十天与十年"
date: 2026-05-16
genre: vibe
column: 代码的故事
series: 第五章·网络的语言
order: 7
tags: [JavaScript, Brendan Eich, Netscape, AJAX, Node.js, 浏览器, 编程语言, 计算机史]
description: "Brendan Eich 在 Netscape 被要求'在浏览器里加一个脚本语言'。10 天做出了 JavaScript。1995 年它只是个表单验证脚本；2025 年 98.9% 的网站在用它。"
---
## Hello World

```javascript
console.log("Hello, World!");
```

*这是 JavaScript 的 Hello World。一行代码，一个函数调用，没有类、没有包、没有主函数。你在任何浏览器打开开发者工具，敲进去，回车，它就跑起来了。它是所有语言里门槛最低的 Hello World——不需要编译、不需要配置、不需要安装任何东西。这正是 JavaScript 从一开始就被设计成的样子：让任何人，在任何地方，立刻开始写代码。*

![](/images/javascript-logo.svg)

*JavaScript 的官方 logo——黄色的方块背景下，金色的 "JS" 字母以圆润的字体呈现。这个 logo 在 2010 年代随着 Node.js 的崛起而广为人知，但 JavaScript 真正意义上的"标志"是它在浏览器中的地位：全球 98% 的网站都在使用它。Brendan Eich 在 1995 年用 10 天做出它的原型时，没有人想到它会成为世界上使用最广泛的编程语言。*

Brendan Eich 把这一切看在眼里——但他不喜欢自己正在看的东西。

1995 年 4 月，他第一天走进 Netscape 位于山景城的办公室。他 33 岁，刚刚从 Silicon Graphics 辞职，在那里做了七年操作系统和网络代码。他不是一个"网页设计师"，他是一个系统程序员，一个 Lisp 黑客。他加入 Netscape 有一个明确的目标：把 Scheme——一种优雅的、极简的、函数式的 Lisp 方言——塞进浏览器。

他很快发现，这件事不可能发生。

Netscape 的联合创始人 Marc Andreessen 站在了他面前。Andreessen 当时 23 岁，已经因为创造了 Mosaic——世界上第一个流行的图形化浏览器——而上了《时代》杂志封面。这个年轻人有一种让硅谷又爱又恨的特质：他知道自己要什么，并且不在乎你怎么想。

"你的语言要让网页设计师也能写代码，"Andreessen 说。"它必须看起来像 Java。"

Eich 当时的心情有多复杂，可以想象。他是来把函数式编程的优雅带给浏览器的，结果被告知"像 Java"。Java 是一门重度、正式、面向对象的语言——和 Scheme 的极简哲学几乎完全相反。更讽刺的是，隔壁 Sun Microsystems 正在忙着把 Java applet 塞进同一个浏览器。Eich 的"脚本语言"被定位为 Java 的"小兄弟"——一个为小任务准备的附属品。

"我觉得这个名字是个营销手段，"Eich 多年后在一次采访中说。那时他已经在谈论"JavaScript"这个名字——一个他从未喜欢过的名字。但 1995 年春天，他连想名字的时间都没有。他有一件更紧迫的事要做。

他只有 10 天。

## 五月，十天

Netscape Navigator 2.0 的测试版定在 1995 年 9 月发布。留给 Eich 的时间窗口极短。他的经理告诉他：你必须在 Navigator 2.0 里嵌入一个可以工作的脚本语言原型。不是"能编译"，不是"能运行一些简单例子"——是能在真实的网页上工作。

Eich 把办公室门关上，打开了编辑器。

他后来在 ACM HOPL 论文（一篇将近 200 页的 JavaScript 历史文献，由他和 Allen Wirfs-Brock 合著）中详细描述了那 10 天。他坐在 Netscape 的办公室里，写了一个编译器的前端——词法分析器、语法分析器——一个字节码解释器，以及第一个运行时系统。他每天早上冲到办公室开始写，晚上回家时脑子还在转。10 天。他给了自己一个非常紧的限制：做出来的东西必须能在 Navigator 2.0 的 beta 版本里真正跑起来，不能只是一个概念验证。

他借用了一些 Scheme 的核心概念——闭包、一等函数、动态类型。他借用了 Self 语言的原型继承——一种和 Java 的类继承完全不同的、更灵活的面向对象方式。他借用了 Java 的语法表面——花括号、分号、C 风格的表达式。

但这不是拼凑。Eich 在 10 天里做出的不是一个脚本语言的壳——它是一个真正可运行的解释器。最初的名字叫"Mocha"。

"Mocha"这个词暗示了什么？浓缩、苦涩、提神——一种让你醒过来的东西。Eich 本人很喜欢这个名字，它不像后来那个无处不在的名字那样充满营销味。但 Netscape 的市场部不这么想。1995 年 9 月，Navigator 2.0 beta 发布时，语言的名字改成了"LiveScript"。

这个名字只存在了三个月。

1995 年 12 月 4 日，Netscape 和 Sun 联合召开了一场新闻发布会。Sun 的联合创始人 Bill Joy 站在台上，和 Netscape 的人一起宣布了"JavaScript"这个名字。新闻稿里写的是："一种开放、跨平台的面向对象脚本语言。"它强调 JavaScript 的语法和 Java"互补"——实际上这两门语言除了名字和 C 风格语法之外没有任何共同之处。

![](/images/netscape-javascript-press-release-1995.jpg)

*1995 年 12 月 4 日，Netscape 和 Sun Microsystems 联合发布了"JavaScript"。新闻稿中写它"对非程序员友好"、是"Java 的补充语言"。Eich 本人后来将 JavaScript 这个名字描述为"一场营销"。*

Eich 后来说，JavaScript 的名字"是在我背后"决定的。"我本来想叫它 Mocha，退一步叫 LiveScript，"他在一次访谈中说，"但 JavaScript 是一个被强加的名字。"

1996 年，《纽约时报》的一篇文章已经注意到"JavaScript 和 Java 除了名字，几乎没有共同点。"这场困惑从 1995 年开始，持续了三十年，至今不绝。

但名字不重要。重要的是那 10 天里做出的东西，在接下来的三十年里被数十亿人使用。

## 浏览器大战的第一行脚本

1996 年是浏览器大战的第一年。Netscape Navigator 和 Internet Explorer 在争夺地球上每一个桌面。在这个战场上，JavaScript 不是主角——主角是浏览器本身的功能、速度、对 HTML 标准的支持。但 JavaScript 是战场上的一个暗线：谁控制了浏览器脚本，谁就控制了网页开发的生态。

微软在 1996 年 8 月发布了 Internet Explorer 3.0，包含了一个叫 JScript 的东西。JScript 是微软逆向工程 Netscape 的 JavaScript 实现的产物——微软没有获得使用"JavaScript"这个名字的授权（这个名字属于 Sun，后来属于 Oracle），所以他们自己取了个名字。JScript 大致兼容 JavaScript 1.0，但细节上有差异。

差异这个词说得太客气了。实际上是 Nescape 和微软开始了一场肮脏的战争。Netscape 不断给 JavaScript 加私有 API；微软在 JScript 中对应复制并偶尔发明自己的。网页设计师被迫在页面顶部写 `<script language="JavaScript">` 或者 `<!--` 和 `//-->` 的 hack 来确保代码在不同浏览器中能运行。一个网站在 Netscape 上跑得好好的，在 IE 上就完全崩溃——或者反过来。

"Best viewed in Netscape" 和 "Best viewed in Internet Explorer"——这两块图标是这场战争最诚实的纪念碑。你在 1997 年的无数网站上能看到它们：一个是在蓝色 N 标志下写的"在 Netscape 中最佳浏览"，另一个是 IE 的蓝色 e 标志配上同样的宣称。对开发者来说，这意味着他们需要维护两套代码、两套测试、两套部署。

Eich 在 1996 年到 1997 年的主要工作不是设计语言新特性——是充当 Netscape 浏览器和微软浏览器之间"差距的填补者"。他维护 Mocha 引擎（后来更名为 SpiderMonkey），同时试图让 JavaScript 能跨浏览器工作。

1997 年 6 月，ECMAScript 1——第一版正式的语言标准——发布了。标准的目的是让所有浏览器厂商都能实现同一个 JavaScript。但它解决不了根本问题：标准出台了，谁去遵守？微软没有动力遵守——他们的市场份额正在迅速增长。Netscape 也没有完全遵守——他们需要私有 API 来维持差异化。

这是一场看不见尽头的战争。

## 被遗忘的十年

1999 年底，ECMAScript 3 发布。这版标准稳定了 JavaScript 的核心——语法、类型、异常处理、正则表达式。但此后长达近 10 年的时间里，JavaScript 没有一个大版本更新。

这 10 年发生了什么？微软赢了浏览器大战。

2002 年，Internet Explorer 的市场份额达到了 95%——几乎统治了整个桌面互联网。微软停止了 IE 的改进。为什么要改进？已经赢了。IE 6 在 2001 年发布后，微软把浏览器团队解散了——直到 2006 年才重新开始工作。

JavaScript 被困住了。

它在这 10 年里被降格到什么程度？「弹出窗口、鼠标跟踪、状态栏跑马灯」。如果你在 2002 年上一个普通的个人网站，你很可能看到：一个在状态栏里来回滚动的"欢迎访问我的主页"文字、一个在你鼠标移动时跟着跑的星星图案、一个突然弹出来的广告窗口、一个让你"点击这里进入"的闪烁按钮。一个带下拉菜单的导航栏实现起来需要 50 行复杂且不兼容的 JavaScript——而且大概率只在 IE 上能用。

JavaScript 就是这些"特效"的代名词。正经的程序员不把它当作"真正的语言"——它慢、没有好的调试工具、变量作用域一团糟（所有没有用 `var` 声明的变量默认为全局变量——意味着你在一个函数里写个循环，不小心就会污染整个页面的命名空间）、没有模块系统、没有类、没有包管理。它被认为是一句"玩具语言"。

Douglas Crockford 是 2000 年代初少数几个站出来为 JavaScript 说话的人。他是 Yahoo! 的工程师，写了一篇著名的文章叫《JavaScript: The World's Most Misunderstood Programming Language》（世界上最被误解的编程语言）。他在文章里说：JavaScript 有闭包、有函数式能力、有原型继承——你们以为它是玩具，它其实藏着好东西。

关键是——没人听。

"它仍然是那种配角语言，"Eich 在后来的一次采访中描述那段时间——"它被认为是慢的、烦人的。人们用它做弹出广告、状态栏滚动文字。那是 JavaScript 最黑暗的时代。"

2003 年，Douglas Crockford 发现了 JSON——JavaScript Object Notation，一个他已经用了好几年但没有命名的数据格式。他写了一个规范，给这个"发现"取了名字。JSON 后来成为互联网上最重要的数据交换格式之一——它的灵感直接来自 JavaScript 的对象字面量语法。但即使这件事，在当时也没引起太多注意。

JavaScript 继续在黑暗中沉没。

## 2005 年：一切从 Google Maps 开始

2004 年，Google 发布了一个东西，大部分人没注意到它的意义。那是 Gmail——一个完全用 JavaScript 构建的邮件客户端。你不刷新页面就能读邮件、写邮件、归档。"收发邮件不用刷新页面"——今天听起来理所当然，但 2004 年大家习惯了每点一个链接就等页面重新加载。Gmail 打破了那个习惯。

2005 年 2 月，Google Maps 发布了。这一次，世界注意到了。

你可以在地图上拖拽——不需要刷新页面。你放大地图，新数据从服务器上自动加载——不需要刷新页面。标记点、路线规划、搜索——全部都不需要刷新页面。这是人类第一次在浏览器里体验到"真正的应用"的感觉——不是文档，不是目录，是一个可以操作的、反应迅速的、复杂的信息系统。

世界突然意识到：JavaScript 可以做出真正的应用。

Jesse James Garrett 在 2005 年 2 月——正好和 Google Maps 发布同一个月——发表了一篇白皮书，题为《Ajax: A New Approach to Web Applications》（Ajax：一种 Web 应用的新方法）。在这篇文章里，他给 JavaScript 的异步网络请求模式正式命名：AJAX（Asynchronous JavaScript and XML）。

"Ajax"不是新技术。它的底层——XMLHttpRequest 对象——早在 1999 年的 Internet Explorer 5 中就有了（当时是作为 ActiveX 控件实现的），一直没有人真正重视它。Garrett 的伟大贡献不是发明了这项技术，而是给了它一个名字——当某样东西有了名字，它就变成"能谈论的东西"。你无法营销一个没有名字的东西。你无法给一个没有名字的模式写教程。你无法招聘"你要会那个没有名字的东西"的人。

"Ajax"这个名字一出来，整个 Web 开发行业迅速接受了它。2005 年被称为"Web 2.0 元年"——这一年，JavaScript 从一个状态栏跑马灯的脚本语言，变成了构建"Web 应用"的核心技术。

John Resig 在 2006 年 1 月发布了 jQuery 1.0。jQuery 做了一件简单但改变一切的事：它让 JavaScript 的 DOM 操作变得极简单。在 jQuery 之前，你要写 `document.getElementById("foo").style.display = "none"` 来隐藏一个元素，而 `getElementById` 在旧浏览器上还有各种 bug。jQuery 让你写 `$("#foo").hide()`——跨浏览器、兼容旧版本、几乎不出错。

jQuery 不是第一个 JavaScript 库（Prototype 和 Dojo 在其之前），但它是第一个被"所有人"使用的库。2007 年，jQuery 已经出现在大量网站上。2010 年，它几乎成了网页开发的标准配置。

JavaScript 终于开始"职业化"了。

## V8 与性能战争

2008 年 9 月，Google 发布了一个浏览器。不，它在发布一个浏览器的同时，做了一件改变 JavaScript 命运的事。

Google Chrome 不只是又一个浏览器。它带着一个全新的 JavaScript 引擎——V8。

V8 比当时任何 JS 引擎都快数倍。它的秘密是 JIT（Just-In-Time Compilation）——把 JavaScript 编译成机器码，而不是逐行解释。在 V8 出现之前，JavaScript 引擎的工作方式是：读一行源代码，理解它做了什么，执行它——然后读下一行。V8 的做法完全不同：它先把整个 JavaScript 代码编译成机器码——直接能被 CPU 执行的指令——然后执行机器码。听起来简单，但这在技术上极难实现，因为 JavaScript 是动态类型的——同一行代码在不同上下文中可能意味着完全不同的操作。V8 发明了一种"猜测 + 编译"的技术：它猜测一个变量的类型，编译出针对这种类型的机器码；如果猜错了，就重新编译。这种技术叫"内联缓存"（inline caching）。V8 不是第一个做 JIT 编译的 JS 引擎——在此之前，Mozilla 的 SpiderMonkey 已经有了 TraceMonkey（一个基于"跟踪"的 JIT 编译器）——但 V8 是第一个把 JS 性能推到接近原生代码水平的引擎。

V8 的出现引发了一场"性能竞赛"。Safari 的 JavaScriptCore 推出了 SquirrelFish Extreme。Firefox 的 SpiderMonkey 推出了 JägerMonkey。每个浏览器厂商都在拼命优化自己的 JS 引擎——性能数字在 2008 到 2010 年之间翻了几番。

这对 JavaScript 来说是一场彻底的"身份重塑"：它从一个解释型脚本语言，变成了一个经过 JIT 编译、性能接近原生代码的语言。它为后来的一切——Node.js、大型单页应用、高并发的服务器端 JavaScript——铺好了硬件基础。

但最有意思的是：V8 的影响远远超过了 Chrome 浏览器本身。Google 做了一个关键的决定——把 V8 开源。这意味着任何开发者都可以把 V8 从 Chrome 里抽出来，嵌入到自己的软件里。

有一个人注意到了这个可能性。

## 走出浏览器

2009 年 11 月 8 日，柏林，第一次欧洲 JSConf。

一个穿着 T 恤的年轻人走上讲台。他叫 Ryan Dahl，28 岁，纽约人，之前主要写 C 和 C++。他在台上展示的东西让在座的人微微张开了嘴。

他把 Google 的 V8 引擎从 Chrome 里抽了出来，加上一个事件循环（event loop）和一组 I/O API——文件系统、网络、进程管理——给 JavaScript 造了一个"在外面"的运行时。他称之为 Node.js。

Dahl 的核心洞察很精妙：Web 应用的主要瓶颈不是 CPU，是 I/O——等待数据库、等待磁盘、等待网络。传统的 Apache 服务器为每个连接开一个线程——当连接数达到一万，操作系统的线程调度就崩溃了，内存消耗暴涨，上下文切换的代价压垮一切。Node 用单个线程 + 事件循环来处理成千上万的并发连接。不创建新线程、不等待 I/O 完成——发出请求、注册一个回调、继续做别的事。等 I/O 完成了，回调被自动调用。

"Node.js is JavaScript on the server," Dahl 在那次演讲中说。

这个想法的精妙之处在于：它恰好利用了 JavaScript 诞生时就有的能力——回调、事件驱动、闭包——但 14 年来这些东西一直被困在浏览器里。JavaScript 从一出生就擅长事件处理（浏览器本身就是事件驱动的：点击、鼠标移动、页面加载），但从来没有人想到把它拿出来用在服务器上。

Dahl 的演示很简短——他展示了一个简单的 HTTP 服务器，用不到 10 行 JavaScript 代码。台下的人安静了几秒，然后开始鼓掌。但他们没有意识到自己正在见证互联网历史上的一次拐点：JavaScript 走出了浏览器。

2010 年，npm——Node.js 的包管理器——发布了。npm 让开发者可以一键安装别人写好的 JavaScript 模块。2011 年，微软和 Joyent 合作，把 Node.js 移植到了 Windows 上。2012 年，Node.js 的使用量爆炸式增长。

到了 2015 年，"JavaScript Everywhere"从一个口号变成了现实。前端用 JavaScript（Angular、React、Vue），后端用 JavaScript（Node.js、Express），数据库端也用 JavaScript（MongoDB 的查询语言就是 JS）。甚至连桌面应用都可以用 JavaScript 写了——GitHub 在 2013 年发布了 Electron，让开发者用 HTML/CSS/JavaScript 写跨平台桌面应用。VS Code、Slack、Discord、Figma——这些你每天使用的桌面应用，都是用 JavaScript（通过 Electron）写的。

一个 1995 年被设计用来做表单验证的"小脚本语言"，在 2015 年已经覆盖了互联网的每一层。

## 标准委员会回来了

2008 年，就在 V8 发布的前后，JavaScript 的标准委员会 TC39 重新活了过来。

1999 年到 2009 年之间的 ECMAScript 4 是一个漫长的失败——委员会试图对语言进行大规模重构，加入了太多新功能（类、模块、类型系统），各方利益冲突太大，最终项目在 2008 年被冻结。但这十年的失败积累了一个共识：JavaScript 需要进化。

2009 年 12 月，ECMAScript 5 发布了——它不是一个大的版本，但它恢复了标准化的动力。更重要的是，TC39 改变了自己的工作方式：从"一次发布一个大版本"变成了"渐进式改进"。

2015 年 6 月，ECMAScript 6（又称 ES2015，ECMAScript 2015）发布了。

这是 JavaScript 有史以来最大的一次版本更新。ES6 带来了 `let` 和 `const`（块作用域变量，终于不用再被 `var` 的全局污染折磨了）、箭头函数（`() => {}`——简洁、不绑定 `this`）、类（`class` 语法糖——不是真的类，但看起来像）、Promise（解决回调地狱）、模板字符串（`` `Hello, ${name}` ``）、模块化（`import/export`）、解构赋值、默认参数、展开运算符、Map、Set、Symbol。

如果你在 2014 年写 JavaScript 和 2016 年写 JavaScript，你会感觉这完全不是同一门语言。ES6 让 JavaScript 从一个"被误打误撞做出来的语言"变成了一个"经过深思熟虑、由社区驱动的现代语言"。

TC39 同时宣布了新的发布节奏：每年一个大版本。不再等 10 年。2016、2017、2018……直到今天，每年 6 月准时发布一个新版本——ES2016 到 ES2025，每一版都在稳步推进。

2012 年，微软发布了 TypeScript。它不是一门新语言——它是 JavaScript + 静态类型。TypeScript 承认了一件事：JavaScript 的灵活性和动态类型在处理大规模项目时不够用。你需要类型系统来管理规模。TypeScript 的理念是"你写 JavaScript，加上类型注解，然后编译成普通的 JavaScript。"它没改 JavaScript 的语义——它只是在上面加了一层类型检查。

TypeScript 的成功说明了一件事：JavaScript 的生态已经大到需要"工具来管理自己"。2025 年，TypeScript 已经成为最流行的"JavaScript 变体"之一，几乎所有大型前端项目都在用它。

## "10 天的错误"如何变得无处不在

JavaScript 的成功是一个巨大的反讽。

它被广泛使用的很大一部分原因是它无处不在——不是因为它好，而是因为它"恰好在那里"。每台电脑、每个手机、每个浏览器——不需要安装任何东西，JavaScript 就在那里。这种先天优势让所有关于"JavaScript 到底好不好"的争论变成了徒劳：好不好不重要，重要的是它在那儿，而且你绕不开。

Eich 自己多次承认 JavaScript 的缺陷。"如果给我更多时间，我会做得更好，"他在一次采访中说。10 天做出的糟糕设计成了数以百万计程序员每天面对的现实：

`==` 运算符会做类型转换——`'5' == 5` 在 JavaScript 中等于 `true`。`===` 才是严格相等——但初学者不知道这个区别。

`typeof null === 'object'`——这不是设计者的意愿，这是一个 bug，但因为修复它会导致现有代码崩溃，这个 bug 永远没人敢修。

全局变量默认污染命名空间——如果你在函数里写 `foo = 5` 而忘了加 `var`，你刚刚覆盖了一个全局变量。ES5 的严格模式修复了这个问题，但默认行为仍然是"宽松的"。

没有模块系统——在 ES6 之前，JavaScript 没有官方的模块加载机制。开发者使用了各种 hack：全局命名空间、立即执行函数表达式（IIFE）、AMD、CommonJS。

但这正是问题的另一面：如果 Netscape 等到一个"完美"的 JavaScript，浏览器脚本的窗口可能已经关闭了。1995 年，Java applet 正要占领客户端——JavaScript 的最初版本虽然不完美，但它及时出现了。它在浏览器里的先发优势让它赢得了"脚本语言生态位"。之后的一切——AJAX、V8、Node.js——都是建立在这个"先到"的基础上。

在这个意义上，JavaScript 的故事是"先到"击败"完美"的经典案例。互联网不奖励完美——它奖励速度、生态位、以及愿意忍受不完美的用户群体。

2025 年，98.9% 的网站在使用 JavaScript。npm 上的包数量超过 200 万——全球最大的包管理器。Node.js 统治了后端工具链。Electron 让桌面应用也可以用 JS 写。React Native 和 NativeScript 把 JS 带到了移动端。MongoDB、CouchDB 等数据库使用 JavaScript 作为查询语言。智能电视、物联网设备、甚至一些 NASA 的界面——都在用 JavaScript。

它成了一种"宇宙语言"。

2024 年，Wired 杂志发表了一篇长文，标题叫《JavaScript Runs the World——Maybe Even Literally》（JavaScript 运行着世界——甚至可能是字面意义上的）。这篇文章里有一句话击中要害："JavaScript 不完美，但它无处不在——在互联网的世界里，存在比完美更重要。"

## 遗产：偶然的胜利

JavaScript 的故事是一个关于偶然的故事。

它的诞生是偶然的——恰好有个 Eich 在 10 天里做了一个编译器，恰好赶上了 Navigator 2.0 的发布窗口。

它的名字是偶然的——恰好 Sun 要求"看起来像 Java"，恰好 Java 正在风口上，于是 JavaScript 借了 Java 的名字进入市场。

它的第一次翻身是偶然的——XMLHttpRequest 在 IE 5 里躺了六年没人用，直到 Google 做了 Gmail 和 Google Maps，直到 Jesse James Garrett 给它取了个名字叫 AJAX，世界才突然发现 JavaScript 能做应用。

它的第二次翻身是偶然的——Google 为了 Chrome 做了 V8，Ryan Dahl 把 V8 从 Chrome 里抽出来做了 Node.js，JavaScript 意外地统治了服务器。

它的标准化是偶然的——1999 年之后的十年静默，2008 年的内部分裂，2009 年的重启，2015 年 ES6 的爆发——每一步都像是走钢丝，但每一步都恰好踩对了方向。

Douglas Crockford 在 2008 年写了《JavaScript: The Good Parts》（JavaScript 的好部分）——这本书只有不到 200 页，因为它只选了 JavaScript 中最值得用的那部分语言特性。他开篇就说："JavaScript 是我见过的被误解最深的编程语言。它既有糟糕的部分，也有极好的部分。这本书教你怎么用好它。"

这本书的畅销本身就是一个故事：一门语言需要一本教人"只用好的一部分"的书，这本身就说明了很多。

但 JavaScript 的故事不止于好和坏。它告诉我们：在计算机的历史上，"正确"的语言不一定赢，"足够快"的语言也不一定赢——"恰好在那里"的语言最可能赢。Fortran 在大型机上"恰好在那里"。C 在 Unix 上"恰好在那里"。Java 在互联网的服务器端"恰好在那里"。JavaScript 在浏览器里"恰好在那里"。

互联网本身就是一系列偶然的产物。也许没有"必然"的语言——只有"恰好在那里"的语言。而 JavaScript 恰好在那里存在了 30 年——从表单验证到全栈应用，从浏览器到服务器到桌面——它走完了一场从"附属脚本"到"无处不在"的漫长旅程。

---

## 人物

![](/images/brendan-eich-netscape-1995.jpg)

*Brendan Eich（1961–），JavaScript 的创造者。匹兹堡出生，1995 年加入 Netscape。他本想往浏览器里塞 Scheme，却被要求在 10 天内做出一门"像 Java"的脚本语言。后来他联合创立了 Mozilla 项目，2014 年短暂出任 Mozilla CEO 后离职，创办 Brave 浏览器推广隐私保护和区块链技术。*

![](/images/marc-andreessen-netscape-1995.jpg)

*Marc Andreessen（1971–），Netscape 联合创始人。23 岁时要求 JavaScript "看起来像 Java"，这个决定成为 JavaScript 命名争议的根源。后来他成了硅谷最知名的风险投资人（Andreessen Horowitz），投资了 Facebook、Airbnb、Twitter 等公司。*

![](/images/ryan-dahl-nodejs-2009.jpg)

*Ryan Dahl（1981–），Node.js 的创造者。2009 年把 V8 引擎和事件循环结合起来，让 JavaScript 跑在服务器上。他的核心洞察："I/O 是瓶颈，事件驱动是解。"2012 年他退出 Node.js 项目，后来在 2018 年创建了 Deno——一个更安全的 JavaScript/TypeScript 运行时。*

![](/images/jesse-james-garrett-ajax-2005.jpg)

*Jesse James Garrett（不详–），Adaptive Path 的联合创始人。2005 年 2 月发表白皮书定义"AJAX"，这个词引爆了"Web 2.0"时代——但他没有发明 AJAX 的技术，而是给它取了一个名字。这提醒我们：在科技史上，命名有时和发明同等重要。*

![](/images/douglas-crockford-javascript-good-parts.jpg)

*Douglas Crockford（1955–），JSON 的推广者，JavaScript 社区早期最重要的布道者。2008 年出版的《JavaScript: The Good Parts》承认 JS 有"糟糕的部分"，但教人用好它。他让一代开发者相信：JavaScript 是一门值得认真对待的语言。*

![](/images/jquery-1.0-release-2006.jpg)

*John Resig（1984–），jQuery 的创造者。2006 年发布的 jQuery 将 JavaScript 的 DOM 操作从噩梦变成了一行 `$()`。在黑暗年代里，jQuery 是让 JavaScript 开发"不死"的关键力量。*

---

JavaScript 的故事是一个关于"偶然"的故事——偶然的诞生、偶然的命名、偶然的性能突破、偶然的翻身、偶然的统治。但也许在互联网这个由无数偶然构成的世界里，这才是最必然的结果。它不完美，它有很多糟糕的部分，但它是互联网的语言。

就像 Eich 在他博客上写过的："JavaScript 是我的孩子，我看着它犯了很多错，也看着它比任何人想象的都走得更远。"

*下一篇预告：PHP——网站的民主化。Rasmus Lerdorf 在 1994 年用 Perl 写了一套个人主页工具——他没想到这成了全世界最简单的动态网站方案。PHP 让任何人都能搭一个留言板。*
