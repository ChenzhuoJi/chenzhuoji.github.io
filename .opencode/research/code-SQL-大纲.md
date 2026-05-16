# 研究大纲：SQL：问数据库一个问题

## 叙事弧线

- **开头切入点**：以"导航式数据"的痛苦场景切入——1960 年代末，一个程序员想查"上个月买过牙膏的所有客户"，但在 IMS（IBM 的层次数据库）里，他需要写几十行 COBOL 代码，手动沿着指针从客户记录"导航"到订单记录再到产品记录。数据存在，但你每次取它都要写一段"寻路"程序。然后 SQL 出现了——一句 `SELECT` 解决问题。

- **主体故事线**：从 1969–1970 年 Codd 在 IBM San Jose 实验室写出关系模型论文开始，到 1974 年 Chamberlin 和 Boyce 发明 SEQUEL，到 1979 年 Ellison 的 Oracle 抢先 IBM 上市，到 1986 年 SQL 成为 ANSI 标准。核心张力不是"算得更快"（Fortran）或"处理符号"（Lisp），而是"让用户声明想要什么，而不是怎么找"。关系模型把数据管理的权力从程序员手中交给了最终用户——但这一权力交接伴随着 IBM 内部的官僚斗争、一个天才的早逝、以及一场改变商业计算格局的创业竞赛。

- **结尾（暗线升华）**：商业计算的核心需求从"计算"变成了"查询"。懂数据比懂代码更值钱。SQL 是第一个（也是唯一一个）几乎所有人都在用的**声明式语言**——你不需要告诉计算机怎么找数据，你只需要告诉它你要什么。从会计师到市场分析师到产品经理——只要会写 `SELECT`，你就有了和数据库对话的能力。这也为后面的暗线埋下了种子：当数据管理的门槛降到足够低，人类开始产生海量数据——然后他们需要更好的语言来处理这些数据。下一篇预告：C++——软件工程的第一个危机来了，代码量爆炸，需要更好的组织方式。

## 关键人物

- **Edgar "Ted" Codd（1923–2003）** — 关系模型之父。英国出生，牛津学数学化学，二战 RAF 飞行员，密歇根大学博士（细胞自动机方向），1967 年加入 IBM San Jose 实验室。1970 年发表《A Relational Model of Data for Large Shared Data Banks》——可能是计算机史上被引用次数最多的论文之一。他是数学家/理论家，不是工程师。IBM 内部对他的理论反应冷淡，他被隔离在 System R 团队之外。1981 年获图灵奖。晚年因捍卫"关系模型"的纯洁性而和业界反目。

- **Donald D. Chamberlin（1944–）** — SQL 的共同创造者。斯坦福博士，1971 年加入 IBM Research。和 Boyce 一起设计了 SEQUEL/SQL。后来还领导了 XQuery 的设计。2009 年从 IBM 退休后加入 Couchbase。他的口述历史是 SQL 早期历史的重要第一手资料。

- **Raymond F. Boyce（1946–1974）** — SQL 的共同创造者。普渡大学博士，1972 年加入 IBM。和 Chamberlin 一起写了 SEQUEL 论文。但 1974 年 6 月因动脉瘤去世，年仅 27 岁，留下妻子和襁褓中的女儿。SQL 诞生后不到两年他就走了——没有看到它成为世界标准。BCNF（Boyce-Codd 范式）也以他命名。

- **Michael Stonebraker（1943–）** — UC Berkeley 教授，Ingres 项目的领导者。读到 Codd 的论文后决定自己做一个关系数据库。Ingres 用了不同的查询语言（QUEL），和 IBM 的 SQL 打了一场"语言战争"。后来还做了 Postgres（PostgreSQL 的前身）。2014 年获图灵奖。他的故事是"学术界 vs 工业界"的精彩对照。

- **Eugene Wong（1940–）** — UC Berkeley 教授，Stonebraker 的合作者，Ingres 联合创始人。原本是研究地理数据库的，被 Stonebraker 拉进了关系数据库项目。

