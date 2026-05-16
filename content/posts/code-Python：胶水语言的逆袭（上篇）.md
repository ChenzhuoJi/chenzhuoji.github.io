---
title: "Python：胶水语言的逆袭（上篇）"
date: 2026-05-16
genre: vibe
column: 代码的故事
series: 第五章·网络的语言
order: 10
tags: [Python, Guido van Rossum, NumPy, Django, CPython, 编程语言, 开源]
description: >-
  1989 年圣诞节，一个荷兰程序员在家里写了一门「为我自己」的语言。没有人想到——十九年后，它会分裂整个世界，并在二十年后统治 AI。
---

## Hello World

```python
print("Hello, World!")
```

*这是 Python 的 Hello World。一行。没有分号，没有花括号，没有 `public static void main`，没有 `<?php` 标签——就是一句话：`print("Hello, World!")`。读它的时候你甚至不需要知道"编程"是什么——你猜也能猜出它在做什么。C 的 Hello World 在告诉机器"你该做什么"；Java 的 Hello World 在穿正装戴礼帽；PHP 的 Hello World 在 HTML 中开了一扇窗；Python 的 Hello World 什么都没做——它只是在说话。*

![](/images/python-logo.svg)

*Python 的官方 logo——蓝色和黄色的两条蛇形曲线交织在一起，形成双螺旋结构。两条蛇分别代表 Python 的两大核心哲学：简洁与强大。这个 logo 的名字就叫 "Python"，与 Guido van Rossum 在 1989 年圣诞节开始的个人项目同名——他当时在阿姆斯特丹的家里写一个"给自己用的脚本语言"，随手用了 BBC 喜剧《Monty Python's Flying Circus》来命名。不会有第二个语言 logo 那么恰当地反映它的血统：可读、有趣、不装严肃，但认真起来谁都挡不住。*

1989 年 12 月，阿姆斯特丹。

Centrum Wiskunde & Informatica（CWI）——荷兰国家数学与计算机科学研究中心——关门了。圣诞节假期，整栋楼安静得像一座图书馆在深夜。走廊里的灯光被一层层熄灭，办公室的门一把把锁上，咖啡机最后一次咕噜作响之后也安静了下来。

33 岁的 Guido van Rossum 没有回家乡海牙。他住在阿姆斯特丹，办公室关门了，他就在家待着。他的桌上摊着一本 Amoeba 分布式操作系统的手册——CWI 的同事们正用 Amoeba 做研究，这是一个实验性的微型内核系统，试图把一群工作站变成一台"虚拟计算机"。但 Guido 遇到了一个具体而微的麻烦：他需要一个能和 Amoeba 通信的脚本工具。

Unix 上有 Shell。Shell 能做管道、能做重定向、能写脚本——但它不够强大。有 awk。awk 擅长处理文本，但不适合做系统编程。有 Perl。1987 年 Larry Wall 发布的 Perl 已经相当成熟，能处理文本、系统管理、网络通信——但 Guido 看着 Perl 的代码，觉得它们"有瑕疵"。这种感受非常个人化，几乎没有理性可言。就像有人觉得绿色是世界上最丑的颜色——你说不出理由，但你就是不想穿绿色的衣服。

Guido 参与过一门叫 ABC 的语言的开发。ABC 非常优美——它的设计哲学是"让编程像读英语一样自然"。但它几乎没人用。

他看着那本 Amoeba 手册，在圣诞节的安静里，他对自己说了一句后来被无数次引用的话：

"I decided to write an interpreter for the new scripting language I had been thinking about lately."

他决定写一个解释器——给他自己一直在想的一门新的脚本语言。

不是给公司写的。不是给用户写的。不是给学术界评审委员会写的。

给他自己。

## ABC 的遗产与教训

Python 的故事如果不讲 ABC，就永远讲不清楚。

1980 年代早期，CWI 的一个团队——Leo Geurts、Lambert Meertens、Steven Pemberton——设计了一门叫 ABC 的教学语言。他们的目标很明确：创造一门让非程序员也能写程序的语言。它没有变量声明、没有指针、没有复杂的类型系统。它的语法简化到了夸张的程度。如果你要在 ABC 里定义一个返回文档单词数量的函数，你写的是：

