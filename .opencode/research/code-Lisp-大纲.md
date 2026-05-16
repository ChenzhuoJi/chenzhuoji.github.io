# 研究大纲：Lisp：符号的递归

## 叙事弧线

- **开头切入点**：以问题切入——"计算机只能算数吗？"Fortran 教会了机器算数学公式，但 McCarthy 在想一个更大的问题：计算机能不能处理符号？能不能推理？能不能理解"如果……那么……"这样的逻辑？Fortran 篇的结尾把问题抛给了 Lisp 篇——计算机能处理的不只是数字，还有思想。
- **主体故事线**：从 1956 年达特茅斯会议（McCarthy 为"人工智能"命名）到 1958 年 Lisp 诞生，再到 1962 年第一个自举编译器。核心张力不是"优化编译器"（Fortran 的主题），而是"让机器理解符号"——什么是符号？为什么需要代码即数据？递归为什么必不可少？垃圾回收从哪儿冒出来的？
- **结尾（暗线升华）**：Lisp 留下的不是一门广泛使用的语言（它从未占领主流），而是一组改变了计算机科学面貌的概念：递归、垃圾回收、动态类型、交互式编程、代码即数据。当后来的语言（Java、Python、JavaScript）悄悄借走这些想法时，很少有人记得它们来自 1958 年 MIT 的一个教授和他的研究生。

## 关键人物

- **John McCarthy（1927–2011）** — Lisp 之父。MIT 教授，人工智能一词的提出者。1958 年开始设计 Lisp，1960 年发表标志性论文《Recursive Functions of Symbolic Expressions and Their Computation by Machine》。他不是 Backus 那种"因为懒所以造编译器"的人——他是"因为想让机器思考所以造语言"的人。获 1971 年图灵奖。
- **Steve Russell（1937–）** — MIT 研究生，第一个 Lisp 解释器的实现者。他不顾 McCarthy 的嘲笑（"你在混淆理论和实践"），把论文里的 eval 函数编译成了 IBM 704 的机器码。后来还做了世界上第一个真正意义上的电子游戏 *Spacewar!*。曾经是少年 Bill Gates 的编程导师。
- **Timothy P. Hart & Mike Levin** — 1962 年写出了第一个 Lisp 编译器。这个编译器是用 Lisp 写的——这是历史上第一个自举编译器（self-hosting compiler），证明了 Lisp 可以自己编译自己。40 倍于解释器的速度提升。
- **Daniel Edwards** — MIT 研究生，在 1962 年前为 Lisp 写了最早的垃圾回收程序。垃圾回收（Garbage Collection）这个概念的发明者。
- **Marvin Minsky（1927–2016）** — McCarthy 在 MIT 的同事，MIT AI Lab 的联合创始人。虽然不是 Lisp 的创造者，但 Minsky 领导的 AI 组是 Lisp 最重要的用户群体。他做的 perceptron 和后来的符号 AI 研究都依赖于 Lisp。
- **Allen Newell & Herbert Simon** — 前 McCarthy 在达特茅斯讨论的参与者，开发了 IPL（Information Processing Language），Lisp 的前驱之一。IPL 也用列表处理，但语法复杂得多。

## 时间线

