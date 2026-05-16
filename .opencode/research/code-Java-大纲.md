# 研究大纲：Java：虚拟机的征服

## 叙事弧线

- **开头切入点**：以 1995 年 5 月 23 日的 SunWorld 大会切入——Marc Andreessen（Netscape 创始人）走上 Sun 的舞台，宣布 Netscape Navigator 将支持 Java。台下开发者一开始没反应过来——"Java 是什么？"——然后他们意识到：浏览器里可以跑程序了。暗线提示：这一天 Java 从"给机顶盒写的语言"变成了"互联网的语言"。

- **主体故事线**：Java 的故事有两个截然不同的篇章。上篇（1990–1994）：Sun 的一个秘密团队（Green Team）试图做"下一代的消费电子编程平台"——他们需要跨平台、需要安全、需要简单。Gosling 做了一个叫 Oak 的语言，团队做了个叫 Star7 的 PDA 演示——但没有人想要它。消费电子制造商对他们的机顶盒没兴趣。项目濒临死亡。下篇（1994–1995）：World Wide Web 爆发了。Gosling 意识到"跨平台"这个问题在互联网上更严重——你在服务器上写程序，但你不知道用户的电脑是什么操作系统。他用 Oak 写了一个浏览器叫 WebRunner（后改名 HotJava）。Netscape 的 Marc Andreessen 看到了，说"我们要这个"。Java 变成互联网上最热门的东西。核心张力：Java 的被发明是为了一个并不存在的市场（智能家电）——它真正的战场在互联网，而这一战场的需求（跨平台、安全、不怕崩溃）恰好是它从一开始就为机顶盒设计的。

- **结尾（暗线升华）**：Java 证明了"虚拟化"的胜利——不是直接跟硬件和操作系统打交道，而是抽象出一层中间层。这个理念后来被 .NET、Go、Kotlin/JVM、Docker（容器）继承和重塑。Java 从"给机顶盒写的"变成"企业级后端霸主"再到"Android 的母语"——它用三十年证明了：有时候一门语言最大的成功不是它的设计有多好，而是它恰好在正确的时间站在了正确的位置。暗线钩子：1995 年还有另一件改变语言史的事情——Brendan Eich 在 Netscape（就在 Andreessen 宣布支持 Java 的那个公司里）开始做一个叫 Mocha 的项目。下一篇预告：JavaScript——十天与十年。

## 关键人物

- **James Gosling（1955–）** — Java 语言的创造者。加拿大卡尔加里人，卡尔加里大学本科，卡内基梅隆大学计算机博士。在 CMU 期间写了 Gosling Emacs（Gosmacs）和运行 UCSD Pascal 的 p-code 虚拟机（这是 JVM 概念的萌芽）。1984 年加入 Sun，早期做了 NeWS 窗口系统。1990 年加入 Green 项目，创造了 Oak（后改名 Java）。他不是"因为愤怒所以写语言"——他的核心信念是"架构中立"（architecture-neutral）：程序应该能在任何硬件上跑。后来他在 2010 年 Oracle 收购 Sun 后离职，去了 Google、Liquid Robotics，最后在 Amazon Web Services 退休。

- **Patrick Naughton（1965–）** — Sun 工程师，Green 项目的发起人之一。对 Sun 的 C++ API 和 NeWS 项目的官僚体制极度失望，写了一封著名的电子邮件给 CEO Scott McNealy（"假装你是上帝，告诉我怎么拯救这家公司"）。McNealy 没生气，反而让他组建一个小团队独立工作——这就是 Green 项目。

- **Mike Sheridan** — Green 项目的第三个创始人。Sun 的早期员工，在 Naughton 和 Gosling 加入之前就已经在探索互动电视方向。

- **Scott McNealy（1954–）** — Sun Microsystems 的 CEO 和联合创始人。支持了 Green 项目这个"地下活动"，在项目最困难的时候没有砍掉它。后来在 Java 的推广中扮演了传教士角色。

- **Bill Joy（1954–）** — Sun 的联合创始人，伯克利的 Unix 传奇（vi、BSD 的创造者）。他是 Gosling 做 Java 的重要推动者——他看到了"架构中立"对互联网意味着什么。据说 Java 名字也是 Joy 在一次会议上从 Java 咖啡得到灵感提议的（另一种说法是名字来自营销团队的头脑风暴）。

