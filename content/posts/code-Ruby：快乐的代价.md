---
title: "Ruby：快乐的代价"
date: 2026-05-16
genre: vibe
column: 代码的故事
series: 网络的语言
order: 12
tags: [Ruby, Matz, Ruby on Rails, DHH, 编程语言, Web 开发, 开源]
description: "1993 年，一个日本程序员觉得写代码太痛苦了。他想让程序员幸福——于是他造了 Ruby。快乐很好，但快乐很贵。"
---

## Hello World

```ruby
puts "Hello, World!"
```

*这是 Ruby 的 Hello World。没有括号，没有分号，没有 `public static void main`，没有 `<?php` 标签。它就是一句话：`puts "Hello, World!"`。读它的时候你几乎不需要知道"编程"是什么——你猜也能猜出它在做什么。C 的 Hello World 在告诉机器"你该做什么"；Java 的 Hello World 在穿正装戴礼帽；PHP 的 Hello World 在 HTML 中开了一扇窗；Python 的 Hello World 干干净净地打印一句话；而 Ruby 的 Hello World——它就像在跟计算机聊天。*

![](/images/ruby-logo.svg)

*Ruby 的官方 logo——红色的立体宝石（ruby）在白色背景上熠熠生辉。Yukihiro Matsumoto（Matz）在 1993 年起这个名字时，一位同事的诞生石正是红宝石——而那一行代码都还没写。红色是激情与活力的颜色，正如 Matz 在设计 Ruby 时的核心信条："程序员应该快乐"。Ruby on Rails 在 2004 年引爆了 Web 开发的速度革命，"约定优于配置"的哲学至今仍在影响整个行业。*

1993 年 2 月 24 日，一个日本程序员坐在电脑前，在网上聊天室里和同事石塚圭树讨论一门新语言的名字。两个候选摆在他面前："Coral"和"Ruby"。他选了 Ruby。没有投票，没有委员会，没有论证。原因很简单——因为一位同事的诞生石是红宝石。此刻一行代码都还没有写。

但这个命名瞬间已经泄露了一切：这不是一门给机器的语言，是一门给人——而且是让人快乐的语言。

这个日本程序员叫 Yukihiro Matsumoto，但他几乎不用这个名字。所有人都叫他 Matz。

## 一个日本程序员的痛苦

要理解 Matz 为什么写 Ruby，你得先理解 1993 年一个写代码的人能有多痛苦。

Matz 1965 年出生于大阪，四岁后移居鸟取——一个以沙丘闻名的县，安静得不像一个能孕育编程语言的地方。他自學编程，高中时就靠几本书和一台 borrowed 的计算机学会了 BASIC 和汇编。后来他去了筑波大学，进入了中田育男教授的研究室——那是日本少有的编译器实验室。在这里 Matz 第一次接触了真正的语言设计。

毕业后的 Matz 成了一名自由职业程序员，日常工作是写 Perl 脚本和 C 程序。但这里出了问题。Perl——当时市面上最流行的脚本语言——让他觉得"闻起来像玩具语言"。Perl 4 的功能强大，但它的语法像一锅乱炖：符号变量前缀是 `$` 还是 `@` 还是 `%` 全看语境、正则表达式被直接塞进语法核心、你可以用十种不同的方式写同一个功能——而且每种都同样丑陋。"我知道 Perl，"他后来写道，"但我不喜欢它。它闻起来像玩具语言。它现在还是。"

那 Python 呢？当时 Python 已经有了——1991 年 Guido van Rossum 已经发布了 Python 0.9。Matz 看了看。他又失望了。"Python 的面向对象特性像是贴在语言上的补丁，"他说。1993 年的 Python 确实如此——它的类更像是一个后加的功能，而不是语言设计的核心。Matz 是一个做了十五年面向对象编程的狂热信徒——Smalltalk、Eiffel、CLU 他都学过——他想要的是一门"真正的面向对象的、易用的脚本语言"。

他在市场上找了一圈。找不到。

"所以我决定自己做。"

Matz 的动机在这一刻就已经决定了 Ruby 的根本气质。他不是大公司的研究员，不是学术界的语言理论家，不是想要发论文的博士生。他是一个日常写代码写到崩溃的程序员，愤怒地在深夜的屏幕上敲出了一行行 C 代码——为一个他自己渴望的、还不存在的语言写解释器。