- **1955 年 9 月**: McCarthy、Minsky、Rochester、Shannon 联名提交达特茅斯会议提案，首次使用"Artificial Intelligence"一词
- **1956 年夏**: 达特茅斯会议召开，AI 作为学科诞生
- **1956 年秋**: McCarthy 从达特茅斯搬到 MIT 担任研究助理教授
- **1958 年**: McCarthy 开始设计 Lisp。受到 IPL（Information Processing Language）启发，但想做一个更优雅的代数式语言。他也是 ALGOL 委员会成员，提议将递归和条件表达式引入 ALGOL
- **1958 年**: Steve Russell 实现了第一个 Lisp 解释器——把 McCarthy 论文里的 eval 函数编译成了 IBM 704 机器码
- **1959 年**: McCarthy 发明了垃圾回收（garbage collection）用于 Lisp 的内存管理；Daniel Edwards 编写了最早的垃圾回收程序
- **1960 年 4 月**: McCarthy 发表经典论文《Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I》于 CACM
- **1960 年**: LISP 1 诞生（第一个完整实现）
- **1961 年**: LISP 1.5 发布——第一个广泛分发的版本
- **1962 年**: Hart & Levin 在 MIT 编写了第一个 Lisp 编译器，Lisp 实现了自举。40 倍速提升
- **1962 年**: Steve Russell 在 PDP-1 上写出了 *Spacewar!*，世界上第一个真正意义上的电子游戏
- **1963 年**: MIT Project MAC 成立，McCarthy 和 Minsky 领导的 AI 组成为核心成员
- **1970 年**: MIT AI Lab 从 Project MAC 中独立
- **1970–1980s**: Lisp Machines（Symbolics, LMI）试图把 Lisp 硬件化
- **1975 年**: Gerald Sussman 和 Guy Steele 在 MIT 发明 Scheme——Lisp 的一个极简主义方言
- **1984 年**: Common Lisp 诞生，试图统一多个方言
- **1994 年**: ANSI Common Lisp 标准发布
- **2007 年**: Rich Hickey 发布 Clojure——运行在 JVM 上的现代 Lisp 方言
- **2011 年 10 月 24 日**: John McCarthy 在斯坦福去世，享年 84 岁

## 篇章规划

### 第一章：计算机只能算数吗？

- **叙事目标**：建立 Lisp 诞生的根本问题。Fortran 让机器算数学，但 1956 年达特茅斯会议上 McCarthy 问了一个更激进的问题：机器能不能处理符号？能不能推理？能不能理解"概念"？用一段生动的场景把读者拉入"符号计算"的观念世界——它和"数值计算"是两种完全不同的世界观。
- **核心内容**：1956 年达特茅斯会议——一个两周的夏季工作坊，四个人提交了一份提案，第一次使用了"人工智能"这个词。McCarthy、Minsky、Rochester、Shannon——这四人背景各异但都相信机器可以思考。会议本身没有产生突破性成果，但它把一个名字印在了历史上：AI。McCarthy 从达特茅斯走到 MIT，口袋里装着一个问题："我需要一门给 AI 用的语言。"
- **配图关键词**：Dartmouth workshop proposal (1955), John McCarthy at Dartmouth (1950s), Dartmouth Hall

### 第二章：不是天才，是逻辑迷

- **叙事目标**：介绍 John McCarthy 这个人。和 Backus 不同，McCarthy 不是被"懒惰"驱动的——他是被"逻辑"驱动的。他想要让一切知识都可以形式化，让机器像人一样推理。他的人生轨迹：波士顿出生、加州理工、普林斯顿数学博士、和苏联数学家通信的俄语爱好者、改入共和党人的冷战旁观者。他的思想底色是"逻辑万能"。
- **核心内容**：McCarthy 的学术背景是数学，不是工程。他做 Lisp 不是因为觉得"编程太痛苦"（Backus 的动机），而是因为"我需要一个能处理符号的系统"。当 Fortran 在做数值优化时，McCarthy 想要的是：条件表达式、递归、动态类型、自动内存管理、以及最核心的——代码和数据不加区分。他还给 ALGOL 60 贡献了递归和条件表达式——那个时代还没有人把递归当回事。
- **配图关键词**：John McCarthy portrait (young, MIT 1950s), John McCarthy Stanford portrait (2000s)

### 第三章：Fortran 不够——寻找符号处理语言

- **叙事目标**：讲清楚为什么 Fortran 不能满足 AI 研究的需求。Fortran 的核心是"数学公式翻译"——它处理的是数字和数组。AI 需要处理的是符号：棋盘游戏的规则、逻辑推理的命题、自然语言的句子。McCarthy 尝试过 IPL（Information Processing Language）、尝试过在 Fortran 里加列表处理库——但都不满意。IPL 太复杂，Fortran 不支持递归。他决定自己做一个。
- **核心内容**：IPL（Newell, Shaw, Simon 在 1956 年做的）是 Lisp 的直接前驱。但 IPL 的语法是晦涩的，它把程序表示成一组生成器（generators），程序员需要手动管理内存。McCarthy 想要一个更优雅的东西。"递归"是他最坚持的核心——但在 1958 年，连 ALGOL 委员会的人都觉得递归是浪费机器时间。McCarthy 写信给 CACM 编辑部为递归辩护。
- **配图关键词**：IPL manual cover, IBM 704 console, punched cards (late 1950s)