- **Larry Ellison（1944–）** — Oracle 的创始人。读到 IBM 关于 System R 的论文后，意识到关系数据库的商业潜力。1977 年成立 Software Development Labs，1979 年发布 Oracle V2——比 IBM 自己的 SQL 产品还早两年。他的故事是"创业者抢在巨头前面"的经典案例。

- **Chris Date（1941–）** — IBM 研究员，Codd 的长期合作者和捍卫者。写了大量关于关系模型的书。当 Codd 和 IBM 关系紧张时，Date 和 Codd 一起离开 IBM 创办咨询公司。他的《An Introduction to Database Systems》是数据库领域的经典教材。

- **Charles Bachman（1924–2017）** — 网络/CODASYL 数据库模型的关键人物，发明了 Integrated Data Store（IDS）。1973 年获图灵奖。代表了"导航式"数据库的最高成就——也是 Codd 要颠覆的对象。

## 时间线

- **1960s中**: IBM 的 IMS（Information Management System）——为阿波罗计划开发的层次数据库——成为主流。CODASYL DBTG 在 1969 年发布网络数据库标准。数据管理的主流模型是"导航式"的。

- **1967**: Codd 加入 IBM San Jose Research Laboratory。

- **1969**: Codd 在 IBM 内部发表了一份关于关系模型的初步报告。

- **1970 年 6 月**: Codd 在 CACM 发表《A Relational Model of Data for Large Shared Data Banks》——关系模型正式诞生。

- **1971**: Codd 发表"关系完备性"论文，定义了关系代数和关系演算。DBTG 报告发布，CODASYL 网络模型标准化。

- **1972–1973**: UC Berkeley 的 Stonebraker 和 Wong 读到 Codd 的论文后启动 Ingres 项目。IBM 内部开始 System R 项目，但把 Codd 排除在外。

- **1973**: Chamberlin 从 IBM Yorktown 转到 San Jose，开始和 Boyce 合作设计查询语言。

- **1974 年 5 月**: Chamberlin 和 Boyce 发表 SEQUEL 论文（"SEQUEL: A Structured English Query Language"）。

- **1974 年 6 月**: Raymond Boyce 因动脉瘤去世，年仅 27 岁。

- **1974–1977**: System R 团队实现 SEQUEL 原型，经历了"Phase Zero"到完整原型的过程。Chamberlin 改设计——SEQUEL 改名为 SQL（因 SEQUEL 已是商标）。

- **1976**: System R 开始在 IBM 内部使用。IBM 犹豫是否商业化——怕影响 IMS 的销售。

- **1977**: Larry Ellison 成立 Relational Software, Inc.（后改名 Oracle）。读到 IBM 的论文后决定做关系数据库产品。

- **1979**: Oracle V2 发布——第一个商用的 SQL 关系数据库。比 IBM 的 SQL/DS 早两年。

- **1979**: System R 的第一个外部客户（Pratt & Whitney）上线。

- **1981**: IBM 发布 SQL/DS（面向 DOS/VSE 环境）。Codd 获图灵奖。

- **1983**: IBM 发布 DB2（面向 MVS 环境）。

- **1986**: ANSI 发布 SQL 标准（SQL-86）。标准化的选择（SQL vs QUEL）决定了 SQL 的胜利。

- **1987**: ISO 采纳 SQL 作为国际标准。

- **1990**: Codd 出版《The Relational Model for Database Management: Version 2》——试图纠正 SQL 对关系模型的偏离。同年离开 IBM。

- **2003**: Codd 在佛罗里达去世，享年 79 岁。

## 篇章规划

### 第一章：指针迷宫——导航式数据库的世界