```
HOW TO RETURN words document:
```

而不是 `def` 或者 `function`。它用缩进来定义代码块——这是当时极为激进的决定。虽然缩进表示块的灵感来自 ALGOL 68 和后来的一些实验语言，ABC 是第一个把它做到如此极致的设计。ABC 还取消了所有你能想到的"噪音"符号——没有 `{}`、没有 `;`、没有 `()`（除了函数调用）。它的目标用户是大学生，不是程序员。

ABC 在技术上做对了很多事。但在一个最关键的事上做错了：它封闭得像个象牙塔。

ABC 的运行环境是一个封闭的集成环境——你不能调用操作系统功能，不能访问文件系统，不能写一个 C 扩展，不能加载外部库。你在 ABC 里只能做 ABC 允许你做的事，超出这个范围，你只能等 ABC 团队在下个版本里加新功能。而 ABC 的版本更新——几乎是龟速。ABC 的设计者们追求完美，他们不肯发布一个"还差一点"的版本。结果就是：ABC 的 1.0 版本从来没有真正面市。项目在 1980 年代中期启动，到了 1980 年代末期，ABC 几乎已经是个死去的项目。

Guido 在 ABC 团队里工作了几年，他是这个"完美的失败"的亲历者。他后来在回顾时说："我欠 ABC 很多东西。缩进、强类型、清晰的语法——这些都来自 ABC。但 ABC 教给我最重要的一课是：封闭是不可接受的。如果一个语言不能和外部世界对话，它就会窒息。"

Guido 在 1989 年圣诞节启动的项目，要做的是一件事：保留 ABC 的优雅精神，但向 C 和 Unix 的世界完全开放。

名字怎么来的？不是蟒蛇。Guido 是 Monty Python 飞行马戏团的粉丝——那个英国喜剧团体让他欲罢不能。"Python"这个名字简短、有点古怪、不严肃。Guido 后来解释说，他想要一个"有点叛逆、不装正经"的名字。一门编程语言叫 Python——听起来就不像 C++ 或者 Java 那么"正派"。

他要的就是这种气质。

## alt.sources 上的新生儿

Guido 花了大约三个月做出了一版可运行的解释器。他后来在回忆中说，1989 年圣诞节他"写了一个词法分析器和语法分析器"，1990 年剩下的时间都在让这个解释器真正能用。最初的版本是在 CWI 的 Amoeba OS 环境下跑的——那个他最初想连接的操作系统。

1991 年 2 月 20 日，Guido 把代码发到了 Usenet 的 `alt.sources` 新闻组。

这是当时互联网上最大的代码集市。每天都有无数人在上面发布各种程序——从游戏到工具到编译器。Guido 的帖子标题极其朴素："Python 0.9.0"。没有煽情的介绍，没有"改变未来的语言"这种话。他简单描述了这门语言：有类（带继承）、有异常处理、有函数、有 list 和 dict 数据类型。还有从 Modula-3 借来的模块系统。

从 GitHub 的视角看回去，1991 年的 `alt.sources` 发布看起来像一次极其随意的开源仪式。但正是在那一刻，Python 从一个"圣诞节的 hobby project"变成了一个公共项目。

第一批回应者不多，但质量极高。Usenet 的用户群体是当时互联网上最懂技术的一群人——大学里的计算机科学家、贝尔实验室的研究员、MIT 的工程师。他们对 Python 的反应是：这东西还挺有意思。

但真正重要的是 1994 年。那一年，`comp.lang.python` 新闻组建立了。这是 Python 社区的第一个家园。没有 Stack Overflow、没有 GitHub Issues、没有 Discord——一个新闻组就是全世界的 Python 开发者能交流的唯一地方。

也是在 1994 年，Python 1.0 发布了。