### 第四章：一张纸上的语言——1960 年那篇论文

- **叙事目标**：聚焦 McCarthy 1960 年的论文——这篇文章可能是计算机科学史上最重要的论文之一，仅次于 Turing 的《Computing Machinery and Intelligence》。它的核心洞察是：用几个简单的原语（car、cdr、cons、atom、eq、cond、lambda）就可以构造出一个图灵完备的语言。而且——这篇文章宣告了 Lisp 的核心革命：程序可以表示为数据（S-expressions），因此程序可以操作程序。
- **核心内容**：McCarthy 的原始设计其实包含两种表达式：M-expressions（数学式）和 S-expressions（符号式）。M-expressions 像数学函数调用：`car[cons[A,B]]`；S-expressions 是括号列表：`(car (cons A B))`。他原本打算让程序员写 M-expressions，让计算机翻译成 S-expressions 去执行。但历史开了一个玩笑——程序员们直接爱上了 S-expressions。M-expressions 从此消失。"代码即数据"这个最深刻的设计决策，有一半是意外。
- **配图关键词**：McCarthy's 1960 CACM paper cover ("Recursive Functions of Symbolic Expressions"), Lisp 1.5 manual cover (1962)

### 第五章："你在混淆理论和实践"——Steve Russell 的私刑

- **叙事目标**：Lisp 故事里最精彩的一段轶事。McCarthy 在论文里写了一个 eval 函数——不是为了实现，而是为了定义语言。用数学的方式，定义"一个表达式如何求值"。Steve Russell 看了论文说："我可以把这个 eval 编译成机器码。"McCarthy 笑着说："你在混淆理论和实践，这个 eval 是给人读的，不是给机器跑的。"Russell 没有听他的——他做出来了。这是人类历史上第一个 REPL（Read-Eval-Print Loop）。McCarthy 后来说："Lisp 其实在定义的时候就已经几乎实现了——Russell 做的就是把数学变成了代码。"
- **核心内容**：从这个故事展开 Lisp 的几个核心设计决策：为什么是解释器而非编译器（因为 AI 需要交互式探索）、为什么REPL 是 Lisp 的标志（程序员一边写一边看结果、可以修改正在运行的程序）、为什么动态类型（AI 程序经常在运行时才知道数据的结构）。这些决策在当时看起来像是"偷懒"——但它们恰好符合"让人类在对话中探索思想"的 AI 开发场景。
- **配图关键词**：Steve Russell portrait, Steve Russell with PDP-1, IBM 704 (MIT Computation Center)

### 第六章：car、cdr 和 IBM 704 的幽灵

- **叙事目标**：讲 Lisp 最古怪也最浪漫的技术细节——它的核心操作 car 和 cdr 的名字来源于 IBM 704 的硬件寄存器设计。704 的 36 位字被分成地址部分（address part）和减量部分（decrement part），car 和 cdr 就是从这两个字段取数据的汇编宏。这个名字一直用到了今天——六十年后，所有 Lisp 方言里还在用 car 和 cdr 来指代"取第一个元素"和"取剩下的列表"。这是一个硬件偶然性凝固为软件永恒性的绝佳例子。
- **核心内容**：cons cell 的内存布局——两个指针塞进一个 36 位的机器字里。为什么是 cons、car、cdr 三个原语？Lisp 完全没有"数组"的概念——一切数据结构都是链表。这对 AI 编程有什么好处？列表可以无限增长、可以嵌套、可以包含不同类型的元素——AI 程序经常在不知道数据有多长、是什么类型的情况下工作。链表的固有弱点（随机访问慢）对 AI 编程不重要——因为 AI 程序的操作模式是"遍历并匹配"，不是"按索引取值"。
- **配图关键词**：IBM 704 control panel close-up, IBM 704 memory address register diagram, cons cell diagram

### 第七章：垃圾回收——没人想过的事

