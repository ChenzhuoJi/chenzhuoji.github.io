# 研究大纲：Ruby：快乐的代价

## 叙事弧线

### 开头切入点
1993 年 2 月 24 日，日本程序员松本行弘（Yukihiro Matsumoto）在网上聊天室里和同事石塚圭树讨论一门新语言的名字。两个候选："Coral" 和 "Ruby"。他选了 Ruby——因为一位同事的诞生石是红宝石。此时一行代码都没写。但这个命名瞬间已经泄露了一切：这不是一门给机器的语言，是一门给人——而且是让**人快乐**的语言。

### 主体故事线
Matz 写 Ruby 不是因为技术空缺，是因为**情感空缺**。Perl 像玩具语言，Python 不够面向对象，他想要一门"比 Perl 更强大、比 Python 更面向对象"的脚本语言——更重要的是，他想要写代码的时候感到爽。1995 年 Ruby 0.95 在日本新闻组发布，无人知晓。但 Matz 种下的设计哲学种子——"最小意外原则"、"优化程序员幸福"、"提供锋利的刀"——注定会在十年后引爆一场 Web 开发革命。

2004 年，一个丹麦程序员 David Heinemeier Hansson 从 Basecamp 里抽出了一个叫 Ruby on Rails 的框架。"约定优于配置"让 Web 开发快得离谱。Rails 的崛起把 Ruby 从日本推向了世界——2005 年 Ruby 成了硅谷最热门的词汇，_why the lucky stiff 用漫画和小狐狸教人写 Ruby，一切看起来都那么快乐。

但快乐是有代价的。Ruby 的解释器慢、全局解释器锁（GIL）让多核成了摆设、部署比 Java 更麻烦、Twitter 在 2008 年因为 Rails 撑不住而转投 Scala。Apple 的 MacRuby 项目流产。Ruby 证明了"程序员幸福"是值得追求的，但也证明了它不能解决所有问题。

### 结尾（暗线升华）
2020 年 Ruby 3.0 发布，承诺"3 倍快"。但 Ruby 的黄金时代已经过去了。它没有成为世界主宰，但它改变了一代程序员看待自己工作的方式——原来写代码可以不是为了机器跑得快，而是为了**人写得开心**。这个观念从 Ruby 出发，渗透进了 Python（Django）、PHP（Laravel）、Node.js（Express）、乃至整个现代 Web 框架的设计哲学。Ruby 没有赢，但它的快乐感染了所有人。

**下一篇预告钩子**：当 Ruby 在追求程序员幸福时，Google 的三个工程师正在为编译速度、并发模型和依赖管理发疯——他们决定自己造一门语言。那是 Go 的故事。

---

## 关键人物

- **Yukihiro "Matz" Matsumoto**（1965–）—— Ruby 语言的设计者和首席实现者。生于大阪，长于鸟取，筑波大学信息科学毕业。自學编程，受 Perl、Smalltalk、Eiffel、Lisp 影响。核心信条：编程语言的首要目标是让程序员幸福。2011 年获自由软件基金会进步奖。摩门教徒。曾任职于 netlab.jp、Heroku、Rakuten。
- **David Heinemeier "DHH" Hansson**（1979–）—— Ruby on Rails 的创造者。丹麦程序员，37signals 合伙人。2004 年从 Basecamp 中抽取出 Rails，提出"约定优于配置"、"不要重复自己"。2005 年获 Google/O'Reilly "年度黑客"。赛车手，多次参加勒芒 24 小时耐力赛。Rails 九条教义的作者。
- **_why the lucky stiff (Jonathan Gillette)**—— Ruby 社区最神秘的人物。写了《Why's (Poignant) Guide to Ruby》，用漫画、故事和小狐狸教 Ruby。创建了 Shoes GUI 工具包、Hpricot HTML 解析器、Camping 微框架。2009 年 8 月突然从互联网消失，留下"编程是一件费力不讨好的事"。Ruby 社区的文艺灵魂。
- **Dave Thomas**（"Pragmatic Dave"）—— 《Programming Ruby》（"Pickaxe 书"）的作者，2000 年第一本英文 Ruby 书，将 Ruby 介绍给英语世界。Pragmatic Programmers 出版社创始人。
- **Keiju Ishitsuka**（石塚圭树）—— Matz 的同事，参与了 Ruby 的命名和早期设计，合著了第一本 Ruby 日文书。
- **Laurent Sansonetti**—— Apple 工程师，MacRuby 的主要开发者。2007 年开始把 Ruby 移植到 Objective-C 运行时。2011 年离开 Apple 创立 RubyMotion。