- **核心内容**：开篇以一个具体的场景展示 1960 年代末的数据库编程——一个程序员想查"上个月买过牙膏的客户"，但在 IMS 或 CODASYL 数据库中，他必须写一段 COBOL 程序：先找到客户记录，然后沿着指针链遍历订单记录，再找到产品记录，检查是否匹配，再回到客户记录。数据是"藏在迷宫里的宝藏"——每次取数据都在做一次"航海"。IBM 的 IMS 是阿波罗计划的产物，CODASYL 的网络模型是这个年代的"标准"——但它们都要求程序员像做链表遍历一样操作数据。Charles Bachman 在 1973 年因网络数据库获图灵奖——这代表了"导航式"数据库的巅峰成就。但新的问题正在酝酿。
- **叙事目标**：让读者理解 SQL 诞生之前的世界是什么样——不是为了技术炫耀，而是让读者感受到"为什么 Codd 的方案是如此激进"。你无法理解 SQL 的革命性，除非你写过 CODASYL。
- **配图关键词**：IMS database diagram (hierarchical), Charles Bachman portrait, CODASYL DBTG report cover

### 第二章：Ted Codd——数学家误入数据库

- **核心内容**：Edgar "Ted" Codd 不是程序员，不是工程师——他是数学家。英国波特兰岛出生，牛津学数学化学，二战飞桑德兰水上飞机，战后去纽约给 IBM 做数学程序员。1953 年因受够麦卡锡主义搬到加拿大，1957 年回美国，1961–1965 年在密歇根大学读博士——论文做的是细胞自动机的自我复制（von Neumann 思想的延伸）。1967 年加入 IBM San Jose 实验室。他不是一个"因为懒所以造工具"的人（像 Backus），也不是一个"因为需要所以写语言"的人（像 Thompson）——他是一个相信"数学可以解决一切问题"的逻辑主义者。他的驱动力是：数据管理不应该靠指针遍历，应该靠集合论。
- **叙事目标**：建立 Codd 的人物形象——一个安静、严谨、不做妥协的英国数学家。他的"不合群"性格后来导致了他和 IBM 的冲突。
- **配图关键词**：Edgar Codd portrait (young, IBM 1950s), Edgar Codd in RAF uniform, IBM San Jose Research Lab (1960s)

### 第三章：1970 年那篇论文——当数据库遇到集合论

- **核心内容**：1970 年 6 月，CACM 发表了 Codd 的论文《A Relational Model of Data for Large Shared Data Banks》。13 页——其中对当时数据库实践的批判占了大半。核心思想：所有数据都可以表示为关系（relation）——本质上就是数学中的集合。用户的操作不是"沿着指针找路"，而是用关系代数（选择、投影、连接、除等）来声明想要的数据。Codd 在 1971 年进一步定义了"关系完备性"——一个语言至少要能表达关系代数的全部操作才算是"关系型"的。这篇论文在学术圈引起了轰动，但在 IBM 内部反应冷淡——因为 IBM 正在大卖 IMS。IBM 的决策层担心关系模型会蚕食 IMS 的市场。Codd 的理论被晾在了一边。
- **叙事目标**：把这篇论文放在技术史的位置上——它像 1960 年 McCarthy 的 Lisp 论文一样，在发表时没有引起足够重视，但它定义了一个新的领域。同时建立 IBM 内部的矛盾：Codd 的理论 vs IBM 的商业利益。
- **配图关键词**：Codd's 1970 CACM paper cover ("A Relational Model of Data"), Codd's cellular automaton thesis cover, IBM IMS advertising brochure (1970s)

### 第四章：两个世界——IBM 的 System R 与 Berkeley 的 Ingres

- **核心内容**：1970 年代初，两个团队几乎同时开始了关系数据库的实现。在 IBM，System R 项目在 1974 年启动——但 Codd 被排除在外，项目由非关系模型背景的人领导（Chamberlin 后来回忆说这是"政治原因"）。在 Berkeley，Stonebraker 和 Wong 读到 Codd 的论文后决定做一个自己的关系数据库——Ingres（Interactive Graphics Retrieval System 的缩写，原本是一个地理数据库项目）。两个项目走了不同的技术路线：System R 用 SQL，Ingres 用 QUEL（一个更接近关系代数的语言）。IBM 慢悠悠地做研究，Berkeley 的 Ingres 在学术圈免费分发。到 1970 年代末，Ingres 已经在 1000 多个站点运行——而 IBM 还在琢磨要不要商业化。
- **叙事目标**：平行叙事——展现同一场革命在工业界和学术界的两种面貌。这是 SQL 故事中最精彩的张力：IBM 手握 Codd 却行动迟缓，Berkeley 一群研究生反而跑在了前面。
- **配图关键词**：System R project team photo (1975), Michael Stonebraker portrait, Ingres source code tape, Berkeley campus (1970s)

