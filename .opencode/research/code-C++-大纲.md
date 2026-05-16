# 研究大纲：C++：既要也要

## 叙事弧线

- **开头切入点**：以 Simula 的困境切入——"1967 年，挪威的 Dahl 和 Nygaard 发明了面向对象编程。他们的 Simula 可以描述现实世界的复杂系统——银行账户、交通模拟、物理模型。但有一个问题：Simula 的程序跑得像蜗牛一样慢。1970 年代末，一个丹麦博士生在剑桥写毕业论文时痛苦地发现了这个事实：他喜欢 Simula 的表达力，但无法忍受它的性能。他想要一种既能像 Simula 一样组织大型程序、又能像 C 一样快的语言。他决定自己造。"

- **主体故事线**：从 1979 年 Stroustrup 在贝尔实验室启动"C with Classes"开始，到 1983 年改名 C++、1985 年第一个商业发布、1989 年 C++ 2.0（多重继承）、再到 1990 年代模板和 STL 的加入、1998 年标准化。核心张力不是"让程序员更方便"（Fortran/Lisp 的路线），而是"让程序员既能控制硬件（像 C），又能组织大规模代码（像 Simula）"。C++ 的答案——"你要的性能我给你，你要的抽象我也给你，但你得自己承担复杂度"——既是它成功的秘诀，也是它永远被诟病的原因。

- **结尾（暗线升华）**：SQL 让数据查询变得简单，但软件本身越来越复杂了。1980 年代的个人电脑革命带来了第一个软件工程危机——代码量爆炸，一个人写不完了。C++ 是第一个严肃回答"如何组织大规模代码"的语言。它没有完美解决问题，但所有后来者（Java、C#、Rust）都在它的延长线上工作。暗线钩子：C++ 试图在一条语言里塞进太多东西——它的成功和它的包袱来自同一个根源。下一篇预告：Java——互联网需要一种"跑在服务器上、不怕崩溃、不挑操作系统"的语言。

## 关键人物

- **Bjarne Stroustrup（1950–）** — C++ 的创造者。丹麦奥胡斯人，工人阶级家庭，奥胡斯大学数学与计算机科学毕业（从 Kristen Nygaard 本人那里学到了 Simula 和 OOP）。剑桥大学计算机博士（分布式系统方向，David Wheeler 指导）。1979 年加入贝尔实验室，在那里创造了 C++。他不是一个"因为被逼急了所以写语言"的人——而是一个"在两张桌子之间选择，最后决定把两张桌子拼成一张"的设计者。他的核心哲学是"零开销抽象"——你不需要为你不用的特性付出性能代价。这种务实的工程师思维贯穿了 C++ 的整个设计史。

- **Rick Mascitti（？–）** — 贝尔实验室同事。1983 年提议将"C with Classes"更名为"C++"——一个玩笑式的名字，取自 C 的自增运算符，却成了计算机史上最著名的语言名称之一。

- **Alexander Stepanov（1950–）** — STL（Standard Template Library）的设计者。俄裔美国计算机科学家，通用编程的伟大倡导者。在惠普实验室工作时开发了 STL，1994 年提交给 C++ 标准委员会。他的理念是"算法应该与数据结构分离"——用迭代器作为桥梁。STL 的加入改变了 C++ 的命运，让它从"带类的 C"变成了一门真正的泛型编程语言。

- **Andrew Koenig（1952–）** — 贝尔实验室研究员，C++ 标准委员会早期成员。在 STL 加入 C++ 标准的过程中起了关键的推动作用。Stroustrup 的合作者。

- **David Musser（1946–）** — 通用编程的先驱，与 Stepanov 长期合作。实现了 STL 中关联容器的需求——用 RB-tree 实现了 set 和 map。

- **Margaret A. Ellis** — 与 Stroustrup 合著《The Annotated C++ Reference Manual》(ARM, 1990)——这是 C++ 标准化之前的事实标准。

- **Ole-Johan Dahl（1931–2002）和 Kristen Nygaard（1926–2002）** — Simula 的创造者，面向对象编程之父。挪威人，2001 年获图灵奖。Stroustrup 从他们那里继承了 OOP 的思想。

## 时间线