---

## 时间线

| 年份 | 事件 |
|------|------|
| 1965 | Matz 在日本大阪出生 |
| 1993.02.24 | Matz 与石塚圭树在线聊天中确定语言名称为 "Ruby" |
| 1995.12.21 | Ruby 0.95 在日本新闻组发布，同时上线 ruby-list 邮件列表 |
| 1997 | netlab.jp 雇佣 Matz 全职开发 Ruby；第一篇 Ruby Web 文章发布 |
| 1998 | Ruby Application Archive 上线，Ruby 英文首页诞生 |
| 1999 | ruby-talk（英文列表）开始；第一本 Ruby 日文书出版 |
| 2000.09 | 《Programming Ruby》（"Pickaxe"）出版，Ruby 正式进入英语世界 |
| 2002 | ruby-talk 消息量超过 ruby-list，英语社区超过日本社区 |
| 2003.08 | Ruby 1.8 发布，长期稳定版本 |
| 2004.07 | DHH 发布 Rails 0.5.0（最初叫 "Ruby on Rails"） |
| 2005.12 | Rails 1.0 发布 |
| 2005 | _why 发布 Why's (Poignant) Guide to Ruby；DHH 获 OSCON "年度黑客" |
| 2006.08 | Apple 宣布 Mac OS X Leopard 将内置 Ruby on Rails |
| 2007.01 | Rails 1.2 发布；Merb 框架诞生 |
| 2007 | Twitter 开始遭遇 Rails 性能瓶颈；MacRuby 项目启动 |
| 2008 | Twitter 部分迁移到 Scala；Merb 和 Rails 宣布合并 |
| 2009.08 | _why the lucky stiff 从互联网消失 |
| 2009.12 | Ruby 1.9.1 发布（YARV 虚拟机，性能大幅提升） |
| 2010.08 | Rails 3.0 发布（合并 Merb） |
| 2011.10 | Ruby 1.9.3 发布（许可证改为 BSD） |
| 2011 | Matz 获 FSF 自由软件进步奖；MacRuby 开发停止 |
| 2012.03 | Rails 3.2 发布（支持 Ruby 2.0） |
| 2012 | DHH 开始参加勒芒 24 小时耐力赛 |
| 2013.02 | Ruby 2.0 发布（完全向后兼容） |
| 2013.06 | Rails 4.0 发布 |
| 2014.12 | Rails 4.2 发布 |
| 2016.06 | Rails 5.0 发布（Action Cable） |
| 2019.08 | Rails 6.0 发布 |
| 2020.12.25 | Ruby 3.0 发布（"Ruby 3x3"——比 2.0 快三倍，Ractor 并发） |
| 2021.12 | Rails 7.0 发布（Hotwire，放弃 Node.js 依赖） |
| 2023.12 | Ruby 3.3 发布（YJIT 编译器的 Rust 重写） |
| 2024.11 | Rails 8.0 发布 |
| 2024.12 | Ruby 3.4 发布 |

---

## 篇章规划

### 第一章：1993，一个日本程序员的痛苦

- **叙事目标**：把读者带入 1993 年的日本——一个 28 岁的程序员在日常工作中被 Perl、Python 和其他语言的缺陷反复折磨。Matz 不是大公司的研究员，他是一个业余时间写编译器的工程师。核心冲突不是技术，是**情感**——写代码太痛苦了。他想让写代码幸福。
- **核心素材**：
  - 1993 年 Matz 的日常工作环境（自由职业/小公司）
  - Matz 对 Perl 的抱怨："闻起来像玩具语言"
  - Matz 对 Python 的不满："面向对象特性像是贴在语言上的补丁"
  - 命名故事：1993 年 2 月 24 日 IRC 聊天 + "Coral" vs "Ruby"
  - 影响源：Perl（实用）、Smalltalk（纯面向对象）、Lisp（块/闭包）、Eiffel（前条件后条件）、CLU（迭代器）
  - Matz 的个人背景：自學编程、筑波大学编译器实验室、摩门教信仰
  - 1995 年 12 月 21 日：Ruby 0.95 在 fj.comp.lang 新闻组发布
  - 标题灵感："I knew Perl, but I didn't like it… I wanted a genuine object-oriented, easy-to-use scripting language."