- **Arthur van Hoff** — 早期 Java 团队成员。花了一个周末把 Java 1.0 编译器用 Java 自己重写（自举），以此确保编译器严格符合语言规范。后来是 Marimba 的创始人。

- **Guy L. Steele Jr.（1954–）** — 《The Java Language Specification》的合著者。Scheme 语言的共同设计者，Common Lisp 标准化的关键人物。他的加入为 Java 带来了语言规范层面的严谨性。

- **Tim Lindholm** — Java 虚拟机规范的合著者。定义了 JVM 的字节码指令集和运行时行为。

- **Frank Yellin** — 早期 Java 团队成员，参与了从工具链到标准库的多个方面。

- **Marc Andreessen（1971–）** — Netscape 联合创始人。1995 年在 SunWorld 上宣布了 Netscape 对 Java 的支持，是 Java 从"消费电子语言"转向"互联网语言"的关键推手。

- **Jonathan I. Schwartz** — Sun 后期的 CEO，在 Sun 被 Oracle 收购前主导了 Java 的开源化（GPL 许可证）。

- **Duke** — Java 的吉祥物。最初是 Star7 演示中的"智能代理"角色，后来成为 Java 技术社区的标志。

## 时间线

- **1955.5.19**: James Gosling 出生于加拿大卡尔加里
- **1983**: Gosling 在 CMU 完成博士论文《Algebraic Constraints》，期间写了 Gosling Emacs 和 UCSD Pascal p-code 虚拟机
- **1984**: Gosling 加入 Sun Microsystems
- **1990.12**: Patrick Naughton 写给 Scott McNealy 的"上帝邮件"。Green 项目正式启动（Gosling、Naughton、Sheridan）
- **1991.06**: Java 语言项目正式启动，最初的名字叫 Oak（Gosling 办公室外的橡树）
- **1991**: Gosling 完成了 Oak 的第一个编译器，用 C 语言编写的，输出 bytecode 到一个模拟器
- **1992.09.03**: Green 项目展示了 Star7 原型——一台手持 PDA 设备，带触摸屏和 Duke 智能代理。但消费电子厂商没有兴趣
- **1993**: 项目在 Sun 内部面临被砍掉的危险。团队尝试了各种方向——机顶盒、互动电视、游戏机——都没找到市场
- **1994.06**: 团队在写一个"媒体管理器"原型时，Gosling 意识到 World Wide Web 才是 Oak 的归宿。他和团队用 Oak 重写了一个 Web 浏览器 WebRunner（后改名 HotJava）
- **1994**: Oak 因商标冲突被迫改名。头脑风暴后选择了"Java"——印度尼西亚爪哇岛的咖啡。代号："Java 正如 Java 咖啡一样，能让程序员兴奋起来"
- **1995.01**: Sun 内部对是否发布 Java 仍有分歧。McNealy 拍了板
- **1995.05.23**: SunWorld '95 大会，Sun 正式发布 Java。Marc Andreessen 宣布 Netscape Navigator 2.0 将支持 Java。这是 Java 的"互联网化"时刻
- **1995.09**: Netscape 宣布在 Navigator 2.0 beta 中支持 Java applets
- **1995.12**: JavaScript 发布（Brendan Eich 在 Netscape 做的，跟 Java 除了名字之外其实关系不大）
- **1996.01.23**: JDK 1.0 正式发布（版本 1.0.2 才是第一个稳定版本）
- **1996.05**: Sun 发布了 Java 1.0 的第一份企业级白皮书
- **1997.02.19**: JDK 1.1 发布——内部类、JDBC、RMI、反射、JIT 编译
- **1998.12.08**: J2SE 1.2 发布（Java 2）——Collections 框架、Swing 集成、JIT 进入核心 JVM
- **2000.05.08**: J2SE 1.3 发布——HotSpot JVM 成为默认实现
- **2002.02.06**: J2SE 1.4 发布——assert 关键字、正则、NIO
- **2004.09.30**: Java 5 发布——泛型、自动拆箱装箱、枚举、注解、foreach
- **2006.11.13**: Sun 开源了大部分 JVM（GPL 许可证）
- **2006.12.11**: Java SE 6 发布
- **2007.05.08**: Sun 完成了 JVM 的完全开源
- **2010.01.27**: Oracle 完成对 Sun 的收购
- **2010.04.02**: James Gosling 离开 Oracle
- **2011.07.28**: Java 7 发布
- **2014.03.18**: Java 8 发布（LTS）——Lambda 表达式、Stream API、新的 Date/Time API
- **2017.09.21**: Java 9 发布——模块系统（Project Jigsaw）
- **2018.09.25**: Java 11 发布（LTS）——HTTP Client、移除 Java EE
- **2021.09.14**: Java 17 发布（LTS）
- **2023.09.19**: Java 21 发布（LTS）
- **2025.09.16**: Java 25 发布（LTS）
- **2026.03.17**: Java 26 发布（最新版本）