### 第五章：SEQUEL——英语风格的查询语言

- **核心内容**：1973 年，Chamberlin 从 IBM Yorktown 转到 San Jose。他和 Boyce 的任务是给 System R 设计一个查询语言。他们的第一个尝试叫 SQUARE（Specifying Queries As Relational Expressions）——用数学下标/上标符号，对非技术用户不友好。于是他们做了第二个版本——SEQUEL（Structured English Query Language）。SEQUEL 的设计哲学是"让查询读起来像英语"。`SELECT ... FROM ... WHERE ...`——三个关键字说出了你要什么、从哪拿、条件是什么。1974 年 5 月，Chamberlin 和 Boyce 在 SIGMOD 研讨会上发表了 SEQUEL 论文。论文中展示了第一个完整的 SQL 查询示例。但一个月后，1974 年 6 月 18 日，Raymond Boyce 因动脉瘤去世，年仅 27 岁。Chamberlin 独自继续了 SQL 的开发。后来因为"SEQUEL"已是英国 Hawker Siddeley 公司的商标，改名为 SQL。
- **叙事目标**：聚焦 SQL 的设计时刻——它的核心设计决策（英语风格、声明式、三值逻辑 NULL）以及那个悲剧性的转折点。Boyce 的早逝给这个故事蒙上了一层阴影。
- **配图关键词**：Don Chamberlin portrait, Raymond F. Boyce portrait (age 25), SEQUEL paper (1974 SIGMOD proceedings)

### 第六章：System R 的实现——首个查询优化器

- **核心内容**：System R 不仅是 SQL 的第一个实现，它还发明了关系数据库的核心基础设施。最突出的贡献是**查询优化器**——Pat Selinger 领导的团队做了第一个基于成本的查询优化器。它的核心算法是动态规划：给定一个查询（比如连接四个表），系统会估算每种执行计划的成本（CPU + I/O），然后选择最优的。今天所有关系数据库的优化器都源于 1979 年 Selinger 等人的那篇论文。System R 还实现了多版本并发控制、事务管理（ACID）、崩溃恢复等机制。这些概念在今天看起来是常识，但在 1970 年代都是开创性的。System R 证明了关系数据库可以实现良好的事务处理性能——这是反对者最常质疑的 point。
- **叙事目标**：讲 System R 的工程成就——它解决了"声明式查询怎么高效执行"这个核心难题。优化器的发明让 SQL 从"美好的理论"变成了"可以用的产品"。
- **配图关键词**：Pat Selinger portrait, System R query optimizer diagram (1979), System R user interface screenshot (1970s)

### 第七章：抢在 IBM 前面——Oracle 的故事

- **核心内容**：1977 年，Larry Ellison、Bob Miner 和 Ed Oates 成立了 Software Development Labs。Ellison 读到 IBM 关于 System R 的论文后，意识到关系数据库的商业潜力。他们的策略简单而大胆：抢在 IBM 前面发布产品。1979 年，Oracle V2 发布——严格来说，它是第一个商用的 SQL 关系数据库（比 IBM 的 SQL/DS 早两年）。但 Oracle V2 其实不完整——没有事务处理、性能差、bug 多。但它的存在本身就是一个信号：关系数据库不是学术玩具。IBM 直到 1981 年才发布 SQL/DS，1983 年才发布 DB2——这给了 Oracle 三年的时间窗口。Ellison 的销售策略是激进的（甚至是有争议的），但结果证明他对市场的判断是对的：企业用户渴望从 CODASYL 和 IMS 的迷宫里逃出来。
- **叙事目标**：讲述这个"创业者打败巨头"的故事。Oracle 的角色在 SQL 历史中是有争议的——它用了一个不完整的实现抢占了市场，但它让"关系数据库"成为了一个真实的商业品类。
- **配图关键词**：Larry Ellison portrait (young, 1970s), Oracle V2 brochure (1979), Oracle offices in Santa Clara (1970s)