- **1950.12.30**: Bjarne Stroustrup 出生于丹麦奥胡斯
- **1967**: Simula 67 发布——第一个面向对象语言
- **1969–1975**: Stroustrup 在奥胡斯大学学习数学与计算机科学，从 Kristen Nygaard 处学习 Simula
- **1975–1979**: 剑桥大学计算机博士（Distributed Computing），导师 David Wheeler（图灵奖得主之一）
- **1979**: Stroustrup 加入贝尔实验室，开始"C with Classes"的工作。第一个扩展向 C 编译器添加了类、派生类、强类型检查、内联函数、默认参数
- **1982**: Stroustrup 开始开发 C with Classes 的继任者
- **1983.12**: Rick Mascitti 提议命名"C++"，名称首次公开使用
- **1984**: Stroustrup 实现第一个流 I/O 库（`<<` 输出运算符由 Doug McIlroy 提议）
- **1985.10**: C++ 第一个商业发布（Cfront 1.0）。《The C++ Programming Language》第一版出版
- **1989**: C++ 2.0 发布——多重继承、抽象类、静态成员函数、const 成员函数、protected 成员
- **1990**: 《The Annotated C++ Reference Manual》(ARM) 出版——标准化前的事实标准
- **1990–1991**: 模板和异常处理加入
- **1991**: 《The C++ Programming Language》第二版出版
- **1993**: Stroustrup 获 ACM Grace Murray Hopper 奖
- **1993.11**: Stepanov 向 ANSI/ISO 委员会展示 STL，获得压倒性好评
- **1994.07**: STL 提案获得正式批准，被纳入 C++ 标准草案
- **1994.08**: Hewlett-Packard 将 STL 实现免费发布到互联网
- **1998**: C++98 发布——第一个 ISO 标准（ISO/IEC 14882:1998）
- **2002**: Stroustrup 离开贝尔实验室，加入 Texas A&M 大学任教授
- **2011**: C++11（之前称为 C++0x）发布——语言的重大变革
- **2014**: Stroustrup 加入 Morgan Stanley 任技术研究员
- **2018**: Stroustrup 获 Charles Stark Draper Prize（美国工程院的最高奖）
- **2022**: Stroustrup 加入哥伦比亚大学任教授
- **2022.12**: C++ 在 TIOBE 指数中首次超越 Java 排第三，后升至第二

## 篇章规划

### 第一章：两个世界之间

- **叙事目标**：展示 1980 年代初软件工程的困境——代码量爆炸，Unix 内核越来越复杂，C 语言的"平面"组织方式开始吃力。同时介绍 Stroustrup 面临的"两张桌子"：Simula（表达力强但慢）和 C（快但抽象能力弱）。以一个具体的对比场景切入：同样的程序，Simula 的 class 写法整洁易维护但跑不动，C 的 struct + 函数指针写法高效但维护是噩梦。Stroustrup 要解决的问题不是"造一门更好的语言"——是"如何在不牺牲性能的前提下管理大规模代码"。
- **配图关键词**：Simula 67 manual cover, C with Classes early code listing (1979), Bell Labs Murray Hill building

### 第二章：一个丹麦人在贝尔实验室

- **叙事目标**：讲述 Stroustrup 的个人背景——奥胡斯工人阶级家庭出身、在大学从 Nygaard 本人那里学 Simula、在剑桥读博士时被 Simula 的性能问题困扰、1979 年加入贝尔实验室。他的第一个项目是分析分布式系统的 Unix 内核。在这个项目里他亲身体会了 C 的局限：写系统代码时，你想要类和封装来组织代码，但你不能牺牲性能——因为你是在写操作系统的基础设施。他不是在"做研究"——他有一个真实的工程问题要解决。这个背景让 C++ 从一开始就和学术界发明的语言不同：它诞生于贝尔实验室的"系统编程"文化，不是大学的"语言设计"文化。
- **配图关键词**：Bjarne Stroustrup portrait (young, 1980s), Bjarne at Cambridge (1970s), Aarhus University campus

### 第三章：C with Classes——你喜欢的点心和麦片粥

