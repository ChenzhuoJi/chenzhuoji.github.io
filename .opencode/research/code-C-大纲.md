# 研究大纲：C：Unix 的血液

## 叙事弧线

- **开头切入点**：以历史反讽切入——"2011 年 Dennis Ritchie 去世那周，全世界的头条都在报道 Steve Jobs。几乎没有人为 Ritchie 停下一分钟。但你的手机、电脑、路由器、服务器——每一台都在跑他的代码。" 然后拉回 1969 年的贝尔实验室——一个程序员想玩游戏，却一不小心写出了改变世界的操作系统。

- **主体故事线**：从 1969 年 Multics 项目失败、Thompson 在 PDP-7 上写 Space Travel 开始，到 B 语言的局限、Ritchie 创造 C、再到 1973 年 Unix 内核用 C 重写的决定性时刻。核心张力不是"算得更快"（Fortran）或"处理符号"（Lisp），而是"写系统软件的人需要一个介于高级语言和汇编之间的东西"。C 的答案——"信任程序员"——既成就了它，也留下了半个世纪的隐患。

- **结尾（暗线升华）**：Fortran 让科学家不再写汇编，Lisp 让 AI 研究者可以处理符号，C 让系统程序员不再写汇编。操作系统第一次可以用高级语言写了。计算机从"实验室里的庞然大物"变成了"无处不在的基础设施"。C 是这一转变的血液——没有它，Unix 无法移植，Linux 不会诞生，互联网不会长成今天这样。

## 关键人物

- **Ken Thompson（1943–）** — Unix 的创造者，B 语言的发明者。一个自学成才的程序天才，"我就想玩个游戏"导致了操作系统的诞生。1983 年与 Ritchie 同获图灵奖。以"Reflections on Trusting Trust"演讲闻名——在演讲中演示了编译器后门攻击。后来还发明了 UTF-8、设计了 Go 语言。个性：务实、极简、"够用就好"。

- **Dennis Ritchie（1941–2011）** — C 语言的创造者，Unix 的共同开发者。哈佛物理和数学出身，博士论文未完成就被贝尔实验室吸纳。性格与 Thompson 互补——Thompson 是"我要把它写出来"的实干家，Ritchie 是"让我想清楚怎么设计"的语言建筑师。C 的类型系统、指针规则、声明语法都出自 Ritchie 之手。合著《The C Programming Language》（K&R）。2011 年去世，媒体关注度远低于同周的 Steve Jobs。

- **Brian Kernighan（1942–）** — 贝尔实验室研究员，K&R 的作者之一（写了几乎全部正文内容）。虽然不是 C 的创造者，但通过那本 228 页的书定义了 C 在大众心目中的形象。"Hello, World" 这个教学传统的发明者。后来还发明了 AWK 语言（其中 K 代表 Kernighan）。

- **Doug McIlroy（1932–）** — 贝尔实验室计算科学研究中心主任。Unix 管道（pipe）的发明者。在他的 TMG 编译器中整合了 ALGOL 68 的赋值运算符，影响了 B 的语法。引入了 `x =+ y` 写法（后变为 `+=`）。

- **Stephen C. Johnson** — 贝尔实验室研究员，写了 yacc（LALR 解析器生成器）和 pcc（可移植 C 编译器）。还编写了 lint——C 语言的第一个静态分析工具。

## 时间线

- **1965–1966**: Thompson 在 UC Berkeley 获学士/硕士学位，毕业论文导师 Elwyn Berlekamp
- **1966**: Thompson 入职贝尔实验室
- **1967**: Ritchie 入职贝尔实验室
- **1968**: Ritchie 完成博士论文草稿但未正式获得学位
- **1969**: 贝尔实验室退出 Multics 项目。Thompson 在 PDP-7 上写 Space Travel 游戏，随后开始写 Unix 原型。Thompson 创建 B 语言（受 BCPL 启发）。
- **1970**: PDP-11 到达贝尔实验室。Brian Kernighan 提议命名"Unix"（对 Multics 的戏仿）。
- **1970**: 第一版 Unix 在 PDP-11/20 上运行（汇编语言编写）。
- **1971**: Ritchie 开始扩展 B 为 NB（New B），添加 int/char 类型和指针。
- **1972**: C 语言正式诞生。Ritchie 重写编译器，产生 PDP-11 机器码（替代 threaded code）。
- **1972**: 引入 && 和 || 运算符（Alan Snyder 建议）；预处理器出现（#include, #define）。
- **1973 年夏**: Thompson 和 Ritchie 用 C 重写 Unix 内核——操作系统第一次用高级语言实现。
- **1973**: Ritchie 和 Thompson 在 SOSP（操作系统原理研讨会）上发表 Unix 论文。
- **1975**: Thompson 在 UC Berkeley 休假，帮助移植 Unix 6 版到 PDP-11/70——催生 BSD。
- **1977**: C 移植到 Interdata 8/32，证明 C 的可移植性。
- **1978**: K&R《The C Programming Language》第一版出版（228 页）。
- **1983**: Thompson 和 Ritchie 获图灵奖。Thompson 发表 "Reflections on Trusting Trust" 演讲。
- **1989**: ANSI C 标准（X3J11 委员会）正式发布。C 被正式标准化。
- **2011 年 10 月 12 日**: Dennis Ritchie 去世，享年 70 岁。