### 第八章：语言战争——SQL vs QUEL

- **核心内容**：1980 年代初，关系数据库已经不是一个新奇概念——但用哪种语言来查询它还没有定论。IBM 推 SQL，Ingres 推 QUEL（由 Stonebraker 设计的另一种关系查询语言）。QUEL 在技术上更接近 Codd 的关系演算，更简洁、更正交——但 SQL 有一个关键优势：它读起来像英语，非技术人员觉得它友好。1986 年，ANSI 发布 SQL 标准（SQL-86），选择了 SQL 而不是 QUEL。这个决定并非纯粹的技术判断——IBM 的游说力量、SQL 在商业上的早期先发优势、以及 SQL 的"英语风格"对委员会成员的吸引力都起了作用。Ingres 不得不放弃 QUEL，转而支持 SQL。这场语言战争的赢家决定了接下来三十年的数据库格局。
- **叙事目标**：讲这场"决定命运"的标准之战。不是什么技术细节的比拼——是商业力量、心理认知和时机共同决定了 SQL 的胜利。这个篇章也是"Codd 的遗憾"——SQL 标准化了，但 SQL 偏离了他的关系模型理想。他后来在 1990 年的书中花了大量篇幅纠正这些偏离。
- **配图关键词**：ANSI SQL-86 standard document, Ingres QUEL code example, Chris Date portrait, Codd's 12 rules for RDBMS

### 第九章：遗产——SELECT 改变了世界

- **核心内容**：SQL 是编程语言史上的异类——它不是给程序员写的，是给"问数据的人"写的。它让商业用户可以直接和数据库对话。`SELECT` 语句可能是人类历史上被书写次数最多的代码片段。SQL 的声明式哲学——"说什么，不说怎么"——影响深远：后来的查询语言（XQuery、SPARQL、GraphQL、NoSQL 的查询语言）都在模仿 SQL。但 SQL 也有它的阴影：标准化的速度跟不上实践，各数据库厂商的 SQL 方言导致碎片化，NULL 的三值逻辑让开发者痛苦不已。而且 Codd 一直批评 SQL 偏离了关系模型——它允许重复行、没有真正支持域（domain）、NULL 处理有问题。一个"98% 符合关系模型"的语言统治了世界——而那 2% 的差异，Codd 耿耿于怀了一辈子。
- **叙事目标**：在赞颂 SQL 的成就的同时，不回避它的争议。SQL 的成功是"足够好"哲学的胜利——它不是完美的，但它是当时最好的选择。暗线提示：SQL 降低了数据查询的门槛，但这意味着数据量开始爆炸——当所有人都在写 SELECT，数据管理进入了新的维度。
- **配图关键词**：SQL SELECT statement in terminal, Codd visiting ACM (1981), SQL logo vs NoSQL logos

### 第十章：暗线——从计算到查询

- **核心内容**：收束全文，连接暗线。Fortran 让科学家自己编程，Lisp 让机器处理符号，C 让操作系统可移植，SQL 让商业用户自己查数据。计算机从"计算工具"变成了"数据管理工具"。这是商业计算的核心转折点——在 SQL 之前，数据是程序的附属品；在 SQL 之后，数据是独立的价值。暗线提示：SQL 解决了"怎么问数据"的问题，但它引出了一个新的问题——当每个人都在问数据，数据越来越多，我们怎么存储前所未有的大规模数据？接下来：C++ 要解决软件工程的第一个危机——代码量爆炸。然后是 Java——互联网需要跨平台的语言。
- **叙事目标**：把 SQL 的故事放回"代码的故事"的大叙事里。Fortran → Lisp → C → SQL 完成了计算机从"算数"到"思考"到"基础设施"到"数据管理"的四级跳。下一篇预告：C++——软件太大了，一个人写不完了。
- **配图关键词**：SQL 25th anniversary event, ACM SIGMOD Codd Award, timeline diagram: Fortran → Lisp → C → SQL