Perl 给了他实用性。Smalltalk 给了他纯面向对象——在 Smalltalk 里，甚至整数也是一个对象，你可以在整数上调用方法。Lisp 给了他闭包、块结构和代码即数据。Eiffel 给了他前置和后置条件（虽然 Ruby 后来没有正式采用设计契约）。CLU 给了他迭代器。Ada 给了他那句经典的 `begin`...`end`。

这些影响凑在一起，在 Matz 的脑子里产生了化学反应。但反应的核心催化剂不是任何语言特性——而是一种情绪。

他厌倦了。

## "最小意外"是给谁的意外？

Matz 为 Ruby 定下的第一条设计原则后来被人称作"最小意外原则"（Principle of Least Astonishment）。但这个说法被误解了二十年。

很多人以为"最小意外原则"意思是：Ruby 的行为应该尽可能让你不感到意外。它应该像你想象的那样工作。你猜它怎么工作，它就真的怎么工作。这个理解听起来很美，但实际上毫无意义——因为"你想象的"取决于"你是谁"。一个 Perl 程序员和一个 Smalltalk 程序员对"不意外"的定义完全不同。

Matz 在 2005 年的一封邮件里澄清了这件事。他说：最小意外原则不是对你而言的最小意外——是对我而言的最小意外。"The principle of least surprise is not for you only. The principle of least surprise means principle of least *my* surprise."

这是一个极其诚实的回答。Matz 不假装自己能从所有程序员的角度思考。他承认：我设计这门语言是为了让**我**写代码的时候不觉得痛苦。如果其他人和我的品味相似，那很好——这门语言可能也适合你。如果不是，Ruby 不是为你设计的。

这句话解释了一切。为什么 Ruby 允许你写 `2.days.ago`（两天前）——一个读起来像英语句子的代码片断。为什么 Ruby 的 `puts` 不需要括号——因为 Matz 觉得打字的时候敲括号太烦了。为什么 Ruby 有三种不同的循环关键字 —— `while`、`until`、`for`——因为不同的情境需要不同的语气。为什么 Ruby 有 `method_missing`——一个当你调用了一个不存在的方法时会被拦截的万能钩子——因为这个机制让 DSL（领域特定语言）变得极其优雅。

每一项决策都源于 Matz 的个人品味。他不是在做语言设计——他是在雕琢一件让自己舒适的工具。

2008 年，Matz 在 Google 做了一场著名的演讲。在加州的讲台上，这个说话温和的日本程序员说出了 Ruby 最核心的使命：

"I hope to see Ruby help every programmer in the world to be productive, and to enjoy programming, and to be happy. That is the primary purpose of Ruby language."

他希望 Ruby 让每个程序员都快乐。一门语言的"首要目的"竟然是让程序员快乐——不是性能、不是安全、不是跨平台——就是快乐。这在 2008 年的编程世界里是一个近乎荒诞的宣言。因为那个世界是 C++ 的模板元编程、Java 的企业级设计模式、PHP 的草根实用主义构成的。没人关心你写代码的时候快不快乐。机器跑得快就行，你累不累不重要。

Matz 说他关心。

## 鸟取来的邮件

从想法到第一行 Ruby 代码，再到它能跑起来，Matz 花了将近两年。

1995 年 12 月 21 日，Ruby 0.95 在日本新闻组 `fj.comp.lang` 发布。同一天，ruby-list——第一个 Ruby 邮件列表——上线。0.95 意味着 Matz 觉得它还不是 1.0——但它够用了。这个版本已经有了类和继承、mixins、迭代器、闭包、异常处理和垃圾回收。今天 Ruby 的大部分核心特征在 0.95 里就已经存在了。

发布之后，Matz 又马不停蹄地在两天内连发三个版本。他没有停下来的意思，因为他知道——作为一个日本的个人项目制造者——你如果不勤奋，你的语言就会沉入互联网的噪声中，永远没人知道。