1.0 版本最有趣的部分不是 Guido 自己写的——而是一个"Lisp 黑客"的贡献。这个匿名的 Lisp 爱好者给 Guido 发来了 patch，包含了 `lambda`、`map`、`filter`、`reduce` 四个函数式编程工具。Guido 自己并不是函数式编程的信徒——他后来甚至说过"lambda 让 Python 有点太聪明了"，但他在 1.0 里接受了这些 patch，因为"它们的确有用"。

这是一个贯穿 Python 整个历史的模式：Guido 不是最激进的，不是最聪明的，甚至不是最有远见的——但他的"审美判断"极为稳定。他知道什么东西让代码读起来舒服，什么东西让代码看起来乱。他接受 Lisp 的 lambda 是因为"闭包在某些场景下是最清晰的写法"；他拒绝了某些更疯狂的功能因为"它们在 90% 的情况下都没用"。Python 的设计哲学从一开始就是实用主义，而非纯粹主义。

## 大西洋彼岸

1995 年，Guido 离开了 CWI。

这不是一个容易的决定。他在 CWI 工作了超过十年——从 ABC 到 Amoeba 到 Python——荷兰是他全部的学术和人生背景。但 Python 需要一个更大的舞台。CWI 的研究经费在缩紧，Python 不是 CWI 的官方项目，Guido 的"花 50% 时间维护一个脚本语言"的状态越来越尴尬。

他收到了美国 CNRI（Corporation for National Research Initiatives）的邀请。CNRI 在弗吉尼亚州的 Reston——一个华盛顿郊区的安静小镇。Bob Kahn——TCP/IP 协议的联合发明人——领导的这个机构对 Python 产生了兴趣。Guido 带着妻子和年幼的儿子跨过大西洋。

在 CNRI，Python 从一个"个人项目"变成了"受资助的项目"。Guido 有了专门的时间来维护 Python，有了一小笔经费，有了一群真正在用 Python 的人。

Python 1.4（1996 年）带来了关键字参数，从 Modula-3 学来的——这让你在调用函数时可以写 `func(name="Guido", age=33)` 而不是只能按位置传参。还加入了复数支持——一个微妙的信号：有人在用 Python 做数学计算。Python 1.5（1998 年）是第一个真正稳定的企业级版本。O'Reilly 在同年出版了《Programming Python》——这本书标志着 Python 第一次有了"官方教学材料"之外的学习资源。

但 Python 在 1998 年的处境仍然尴尬。它是一个不错的脚本语言——比 Perl 优雅，比 Tcl 强大——但它没有一个令人信服的"应用场景"。很多人用它写一次性脚本、做系统管理、搭原型——但没有任何一个"大东西"是非 Python 不可的。

这个状态在 1999 年发生了一次微妙的转向。

## Computer Programming for Everybody

1999 年，Guido 向 DARPA——美国国防高级研究计划局——提交了一份提案。

标题叫 "Computer Programming for Everybody"（人人都会编程）。

这份提案是一份极具远见的文本。Guido 在开头写了一段话，今天读起来仍然像是一份宣言："在未来，每个计算机用户都应该能够打开他们电脑的引擎盖，对里面的应用做出改进。我们相信这将从根本上改变软件的性质。"

提案的核心论点是：就像读写能力让普通人可以读书写字一样，编程能力应该让普通人可以修改他们的软件。不是做专业程序员——而是像会用 Excel 一样会写一点 Python。Guido 在提案里引用了 Alice 项目（一个 3D 图形教学环境）和 Logo 语言的经验，证明"非程序员学编程"是可行的。

DARPA 给了钱。CP4E 项目启动。

虽然 CP4E 最终没有持续太久——DARPA 的资助周期结束之后，这个项目自然淡出了——但它的精神深深嵌入了 Python 的 DNA。Python 的简洁语法不是技术洁癖的产物——它是一个政治承诺：让编程对每个人变得可及。

2004 年，当 Tim Peters 写下《The Zen of Python》的时候，CP4E 已经结束五年了，但它的气息无处不在。那条著名的"Readability counts"（可读性很重要）——本质上是 CP4E 的遗产。因为如果你想让每个人都能编程，你的代码必须是可读的。"Beautiful is better than ugly"——这不仅是一个审美偏好，这是一个社会理想。

