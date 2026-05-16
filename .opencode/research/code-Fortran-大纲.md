# 研究大纲：Fortran：把公式交给机器

## 叙事弧线

- **开头切入点**：1957 年，IBM 704 的操作间。一个物理学家把一叠穿孔卡片交给操作员，几小时后取回打印结果——他写的公式真的跑通了。人类第一次可以用数学符号和计算机对话。
- **主体故事线**：从 1953 年 Backus 提交提案，到 1957 年编译器交付——这四年里一个"不可能完成的任务"如何变成了现实。重点在"人"：一个从医学院退学两次的数学硕士、一个爱下棋的 MIT 程序员、一个刚刚毕业的女数学系学生——这些人聚在一起，写出了一个 1950 年代最复杂的程序。
- **结尾（暗线升华）**：Fortran 的遗产不仅是"第一个高级语言"这个头衔。它证明了一个道理：**计算机不应该强迫人类说机器的语言。** 计算机应该学会说人类的语言。这扇门一打开就再也关不上了——Fortran → Lisp → C → ... → Python → AI。

## 关键人物

- **John Backus（1924–2007）** — Fortran 之父。IBM 程序员，讨厌写低级语言的苦差事。"Much of my work has come from being lazy." 受图灵奖（1977），后来发明了 BNF 范式，晚年转而批判冯·诺依曼风格，提倡函数式编程。
- **Lois Haibt** — Fortran 团队唯一的女性成员，刚从 Vassar College 数学系毕业。负责编译器最核心的部分：算术表达式分析器。
- **Harlan Herrick** — 跑通了第一个 Fortran 程序的人。发明了 DO 语句和 GO TO 关键词。
- **Roy Nutt** — 前美国国务院密码分析员，非 IBM 员工，被借调参与编译器的 I/O 系统设计。
- **Sheldon Best** — MIT 派驻的发明型程序员，IBM 704 的专家，解决了许多底层优化难题。
- **David Sayre** — 晶体学家，后来在衍射显微术上做出了开拓性贡献。Fortran 团队的"科学家代表"。
- **Richard Goldberg / Peter Sheridan / Robert Nelson / Irving Ziller / Harold Stern** — 团队其他成员，各自负责编译器不同模块。

## 时间线

- **1952**: Alick Glennie 为 Manchester Mark 1 开发了 Autocode——第一个现代意义上的编译器
- **1953 年 12 月**: John Backus 向 IBM 提交 FORTRAN 提案
- **1954 年 11 月**: 初步规范《The IBM Mathematical Formula Translating System》完成
- **1954**: IBM 704 发布——第一台大规模生产的带浮点硬件的计算机
- **1956 年 10 月**: 第一本 FORTRAN 参考手册发布
- **1957 年 4 月**: 第一个 FORTRAN 编译器交付给 IBM 704 用户
- **1957**: 第一个 Fortran 程序在 Westinghouse 的 IBM 704 上成功运行（计算导弹轨迹）
- **1960**: 超过 40 种 FORTRAN 编译器在不同平台上可用
- **1966**: ANSI 发布第一个 FORTRAN 标准（FORTRAN 66）
- **1977**: John Backus 获图灵奖
- **2007 年 3 月 17 日**: John Backus 在俄勒冈州 Ashland 逝世，享年 82 岁

## 篇章规划

### 第一章：物理学家不想写代码

- **叙事目标**：建立 1950 年代初的编程困境——程序员是"人肉汇编器"，物理学家和工程师有计算需求但被编程门槛卡住。用具体的场景感让读者理解"为什么需要高级语言"。
- **配图关键词**：IBM 704 control panel, IBM 704 operator console, punched card deck (1950s)

### 第二章：Backus 的懒惰

- **叙事目标**：引入 John Backus 这个人。不是一个天才程序员，而是一个"因为懒所以想偷懒"的聪明人。讲他的背景——从医学院退学两次的奇怪履历、在 IBM 701 上做 Speedcoding 的经验。然后引出 1953 年他提交给 IBM 的 Fortran 提案。
- **配图关键词**：John Backus portrait (1989), John Backus at IBM 701, IBM SSEC

### 第三章：十个不匹配的人

- **叙事目标**：介绍 Fortran 团队——一个晶体学家、一个密码分析员、一个象棋高手、一个刚毕业的女数学系学生……这些人怎么走到了一起。强调团队的非传统性，以及 Lois Haibt 作为唯一女性成员的特殊位置。"No one was worried about seeming stupid or possessive of his or her code."
- **配图关键词**：Fortran team photo (partial group, 1982 exhibit), Lois Haibt portrait, Harlan Herrick portrait

### 第四章："他们说不可能"——编译器本身就是最复杂的程序

- **叙事目标**：聚焦编译器的工程困境。1950 年代还没有"编译器"这个成熟的概念。Fortran 编译器是当时最复杂的软件项目——18 人年、1950 年代最复杂的程序。关键在于：它必须生成接近手写汇编的机器码，否则科学家不会用。Backus 团队做了第一个优化编译器。
- **配图关键词**：Fortran manual cover (1956, "The Fortran Automatic Coding System for the IBM 704"), IBM 704 at NACA (1957)

### 第五章：y = x + 1——那个改变一切的表达式

- **叙事目标**：讲述 Fortran 语言的第一个关键时刻——人类第一次可以用数学自然语言和计算机对话。拆解 Fortran 的关键设计决策：为什么用公式翻译而非自然语言解析、为什么牺牲灵活性换性能、DO 循环的发明、固定列格式的来源（punch card 物理限制）。
- **配图关键词**：Fortran punch card (showing column layout), Fortran coding form pad, first Fortran program output