1997 年，Ruby 的命运迎来了一个关键的转折。一家叫 netlab.jp 的日本开源公司雇佣了 Matz，让他全职开发 Ruby。这在当年是一个罕见的决定——一家公司为一个程序员自己的开源语言付薪水，这件事即使在今天也不常见。netlab.jp 的支持意味着 Ruby 有了持续发展的基础：不是大公司资助、不是风投驱动——就是一家日本小公司的善意。

同年，第一篇 Ruby 的英文网页文章上线了。1998 年，Ruby Application Archive 上线，给 Ruby 的第三方库提供了一个家。1999 年，ruby-talk——英文 Ruby 邮件列表——开通了。这是一个标志性事件：Ruby 开始被日本以外的人注意到了。

Matz 本人也在这一年和石塚圭树合著了第一本 Ruby 日文书《Object-oriented Scripting Language Ruby》。日本的 Ruby 社区形成了。日本的程序员之间流传着一个说法：Matz 是好人，所以我们都是好人。这句话后来有了一个缩写——MINASWAN（"Matz is nice and so we are nice"）。它是 Ruby 社区最重要的文化遗产之一，甚至影响了 Rails 社区后来的文化调性。在一个程序员们习惯用"RTFM"打发菜鸟的时代，Ruby 社区从一开始就选择了一种"带你去吃饭"而不是"自己去搜"的态度。

## 镐书跨过太平洋

Ruby 在日本的成长是缓慢而温暖的。到 2000 年，它在日本甚至比 Python 更流行——至少有二十本 Ruby 书在日本出版。但在西方，知道 Ruby 的人仍然屈指可数。

改变这一切的是一把镐。

2000 年，Dave Thomas 和 Andy Hunt——两个来自美国的程序员兼作家——出版了《Programming Ruby》。这本书的封面是一把镐，所以它后来被 Ruby 社区直接叫做"镐书"（Pickaxe Book）。Dave Thomas 发现 Ruby 的过程本身就是一个好故事：他在网上闲逛时偶然看到了 Ruby 的英文网站，下载了解释器，玩了一下午，然后被震撼了。他立刻意识到这不是另一个脚本语言。他写信给 Matz，说自己想写一本英文 Ruby 书。Matz 回复了一个礼貌但谨慎的"好"。

O'Reilly 起初不愿意出版这本书——Ruby 在西方几乎没人知道，出版一本它的书风险太大。Dave Thomas 和 Andy Hunt 自己出资出版，通过他们创办的 Pragmatic Programmers 出版社发行。结果这本书的销量超出了所有人的预期。

镐书是 Ruby 跨过太平洋的唯一一艘船。2000 年它靠岸时，西方程序员打开这本 400 多页的书，看到了一个他们从未见过的世界：一门不需要括号就能调用函数的脚本语言、一门一切皆对象的语言（`-3.abs` 返回 3，因为负数也是一个对象）、一门把代码块（block）当作一等公民的语言——`5.times { print "Hey!" }`。对于习惯了 Perl 的混乱和 Java 的繁重的西方程序员来说，Ruby 像一阵来自异国的风。

镐书出版后，ruby-talk 的消息量开始爆炸。2002 年，英文 ruby-talk 的消息量正式超过了日文 ruby-list。Ruby 社区的圆心从日本移到了西方。

## 那个丹麦人

Ruby 让一小撮人感到幸福，但要让整个世界注意它，还需要一个杀手级应用。

David Heinemeier Hansson——简称 DHH——不是在实验室想出 Rails 的。他是在干活。

2003 年，DHH 在 37signals（后来的 Basecamp 公司）工作。他的老板 Jason Fried 让他用 PHP 搭建一个项目管理工具。DHH 试了试，觉得 PHP 太痛苦了。他去找 Ruby——因为 Ruby 让他写代码的时候心情好。然后他发现，Ruby 本身是好用的，但用 Ruby 做 Web 开发——没有一个合适的框架。当时用 Ruby 写 Web 应用的方式是：装一个叫 eruby 的库、手动管理数据库连接、自己写 URL 路由、自己处理表单验证——每件事都靠手工。

DHH 从 Basecamp 的实际开发中抽取出了一组通用的模式：Active Record（数据库对象映射）、Action Pack（控制器和视图）、一套完整的目录结构、一套自动化的数据库迁移机制。他写了一个完整的 Web 框架。