## 篇章规划

### 第一章：一个游戏引出的操作系统

- **核心内容**：以 1969 年秋天贝尔实验室的场景开篇——Multics 项目失败了，AT&T 决定退出。Thompson 想玩一个叫 Space Travel 的游戏（模拟太阳系飞行），但找不到合适的机器。他在废弃的 PDP-7 上写了一个操作系统来跑这个游戏。这个"为玩游戏写的系统"后来被命名为 Unix。暗线钩子：Lisp 篇结尾说"一台机器有了灵魂还不够，它还需要身体和血管"——Unix 就是那个身体。但写身体需要一种新的语言。
- **叙事目标**：建立 Unix 诞生的偶然性氛围——不是为了宏伟的目标，而是"没有机器跑我的游戏，那我写一个"。用这个反常识的开场抓住读者。
- **配图关键词**：Space Travel game screenshot (PDP-7), PDP-7 front panel, Bell Labs Murray Hill (1960s)

### 第二章：贝尔实验室的两个天才

- **核心内容**：介绍 Thompson 和 Ritchie。Thompson——新奥尔良人，从小迷二进制和逻辑，UC Berkeley 毕业，写代码像呼吸一样自然，是"如果我想要一个工具，我就写一个"的人。Ritchie——布朗克斯出生，哈佛应用数学，父亲也是贝尔实验室的科学家。博士论文没完成就加入贝尔实验室，性格沉静，是"做之前先想清楚"的设计者。他们互补：Thompson 催生了 Unix，Ritchie 催生了 C。两人的合作从 Multics 时代就开始了。
- **叙事目标**：塑造两个人物的性格对比和化学反应。C 的故事本质上是一个"两个人恰好遇到了彼此"的故事——Thompson 需要一门更好的语言，Ritchie 恰好有能力做出来。
- **配图关键词**：Ken Thompson portrait (young, 1960s), Dennis Ritchie portrait (young, 1960s), Thompson and Ritchie at PDP-11 (1973)

### 第三章：B 语言——Barely 够用

- **核心内容**：Thompson 先写了 B 语言（从 BCPL 继承）。B 是"无类型"的——只有一个数据类型 "word"（机器字）。这在 PDP-7 上（18-bit word-addressed）没问题，但 PDP-11（16-bit byte-addressed）来了之后暴露了致命弱点：处理字节太笨拙、浮点无法实现、指针需要运行时转换。B 就像一件不合身的衣服——勉强能穿，但处处掣肘。Thompson 用 B 写了一些工具（dc 计算器），但 Unix 内核仍然用汇编写，因为 B 太慢了（threaded code 技术导致性能差）。
- **叙事目标**：让读者理解 B 的"不够用"——不是 Thompson 做得不好，而是硬件进化太快。B 的失败为 C 的诞生铺了路。配以具体的工程细节：为什么 typeless 在 byte-addressable 机器上是灾难。
- **配图关键词**：B programming language manual (Thompson, 1972), PDP-11/20 front panel, PDP-7 vs PDP-11 architecture comparison

### 第四章：NB——New B，新希望

- **核心内容**：1971 年，Ritchie 开始扩展 B。他称之为 NB（New B）。做的事有三件：第一，加入了类型系统——int 和 char 两种基础类型，以及指向它们的指针。第二，重写了编译器——从 threaded code 改为直接生成 PDP-11 机器码，性能大幅提升。第三，最关键也最聪明的设计：数组和指针的等价规则。Ritchie 意识到：与其让数组名是一个隐式指针（需要运行时初始化），不如让数组名在表达式中"退化"为指针。这个决定让 C 既可以操作硬件地址（指针），又保持了高级语言的抽象。
- **叙事目标**：聚焦 C 诞生的"设计时刻"——Ritchie 面对的具体工程问题和他做出的具体取舍。特别是数组-指针等价这个"不是设计出来的设计"，它后来既让 C 强大无比，也让初学者困惑不已。
- **配图关键词**：Dennis Ritchie at terminal (1970s), PDP-11 memory board, C code showing pointer syntax