## 篇章规划

### 第一章：1995 年 5 月 23 日——Java 的诞生时刻

- **叙事目标**：以 SunWorld '95 大会为开场——Marc Andreessen 走上舞台，宣布 Netscape 将在浏览器中支持 Java。台下有人问"Java 是干什么的？"——Andreessen 打开一个页面，跑了一个股票交易的 applet。这是人类第一次在浏览器里看到"可执行的内容"。但这门"互联网的语言"，原本是写给电视机顶盒的。这个反讽就是整篇故事的引擎——Java 为一台没人要买的设备设计，最后统治了所有人都想要的网络。先抛出结果（1995 年的火爆），再倒叙回赌局开始的地方。
- **配图关键词**：SunWorld 1995 keynote stage, Marc Andreessen with Java announcement, Netscape Navigator 2.0 screenshot with Java applet, Sun Microsystems campus (Menlo Park)

### 第二章：上帝邮件——Green 项目的诞生

- **叙事目标**：1990 年底，Sun 的工程师 Patrick Naughton 受够了——C++ API 一团混乱、NeWS 窗口系统项目被官僚主义拖死。他写了一封邮件给 Sun 的 CEO Scott McNealy："我要辞职了。但如果你让我假装是上帝，我告诉你公司该怎么做。"McNealy 没生气，反而说"你说了什么？让我看看。"Naughton 的建议是成立一个独立的小团队，不受大公司流程制约，探索下一代计算平台。McNealy 给了他一笔预算和几个人。1990 年圣诞节前，"Stealth Project"（后改名"Green"）在 Sand Hill Road 的一个小办公室里启动了。三人：Naughton、James Gosling、Mike Sheridan。他们的目标：给消费电子设备（机顶盒、PDA、游戏机）写一个编程平台。他们首先面对的问题是——用什么语言？
- **配图关键词**：Patrick Naughton portrait (Sun, 1990), Scott McNealy portrait (early 1990s), Hill Road office (Menlo Park, 1991), original "Stealth Project" memo/fax cover

### 第三章：为什么不 C++？

- **叙事目标**：团队一开始想用 C++ 写他们的平台。但很快发现不可行——消费电子设备（机顶盒）上有不同的 CPU 架构（MIPS、ARM、x86、68000），C++ 编译出来的代码绑定特定 CPU；指针让嵌入式系统上的程序动不动就崩溃；没有垃圾回收意味着开发者要手动管理内存，而消费电子开发者水平参差不齐。Gosling 在这时想起了他在 CMU 读博士时的一个经历：他用一个 p-code 虚拟机在 VAX 上跑 UCSD Pascal 程序——同样的 bytecode 可以在不同硬件上跑。他有了一个想法：如果先写一个"虚拟 CPU"，把所有编译器输出变成这个虚拟 CPU 的字节码，然后再为每个真实设备写一个这个虚拟 CPU 的"模拟器"（后来叫 JVM）——那就解决了跨平台问题。再加上 C++ 里他讨厌的那些东西（指针、多重继承、运算符重载）全部砍掉，加一个垃圾回收器。他要的不是"更好的 C++"——是"一个完全为'安全跨平台'而生的语言"。1991 年夏天，Oak（橡树）诞生了——名字来自 Gosling 办公室窗外的那棵橡树。
- **配图关键词**：James Gosling portrait (early Sun, 1980s), CMU p-code virtual machine documentation, original Oak language spec cover page (1991), oak tree in natural setting (symbolic)

### 第四章：Star7——给一个不存在的世界造的语言