2004 年 7 月，他在自己的博客上发布了 Rails 0.5.0。标题是："The end of vaporware!"（雾件的终结！）。他的自嘲不只是一种幽默——当时所有人都觉得 Ruby 是一个没人用过的小众语言，它上面的 Web 框架一定是一个永远不会完工的个人项目。"Vaporware"——猎奇之物。

但 Rails 不是 vaporware。它从一开始就是一个能跑的真实产品。DHH 已经用它在 Basecamp 上跑了半年多。与当时其他 Web 框架最大的不同是，Rails 提出了一条革命性的哲学：**约定优于配置**（Convention over Configuration）。

你觉得数据库表应该叫什么名字？如果你不做特别声明，叫 `users`。你类名叫 `User`。框架会自动把类名和表名对应起来。你不需要写几十行 XML 配置文件来说明白话。你觉得控制器应该接收什么样的 URL？按照 RESTful 的约定来——`/users` 对应 `index`、`/users/1` 对应 `show`、`/users/new` 对应 `new`。你觉得时间戳字段应该叫什么？`created_at` 和 `updated_at`。框架自动帮你维护。

"约定优于配置"的本质不是技术创新——它降低的是认知负荷。你不需要在每一个项目开始的时候回答一百个配置问题。你只需要按照约定来命名、来组织目录结构，Rails 会猜到你想干什么。对于一个被 XML 配置文件和 Java 的仪式感折磨了一十年的业界来说，Rails 像一台不需要读说明书就能开的车。

2005 年是 Rails 大爆炸的一年。DHH 在 OSCON（O'Reilly 开放源代码大会）上被 Google 和 O'Reilly 联合授予了"年度黑客"奖。同年 12 月，Rails 1.0 正式发布。2006 年 8 月，Apple 宣布 Mac OS X Leopard 将内置 Ruby on Rails——一个丹麦人写的框架被塞进了世界上最大的消费级操作系统。

Rails 改变了 Ruby 的一切。一夜之间，Ruby 不再是"日本的一个小众语言"——它变成了硅谷最炙手可热的词汇。Rails 创业公司像蘑菇一样冒出来，无数 VC 在商业计划书里写"Powered by Rails"。


![](/images/rails-conf-2006-crowd.jpg)

*2006 年首届 RailsConf 现场。一个三年前还几乎无人知晓的日本脚本语言，如今撑起了硅谷最热闹的开源社区之一。*

## 快乐的文化

Rails 带来的不只是技术革命——它带来了一种文化。

Python 有一个亲切的"仁慈的终身独裁者"（BDFL）。Perl 有"不止一种方式做一件事"（TMTOWTDI）。Ruby 的文化是什么呢？Ruby 文化的底色是很难用一句话说明白的——它更像一种情绪。这种情绪的最佳代言人，是一个至今身份未明的人。

他叫 `_why_the_lucky_stiff`——语法很不 Ruby 的一个名字。没有人知道他的真名实姓（虽然 2012 年他的身份被推测为一个叫 Jonathan Gillette 的美国程序員），人们只知道他的网名：_why。他不只是一个程序员。他是漫画家、音乐家、小说家、Ruby 老师——Ruby 社区里最神秘也最受人爱戴的人物。

2005 年，_why 出版了一本书，叫《Why's (Poignant) Guide to Ruby》。这本书不是普通的编程教材——它的每一章都穿插着漫画、狐狸独白、意识流故事和无厘头比喻。它在教 Ruby，但更像是用一种超现实的方式告诉你"写代码可以很有趣"。《Poignant Guide》的章名是这样的："关于老虎的余量"、"小叉的困境"、"他们吸食了他们的大脑薄片"——你完全搞不懂每一章要讲什么，但读完之后你学会了 Ruby。大量因为看了这本书而开始学 Ruby 的程序员后来说："我以为自己在看小说，回过神来的时候已经会写 Ruby 了。"

_why 还写了 Shoes——一个让人用 Ruby 写桌面程序的 GUI 工具包。Shoes 的理念是："让做一个桌面应用像穿鞋一样简单。"它也确实很简单——你写 `Shoes.app { button "Click me" }`，就出现了一个带按钮的窗口。不需要理解窗口事件模型、不需要处理图形上下文、不需要阅读一篇 50 页的 C++ 教程。_why 写的 Camping 是一个只有 4KB 的 Ruby Web 微框架——微到整个框架可以在 Twitter 上发完。他写的 Hpricot 是当时最好的 HTML 解析器。他写的 Hackety Hack 是一个教孩子编程的环境。