- **叙事目标**：1979 年，Stroustrup 在 C 编译器（Cpre）上做了第一个实验——添加了类、派生类、强类型检查、内联函数、默认参数。他称之为"C with Classes"。关键设计决策：必须 100% 兼容 C（让现有 C 代码可以直接编译）、必须比 Simula 快得多（零开销原则）、不强迫程序员用 OOP（C 子集仍然完全可用）。这个"兼容性"决定是 C++ 成功的最大原因——也是它永远背负复杂性的根源。1980 年他写了一个内部论文"Classes: An Abstract Data Type Facility for the C Language"（1982 年正式发表）。这个阶段 C++ 的最初用户是贝尔实验室内部的同事。
- **叙事目标**：聚焦 C++ 的核心设计决策——为什么"兼容 C"是一件既天才又可怕的事。它让 C++ 可以占领 C 的生态位（从第一天起就有大量库和工具），但也让 C++ 永远无法甩掉 C 的历史包袱（数组-指针混淆、头文件机制、宏）。
- **配图关键词**：C with Classes internal memo (1980), Stroustrup's C++ compiler Cpre screenshot, C with Classes class definition example

### 第四章：Cfront——C++ 如何学会走路

- **叙事目标**：Stroustrup 写了一个叫 Cfront 的工具——一个 C++-to-C 翻译器（不是编译器）。它读 C++ 代码，输出 C 代码，然后由本地的 C 编译器编译。这个决定是务实的：当时没有资源写一个完整的原生编译器，而且这样可以复用所有 C 编译器的优化和平台支持。Cfront 定义了 C++ 的早期实现策略，也留下了一些遗产（name mangling、模板实例化模型）。Cfront 本身是用 C++ 写的——自举（bootstrapping）的挑战：发布时附带了"半预处理"过的 C 代码，让没有 C++ 编译器的机器也能编译 Cfront。1985 年 10 月，Cfront 1.0 作为第一个商业 C++ 实现发布（非商业用途仅收 75 美元运费）。这个定价策略让 C++ 在学术圈和工业界迅速传播。
- **叙事目标**：讲述一个"聪明的偷懒"的故事——用翻译器而不是编译器来启动一门新语言。这个策略后来被无数语言项目模仿。Cfront 的 hacky 但实用的精神，完美体现了 C++ 的性格。
- **配图关键词**：Cfront 1.0 source code tape, Cfront to C translation example, Stroustrup at terminal (Bell Labs, 1985)

### 第五章：1983 年的圣诞节——C++ 的名字

- **叙事目标**：1983 年 12 月，Rick Mascitti 在一场玩笑中提议把"C with Classes"改名为"C++"——C 的自增运算符，暗示"比 C 更进一步"。Stroustrup 最初犹豫，但接受了。同年，新名字第一次出现在内部文档中。但 1985 年才是 C++ 真正的"诞生年"：10 月，Cfront 1.0 商业发布；同月，《The C++ Programming Language》第一版出版。这本书的语言用到了当时 C++ 还没有完全实现的功能——Stroustrup 基于他对语言的理解写了这本书，然后编译器才追上了书上的内容。这种"先写书、后实现"的反常顺序，在语言设计史上几乎是绝无仅有的。1985 年底，C++ 开始在贝尔实验室之外获得第一批认真用户。
- **叙事目标**：这个故事的高潮是把"命名"这个轻松的时刻和 1985 年的大幕拉开放在一起——C++ 有了名字、有了一本书、有了第一个编译器。语言、文档、实现三步同时齐发。
- **配图关键词**：The C++ Programming Language first edition cover (1985), Cfront 1.0 release announcement, Rick Mascitti (if photo available), C++ name origin internal memo

### 第六章：C++ 2.0——语言的青春期

- **叙事目标**：1989 年，C++ 2.0 发布。新特性：多重继承、抽象类、静态成员、const 成员函数、protected 访问控制。多重继承是最受争议的特性——Simula 和 Smalltalk 都没有它，但 Stroustrup 认为它有用（比如让一个类同时是"窗口"和"可滚动"）。这个决定后来被 Java 和 C# 明确拒绝（用接口代替），成为 C++"复杂"标签的代表证据。1990 年，《The Annotated C++ Reference Manual》(ARM) 出版——Stroustrup 和 Margaret Ellis 合著，厚达 400 多页，C 语言的 K&R 才 228 页。C++ 已经开始变得庞大。到 1990 年代初，C++ 用户群急剧扩张——Microsoft 推出了 Visual C++（1992）、Borland 推出了 Turbo C++（1991）。C++ 成了 PC 时代的主流语言。
- **叙事目标**：展示 C++ 从一个"贝尔实验室内部工具"变成"PC 时代的工业标准"。同时点出 C++ 日益增长的复杂性——ARM 的厚度已经显示了这一点。"多重继承"这个决定成了 C++ 日后被诟病的符号。
- **配图关键词**：ARM book cover (1990), Borland Turbo C++ screenshot, Microsoft Visual C++ 1.0 screenshot, C++ Standards Committee meeting photo (early 1990s)