- **叙事目标**：Lisp 发明了垃圾回收（garbage collection）。在今天，GC 是现代语言的标配（Java、Python、Go、JavaScript），但在 1958 年这是一个疯狂的想法——因为那个时候的内存是按字节收费的，程序员用手动管理内存是天经地义的事。McCarthy 为什么要这样做？因为 AI 程序经常动态生成大量符号结构和链表，手动释放内存在这个场景下根本做不到——你不知道一个符号列表是否还会被别的地方引用。
- **核心内容**：MIT 研究生 Daniel Edwards 在 1962 年之前编写了最早的垃圾回收程序。它用的是"标记-清除"（mark-and-sweep）算法——标记阶段遍历所有可达的对象，清除阶段回收不可达的内存。这个算法今天还在用。McCarthy 在 1979 年回忆说："垃圾回收是我在 Lisp 里最自豪的贡献之一。"它让程序员从内存管理中解放出来——但代价是在 1958 年的机器上，GC 会暂停程序很久。"暂停"问题在半个多世纪后 Java 的 ZGC 里才真正解决。
- **配图关键词**：Daniel Edwards portrait (MIT), IBM 704 tape drives, mark-and-sweep diagram (simplified)

### 第八章：语言写语言——第一个自举编译器

- **叙事目标**：1962 年，Tim Hart 和 Mike Levin 在 MIT 写了第一个 Lisp 编译器。这个编译器是用 Lisp 写的——然后用已有的 Lisp 解释器来解释运行它，从而编译出机器码。这是历史上第一个"自举编译器"（self-hosting compiler）：Lisp 自己把自己编译成了机器码。编译器做出来之后，Lisp 的运行速度提升了 40 倍。
- **核心内容**：Hart 和 Levin 的工作不仅是一个工程成就——它证实了 Lisp 的核心哲学：Lisp 是可以用 Lisp 来扩展的。后来这个思想发展成了 Lisp 的"宏"（macro）系统——程序员可以写代码来生成代码。Paul Graham 后来在《On Lisp》里把这叫做"Lisp 的秘密武器"。宏允许你创造新的语言结构——在 Lisp 里，你不需要等语言设计者给你加语法，你可以自己加。
- **配图关键词**：Hart & Levin memo cover (AIM-39), Lisp compiler output printout (1962), MIT AI Lab PDP-1

### 第九章：括号帝国的陨落与遗产

- **叙事目标**：Lisp 从未占领主流——它的括号语法让很多人望而却步，它的性能在 PC 时代跟不上，AI 的第一次寒冬也把 Lisp 拖下了水。但 Lisp 的遗产是思想层面的：递归编程、垃圾回收、动态类型、交互式开发（REPL）、宏系统、函数式编程——这些概念几乎每一个都是从 Lisp 里冒出来、被后来的语言偷走的。
- **核心内容**：1970-80 年代的 MIT AI Lab 文化——ITS 操作系统、EMACS 编辑器（最早用 TECO，后来用 Lisp 重写）、Lisp Machine（专门跑 Lisp 的硬件工作站，Symbolics 和 LMI 试图商业化但失败）。Richard Stallman 在 AI Lab 写下了 GNU EMACS——用 Emacs Lisp 作为扩展语言。Scheme 在 1975 年诞生，SICP 成为计算机教育的圣经。Clojure 在 2007 年把 Lisp 带到了 JVM 上。
- **配图关键词**：Lisp machine (Symbolics 3600), MIT AI Lab (Tech Square 545), Richard Stallman at MIT AI Lab

### 第十章：暗线——计算从算数到思考

- **叙事目标**：收束全文。Fortran 让机器能算数学，Lisp 让机器能"处理思想"。从 Fortran 到 Lisp 不是语言的竞争——是计算机角色的根本转变：机器不只是计算器，也是推理工具。Lisp 的"代码即数据"和"交互式编程"为后来的一切铺了路——JavaScript 的函数式特点来自 Scheme、Python 的垃圾回收来自 Lisp、Java 的 JIT 编译器技术受 Lisp 的启发。每一行 `lambda` 都在致敬 McCarthy。
- **配图关键词**：John McCarthy Turing Award (1971), Lisp 50th anniversary conference (2008), Common Lisp logo

### 终章：下一篇预告

- **叙事目标**：以 "接下来，一台机器有了灵魂还不够，它还需要身体和血管" 为钩子。Lisp 让机器思考，但 1970 年代的一个贝尔实验室团队关心的是另一件事：写操作系统的人需要什么语言？预告 C：Unix 的血液。
- **配图关键词**：Ken Thompson portrait (young), Dennis Ritchie portrait (young), PDP-11