## Python 2.0 与开源转型

2000 年是 Python 历史上最混乱也最关键的一年。

CNRI 的 Python 开发团队——Guido 加上 Barry Warsaw、Jeremy Hylton 等核心成员——集体跳槽到了一家叫 BeOpen.com 的创业公司。BeOpen 当时在做一个"开放的开发平台"的概念，听起来像是 2000 年所有创业故事的标配。团队在 BeOpen 组成了 PythonLabs，继续开发 Python。

但 BeOpen 在 2000 年底就倒闭了——泡沫破灭的速度比任何人想象的都快。Python 核心团队在半年内换了两个东家：从 CNRI 到 BeOpen，再从 BeOpen 到 Zope Corporation（一家做 Web 应用服务器的公司）。

这段动荡留下了两个遗产。

第一个是 Python 2.0（2000 年 10 月 16 日发布）。2.0 带来了三个改变命运的特性：列表推导式（从 Haskell 偷来的）、Unicode 支持、循环检测垃圾回收。列表推导式尤其重要——它作为一个语法特性，让 Python 在处理数据时的表达力上了一个台阶。你可以写 `[x**2 for x in range(10) if x % 2 == 0]` 来代替一整个循环加条件判断的代码块。这不仅仅是语法糖——它定义了什么叫做"Pythonic"。

第二个遗产是 Python 软件基金会（PSF）的成立。2001 年，在 BeOpen 倒闭和许可证争议的余波中，社区意识到 Python 需要一个中立的、非营利性的机构来持有知识产权和管理资金。PSF 的成立标志着 Python 从一个"Guido 和他的朋友们"的项目变成了一个"社区治理的项目"——虽然 Guido 仍然是 BDFL（Benevolent Dictator For Life，终身仁慈独裁者），但决策过程变成了更加透明的 PEP 机制。

PEP——Python Enhancement Proposal——是一种标准化提案流程。任何人对 Python 有任何改进想法，都可以写一份 PEP，提交给社区讨论，经过审核后决定是否纳入。这套流程借鉴了 Python 自己的前辈——但也借鉴了 IETF 的 RFC 传统。PEP 的建立让 Python 的发展变得有序、可追溯、可辩论。

## 胶水语言的诞生

一个语言不是靠自己长大的。它是靠别人用才长大的。

在 Python 2.0 发布前后，Python 的世界正在悄悄发生一件事——大部分 Web 开发者没有注意到，但它在实验室和大学里正在蔓延。

1995 年，MIT 的一个研究生叫 Jim Hugunin。他在做一个需要用矩阵运算的项目——图像处理相关。当时科学计算的世界被商业软件 MATLAB 统治，除了 MATLAB 就是 Fortran 和 C。Python 的语法简洁，但它的数值处理能力几乎是零——用 Python 的 list 做矩阵乘法，速度慢得让人心碎。

Hugunin 做了一件事：他为 Python 写了一个 C 扩展，叫做 Numeric。这个扩展让 Python 可以用 C 的速度操作多维数组和矩阵。当你写 `a + b` 的时候——如果 a 和 b 是 Numeric 的数组对象——底层跑的是 C 的循环，不是 Python 的循环。速度差了两个数量级。

Numeric 是 Python 科学计算的第一块砖。1997 年，Hugunin 离开 MIT 加入 CNRI 做 JPython（Python 的 Java 实现）去了——但 Numeric 已经活了。Paul Dubois 在劳伦斯利弗莫尔国家实验室接手维护，后来又交给了 Travis Oliphant——一个在数学和工程计算领域深耕的研究员。

2001 年，一个叫 SciPy 的项目诞生了。它是一组科学计算工具的集合——数值积分、优化、信号处理、线性代数——全部建立在 Numeric 之上。SciPy 让 Python 在科学计算领域第一次有了和 MATLAB 叫板的资格。