2009 年 8 月 19 日，_why 的 Twitter 和 GitHub 账号同时消失了。他说了最后一段话：

"编程是一件费力不讨好的事。你看自己的作品一年后被更好的取代、几年后干脆跑不起来了。留下的只有一撮灰尘。"

然后他把自己从互联网上抹掉了。没有人知道他去了哪里。有人说他精神崩溃了，有人说他只是厌倦了，有人说他不喜欢被认出身份的生活。2013 年，他的网站短暂复活，发布了一个叫 CLOSURE 的加密作品集，又消失了。

_why 的存在本身证明了 Ruby 社区和其他语言社区的不同。在 C++ 的世界里你找不到一个用漫画教模板特化的神秘人。在 Java 的世界里你找不到一个为了给桌面应用"穿鞋"而写 GUI 工具包的鬼才。_why 是 Ruby 快乐精神的化身——他不是为了让代码更快、更安全、更易维护，他就是觉得写代码好玩。而 Ruby 给了他"好玩"的空间。

Matz 的温柔、_why 的文艺、DHH 的果断——这三个人撑起了 Ruby 世界的精神三角。在他们身后，RailsConf 上的乐队演出、RSpec 用自然语言写测试的哲学、整个社区"对菜鸟友好"的氛围——Ruby 的"快乐文化"已经渗透进了每一个角落。

## 快乐贵了

但快乐是有代价的。

Ruby 的核心实现——MRI（Matz's Ruby Interpreter）——是一个解释型的、有全局解释器锁（GIL）的运行时。GIL 意味着无论你的机器有多少核 CPU，Ruby 的线程在同一时刻只能跑一个。这不是 Ruby 的错——GIL 简化了 C 扩展的内存管理，让 Ruby 能安全地调用大量 C 库——但它是一个真实存在的天花板。在 2000 年代初期，Ruby 比 Python 慢 2 倍、比 PHP 慢 3 倍、比 Java 慢 10 倍以上。

在 Rails 流行之前，性能不是个大问题。Ruby 的个人项目和脚本跑得慢一点没人介意。但 Rails 让 Ruby 开始处理真实的商业流量——而真实流量是不等人的。

2007 年，Twitter 开始遭遇 Rails 的性能瓶颈。当年 Twitter 的后端（前端界面、消息队列、API）全部是 Rails 写的。随着用户从百万到千万的暴增，Rails 的响应时间越来越长，服务频繁宕机。2008 年，Twitter 宣布将核心消息队列系统从 Ruby 迁移到 Scala——一个运行在 JVM 上的函数式语言。2011 年，Twitter 彻底放弃了 Rails 前端。今天的 Twitter 绝大部分已经不是 Ruby 了。

Twitter 的 Rails 失败是一个反复被提起的故事。DHH 对此有一个愤怒的回应：

"Twitter 的问题是他们的架构问题，不是 Rails 的问题。他们从未回馈过社区。"

DHH 说得没错——Twitter 在享受了 Rails 带来的快速原型优势之后，用 Scala 解决了大规模问题，却没有回报 Rails 社区。但 DHH 没有完全说对的是：Rails 的架构就是从单体 Web 应用出发的，Twitter 的规模——数亿用户的实时消息——超出了任何单体 Web 框架的能力。Rails 没有错，但它也不是解决一切问题的答案。

性能不是 Ruby 唯一的软肋。部署也是。

PHP 的部署模式简单到令人嫉妒：你把 `.php` 文件扔到服务器的 web 目录下，它就跑了。不需要重启、不需要编译、不需要特别的进程管理。Ruby 的部署完全是另一个故事：你需要装一个应用服务器（Mongrel 或 Passenger）、配置反向代理（Nginx 或 Apache）、管理环境切换（development/test/production）、用 Capistrano 写自动化部署脚本、用 RVM 管理 Ruby 版本——这个工具箱的复杂度让非运维背景的开发者精疲力竭。Rails 社区有一个著名的自嘲笑话：你花了一个小时写了一个博客应用，然后花了一个星期把它部署上线。