### 第五章：C——新语言需要一个名字

- **核心内容**：1972 年，Ritchie 觉得 NB 这个名字配不上这个语言了。他决定继续用单字母——C（B 之后的下一个字母）。正式发布的 C 是一个极简的语言——只有 int、char、指针、数组、结构体（后来加的），没有边界检查、没有垃圾回收、没有异常处理、没有 OOP。"信任程序员"是设计哲学——C 假设你知道自己在做什么，给你全部的控制权，但出错时也绝不拦你。++ 和 -- 运算符、位运算、指针算术——这些让 C 接近汇编的表达力。同时，预处理器（#include, #define）的加入让代码组织有了可能性。
- **叙事目标**：展示 C 作为一门语言"长什么样"——它的性格是"极简、信任、不保护你"。对比 Fortran（为科学家设计）和 Lisp（为 AI 研究者设计），C 是为系统程序员设计的——他们不需要保护，他们需要控制。
- **配图关键词**：C language reference card (1970s), K&R hello world code, PDP-11 assembly comparison

### 第六章：1973 年夏天——那个重写内核的决定

- **核心内容**：1973 年夏天是计算机史上最重要的三个月之一。Thompson 和 Ritchie 决定用 C 重写 Unix 内核。这不是一个轻松的决定——Unix 当时已经在 PDP-11 上跑得很好，用汇编写的内核性能优越，重写可能带来性能和稳定性的风险。但他们做到了。1973 年底，Unix 内核用 C 写完了。这意味着什么？操作系统第一次可以用高级语言写。Unix 从此不再绑定于 PDP-11——它可以在任何有 C 编译器的机器上跑。1977 年移植到 Interdata 8/32 证明了这一点。可移植性的革命：Unix 从"一个 PDP-11 的操作系统"变成了"一个可以在任何机器上跑的操作系统"。
- **叙事目标**：讲述这个决定性时刻的故事。这是 C 的"登基时刻"——它证明了自己可以胜任汇编的工作，而且更好。同时引出暗线：可移植性让 Unix 开始传播——从贝尔实验室到学术界，从学术界到整个行业。
- **配图关键词**：Unix V6 source code (C version, 1975), Thompson and Ritchie at PDP-11 (1973 photo), Interdata 8/32

### 第七章：K&R——228 页改变了编程

- **核心内容**：1978 年，Brian Kernighan 和 Dennis Ritchie 出版了《The C Programming Language》。228 页——因为 C 本身就是一门小语言。这本书的写作风格（清晰、简洁、有例程）定义了编程书籍的标准。Hello World 传统就是从这里开始的。"Hello, World" 出现在第一章第一个例子里——它不只是演示 printf，它是在说：看，你只写了三行代码，程序就跑起来了。这本书卖了一百万册以上。在 C 成为 ANSI 标准之前，K&R 就是标准。一代程序员通过这本书学会了 C，也学会了系统编程的思维方式。
- **叙事目标**：讲述这本书的故事——它为什么重要？因为它（而不是编译器）定义了程序员眼中的 C。Kernighan 写正文，Ritchie 写附录（参考手册）——分工明确。这本书也是"语言的最后一本个人化的书"——后来 C 被标准化了，变成了委员会的语言。
- **配图关键词**：K&R C book cover (first edition, 1978), Brian Kernighan portrait, Hello World in C printout

### 第八章：幽灵——C 的遗产与代价

- **核心内容**：C 赢得了系统编程的世界——Linux 内核用 C、Windows 内核用 C、macOS 内核用 C、Python 解释器用 C、Ruby 解释器用 C、Redis 用 C、SQLite 用 C、Nginx 用 C、Apache 用 C……几乎所有你用的软件底层都是 C 写的。但这个胜利是有代价的。"信任程序员"的另一面是：缓冲区溢出、use-after-free、野指针、内存泄漏。C 的安全问题直接导致了 Morris Worm（1988）、Heartbleed（2014）等重大安全事件。半数以上的严重安全漏洞根源于 C 的内存安全问题。2011 年 Ritchie 去世——全世界没有注意。但他的代码在每一台设备里运行。后来 Rust 出现了——C 的第一个真正的挑战者。
- **叙事目标**：在赞颂 C 的遗产的同时，不回避它的阴影。C 是一把双刃剑——它给了系统程序员无限的控制权，也把安全责任完全交给了人。这个篇章的情绪应该是"敬佩中带着一丝哀伤"——C 的缺陷和它的强大来自同一个根源。
- **配图关键词**：Linux kernel code snippet, Heartbleed logo, Rust mascot vs C logo