- **配图关键词**：
  - "Yukihiro Matsumoto 1995" (年轻照片)
  - "Ruby 0.95 announcement screenshot" (新闻组发布截图)
  - "Perl 4 cover" / "Python 1.0 screenshot" (Matz 不喜欢的语言)
  - "Ruby logo original" (最初的红宝石 logo)

### 第二章：最小意外原则

- **叙事目标**：解释 Matz 的核心设计哲学——"最小意外原则"（POLA）到底是什么、不是什么。关键设计决策：一切皆对象、块的优雅、灵活的语法、"提供锋利的刀"。与 Python 的设计哲学形成鲜明对比。哲学分歧：Python 说"一种最好只有一种方式来做"，Ruby 说"多种方式，选让你开心的那种"。
- **核心素材**：
  - Matz 在 Google Tech Talk 的名言："I hope to see Ruby help every programmer in the world to be productive, and to enjoy programming, and to be happy. That is the primary purpose of Ruby language."
  - Matz 在《Coders at Work》式访谈中澄清 POLA："Least surprise principle is for *my* surprise."
  - 关键设计：一切皆对象（连整数都是）、块（block）语法、method_missing 元编程、开放类（open class）
  - vs Python 的对比：`exit` vs `exit()` 的故事、`2.days.ago` 的魔法
  - Ruby 语法之美：`puts "Hello, World!"` —— 没有括号、没有分号、干净到令人愉悦
  - "Provide sharp knives"——Matz 信任程序员
  - Hello World 视觉：`puts "Hello, World!"`——比 Python 更简洁（没有 print() 的括号）、比 Perl 更清晰（没有 sigil）、比 C 更人性化
- **配图关键词**：
  - "Matz Google Tech Talk 2008" (演讲截图)
  - "Ruby vs Python exit comparison" (irb 交互界面)
  - "Ruby block syntax diagram" (代码块示例)
  - "Matz portrait 2000s"

### 第三章：鸟取来的邮件

- **叙事目标**：Ruby 在日本的本土生长阶段（1995–2000）。从 0.95 到 1.8，小而美的日本社区。netlab.jp 雇佣 Matz 全职开发。1999 年第一本 Ruby 日文书。Matz 是日本最早的开源布道者之一。Ruby 在日本比 Python 更流行——但在西方几乎无人知晓。
- **核心素材**：
  - netlab.jp 的故事：一家日本开源公司愿意为语言开发付薪水
  - 1997 年第一篇 Ruby 网页文章
  - Ruby Application Archive（1998）
  - 1999 年 ruby-list vs ruby-talk 社区对比
  - Ruby 1.8（2003）的长期稳定性——七年主流版本
  - 日本 Ruby 文化的特征：细致、文档化、社区温馨
  - "Matz is nice and so we are nice"（MINASWAN）的起源
- **配图关键词**：
  - "netlab.jp office 1990s" (办公室)
  - "Ruby 1.0 screenshot" (早期版本截图)
  - "Ruby book Japanese 1999" (第一本日文 Ruby 书封面)
  - "Matz at RubyKaigi 2000s" (早期 RubyKaigi 照片)

### 第四章：镐书跨过太平洋

- **叙事目标**：Ruby 如何从日本走向世界。2000 年 Dave Thomas 和 Andy Hunt 出版的《Programming Ruby》（俗称"镐书"——封面是镐）是第一本英文 Ruby 书，也是大多数西方程序员第一次听说 Ruby。之后 Ruby 在英语世界的指数级增长。镐书的写作过程：Dave Thomas 发现 Ruby、被 Matz 的设计打动、决定写书。2000 年英文 Ruby 社区开始形成。
- **核心素材**：
  - Dave Thomas 是怎么发现 Ruby 的
  - Pickaxe 书的封面故事和影响——为什么封面是一把镐？
  - 2002 年 ruby-talk 超过 ruby-list：英语社区超过日本
  - 2005 年前 Ruby 在西方的小众但热情的社群
  - 关键人物：Dave Thomas、why the lucky stiff（此时还没消失）
  - 第一本 Ruby 英文书的出版故事（O'Reilly 起初不愿出版）