---

## 推荐阅读

1. **Codd, "A Relational Model of Data for Large Shared Data Banks" (1970)** — https://www.seas.upenn.edu/~zives/03f/cis550/codd.pdf
   关系模型的原始论文。13 页定义了数据库领域的新范式。必读文献。

2. **Wikipedia: SQL** — https://en.wikipedia.org/wiki/SQL
   SQL 的完整历史，包括 SEQUEL 的起源、System R、标准化历程。事实性参考。

3. **Wikipedia: Edgar F. Codd** — https://en.wikipedia.org/wiki/Edgar_F._Codd
   Codd 的生平和贡献细节。包括他的二战经历、博士论文、IBM 生涯、和 Oracle 的关联。

4. **Wikipedia: IBM System R** — https://en.wikipedia.org/wiki/IBM_System_R
   System R 项目的详细历史，包括查询优化器的发明、SQL 的实现、第一个客户。

5. **Wikipedia: CODASYL** — https://en.wikipedia.org/wiki/CODASYL
   CODASYL 网络数据库模型的详细历史。理解"SQL 之前的世界"的最佳入口。

6. **Wikipedia: Donald D. Chamberlin** — https://en.wikipedia.org/wiki/Donald_D._Chamberlin
   SQL 共同创造者的生平。包含 Chamberlin 在 IBM 和后来的工作。

7. **Wikipedia: Raymond F. Boyce** — https://en.wikipedia.org/wiki/Raymond_F._Boyce
   Boyce 的短命但影响深远的一生。他和 Chamberlin 一起发明了 SQL，1974 年因动脉瘤去世。

8. **Wikipedia: Ingres (database)** — https://en.wikipedia.org/wiki/Ingres_(database)
   Ingres 项目的完整历史，从 Berkeley 研究项目到商业化的全过程。

9. **Chamberlin & Boyce, "SEQUEL: A Structured English Query Language" (1974)** — https://www.almaden.ibm.com/cs/people/chamberlin/sequel-1974.pdf
   SQL 的"出生证明"。第一份详细描述 SEQUEL 语言的论文。

10. **"A History and Evaluation of System R"** — http://www.cs.berkeley.edu/~brewer/cs262/SystemR.pdf
    System R 项目的技术回顾，包含查询优化器和并发控制的细节。

11. **Chamberlin, "Early History of SQL" (1995 SQL Reunion)** — http://www.mcjones.org/System_R/SQL_Reunion_95/
    Chamberlin 等人在 1995 年 SQL 聚会上的口述历史。大量珍贵的一手回忆。

12. **Wikipedia: Boyce–Codd normal form** — https://en.wikipedia.org/wiki/Boyce%E2%80%93Codd_normal_form
    BCNF 的介绍——Boyce 和 Codd 联合发明的数据库范式，理解关系模型的理论深度。

13. **Wikipedia: Relational model** — https://en.wikipedia.org/wiki/Relational_model
    关系模型的形式化定义。包含关系代数、元组演算、完整性约束等核心概念。

14. **Computer History Museum: SQL and Relational Databases** — https://www.computerhistory.org/revolution/computer-software/12/244
    计算机历史博物馆的关系数据库专题，包含历史照片和文档扫描。

15. **Selinger et al., "Access Path Selection in a Relational Database Management System" (1979)** — https://dl.acm.org/doi/10.1145/582095.582099
    查询优化器的开创性论文，描述了 System R 的基于成本的优化方法。

16. **The Register: "12 simple rules: How Ted Codd transformed the humble database" (2013)** — https://www.theregister.com/2013/08/19/ted_codd_90_relational_daddy/
    一篇优秀的现代回顾文章，适合参考叙事节奏。