- **叙事目标**：1992 年 9 月，Green 团队展示了他们的成果——Star7。一台手持设备，带触摸屏（在 1992 年这几乎是从未来的世界里拿出来的东西）、动画角色" Duke"做智能代理、用 Oak 写的整套界面和操作系统。团队甚至为它做了一个 demo 视频：用户在屏幕上用手指点来点去，Duke 在角落里做鬼脸。但问题是——没有人想要它。Sun 把 Star7 展示给消费电子厂商（日本的机顶盒公司、电视机厂商），对方的反应是：太先进了，我们还没想到要做这种东西。1993 年到 1994 年上半年，Green 项目在 Sun 内部命悬一线。团队试过互动电视、视频点播、游戏机——每个方向都碰壁。项目被重新命名为"FirstPerson"（第一人称），但仍然没人买账。到 1994 年夏天，项目已经几乎被放弃了。Gosling 后来回忆说："我们造了一扇非常棒的门，但没有墙需要它。"
- **配图关键词**：Star7 device prototype (PD101 最早的原型机), Duke mascot (original Star7 version), Star7 UI screenshot, Green Team group photo (1992), Sun FirstPerson presentation slides

### 第五章：橡树遇上互联网——一次意外的命运转折

- **叙事目标**：1994 年，Gosling 和几名团队成员参加了一个技术会议。回来后有人说"World Wide Web 这个东西正在爆炸——人们用所谓的'浏览器'看网络上链接的文档页面。"Gosling 打开了一个浏览器（NCSA Mosaic），看完之后脑子里响了警报：互联网上最大的问题就是跨平台——你写一个服务器程序，但用户用什么操作系统（Windows、Mac、Unix）你不知道。Oak 天生就是解决这个问题的！他用一个周末写了一个叫 WebRunner（后改名 HotJava）的浏览器——用 Oak 写的，能读懂嵌入在 HTML 页面中的 Oak 程序。当浏览器在页面上遇到 `<APPLET>` 标签时，它会下载一段 bytecode 并在本地运行。在 1994 年——这看起来像魔法。Gosling 给 Sun 的高层做了一个演示，但高层的反应很平淡："互联网？那个大学里传论文的东西？"Gosling 私下做了一个拷贝寄给了一个关键人物——Netscape 的联合创始人 Marc Andreessen。Andreessen 看完了，当天就给 Gosling 打电话："我们得谈谈。"
- **配图关键词**：NCSA Mosaic browser screenshot (1994), HotJava browser screenshot (first Java web browser), original WebRunner logo, HTML with APPLET tag code snippet, James Gosling at workstation (1994)

### 第六章：从 Oak 到 Java——名字、商标、赌注

- **叙事目标**：在走向市场的路上，一个法务问题必须解决：Oak 这个商标已经被一家叫 Oak Technology 的公司注册了（Oak Technology 是做 CD-ROM 控制器的）。团队需要新名字。Sun 营销团队组织了一系列头脑风暴会议。候选名字包括：Dynamo、WebDancer、Silk、Jolt、DNA、TIO（"This Is Object-oriented"的缩写——不是很好的名字）。最后有人提到了"Java"——印度尼西亚爪哇岛出产的咖啡，程序员喝的那种。"Java"这个名字有它自己的气质：它不是一本正经的（不是"OOP Language v2.0"），它有点轻松、有点酷、像在咖啡馆里聊天的感觉。Gosling 后来笑着说："我们选 Java 主要是因为在头脑风暴的时候点上这个名字感觉最放松。"1995 年 1 月，Sun 内部做了一次关键投票——McNealy 决定正式发布这门语言，投入数百万美元的市场推广预算。他们把原名 Oak 的规范文档中的名字全部替换成 Java。语言有了新名字、有了吉祥物（Duke 从 Star7 的智能代理变成了 Java 代言人）、有了口号"Write Once, Run Anywhere"——但真正的问题还在：有人用吗？
- **配图关键词**：Java coffee cup logo (original, 1995), Duke mascot waving (Java version), "Write Once Run Anywhere" campaign material (1995), Oak to Java name change memo, Sun marketing slide deck for Java launch

### 第七章：Java 征服世界的 90 天