但到了 2005 年，事情变得复杂了。两个竞争性的数组库——Numeric 和 Numarray——都在各自发展，社区分裂了。Travis Oliphant 做了一件吃力不讨好的事：他决定把两个库合并成一个，取名为 NumPy。2006 年，NumPy 1.0 发布。

NumPy 的 ndarray 对象成了 Python 科学计算的基石。通过这个对象，Python 可以操作任意维度的数组，底层用 C 或 Fortran 做高性能计算，上层用 Python 做粘合。这个"Python 做胶水、C 做计算"的模式——后来被完美复制到了每一个深度学习框架里。

与此同时，另一件事也在实验室里发生着。一个叫 John D. Hunter 的神经科学家在 2002 年开始写 Matplotlib——一个 Python 的 2D 绘图库，灵感来自 MATLAB 的绘图功能。他想在用 Python 做神经科学数据分析的时候能画出 MATLAB 风格的图表。2003 年，Matplotlib 0.1 发布了。科学家们发现，他们可以用 Python 完成从数据处理（Numeric/NumPy）到计算分析（SciPy）到可视化（Matplotlib）的完整工作流——而且全部免费。

Python 就这样被科学家"悄悄捡起来了"。不是因为它是最好的语言——就科学计算而言，MATLAB 在 2005 年仍然强大得多，Fortran 更快——而是因为 Python 是最舒服的"胶水"。你的 C 代码算矩阵，你的 Fortran 代码做傅里叶变换，你的 Python 代码把它们粘在一起，加上一点逻辑，画一张图，生成一篇论文的数据。这个过程不需要你成为一个熟练的 C 程序员——你只需要会写 Python。

这个"胶水语言"的定位，成了 Python 命运的第一次转折。

## Django 和 Web 世界的觉醒

当 Python 在实验室里被悄悄捡起来的时候，2003 年的 Web 世界正在上演另一场战争。

PHP 统治了个人网站。Java 统治了企业应用。Ruby on Rails 在 2004 年横空出世，用"约定优于配置"重新定义了 Web 开发的效率。Python 在 Web 世界里几乎不存在。有 Zope——一个重量级到令人窒息的应用服务器——但它在开发者社区中的名声不佳：太复杂了，太企业了，"Pythonic"的感觉在 Zope 里几乎找不到。

这一切被堪萨斯州劳伦斯市一家报社改变了。

《Lawrence Journal-World》——一家地方报纸。2003 年秋天，报社的 Web 团队在做一个项目：一个本地的在线新闻网站。团队成员有两个年轻人——Adrian Holovaty，一个刚从西北大学新闻系毕业的自学程序员；Simon Willison，一个从英国来的实习生。他们俩用 Python 写了一个内部的 Web 框架，解决了报社新闻网站的各种需求——内容管理、数据库操作、URL 路由、模板渲染。

Holovaty 和 Willison 发现自己反复在解决同样的问题：如何把 Python 对象映射到数据库表、如何把 URL 映射到代码函数、如何从模板生成 HTML。他们把这些解决方案打包成了一个框架——最初只是一个内部工具，没有名字，没有 logo，没有"改变 Web"的野心。

Jacob Kaplan-Moss 后来加入了这个团队。

框架的命名来自 Django Reinhardt——一位吉普赛爵士吉他手，Holovaty 的偶像。Django Reinhardt 在 18 岁时因为一场火灾烧伤了三根手指，但他用仅剩的两根完好的手指重新发明了吉他的演奏方式。这个名字暗示着：即使在一个不被看好的领域（Python Web 框架），你也能创造出美丽的东西。

2005 年 7 月，Django 在 BSD 许可证下开源了。

Django 带来的核心理念是"batteries-included"（电池包含在内）。ORM、管理界面、模板引擎、表单处理、认证系统——全部打包，拿来就用。你不用像在 PHP 里那样去网上找各种库拼接，也不用像在 Ruby on Rails 里那样纠结插件兼容性——Django 告诉你："我们已经替你选好了最好的方案，直接用吧。"