- **配图关键词**：
  - "Programming Ruby pickaxe book cover" (镐书封面)
  - "Dave Thomas portrait" (Dave Thomas 照片)
  - "ruby-talk mailing list 2000" (邮件列表截图)
  - "O'Reilly Ruby books 2000s" (系列 Ruby 书)

### 第五章：Rails 改变一切

- **叙事目标**：David Heinemeier Hansson 在 37signals 开发 Basecamp，用 Ruby 写了一个 Web 框架——不是为了开源，是为了自己更快地做项目。2004 年他把框架抽出来开源发布，命名为 Ruby on Rails。2005 年 Rails 引爆了 Web 开发界。"约定优于配置"、"不要重复自己"——Rails 的哲学让 Web 开发从几周变成几天。Rails 成了 Ruby 的杀手应用。
- **核心素材**：
  - DHH 背景：丹麦程序员、PHP 出身、被 37signals 的 Jason Fried 招来写 Basecamp
  - 2004 年 7 月 Rails 0.5.0 发布——标题是 "The end of vaporware!"
  - Rails 的核心创新：Active Record、MVC 开箱即用、Scaffold、Migration
  - "Convention over Configuration"——为什么这个哲学如此有力
  - 2005 年 OSCON：DHH 获 "Hacker of the Year"、Rails 1.0 发布
  - 2005–2007 Rails 的爆炸：无数 Rails 创业公司（"Rails 泡沫"）
  - 2006 年 Apple 宣布 Leopard 内置 Rails——"一个丹麦人写的东西进了操作系统"
  - Merb 的诞生（2007）和与 Rails 的合并（2008）
  - Rails 的影响：Django、Laravel、Phoenix、Play……每个语言都学 Rails
- **配图关键词**：
  - "DHH portrait 2005" (年轻 DHH)
  - "Basecamp screenshot 2004" (早期 Basecamp 界面)
  - "Ruby on Rails logo" (Rails 标志)
  - "Rails 1.0 announcement" (发布公告截图)
  - "Jason Fried and DHH 37signals" (37signals 团队)
  - "RailsConf 2006" (首届 RailsConf 照片)

### 第六章：快乐的文化

- **叙事目标**：Rails 带来的不仅是技术革命，更是一种独特的程序员文化。Ruby 社区像是一个"快乐的邪教"——_why the lucky stiff 用漫画教 Ruby、Poignant Guide 是编程书中最 weird 的一本、RailsConf 上的音乐表演、MINASWAN（Matz 是好人所以我们都好人）精神。这一段讲 Ruby 文化中"快乐"的一面，以及这种文化如何吸引了大量非传统背景的程序员（设计师转前端、文科生学编程）。
- **核心素材**：
  - _why the lucky stiff 的故事：神秘身份、Poignant Guide（章名由狐狸独白构成）、Shoes 工具包（"让做桌面应用像穿鞋一样简单"）、Hpricot、Camping
  - _why 2009 年的消失："编程是一件费力不讨好的事。你看自己的作品一年后被更好的取代、几年后干脆跑不起来了。"
  - 2005 年 OSCON _why 的演讲：满篇哲学，不讲技术
  - RailsConf 的轻松氛围——讲 happy 而不是讲效率
  - RSpec 的行为驱动开发——用自然语言写测试
  - 社区文化：黑客精神、艺术气息、"做有意义的事"
  - Matz 的温柔形象 vs Stroustrup 的学术派 vs Gosling 的企业派
- **配图关键词**：
  - "Why's Poignant Guide cover" (书封面——狐狸和吉他)
  - "_why the lucky stiff RailsConf 2006" (_why 演讲照片)
  - "Shoes GUI screenshot" (Shoes 应用界面)
  - "Rubyconf 2000s group photo" (RubyConf 早期合影)
  - "MINASWAN sticker" (社区贴纸)

### 第七章：快乐贵了