但最大的挫折——那个让整个社区感到心痛的"如果"——是 Apple。

## 与 Apple 擦肩而过

2006 年 Apple 宣布将 Ruby on Rails 内置到 Mac OS X Leopard 中时，Ruby 社区兴奋到了极点。这意味着 Apple 押注了 Ruby——一个脚本语言，进入了世界上最优雅的操作系统。

但更好的是：Apple 允许你用 Ruby 写 Mac 桌面应用。

2007 年，Apple 的一名工程师 Laurent Sansonetti 开始在内部开发 MacRuby——把 Ruby 语言嫁接到 Objective-C 运行时上。这意味着 Ruby 程序员可以直接调用 Cocoa 框架的所有 API——创建窗口、绘图、响应鼠标事件——全部用 Ruby 写。2008 年 RubyConf 上，Sansonetti 在现场演示了如何用 Ruby 写一个完整的 Mac 应用——台下欢呼声一片。

想象一下这个可能性：iPhone 2007 年刚刚发布，Apple 还在寻找为 iOS 开发应用的方式。当时开发者只能用 Objective-C——一门除了 Apple 平台之外几乎没人用的语言。如果 MacRuby 发展成熟，Apple 可以把 Ruby 作为 iOS 的可选开发语言。以 Ruby 的易学性和 Rails 带来的开发者热情，iOS 开发史会不会完全不同？

不会。因为 Apple 不是这样的公司。

Steve Jobs 时代的 Apple 从不把关键平台押注在外部语言上。Apple 喜欢控制——从芯片到操作系统到编程语言。2011 年，Sansonetti 离开了 Apple。MacRuby 的开发实质上停止了。MacRuby 项目后来以商业产品 RubyMotion 的方式复活——支持用 Ruby 写 iOS 和 Android 应用——但它从未进入 Apple 的官方轨道。2014 年，Apple 发布了 Swift——一门自己的语言——作为 iOS 和 Mac 应用开发的首选语言。Ruby 的 iOS 梦彻底结束了。

MacRuby 的夭折是 Ruby 历史上最心痛的岔路之一。一个 Ruby 能统治移动开发的世界线，在 2011 年那个时间点被永久关闭了。Ruby 错过了移动时代。

## 成年礼

但 Ruby 没有死。它还活着。

2007 年，一位叫 Koichi Sasada 的日本开发者完成了 YARV（Yet Another Ruby VM）——一个真正的 Ruby 虚拟机。YARV 让 Ruby 的代码在内部编译成字节码再执行，比原始的 MRI 解释器快了将近一个数量级。2009 年 Ruby 1.9 带着 YARV 发布时——1.8 到 1.9 是一次痛苦的升级，大部分 gem 需要重写——但社区挺过去了。

2013 年 2 月 24 日——Ruby 被命名的 20 年纪念日——Ruby 2.0 发布。完全向后兼容（这次社区学乖了）。2015 年，Matz 在 RubyConf 上宣布了"Ruby 3x3"计划：Ruby 3.0 要比 Ruby 2.0 快三倍。很多人觉得这是空头支票。

2020 年 12 月 25 日——圣诞节——Ruby 3.0 发布了。它带来了 MJIT（一个即时编译器）、Ractor（一种基于 actor 模型的并发机制，解除了 GIL 的限制）、Type Profiler（一种类型分析器）。它没有完全实现 3 倍的目标——但接近了，而且在 JIT 开启的某些基准测试中确实达到了。2021 年，Shopify 贡献了 YJIT——一个用 Rust 写的即时编译器——让 Ruby 在某些场景下快了 2 到 3 倍。

Rails 也在迭代。2008 年 Merb（另一个 Ruby Web 框架）合并进了 Rails 3.0，带来了模块化设计。2013 年的 Rails 4.0 引入了 Turbolinks 和流式输出。2016 年的 Rails 5.0 带来了 Action Cable——WebSocket 支持——和 API 模式。2019 年的 Rails 6.0 默认了 Webpack。2021 年的 Rails 7.0 又放弃了 Webpack，转向了 Hotwire——用 HTML-over-the-wire 替代复杂的 JavaScript 前端框架。DHH 说："一个人框架"——Rails 要让你一个人就能做完所有事，不需要前端工程团队、不需要 DevOps 专家、不需要首席架构师。