Python 的 Web 世界在一夜之间醒了。2005 年到 2008 年间，Django 的社区以爆炸式的速度增长。Web 开发者第一次有了一个令人信服的理由去学 Python——不是因为"Python 更好"，而是因为"Django 让你更快地做好一个网站"。虽然有 Zope、CherryPy、TurboGears 等其他 Python Web 框架，但 Django 的"一体化"体验在 2005 年的生态里是无与伦比的。

但对 Python 来说，最重要的不是它成了 Web 主流——它其实从来没在 Web 领域真正超越 PHP 和 Java——而是它终于有了一个"可见的应用场景"。Django 之前，学 Python 的理由是"这是一门很优雅的语言"——这在招聘市场上毫无说服力。Django 之后，学 Python 的理由变成了"你可以用 Django 工作"。

## Zen of Python

2004 年 8 月，一个叫 Tim Peters 的核心开发者做了一件看似不起眼但后来成为互联网文化符号的事。

Tim Peters 在 Python 邮件列表里写了 19 条箴言。他原本只是在参与一场关于 Python 设计哲学的讨论——有人问"Guido 的设计原则到底是什么？"——Tim 用 19 句话总结了 Python 的核心审美。这些句子后来以 PEP 20 的形式被收录到 Python 官方文档中，标题叫"The Zen of Python"。

2004 年，这些文字被写进了 Python 标准库——你打开 Python 终端，输入 `import this`，屏幕上就会浮现出这些文字：