### 第九章：暗线——计算机走出机房

- **核心内容**：收束全文，连接暗线。Fortran 让科学家不再排队等程序员；Lisp 让机器处理符号而非数字；C 让写操作系统不再依赖汇编。这三步完成了计算机从"实验室工具"到"基础设施"的转变。Unix（用 C 写的）跑在学术界，BSD 在伯克利壮大，Linux（用 C 写的）统治了服务器。Windows 内核也是 C。互联网的每一层基础设施——DNS 服务器、Web 服务器、路由器、数据库——几乎全部用 C/C++ 实现。2011 年 Ritchie 去世时，《经济学人》写道："Dennis Ritchie 是 IT 行业里几乎从未被提起但影响最大的那个人。" C 的遗产不是"它被很多人用"——而是"几乎没有人意识到自己正在用它的产物"。
- **叙事目标**：把 C 的故事放回"代码的故事"这个大叙事里。Fortran → Lisp → C 完成了计算机从"算数工具"到"思考工具"再到"基础设施"的三级跳。下一篇预告：SQL——数据管理的革命。计算机有了操作系统，但真正的商业价值在数据里。
- **配图关键词**：Dennis Ritchie Japan Prize (2011), Unix timeline infographic, modern data center (symbolic)

---

## 推荐阅读

1. **Dennis Ritchie, "The Development of the C Language" (1993)** — https://www.bell-labs.com/usr/dmr/www/chist.html
   C 语言发展史的第一手叙述。Ritchie 本人写的，详细解释了 B → NB → C 的技术演变、设计决策（特别是数组-指针等价）、PDP-11 的影响。本文文章最重要的参考来源。

2. **Wikipedia: C (programming language)** — https://en.wikipedia.org/wiki/C_(programming_language)
   完整的 C 语言历史、特性、标准化历程。涵盖从 K&R C 到 C23 的全部标准演化。

3. **Wikipedia: Ken Thompson** — https://en.wikipedia.org/wiki/Ken_Thompson
   Thompson 的生平和成就细节，包括 Space Travel、B 语言、Unix、UTF-8、Go 语言。

4. **Wikipedia: Dennis Ritchie** — https://en.wikipedia.org/wiki/Dennis_Ritchie
   Ritchie 的完整生平，包括他在 C 和 Unix 中的角色、图灵奖、去世细节。

5. **Wikipedia: B (programming language)** — https://en.wikipedia.org/wiki/B_(programming_language)
   B 语言的详细历史，从 BCPL 继承到被 C 取代的过程。包含 Thompson 的用户手册链接。

6. **Wikipedia: PDP-11** — https://en.wikipedia.org/wiki/PDP-11
   PDP-11 的硬件架构特性——为什么它是 C 语言最自然的"运行环境"。正交指令集、内存映射 I/O、自动增减寻址模式。

7. **Brian Kernighan Interview (Forbes India, 2011)** — https://www.forbesindia.com/interview/special/brian-kernighan-no-one-thought-c-would-become-so-big/29982/1
   Kernighan 在 Ritchie 去世后接受采访，谈到没人预料到 C 会如此成功。

8. **Thompson, "Reflections on Trusting Trust" (1984)** — https://dl.acm.org/doi/10.1145/358198.358210
   Thompson 的图灵奖演讲，展示了编译器后门攻击。既是安全领域的经典论文，也揭示了 C 的工具链深度——编译器本身也是 C 写的。

9. **Computer History Museum: Unix** — https://www.computerhistory.org/revolution/computer-software/12/240
   计算机历史博物馆的 Unix 专题，包含 PDP-7/11 照片、Unix 早期文档扫描、Thompson 和 Ritchie 的历史照片。

10. **Ars Technica: "A damn stupid thing to do" — the origins of C (2020)** — https://arstechnica.com/features/2020/12/a-damn-stupid-thing-to-do-the-origins-of-c/
    一篇优秀的现代回顾文章，对 C 诞生故事的叙述生动、资料翔实。适合参考叙事节奏和素材选择。

11. **Wikipedia: The C Programming Language** — https://en.wikipedia.org/wiki/The_C_Programming_Language
    K&R 那本书的历史——出版背景、影响、Hello World 的起源、"K&R C" 作为事实标准的年代。

12. **Ritchie & Thompson, "The UNIX Time-Sharing System" (1974)** — https://dl.acm.org/doi/10.1145/361011.361061
    在 SOSP 上发表的 Unix 经典论文。Thompson 和 Ritchie 联名，是 Unix 第一次正式向学界亮相。