- **叙事目标**（本篇核心）**：** 快乐是有代价的。Ruby 的设计哲学——动态性、灵活性、解释执行——导致了严重的性能问题。GIL（全局解释器锁）让 Ruby 无法利用多核。Rails 应用在流量上来时崩溃。Twitter 的 Rails 噩梦是标志性事件。部署复杂度远超 PHP。Ruby 从未真正解决"大规模"的问题。它证明了"快乐"不是免费的。
- **核心素材**：
  - Ruby MRI 的性能问题：2000 年代比 Python 慢 2x、比 PHP 慢 3x、比 Java 慢 10x+
  - GIL（全局解释器锁）——为什么 Ruby 线程是假的
  - Twitter 的 Rails 困境：2007–2008 频繁宕机，2008 年宣布将核心队列系统从 Ruby 迁移到 Scala
  - DHH 的回应："Twitter 的问题是他们的架构问题，不是 Rails 的问题。他们从未回馈社区。"
  - Twitter 最终在 2011 年完全放弃 Rails 前端
  - Ruby 的部署噩梦：Mongrel、Passenger、Capistrano、RVM——需要整个工具箱才能上线
  - JRuby 和 Rubinius 的尝试：在 JVM 上跑 Ruby、或重写 Ruby 解释器——但兼容性永远是个问题
  - MacRuby 的故事（2007–2011）：Apple 内部把 Ruby 移植到 Objective-C 运行时，计划让 Ruby 成为 iPhone 应用开发语言。但 Steve Jobs 时代 Apple 从不采用外部语言作一等公民，MacRuby 2011 年停止。转变为商业的 RubyMotion——但从未进入 iPhone 核心。如果 MacRuby 没死，iOS 开发史会完全不同。
  - 2007 年 MacRuby 的一线希望：Apple 开发者 Laurent Sansonetti 在 RubyConf 上演示用 Ruby 写 Cocoa 应用——台下欢呼。但 Apple 最终选择了 Swift（2014），与 Ruby 无关。
  - 暗线：性能的软肋让 Ruby 错过了移动时代和云计算时代
- **配图关键词**：
  - "Twitter fail whale 2007" (失败鲸——Twitter 宕机标志)
  - "Ruby GIL diagram" (GIL 示意图)
  - "MacRuby logo" (MacRuby 标志)
  - "Laurent Sansonetti RubyConf 2008" (演示 MacRuby)
  - "iPhone 3G 2007" (第一代 iPhone——Ruby 没能进去)
  - "Twitter Scala migration announcement" (Twitter 技术博客)

### 第八章：Rails 的成年礼

- **叙事目标**：Ruby 和 Rails 如何应对"快乐代价"的挑战。从 2010 年代的 Ruby 1.9（YARV 虚拟机让 Ruby 快了一个数量级）到 2020 年的 Ruby 3.0（"3 倍快"承诺、Ractor 并发模型、MJIT/YJIT 即时编译器）。Rails 的自我迭代：合并 Merb、引入 Asset Pipeline、Turbolinks、Action Cable、Hotwire——始终试图保持"最快速开发 Web 应用"的地位。DHH 从程序员变成赛⻋手，但 Rails 的迭代从未停止。
- **核心素材**：
  - YARV（Yet Another Ruby VM）：2007 年由 Koichi Sasada 开发，2009 年进入 Ruby 1.9——Ruby 第一次有了真正的虚拟机
  - Ruby 1.9 到 2.0 的过渡痛苦：1.8 → 1.9 不兼容，大量 gem 需要重写
  - Ruby 3x3 计划的诞生（2015 年 Matz 在 RubyConf 宣布）：Ruby 3.0 要比 Ruby 2.0 快三倍
  - Ruby 3.0（2020 圣诞发布）：Ractor、MJIT、Type Profiler
  - YJIT（2021）：Shopify 开发的 Rust 写的 JIT 编译器，让 Ruby 在 YJIT 下快 2-3 倍
  - Rails 的持续进化：合并 Merb（Rails 3）、Asset Pipeline（Rails 3.1）、Turbolinks（Rails 4）、Action Cable（Rails 5）、Hotwire（Rails 7）、Solid Queue/Kamal（Rails 8）
  - DHH 的"Rails 教义"（Rails Doctrine）：九条原则，最核心的仍然是"优化程序员幸福"
  - Ruby 没有死：Shopify（营收 50 亿+、全栈 Rails）、GitHub（最大 Rails 站点之一）、Airbnb（早期全栈 Rails）
  - Matz 的现状：Rakuten 研究员、依然参与 Ruby 开发
- **配图关键词**：
  - "Koichi Sasada YARV" (YARV 开发者照片)
  - "Ruby 3.0 release announcement" (2020 圣诞发布截图)
  - "Shopify Rails architecture" (Shopify 技术栈——Rails 最大用户)
  - "DHH Le Mans 2015" (DHH 赛车照片——人生的另一面)
  - "Rails Doctrine page" (rubyonrails.org/doctrine 截图)