```
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

"Beautiful is better than ugly"——第一句就定义了 Python 和其他语言的根本区别。它不追求最快（那是 C 的工作），不追求最严谨（那是 Java 的目标），不追求最简洁（那是 Perl 的勋章）。它追求的是：让代码读起来赏心悦目。

"There should be one——and preferably only one——obvious way to do it"——这句是 Guido 设计哲学最精确的表述。Perl 的哲学是"There's more than one way to do it"（有很多种方法做同一件事）。Guido 反其道而行之：一件事应该只有一种明显的方法来做。这消除了选择困难症，让团队合作中的代码风格统一变得自然——不需要 style guide，不需要 lint 规则，Python 本身就在引导你写出一致的代码。

"Although that way may not be obvious at first unless you're Dutch"——这句是 Tim Peters 开的玩笑，因为 Guido 是荷兰人。它微妙地提醒着读者：Python 的设计决策最终来自一个人的审美。这个人是 Guido van Rossum。

"Namespaces are one honking great idea"——最后一句以幽默收尾，但内容不幽默。Namespaces 是 Python 模块系统的基石——每个模块都有自己的命名空间，你不必担心变量名冲突。这在大型项目中是一个救命的设计。

《Zen of Python》不是 Guido 写的，但它成为了 Python 社区对自己审美的第一次集体表达。在 2004 年，这个社区已经足够大、足够成熟，可以停下来想一想"我们到底在做什么"。

## 最勇敢的断裂

2008 年 12 月 3 日。

Python 3.0 发布了。

这不是一次普通的版本更新。Python 3.0 不向后兼容——也就是说，为 Python 2 写的代码，几乎全部无法在 Python 3 上直接运行。

`print` 从语句变成了函数——不是 `print "hello"` 而是 `print("hello")`。整数除法变了——`5 / 2` 在 Python 2 里是 `2`（整除），在 Python 3 里是 `2.5`。字符串和 Unicode 终于统一了——Python 2 里混乱的 `str` 和 `unicode` 类型被合并成一个。`raw_input()` 被重命名为 `input()`。`map()` 和 `filter()` 返回迭代器而不是列表。异常语法变了。很多标准库模块被重新组织。

这些改变——每一项都是在修复一个 Guido 早在 1.0 时代就心神不宁的设计缺陷。但它们合在一起，意味着 Python 2 和 Python 3 是两门不同的语言。

社区的反应是爆炸性的。

"这不是 Python 了。"很多人说。

"我为什么要重写我所有的代码？"

"Guido 疯了。"

甚至 Python 核心团队内部也存在严重分歧——不是对"改不改"的分歧，而是对"怎么过渡"的分歧。Guido 做了一个被认为极度勇敢但也极度有争议的决定：不做平滑过渡。不提供完整的兼容层。不做"在 Python 3 里跑 Python 2 代码"的官方支持。他给了社区一个叫 `2to3` 的代码迁移工具——但你不是用它来运行旧代码，你是用它来把旧代码翻译成新代码。

他是对的——从技术角度看。1.0 时代的那些设计缺陷，如果不在 3.0 一次清除，它们会在 Python 4.0、5.0 里永远成为遗产。每一次向后兼容都是在加固一个错误。但他是错的——从社区角度看。大多数人不会在乎"技术债"，他们在乎的是"我的项目能不能跑"。一个不向后兼容的大版本升级，让 Python 2 和 Python 3 之间的"十年战争"持续了几乎十二年。2011 年、2012 年、2013 年——每年都有文章争论"该不该迁移"。一些大型项目（如 Twisted、NumPy）用了很多年才完成迁移。

但 Python 3 最终还是赢了。

为什么？因为 Guido 的长期主义最终被证明是正确的。Python 3 的代码在十年后看起来比 Python 2 的代码更干净。"print 是函数"这个看起来琐碎的改变——让参数传递、日志注入、调试 hook 都变得更容易。字符串统一——让处理多语言文本不再是一场噩梦。整数除法的改变——消灭了一整类隐蔽的 bug。

2019 年，Python 2 正式退役。2020 年 1 月 1 日，Python 2.7 停止维护。所有坚持留在 Python 2 的项目都被迫迁移了。而到了 2020 年——python 3 的生态已经完全成熟。深度学习框架 TensorFlow 和 PyTorch 都跑在 Python 3 上。Python 在 TIOBE 指数上登顶。它从一个"可读的脚本语言"变成了"地球上最流行的编程语言"。

当 Guido 在 2008 年按下 Python 3.0 的发布按钮时，他并不知道，在地球的另一端，一群研究生和教授正在悄悄用 Python 搭建第一批深度学习框架的雏形。Geoffrey Hinton 在多伦多大学、Yann LeCun 在纽约大学——他们还没有用 Python，但他们的学生开始尝试了。一个叫 Theano 的深度学习库在 2007 年已经发布了第一版。用 Python 写的。

Python 的故事还没有结束。上篇到这里，只是一个序曲。

---

## 人物

![](/images/guido-van-rossum-cwi-1980s.jpg)

*Guido van Rossum（1956–），Python 之父，荷兰人，生于海牙。阿姆斯特丹大学数学与计算机科学硕士。1980 年代在 CWI 参与 ABC 语言开发，1989 年圣诞节启动 Python 项目。曾任职于 CNRI、BeOpen、Zope、Google、Dropbox、Microsoft。Python 社区的 BDFL（2001–2018）。*

![](/images/lambert-meertens-abc.png)

*Lambert Meertens——ABC 语言的设计师之一，Guido 在 CWI 期间的导师和同事。阿姆斯特丹自由大学教授。ABC 的缩进语法、强类型、教学导向等设计理念通过 Guido 传承给了 Python。*

![](/images/jim-hugunin-mit-1990s.jpg)

*Jim Hugunin——MIT 研究生，1995 年创建了 Numeric，Python 的第一个数值计算扩展。这是 Python 踏入科学计算的第一步。后来参与 JPython（Jython）的开发。*

![](/images/adrian-holovaty-simon-willison-django.jpg)

*Adrian Holovaty 和 Simon Willison——Django 联合创始人。2003 年在堪萨斯州劳伦斯市《Lawrence Journal-World》报社用 Python 创建了 Django 框架，2005 年开源。Holovaty 后来创办了 EveryBlock（本地新闻聚合），Willison 创办了 Lanyrd（会议社交平台）。*

---

*下一篇预告：Python：AI 帝国的方言（下篇）。2008 年之后，Python 从 Web 语言变成了 AI 语言——TensorFlow、PyTorch、Hugging Face——一场更大的革命正在酝酿。*