- **叙事目标**：1995 年 5 月到 8 月，Java 经历了互联网历史上最疯狂的一次技术爆发。5 月 23 日 SunWorld 上 Andreessen 的宣布只是一个引爆点。7 月：Sun 免费发布了 Java Developer's Kit（JDK）的早期版本——没有花哨的安装包，就是一个 zip 文件解压了用命令行。开发者蜂拥而至。8 月：Netscape 在 Navigator 2.0 beta 中正式支持 Java applets。报纸和杂志开始报道这种"能在浏览器里跑的程序"。到 1995 年底，Java 的下载量超过了任何软件的历史记录——几十万份。1996 年 1 月 23 日，JDK 1.0 正式发布（版本号 1.0.2 才是第一个稳定版）。这个版本包含的功能非常基础——AWT（笨重的图形界面）、核心 java.lang/java.util 类库、applet API、网络和 I/O——但已经足够让全世界的开发者兴奋到疯狂。1996 年，Sun 创立了 JavaOne 大会，第一届就有 6000 多人参加。Java 成了继 C 之后最受关注的编程语言。
- **配图关键词**：JDK 1.0 download page (1996), JavaOne 1996 conference photo, "Java: Programming for the Internet" book cover (1996), Byte magazine Java cover (1995/1996), Sun Microsystems Java pavilion at trade show

### 第八章：JVM——Java 真正的遗产

- **叙事目标**：聚焦 JVM（Java 虚拟机）的设计和意义。Gosling 在设计 JVM 时的核心理念：bytecode 是给"虚拟 CPU"写的指令，不是给任何真实 CPU 写的。真实 CPU 上的 JVM 实现本身是轻量级的、可移植的。这个设计有三大后果：一是 Java 程序确实能做到跨平台（虽然"Write Once, Debug Everywhere"的嘲讽也伴随了 Java 很多年——不同平台的 JVM 实现总有细微差异）；二是 Java 的性能在最初被严重诟病（"太慢了"），但后来 HotSpot JVM 的 JIT（Just-In-Time）编译器和垃圾回收算法（G1、ZGC 等）让 Java 的性能慢慢追上了 C++ 的 80-90%；三是 JVM 本身变成了一个生态——Scala、Kotlin、Groovy、Clojure 这些语言全都跑在 JVM 上，它们借用 Java 的虚拟机、垃圾回收和标准库，但有自己的语法和设计哲学。JVM 是 Java 对一个程序员来说最被低估的创新——它证明了"虚拟化"不只是操作系统层的概念，语言层同样可以做。
- **配图关键词**：JVM bytecode example (javap output), HotSpot JVM diagram (generational heap), JVM specification book cover (Lindholm/Yellin), JVM language family diagram (Scala, Kotlin, Groovy, Clojure on JVM)

### 第九章：企业级征服——J2EE、Tomcat、Spring 与 Android

- **叙事目标**：1998 年 J2EE（Java 2 Enterprise Edition）发布，Java 正式进军企业级服务器市场。Servlet、JSP、EJB、JDBC——这套架构定义了"企业级 Java 开发"的模板。Apache Tomcat（1999）、JBoss（1999）、Spring（2002）——这些开源框架把 Java 变成了一台庞大的"企业级代码引擎"。Java 成了银行、保险、电信、电商的后端首选——不是因为它最优雅，而是因为它最稳定、最可维护、对 20 年前的代码最友好（向后兼容性是 Java 的宗教）。2008 年，Google 发布 Android——用 Java 语法（不是 JVM，用 Dalvik/ART 虚拟机）做移动操作系统。Java 在移动端复活了。Java 的遗产有三层：第一层，它让"跨平台"从一个理想主义的梦想变成了消费品级别的现实；第二层，它证明了企业级开发需要平台级的基础设施（而不仅仅是语言特性）；第三层，它用 JVM 创造了一个"语言无关的运行时"，后来的 .NET 和 LLVM 都沿着这个方向走了下去。2010 年 Oracle 收购 Sun 后，Java 的开源进程（OpenJDK）反而加速了——Java 以一个开放的生态继续运转，不再受制于单一公司的战略。
- **配图关键词**：J2EE logo (1998), Apache Tomcat logo, Spring Framework logo, Java on server rack / data center, Android logo with Java, OpenJDK logo

### 第十章：遗产——虚拟机的征服