### 第九章：快乐留下的东西

- **叙事目标**：总结 Ruby 的遗产——它对编程世界的影响远远超过它自身的市场份额。Ruby 证明了"程序员幸福"是一个有效的语言设计目标。Rails 的"约定优于配置"成了每个现代 Web 框架的默认哲学。更重要的是，Ruby 让编程变得**有趣**——这在一个被 C++ 的复杂和 Java 的冗长统治的时代，是一种反叛。最终 Ruby 没有统治世界，但它让世界变得更好了一点点。暗线收束：程序员幸福值得追求，但不是一切。
- **核心素材**：
  - Ruby 的直接后代：Elixir（从 Ruby 学语法和哲学，但用 Erlang VM 解决并发）、Crystal（静态类型 Ruby 语法）、CoffeeScript（"Rails 的 JavaScript"）
  - Rails 的框架后代：Django、Laravel、Phoenix、Play、Sails.js……每种语言的 Web 框架都有 Rails 的 DNA
  - "Ruby changed the conversation"：在 Ruby 之前，没人在乎程序员是否快乐；在 Ruby 之后，每个语言的设计者都在谈 developer experience
  - 现代 Rails 的遗产：DHH 的"一人框架"理念（Rails 8 无需 PaaS 即可部署）——回到 Rails 最初的承诺：让一个人能做完所有事
  - 暗线收束：Ruby 证明了编程语言的竞争不仅是性能的竞争，也是**情感的竞争**
  - 最后回到 Hello World：`puts "Hello, World!"`——没有括号，没有分号，没有 public static void main。它就是一句话。Ruby 从头到尾都在说：写代码可以很简单。
- **配图关键词**：
  - "Elixir logo + Ruby logo" (被 Ruby 影响的语言)
  - "Rails inspired frameworks collage" (Django/Laravel/Phoenix 等 logo)
  - "Programming languages family tree Ruby" (语言族谱图)
  - "Matz and DHH together" (两人同框——RubyConf 合影)
  - Modern Rails app screenshot（示例用 Rails 做的现代产品）

---

## 推荐阅读

1. **https://en.wikipedia.org/wiki/Ruby_(programming_language)** — Ruby 语言的 Wikipedia 页面，最全面的事实基础和版本历史
2. **https://en.wikipedia.org/wiki/Yukihiro_Matsumoto** — Matz 的生平和传记资料
3. **https://en.wikipedia.org/wiki/Ruby_on_Rails** — Rails 框架的 Wikipedia 页面，涵盖版本历史和架构演变
4. **https://rubyonrails.org/doctrine** — DHH 写的《Rails 教义》九条原则，是理解 Rails 设计哲学的第一手文本，语言生动、立场鲜明
5. **https://en.wikipedia.org/wiki/Why_the_lucky_stiff** — _why 的故事，Ruby 社区文化的灵魂人物
6. **https://en.wikipedia.org/wiki/MacRuby** — MacRuby 的历史：Apple 与 Ruby 擦肩而过的故事
7. **https://en.wikipedia.org/wiki/David_Heinemeier_Hansson** — DHH 的生平：从丹麦程序员到 Rails 之父到勒芒赛车手
8. **https://www.artima.com/articles/the-principle-of-least-surprise** — Matz 在 Artima 的经典访谈（"最小意外原则"的核心阐述），但该链接已失效，建议通过 Archive.org 访问
9. **https://www.slate.com/articles/technology/technology/2012/03/ruby_ruby_on_rails_and__why_the_disappearance_of_one_of_the_world_s_most_beloved_computer_programmers_.html** — Slate 杂志 2012 年对 _why 失踪事件的长篇报道，是理解 Ruby 社区文化最好的非技术文本
10. **https://en.wikipedia.org/wiki/Ruby_MRI** — Ruby MRI（Matz's Ruby Interpreter）的技术架构资料，了解 YARV、GIL、JIT 的基础
11. **https://shopify.engineering/yjit-just-in-time-compiler-for-cruby** — Shopify 的 YJIT 博客文章，Ruby 性能改善的最新进展（2021–）
12. **https://www.youtube.com/watch?v=K8V0-3mQyQE** — Matz 的 Google Tech Talk（2008），"The Ruby Programming Language"，可以直接引用他的原话