### 第七章：模板——当 C++ 学会泛型

- **叙事目标**：1990 年代初，模板（templates）被加入 C++。最初模板的目的是创建类型安全的容器——比如 `vector<int>`、`vector<string>`，而不是用 `void*` 做类型不安全的容器。但很快人们发现模板可以做更多：模板元编程（template metaprogramming）——在编译时执行计算。这是一个意外发现：1994 年，Erwin Unruh 在 C++ 标准委员会上展示了一个程序，用模板在编译时计算素数——编译器输出错误信息中的素数序列。整个房间震惊了。模板后来成了 C++ 最强大也最复杂特性——它为 STL 铺平了道路，也让 C++ 的编译错误信息成为程序员的噩梦。
- **叙事目标**：讲"意外发现"的故事——Stroustrup 设计模板是为了容器，但社区用它做编译时计算。这种"语言的扩展超乎设计者预期"的现象，在 C++ 身上反复发生。
- **配图关键词**：Template metaprogramming prime number example, C++ template syntax example, Erwin Unruh at C++ committee (1994)

### 第八章：STL——改变 C++ 命运的礼物

- **叙事目标**：1993 年 11 月，Alexander Stepanov 在 C++ 标准委员会上展示了一个库——不是用 OOP，而是用模板实现的"通用编程"：`sort(v.begin(), v.end())`——排序算法和容器完全解耦。委员会的反应是压倒性的赞成。Andrew Koenig 推动了这个提案的快速审批。1994 年 7 月，STL 被正式纳入 C++ 标准草案。1994 年 8 月，HP 将 STL 实现免费发布在互联网上——这个时机正好赶上互联网的早期爆发。Stepanov 的通用编程哲学：算法应该操作"迭代器"而不是容器本身。迭代器是容器和算法的桥梁。这个看似简单的抽象，是 C++ 对编程语言史最重要的贡献之一。STL 的容器、算法、迭代器三部曲，成了后来几乎所有语言标准库的模型。
- **叙事目标**：STL 的故事是 C++ 篇的"第二幕"——当 OOP 的 hype 开始消退，泛型编程给了 C++ 新的活力。而且这是一个"局外人改变语言"的故事：Stepanov 不是语言设计者，是一个数学背景的库设计者，他的库成了 C++ 最伟大的部分。
- **配图关键词**：Alexander Stepanov portrait, STL proposal document (1993), HP STL release announcement (1994), first STL sort example code

### 第九章：六年标准化——C++98 的诞生

- **叙事目标**：1989 年 ANSI 启动 C++ 标准化（1991 年加入 ISO）。委员会面临巨大挑战：C++ 已经是一门快速演化的语言，委员会成员包括编译器厂商、学术界人士、以及 Stroustrup 本人。争论焦点：异常处理、运行时类型识别（RTTI）、模板的完善、名字空间。1998 年，C++98 正式发布——标准长达 700 多页（C 的 ANSI 标准大约 200 页）。C++98 稳定了语言的核心，但也锁定了它的复杂性。标准化后的 C++ 陷入了"进化停滞期"——下一个大版本 C++11 等了 13 年。但 C++98/03 统治了企业级 C++ 开发长达十年。
- **叙事目标**：标准化的故事是一面镜子——它反映了 C++ 的成就和问题。C++ 的委员会式进化模式（后来被 Python、Rust 学习）既有好处（谨慎、稳定），也有代价（缓慢、政治妥协）。
- **配图关键词**：C++98 standard document (ISO/IEC 14882:1998), C++ Standards Committee meeting photo (Stockholm 1996), Stroustrup at committee podium

### 第十章：遗产——"既要也要"的代价