而 DHH 本人，除了写 Rails 和小型赛车之外，还在继续写书。他还是 37signals——改回了名字——的 CTO。他依然强势，依然活跃，依然在维护那个让 Ruby 火遍全世界的框架。

Matz 呢？他在 2011 年被自由软件基金会授予了"自由软件进步奖"。他后来在 Heroku 工作了一段时间，现在是 Rakuten 技术研究院的研究员——仍然参与 Ruby 的开发。


<div style="display: flex; gap: 16px; justify-content: center;">
  <div style="flex: 1; max-width: 50%;">
    <img src="/images/yukihiro-matsumoto-matz.jpg" alt="Matz" style="width: 100%; border-radius: 8px;" />
  </div>
  <div style="flex: 1; max-width: 50%;">
    <img src="/images/david-heinemeier-hansson.jpg" alt="DHH" style="width: 100%; border-radius: 8px;" />
  </div>
</div>

*左：Matz，Ruby 的创造者。右：DHH，Rails 的创造者。一个造了语言，一个用框架把它送进了世界。两个人的性格截然不同，但他们的作品共享同一个信念：写代码应该很快乐。*

## Ruby 留下的东西

2020 年之后的 Ruby 不再是一个广场——它变成了一个温暖的角落。它没有统治世界，但它改变了一代程序员看待自己工作的方式。

Ruby 留下的最大遗产不是什么技术特性——它留下的是一种观念：**写代码可以是为了快乐**。在 Ruby 之前，编程语言的设计目标一直是"让机器跑得更快"或者"让代码更容易维护"。从来没有人说"让写代码的人开心"。Ruby 第一次确认了程序员的情感需求是正当的。Matz 在 2008 年 Google 演讲里的那句"to be happy"——被无数人引用、被做成海报、被写在博客签名里——成了这个观念最简洁的表达。

Ruby 的第二大遗产是创造了一个"快乐的文化"。_why 的 Poignant Guide、Shoes 的"穿鞋一样简单"、MINASWAN 的"我们都要做好人"——这些东西在教授技术的同时，也在教授一种态度：技术应该是好玩儿的，社区应该是对新手友好的。

第三大遗产是 Rails。Rails 的哲学——约定优于配置、不要重复自己——已经渗透进了每一个现代 Web 框架的 DNA。Django 的"可插拔应用"有 Rails 的影子。Laravel 被称为"PHP 里的 Rails"。Phoenix 被称为"Elixir 里的 Rails"。Sails.js 被称为"Node.js 里的 Rails"。甚至连 Java 的 Grails 和 Spring Boot，都在某种程度上采纳了"约定优于配置"的原则。当今天一个开发者创建新项目时，框架自动生成目录结构、自动约定数据库命名——这是 Rails 留下的习惯。

Rails 还留下了一个更激进的遗产：**一人框架**。在云计算、微服务、Kubernetes 把软件开发复杂得令人窒息的 2020 年代，Rails 8.0 仍然坚持"你一个人可以搞定一个完整的现代化应用，不需要 DevOps 团队"。这是对"快乐"的再一次确认——开发者的生产力应该被赋予自由，而不是被架构绑架。

Ruby 的直接后代们也在继续它的理念：Elixir 学了 Ruby 的语法和哲学，但用 Erlang VM 解决了 Ruby 最头疼的并发问题。Crystal 提供了静态类型的 Ruby 语法，性能接近 C。CoffeeScript 一度是 Rails 的默认 JavaScript 编译器。

但 Ruby 自己呢？它还在。GitHub 是 Rails 写的最大的站点之一——每月几十亿次请求，在 Rails 上跑着。Shopify ——市值曾经超过 500 亿美元的公司——整个后端依然是 Rails。Airbnb 早期几乎全部是 Rails。GitLab、Discourse 也都是。

## 程序员幸福值得吗？

现在回头看这个核心问题：Ruby 的回答是——值得，但不是全部。