---

## 推荐阅读

1. **Wikipedia: Lisp (programming language)** — https://en.wikipedia.org/wiki/Lisp_(programming_language)
   最完整的事实参考，涵盖从 LISP 1 到 Common Lisp 到 Clojure 的完整历史。包含 car/cdr 词源、Hart & Levin 编译器、垃圾回收起源等关键细节。

2. **Wikipedia: John McCarthy (computer scientist)** — https://en.wikipedia.org/wiki/John_McCarthy_(computer_scientist)
   McCarthy 的完整生平。涵盖他在达特茅斯会议、MIT、斯坦福的经历、图灵奖、以及他的 AI 哲学。

3. **Wikipedia: Dartmouth Workshop** — https://en.wikipedia.org/wiki/Dartmouth_workshop
   1956 年达特茅斯会议的详细历史——谁参与、开了多久、讨论了什么。AI 作为学科的"出生证明"。

4. **Wikipedia: Steve Russell (computer scientist)** — https://en.wikipedia.org/wiki/Steve_Russell_(computer_scientist)
   Lisp 第一个实现者的生平。包括他实现 eval 的故事、Spacewar! 的创造、和少年 Bill Gates 的偶遇。

5. **McCarthy, "Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I" (1960)** — https://doi.org/10.1145/367177.367199
   原始论文。Lisp 的"出生证明"。展示了如何用七个基本操作（car、cdr、cons、atom、eq、cond、lambda）构建图灵完备的符号处理系统。

6. **McCarthy, "History of Lisp" (1979)** — http://www-formal.stanford.edu/jmc/history/lisp/lisp.html
   McCarthy 在 1979 年写的 Lisp 历史回忆录。包含"Steve Russell 把 eval 做出来了"的引语原文。第一手叙述，非常珍贵。

7. **Wikipedia: CAR and CDR** — https://en.wikipedia.org/wiki/CAR_and_CDR
   car 和 cdr 词源的详细解释——从 IBM 704 的地址寄存器和减量寄存器到现代 Lisp 的命名习惯。技术细节丰富。

8. **Wikipedia: MIT Computer Science and Artificial Intelligence Laboratory** — https://en.wikipedia.org/wiki/MIT_Computer_Science_and_Artificial_Intelligence_Laboratory
   MIT CSAIL 的历史——从 Project MAC 到 AI Lab 到 CSAIL。Lisp 诞生的机构背景。

9. **Paul Graham, "What Made Lisp Different" (2001)** — https://paulgraham.com/diff.html
   Paul Graham 写的经典短文，总结了 Lisp 的独特性——条件表达式、函数作为第一类对象、垃圾回收、代码即数据、宏系统。简洁有力，适合作为文章参考。

10. **Wikipedia: History of garbage collection** — https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)#History
   垃圾回收的历史，Lisp 作为 GC 的发明者。从 mark-and-sweep 到现代的分代 GC。

11. **Wikipedia: Lisp machine** — https://en.wikipedia.org/wiki/Lisp_machine
   Lisp Machine——为运行 Lisp 而设计的专用硬件工作站。Symbolics 和 LMI 的商业化尝试与失败。

12. **Computer History Museum: Lisp** — https://www.computerhistory.org/revolution/software/12/242
   计算机历史博物馆的 Lisp 专题页面，包含 Lisp 1.5 手册扫描件、IBM 704 照片、McCarthy 和 Russell 的照片。

13. **Lisp 1.5 Programmer's Manual (MIT Press, 1962)** — https://archive.org/details/lisp15programmer00john
   第一本 Lisp 手册的扫描件。可以看到 1962 年的人是怎么理解"这个奇怪的括号语言"的。

14. **Wikipedia: Recursion (computer science) — History** — https://en.wikipedia.org/wiki/Recursion_(computer_science)#History
   递归在编程语言中的历史。McCarthy 是递归在编程中的主要推动者——他在 1959 年 CACM 上的那封激进信件值得引用。

15. **Wikipedia: Kotok-McCarthy** — https://en.wikipedia.org/wiki/Kotok-McCarthy
   1962 年 McCarthy 在斯坦福写的国际象棋程序，用于和苏联进行跨洋对弈。Lisp 在 AI 中的早期应用案例。