### 第六章：蒙特卡洛——编译器做优化，不是人来做

- **叙事目标**：深入一个具体的技术奇观——Fortran 编译器用蒙特卡洛模拟来做代码优化。这是编译器历史上最有想象力的工程创举之一。FREQUENCY 语句的作用、基本块的放置优化、随机数生成器决定代码布局。这不是"教科书式的编译器设计"，这是"没有办法的办法"——但效果惊人。
- **配图关键词**：IBM 704 vacuum tube module, IBM 704 in the Museo Nazionale Scienza e Tecnologia Milano

### 第七章：一叠卡片与一个行业

- **叙事目标**：讲 Fortran 的传播和影响。1957 年交付后，IBM 给了西屋电气——他们用 Fortran 算导弹轨迹。1960 年已有 40 多种编译器。1963 年超过 220,000 本 Fortran 手册被分发。Fortran 从一个 IBM 的内部项目变成了行业标准。第一行 `y = x + 1` 催生了整个软件产业。
- **配图关键词**：Fortran card deck (complete program for IBM 7090, 1962), Fortran 25th Anniversary exhibit (1982 NCC)

### 第八章：暗线——解放科学家，解放计算

- **叙事目标**：跳出 Fortran 本身，看它带来的连锁反应。Fortran 让科学家从"找程序员写代码"变成了"我自己写代码"。这改变了科学研究的节奏——不再需要排队等程序员，实验和计算之间的迭代速度大幅提升。它也催生了数值天气预测、有限元分析、计算流体力学等新学科。计算从"辅助"变成了"核心"。
- **配图关键词**：John Backus at Draper Prize (1993), Fortran logo evolution

### 第九章：遗产——仍在奔跑的代码

- **叙事目标**：收束全文。Fortran 至今仍在超算 TOP500 的基准测试中、仍在气象预测和粒子物理的计算核心中运行。它的寿命本身就证明了当初的设计取舍是对的：效率优先，决定了它在科学计算中的不可替代性。同时引出暗线：Fortran 打开了第一扇门——接下来是 Lisp 打开了第二扇。
- **配图关键词**：Fortran logo (modern), TOP500 supercomputer running Fortran benchmarks

### 终章：下一篇预告

- **叙事目标**：以"Lisp 要处理的不再是数字，而是符号"作为钩子。Fortran 解放了科学家的计算能力——但他们还想教计算机思考。预告 Lisp：符号的递归。
- **配图关键词**：John McCarthy portrait (1960s), Lisp 1.5 manual cover

---

## 推荐阅读

1. **Wikipedia: Fortran** — https://en.wikipedia.org/wiki/Fortran
   最完整的事实性参考，涵盖从 FORTRAN I 到 Fortran 2023 的演变历史。

2. **Wikipedia: John Backus** — https://en.wikipedia.org/wiki/John_Backus
   Backus 的生平，包括他早期的曲折经历、Fortran 团队组建、BNF 范式和后来的函数式编程工作。

3. **Wikipedia: IBM 704** — https://en.wikipedia.org/wiki/IBM_704
   了解 Fortran 最初运行的硬件平台——第一个大规模生产的带浮点硬件的计算机。

4. **IBM History: Fortran** — https://www.ibm.com/history/fortran
   IBM 官方的 Fortran 历史页面，包含团队照片、历史背景和关键时间线。有 Lois Haibt 等团队成员的引语。

5. **IBM History: John Backus** — https://www.ibm.com/history/john-backus
   Backus 的个人故事页面，包含他在 IBM 704 前的照片。

6. **Wikipedia: History of compiler construction** — https://en.wikipedia.org/wiki/History_of_compiler_construction
   将 Fortran 编译器放在编译器技术史的大背景中理解。Fortran 编译器作为"第一个商用编译器"的历史位置。

7. **ACM Turing Award: John Backus** — https://amturing.acm.org/award_winners/backus_0703524.cfm
   图灵奖官方评语和传记，权威性高，包含了 Backus 的 1977 年图灵奖演讲全文（"Can Programming Be Liberated from the von Neumann Style?"）。

8. **Backus et al., "The FORTRAN Automatic Coding System" (1957)** — 原始论文，收录于 Western Joint Computer Conference 论文集。
   描述编译器架构和蒙特卡洛优化方法的第一手文献。是理解"为什么 Fortran 编译器如此先进"的核心文献。

9. **The Fortran I Compiler (IBM 704)** — https://www.computerhistory.org/revolution/fortran/1
   Computer History Museum 的 Fortran 专题页面，有大量历史照片和文物扫描。

10. **Mark Jones Lorenzo, *Abstracting Away the Machine: The History of the FORTRAN Programming Language* (2019)** — 
    一本详细介绍 Fortran 历史的独立出版物，包含 IBM 704 平均 8 小时故障一次等工程细节。

11. **Sayre, D. (1956), "The FORTRAN Automatic Coding System"** — 1956 年的第一本 FORTRAN 参考手册。
    程序员参考手册的原始形态，是理解"1956 年人们以为程序是什么样"的一手资料。

12. **Fortran Programming Language - fortran-lang.org** — https://fortran-lang.org/
    现代 Fortran 社区的主页，包含 Fortran 至今仍在活跃发展的证明（Fortran 2023）。