- **叙事目标**：C++ 赢了——它成了有史以来使用最广泛的系统编程语言之一。Google Chrome、Microsoft Windows、Adobe Photoshop、Unreal Engine、MySQL/MariaDB、TensorFlow 底层——全都是 C++。它证明了"既要性能又要抽象"是可能的。但它也付出了代价：语言太过复杂，学习曲线陡峭，每个子集（C、OOP、模板、STL）都有自己的规则，编译错误信息让人崩溃，二进制兼容性噩梦，模块系统直到 C++20 才正式加入。更重要的是：C++ 的"零开销原则"意味着它把安全责任全部交给了程序员——内存错误仍然是 C++ 程序最大的 bug 来源。2025 年 3 月，Stroustrup 发出呼吁要求社区"捍卫 C++"——因为 Rust 正在蚕食它的生态位。暗线升华：C++ 是"软件工程危机"的第一个认真的回答——它证明了大规模代码可以通过抽象来组织，但它也暴露了"让程序员承担所有复杂度"的天花板。后来的 Java、Go、Rust 各自选了 C++ 不同的方面来继承或抛弃。
- **叙事目标**：客观评价 C++ 的历史地位，不回避它的缺陷。C++ 的伟大在于它敢于"既要也要"——但这种野心也让它永远无法简洁和完美。暗线提示：下一篇 Java 将展示一条不同的路——用虚拟机换安全、用性能换开发效率。
- **配图关键词**：C++ ISO logo, Stroustrup Draper Prize (2018), C++ vs Rust comparison imagery, "C++ is dead" meme vs reality

---

## 推荐阅读

1. **Stroustrup, "A History of C++: 1979–1991" (1993)** — https://www.stroustrup.com/hopl2.pdf
   C++ 早期发展的第一手记录。Stroustrup 本人写的 ACM HOPL-II 论文，从 C with Classes 到 C++ 2.0 的完整技术史。本文最重要的参考来源。

2. **Wikipedia: C++** — https://en.wikipedia.org/wiki/C%2B%2B
   C++ 语言完整的历史、特性、标准化历程。包含 C++98 到 C++23 的全部标准演化。事实性参考。

3. **Wikipedia: Bjarne Stroustrup** — https://en.wikipedia.org/wiki/Bjarne_Stroustrup
   Stroustrup 的生平、成就、奖项。涵盖在贝尔实验室、Texas A&M、Morgan Stanley、哥伦比亚大学的经历。

4. **Wikipedia: Standard Template Library** — https://en.wikipedia.org/wiki/Standard_Template_Library
   STL 的完整历史——Stepanov 的设计哲学、HP 的第一实现、容器-迭代器-算法三部分结构。

5. **Wikipedia: Alexander Stepanov** — https://en.wikipedia.org/wiki/Alexander_Stepanov
   STL 设计者的生平。通用编程的倡导者，从 Ada 库到 C++ STL 的漫长征途。

6. **Stroustrup, "The Design and Evolution of C++" (1994)** — https://www.stroustrup.com/dne.html
   C++ 设计哲学的全面记录。解释了为什么要多重继承、为什么选择 C 兼容、模板是怎么设计的。Stroustrup 最好的书。

7. **Wikipedia: Cfront** — https://en.wikipedia.org/wiki/Cfront
   C++ 第一个编译器的历史——C++-to-C 翻译器的技术细节、自举过程、对后来链接器的影响。

8. **Wikipedia: Simula** — https://en.wikipedia.org/wiki/Simula
   第一个面向对象语言的详细历史。Stroustrup 从 Simula 继承了类、继承、虚函数的核心概念。

9. **Stroustrup, "Evolving a language in and for the real world: C++ 1991–2006"** — https://www.stroustrup.com/hopl-almost-final.pdf
   C++ 中期发展的第二份 HOPL 论文。覆盖模板、异常、STL 集成、标准化的历史。

10. **Stroustrup's FAQ: "Why did you name it C++?"** — https://www.stroustrup.com/bs_faq.html#name
    Stroustrup 亲自解释 C++ 名字的由来——包括 Rick Mascitti 提议的故事。

11. **Computer History Museum: C++** — https://www.computerhistory.org/revolution/computer-software/12/245
    计算机历史博物馆的 C++ 专题，包含 Stroustrup 的历史照片和早期文档。

12. **Stepanov & Lee, "The Standard Template Library" (1994)** — http://www.stepanovpapers.com/
    STL 的原始技术报告。Stepanov 和 Lee 的 HP 实验室报告，定义了 STL 的设计目标和架构。

13. **Al Stevens, "The History of C++" (Dr. Dobb's Journal, 1995)** — 可搜索存档
    一篇优秀的现代回顾文章，对 C++ 从 C with Classes 到标准化的叙事生动。

14. **Wikipedia: Template metaprogramming** — https://en.wikipedia.org/wiki/Template_metaprogramming
    模板元编程的历史——Erwin Unruh 的编译时素数计算、C++ 模板的意外延伸。