- **叙事目标**：回看整条暗线——从给机顶盒设计的"虚拟机"到互联网服务器上的万亿美元产业，Java 的历史说明了软件行业最深刻的一条规律：**最成功的平台往往不是为它们最终的市场设计的**。Java 的原型是为交互电视做的，SQL 的原型是为通用数据查询做的，World Wide Web 的原型是为粒子物理学家共享论文做的。Java 的"歪打正着"不是偶然——它设计时对安全性、跨平台、稳定性的偏执，恰好是互联网最需要的特性。Java 在 2020 年代的衰退（被 Python、JavaScript、Kotlin、Go 侵蚀市场份额）并不妨碍它作为工业史上最重要的语言之一的地位。它留下的 JVM 生态、企业级开发的范式、以及"架构中立"的理念，已经融入了每一个现代程序员的 DNA。暗线升华：C++ 的选择是"让程序员自己承担复杂度，换取最高性能"；Java 的选择是"用虚拟机换安全，用性能换开发效率"——这两条路的分叉，标志着 1990 年代软件工程的核心矛盾：人类到底能不能信任自己写不出 bug？Java 的答案是"不能，所以让机器来管内存和类型"——这个答案塑造了后来所有主流语言（Go、Rust、Kotlin）的设计选择。
- **配图关键词**：James Gosling portrait (CHM Fellow, 2019), Duke mascot evolution timeline, Java version timeline infographic, Sun campus historical photo, "Java is everywhere" network diagram

---

## 推荐阅读

1. **Wikipedia: Java (programming language)** — https://en.wikipedia.org/wiki/Java_(programming_language)
   Java 语言的完整历史和特性综述。事实性参考的基础。

2. **Wikipedia: Java (software platform) § History** — https://en.wikipedia.org/wiki/Java_(software_platform)#History
   Java 平台的历史——从 Green 项目到 Java 1.0，包括 Naughton 的"上帝邮件"、Star7 演示、HotJava 浏览器等故事的最详细记录。

3. **Wikipedia: James Gosling** — https://en.wikipedia.org/wiki/James_Gosling
   Java 之父的生平——从 Calgary 到 CMU 到 Sun，以及他在 Oracle 收购后的去向。

4. **Wikipedia: Oak (programming language)** — https://en.wikipedia.org/wiki/Oak_(programming_language)
   Oak 语言的详细历史——Green 项目、Star7、命名冲突、Oak 和 Java 的差异。

5. **Wikipedia: Write once, run anywhere** — https://en.wikipedia.org/wiki/Write_once,_run_anywhere
   Sun 的著名营销口号背景——WORA 的承诺与现实的差距。

6. **Wikipedia: Java version history** — https://en.wikipedia.org/wiki/Java_version_history
   Java 所有版本的详细列表——从 JDK 1.0 到 Java 26。版本时间线和特性表。

7. **James Gosling, "The Java Language Environment: A White Paper" (1996)** — https://www.stroustrup.com/1995_Java_whitepaper.pdf
   Gosling 亲自写的 Java 白皮书——阐述了 Java 的设计目标和原则。第一手资料。

8. **ACM Queue: "A Conversation with James Gosling" (2004)** — https://queue.acm.org/detail.cfm?id=1017013
   Gosling 回顾 Java 创造的访谈。包含 Green 项目的内幕故事、为什么要放弃 C++、JVM 的灵感来源。最重要的第一手来源之一。

9. **Computer History Museum: Oral History of James Gosling (2019)** — https://archive.computerhistory.org/resources/access/text/2019/10/102781080-05-01-acc.pdf
   CHM 对 Gosling 的详细口述史。从高中写卫星数据分析软件到 Java 创造的全过程。

10. **Jon Byous, "Java Technology: An Early History" (2003, Sun Microsystems)** — https://web.archive.org/web/20070618074030/https://duke.dev.java.net/green/
    Sun 官方发布的 Java 早期历史回忆文章。Green 项目的来龙去脉，包括"Stealth Project"名称的由来和 Star7 屏幕截图。

11. **InfoWorld: "So Why Did They Decide to Call It Java?" (1996)** — https://www.infoworld.com/article/2077265/so-why-did-they-decide-to-call-it-java-.html
    关于 Java 命名的详细故事——从 Oak 到 Java 的改名过程，包括营销团队头脑风暴的其他候选名字。

12. **IEEE Spectrum: "The Soul of the Virtual Machine" (2011)** — https://spectrum.ieee.org/the-soul-of-the-virtual-machine
    关于 JVM 起源的文章——Gosling 在 CMU 的 p-code 虚拟机经验如何影响了 Java 设计。对 JVM 理念的深度解读。

13. **Oracle v. Google trial documents / Gosling's blog (2012)** — http://nighthacks.com/jag/blog/393/index.html
    Gosling 对 Oracle 诉 Google 案的个人立场声明——关于 Android 使用 Java API 的争议。Java 历史上的一个重要法律时刻。