Ruby 证明了程序员幸福是一个有效的语言设计目标。一门语言可以让开发者感到愉悦——可以因为语法优美而让人忍不住多写几行代码——而不会因为性能太差而崩盘。Rails 证明了用 Ruby 可以做出世界级的产品。

但 Ruby 也证明了快乐的局限性。Ruby 的性能天花板、GIL 的限制、部署的复杂度——这些"快乐"的代价是真实存在的。Twitter 离开了 Rails。Apple 放弃了 MacRuby。云计算时代没有人用 Ruby 写基础设施。在追求极致规模的领域，性能——那个 Matz 从未优先考虑的指标——最终决定了语言的适用范围。

但或许这就是 Ruby 给这个世界上的最后一个礼物：它证明了没有一门语言能解决所有问题。Fast、Correct、Happy——你最多只能选两个。Ruby 选择了 Happy，然后吸引了所有和 Matz 有相同品味的人。这些人用 Ruby 写出了改变互联网的产品——而在这个过程中，他们写代码的时候是快乐的。

这正是 Ruby 在一开始被设计出来的原因。

回到那行代码：

```ruby
puts "Hello, World!"
```

没有括号、没有分号、没有 `public static void main`。它就是一句话。Ruby 从头到尾都在说：写代码可以很简单，可以很快乐。

快乐很好。即使快乐很贵。

---

## 人物

![](/images/yukihiro-matsumoto-matz.jpg)

**Yukihiro "Matz" Matsumoto（松本行弘）**—— Ruby 语言的设计者。1965 年生于大阪，筑波大学信息科学毕业。核心哲学"让程序员幸福"改变了整个行业对"好的编程语言"的定义。2011 年获得自由软件基金会进步奖。摩门教徒，育有四个子女。

![](/images/david-heinemeier-hansson.jpg)

**David Heinemeier "DHH" Hansson**—— Ruby on Rails 的创造者。1979 年生于哥本哈根。2004 年从 Basecamp 中提取出 Rails，改变了 Web 开发的范式。"约定优于配置"、"不要重复自己"——这些口号已经成了行业标准。除编程外，DHH 还是职业赛车手，多次参加勒芒 24 小时耐力赛并登上领奖台。

![](/images/why-the-lucky-stiff.jpg)

**_why the lucky stiff (Jonathan Gillette)**—— Ruby 社区最神秘的人物。《Why's (Poignant) Guide to Ruby》的作者，用漫画、故事和狐狸教了一代人写 Ruby。创建了 Shoes GUI 工具包、Hpricot HTML 解析器、Camping 微框架。2009 年 8 月从互联网消失，留下一句"编程是一件费力不讨好的事"。Ruby 社区的文艺灵魂。

![](/images/dave-thomas-programmer.jpg)

**Dave Thomas（"Pragmatic Dave"）**——《Programming Ruby》（"镐书"）的作者。2000 年出版了第一本英文 Ruby 书，将 Ruby 从日本带到了世界。Pragmatic Programmers 出版社联合创始人。

![](/images/keiju-ishitsuka.png)

**Keiju Ishitsuka（石塚圭树）**—— Matz 的同事，参与了 Ruby 的命名和早期设计。1993 年 2 月 24 日与 Matz 在聊天室一同决定了 Ruby 这个名字。合著了第一本 Ruby 日文书《Object-oriented Scripting Language Ruby》。

![](/images/laurent-sansonetti.jpg)

**Laurent Sansonetti**—— Apple 工程师，MacRuby 的主要开发者。2007 年开始把 Ruby 移植到 Objective-C 运行时，让 Ruby 程序员可以用 Cocoa 写 Mac 应用。2011 年离开 Apple 创立了 RubyMotion——一个用 Ruby 写原生 iOS 和 Android 应用的商业产品。

---

*Ruby 没有赢——但它的快乐感染了所有人。2020 年之后，它的黄金时代已经过去了。但它证明了一件事：写代码可以是为了快乐，而不仅仅是效率。这个观念——从 Matz 出发，经 Rails 放大，被 _why 变成艺术——已经渗透进了每一个现代语言的 DNA。*

*下一篇预告：Go——大道至简。Google 的三个工程师受够了 C++ 的编译速度和依赖管理——他们决定造一门没有继承、没有异常、没有泛型的语言。*
