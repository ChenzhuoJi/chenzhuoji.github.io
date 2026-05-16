# 研究大纲：R：统计学家造了一门语言

> 栏目：代码的故事 | 系列：第五章·网络的语言 | Order: 9 | 语言：R

---

## 叙事弧线

### 开头切入点
1991 年，新西兰奥克兰大学统计系。两个教授 Ross Ihaka 和 Robert Gentleman 站在教研室的黑板前，讨论一个让他们越来越烦躁的问题：下学期的统计课用什么软件？

他们面对的选择让人沮丧——SAS 和 SPSS 是工业级的商业软件，贵、封闭、学生毕业就没法用；S-PLUS 把 Bell Labs 的 S 语言商业化之后同样昂贵；用 Fortran 或 C 写统计代码？那是 1970 年代的方式，每次换一个数据集，就要重写半个程序。他们需要的不是一个"更便宜的 SAS"——他们需要的是一个让统计学家能自由探索数据的语言，像 S 语言当年那样开放，但更好、更自由、不受任何一家公司控制。

他们决定自己造一个。

### 主体故事线
1. **S 语言的遗产**（1976–1990）——John Chambers 在 Bell Labs 创造了 S，一个"把想法变成软件"的交互式统计环境。S 在学术界自由传播，但 1988 年被商业化成了 S-PLUS——开源的大门关上了。
2. **两个 R**（1991–1993）——Ihaka 和 Gentleman 在奥克兰大学开始写一个 S 的"克隆"。他们从 Scheme 借来了词法作用域，从 S 借来了语法和交互模型。名字叫 R——既是 S 的下一个字母，也是他们名字的首字母（Ross & Robert）。
3. **StatLib 的夜晚**（1993）——1993 年 8 月，他们把 R 的二进制文件放到了 StatLib 上，同时在 s-news 邮件列表发了一条简短的通知。没有新闻发布会，没有"改变世界"的宣言。只是两个教授说："嘿，我们做了个东西，你们试试看。"
4. **选择 GPL**（1995）——1995 年，R 在 GNU GPL 下正式发布。这个决定极其关键：它不是"免费软件"（像当年的 S 那样），而是"自由软件"——任何人可以永远免费使用、修改、分发。但这也意味着 R 没有公司撑腰，只能靠社区。
5. **CRAN 的诞生**（1997）——Kurt Hornik 和 Friedrich Leisch 建立了 Comprehensive R Archive Network，模仿 TeX 的 CTAN 和 Perl 的 CPAN。CRAN 让任何统计学家都能把自己的方法打包成 R 包，一键安装。这是 R 生态爆发的起点——不是语言本身的特性吸引了人，是"你能在这里找到别人写好的统计方法"。
6. **1.0.0**（2000.2.29）——闰日发布。R 从一个"教学工具"变成了"真正的语言"。R Core Team 形成，版本进入了正经的轨道。
7. **看数据的新方式**（2005–2007）——Hadley Wickham，一个新西兰的博士生，在 Iowa State 写出了 ggplot2。他受 Leland Wilkinson 的《The Grammar of Graphics》启发，创造了一套全新的数据可视化语法。ggplot2 改变了"人们怎么看数据"——从"画个图"变成了"用图层讲述一个关于数据的故事"。
8. **IDE 和可重复研究**（2011–）——J.J. Allaire（ColdFusion 的创造者）做了 RStudio，一个让 R 变得友好的 IDE。R Markdown 让分析报告可以"代码 + 文字 + 图"混排，开启了可重复研究运动。
9. **意想不到的终点**——R 最终不是"统计学家的小工具"，它成了数据科学的基础设施。2025 年，CRAN 上有超过 22000 个包。一个由两个教授在校园里写出来的教学工具，统治了数据分析的世界。

### 结尾（暗线升华）
最好的工具通常不是规划出来的——它是某个人为了解决自己的问题而创造的东西，然后发现别人也需要它。

R 的故事和本章前面所有语言都不同：JavaScript 被 Netscape 的战略需要催生，PHP 被一个工程师的个人痛点驱动，但 R 是学术界的产物——它来自一个没有任何商业野心的地方：大学统计系的走廊。它最美的讽刺是：这门一开始被认为"不够程序员"的语言（慢、内存管理粗糙、语法古怪），最终因为它的包生态和可视化能力，成了数据科学家无可替代的武器。

结尾钩子指向下一篇（Python·上篇）：就在 R 在统计学界悄悄攻城略地的时候，在荷兰的数学与计算机科学中心（CWI），另一位叫作 Guido van Rossum 的荷兰人也在造一门语言——而他的语言会走向一条完全不同的路。

---

## 关键人物

- **John Chambers**（1941–）——S 语言之父。1976 年在 Bell Labs 创造 S，1998 年获 ACM 软件系统奖。他的设计哲学"to turn ideas into software, quickly and faithfully"定义了整个统计计算的方向。退休后加入 Stanford，参与 R 项目。
- **Ross Ihaka**（1954–）——新西兰统计学家，奥克兰大学副教授，毛利裔（Ngāti Kahungunu）。1991 年和 Gentleman 一起启动 R 项目。退休后在做一个基于 Lisp 的新统计语言。
- **Robert Gentleman**（1959–）——加拿大统计学家，与 Ihaka 共同创建 R。后来创建 Bioconductor 项目。曾任 23andMe 计算生物学副总裁，现任 Harvard 计算生物医学中心创始主任。
- **Kurt Hornik** & **Friedrich Leisch**——1997 年创建 CRAN。Hornik 至今仍在维护 CRAN。Leisch 是 R Core 成员，参与了 R 的早期设计。
- **Hadley Wickham**（1979–）——ggplot2 创造者，tidyverse 之父。2019 年获 COPSS 主席奖（统计学最高青年奖之一）。Posit（前 RStudio）首席科学家。R 社区最核心的非创始人贡献者。
- **J.J. Allaire**——ColdFusion 创造者，2009 年创立 RStudio（后改名 Posit PBC）。赞助了大量的 R 包开发和社区建设。2011 年发布 RStudio IDE，2012 年雇用了 Hadley Wickham。

---

## 时间线

- **1976**: John Chambers 在 Bell Labs 开始开发 S 语言
- **1980**: S 开始在学术界外分发
- **1984**: 《S: An Interactive Environment for Data Analysis and Graphics》（"棕皮书"）出版
- **1988**: "New S"（S3）发布，同年 S-PLUS 商业化
- **1991**: Chambers & Hastie 出版《Statistical Models in S》（"白皮书"）
- **1991**: Ihaka 和 Gentleman 在奥克兰大学开始设计 R
- **1993.08**: R 首版二进制文件发布在 StatLib，在 s-news 邮件列表宣布
- **1995**: R 在 GPL 下发布（版本 0.60 左右，具体的 GPL 化过程贯穿 1995–1997）
- **1997.04.23**: Kurt Hornik 宣布 CRAN 成立
- **1997.12.05**: R 成为 GNU 项目，版本 0.60
- **1998**: John Chambers 获 ACM 软件系统奖
- **2000.02.29**: R 1.0.0 发布（闰日）
- **2004.10.04**: R 2.0.0 发布
- **2005**: Hadley Wickham 开始开发 ggplot2
- **2007.06.10**: ggplot2 首次发布
- **2008**: Ihaka 和 Gentleman 获得新西兰皇家学会 Pickering 奖章
- **2009.01.06**: Ashlee Vance 在《纽约时报》发表"Data Analysts Captivated by R's Power"，R 第一次进入主流媒体视野
- **2009**: J.J. Allaire 创立 RStudio Inc.
- **2011.02.28**: RStudio IDE 发布
- **2012.08**: Hadley Wickham 加入 RStudio
- **2014**: tidyverse 概念开始成形
- **2016**: RStudio 1.0 发布
- **2022.07**: RStudio 更名为 Posit PBC
- **2025**: CRAN 上有超过 22,000 个包

---

## 篇章规划

### 第一章：统计学家想写代码

- **叙事目标**：让读者进入 1990 年代初一个统计学家的世界——他们面对的数据分析工具要么贵（SAS/SPSS），要么难（Fortran/C），要么被公司锁死（S-PLUS）。开篇从 Ihaka 和 Gentleman 在奥克兰大学的走廊对话切入，提出核心问题："为什么统计学家没有自己的语言？"
- **核心内容**：1980 年代末到 1990 年代初的统计软件格局。SAS 统治企业，SPSS 统治社科，S-PLUS 学界的最后堡垒。与此同时，C 和 Fortran 虽然强大但门槛极高——统计学家不想成为系统程序员，他们想做数据分析。1991 年，Ihaka 和 Gentleman 决定写一个"更好的 S"来教课。
- **配图关键词**：1990s SAS 软件界面截图 / 奥克兰大学统计系老照片 / S-PLUS 软件窗口

### 第二章：S：贝尔实验室的遗珠

- **叙事目标**：回溯 S 语言的故事——John Chambers 在 Bell Labs 做了什么，以及 S 如何从自由交流变成了商业化封闭。
- **核心内容**：1976 年，John Chambers、Rick Becker、Allan Wilks 等人在 Bell Labs 开始写 S。核心理念是"交互式数据分析"——不是写一个完整的程序再运行，而是"输入一行命令，立刻看到结果"。1970 年代还没有"交互式计算"这个概念。Chambers 的哲学："to turn ideas into software, quickly and faithfully。"S 在学术界自由传播，1984 年出版 "Brown Book"，1988 年"New S" 发布。但同年 S-PLUS 商业化——S 成为 TIBCO 的财产。自由的大门关上了。
- **配图关键词**：John Chambers 在 Bell Labs 的照片 / "S: An Interactive Environment for Data Analysis and Graphics" 棕皮书封面 / Bell Labs 建筑外景 / PDP-11 终端

### 第三章：两个 R

- **叙事目标**：Ihaka 和 Gentleman 的创造故事——他们从哪儿来，为什么选了这条技术路线，R 这个名字怎么来的。
- **核心内容**：Ross Ihaka 在 UC Berkeley 师从 David Brillinger 做地震统计，Robert Gentleman 从 University of Washington 博士毕业。两人 1991 年都到了奥克兰大学。他们试用了当时所有统计软件都失望，决定自己写。为什么选 Scheme 的词法作用域？为什么模仿 S 的语法？为什么用 C 实现？名字 R ——既是"Ross & Robert"的首字母，又是 S 的下一个字母。
- **配图关键词**：Ross Ihaka 肖像照（2010 New Zealand Open Source Awards）/ Robert Gentleman 肖像照 / 奥克兰大学统计系现代照片 / R 早期终端截图

### 第四章：StatLib 的夜晚

- **叙事目标**：1993 年那个低调的发布时刻——没有 VC、没有 PR、没有"改变世界"——只是两个教授在邮件列表里贴了一个链接。
- **核心内容**：1993 年 8 月，Ihaka 在 s-news 邮件列表发出了一条简短的消息，宣布 R 的二进制文件已上传到 StatLib。这和 Rasmus Lerdorf 发 PHP 的 Usenet 帖子很像——语气平淡，内容简短。附带的是一份工作论文，后来 1996 年正式发表在 Journal of Computational and Graphical Statistics。令人意外的是，s-news 上的反应是有兴趣但不狂热——一些 S-PLUS 用户下载了它，提了 bug，提了需求。R 就这样开始了它的生命。
- **配图关键词**：StatLib 网站早期界面 / s-news 邮件列表界面（模拟） / 1993 年的 Unix 终端界面

### 第五章：为什么 GPL

- **叙事目标**：1995–1997 年，R 团队做了一个最关键的决定——GPL。解释为什么这对 R 的命运如此重要。
- **核心内容**：1995 年 R 在 GPL 下发布。这对 Ihaka 和 Gentleman 来说不是一个意识形态的选择，而是一个务实的选择：他们不希望 R 重蹈 S 的覆辙——从自由变成商业，又被锁死。GPL 保证 R 永远是自由的。但这意味着没有公司为 R 做支持、做市场、做开发者关系。R 只能靠社区。1997 年 12 月，R 成为 GNU 项目。R Core Team 成立——一开始只有 8 人（Ihaka, Gentleman, Chambers, Dalgaard, Hornik, Leisch, Maechler, Tierney）。
- **配图关键词**：GPL 标志 / 1997 年 R-announce 邮件列表截图 / R Core Team 早期合影 / 新西兰开源大奖颁奖照片

### 第六章：CRAN 和包生态

- **叙事目标**：把焦点从"语言本身"转移到"包的生态"——CRAN 才是 R 真正的杀手锏。
- **核心内容**：1997 年，Kurt Hornik 和 Friedrich Leisch 创建了 CRAN，模仿 TeX 的 CTAN 和 Perl 的 CPAN。一开始只有 3 个镜像站和 12 个包。到 2025 年：90 个镜像站，超过 22,000 个包。为什么这个机制重要？因为统计学是个极度碎片化的领域——新的统计方法每天都在被发明。没有 CRAN，每个统计学家都要自己实现别人的方法；有了 CRAN，一个 `install.packages("method_name")` 就能安装任何人的最新研究。CRAN 的包审查机制（手动审查每个新提交的包）虽然被抱怨严苛，但它保证了质量。
- **配图关键词**：CRAN 网站首页截图 / CRAN 包数量增长曲线（如必要） / 早期 R 包安装截图 / Kurt Hornik 照片

### 第七章：看数据的新方式——Hadley Wickham 与 ggplot2

- **叙事目标**：讲述 Hadley Wickham 的故事——一个新西兰的博士生如何用一套"图形的语法"改变了全世界看数据的方式。
- **核心内容**：2005 年，Hadley Wickham 在 Iowa State 读博，受 Leland Wilkinson 的《The Grammar of Graphics》启发，开始写 ggplot2。核心洞见："画图不是一个个孤立的函数调用——画图是用图层和映射来描述一个可视化的语法。"`ggplot(data, aes(x, y)) + geom_point() + geom_smooth()`——这种链式调用在 2007 年看起来很怪，但后来成了数据可视化的标准范式。ggplot2 的影响超越了 R——它影响了 Python 的 seaborn、 plotnine，甚至改变了人们对"数据可视化"这件事的理解。Wickham 后来加入 RStudio，创造了 tidyverse——一个包括 dplyr、tidyr、readr 等包的"R 方言"，让数据处理的管道操作 (`%>%`) 成为现代数据科学的标配。
- **配图关键词**：Hadley Wickham 照片 / ggplot2 hex logo / ggplot2 绘制的钻石数据集散点图 / Grammar of Graphics 书封面 / tidyverse hex logos 集合

### 第八章：RStudio 与可重复研究

- **叙事目标**：RStudio 如何把 R 从终端变成了一个完整的创作环境，以及 R Markdown 如何催生了可重复研究运动。
- **核心内容**：2011 年，J.J. Allaire 发布了 RStudio IDE——一款开源、跨平台、集成了代码编辑器、终端、数据浏览器、绘图窗口的 IDE。它让 R 变得友好。更重要的是 R Markdown（由 Yihui Xie 的 knitr 推动）——让分析报告可以同时包含代码、结果、文字。一篇论文的整个数据分析流程可以被嵌入一个 `.Rmd` 文件，评审者可以一键复现。这在"可重复性危机"（Nature 2016 调查中 70%+ 的研究者无法复现他人的实验）的背景下产生了深远影响。RStudio 公司（后改名 Posit）雇用了 Hadley Wickham、Yihui Xie、Jenny Bryan 等 R 社区的核心人物，把 R 的生态从"一群志愿者"变成了"有公司背书的专业工具"。
- **配图关键词**：RStudio IDE 截图 / R Markdown 渲染的 PDF 文档示例 / J.J. Allaire 照片 / posit::conf 会议照片 / Shiny 应用截图

### 第九章：数据科学的基础设施

- **叙事目标**：收束全篇——R 最终留下了什么？两个教授在奥克兰大学写的"小语言"如何定义了数据科学这个学科。
- **核心内容**：R 的成就不是技术上最优雅的（它慢、内存管理差、语法不一致），但它做了其他语言没做到的事：它让"数据分析"本身变成了一门语言。统计学家不再需要先学计算机科学再学统计——他们可以直接用数据科学的语言思考。R 包生态意味着新的统计方法可以在论文发表的同时就有可用的实现。2015 年以后，Python 在机器学习领域超过了 R，但在统计推断、实验设计、生物信息学、学术统计中，R 仍然是第一选择。更重要的是，R（和 Python 一起）把"数据科学"从大公司的秘密武器变成了任何人都可以学习的公开技能——这是对"分析权"的民主化，和 PHP 对"建站权"的民主化遥相呼应。
- **配图关键词**：R logo 不同版本演变 / useR! 会议合影 / R 社区 R-Ladies 活动照片 / R 基金会 Logo / R 1.0.0 CD 照片

---

## 推荐阅读

1. **Ihaka, R.; Gentleman, R. (1996). "R: A Language for Data Analysis and Graphics". Journal of Computational and Graphical Statistics, 5(3), 299–314.** — R 的奠基性论文，描述了 R 的设计目标和关键特性。这是 R 作为学术成果的第一次正式发表。
   https://doi.org/10.2307/1390807

2. **Chambers, J.M. (1998). *Programming with Data: A Guide to the S Language*. Springer.** — Chambers 关于 S 语言的总结，其中包含了对 S 语言设计哲学的重要阐述。R 是 S 的"精神继承者"。
   https://link.springer.com/book/9780387985039

3. **Vance, Ashlee (2009.01.07). "Data Analysts Captivated by R's Power". The New York Times.** — 第一篇让 R 进入主流视野的主流媒体文章，报道了 R 在企业数据分析领域的崛起。
   https://www.nytimes.com/2009/01/07/technology/business-computing/07program.html

4. **Hornik, Kurt (1997). "ANNOUNCE: CRAN". r-announce mailing list.** — CRAN 成立的原始公告。代码的故事栏目的经典史料：一个基础设施被宣布的那一刻。
   https://stat.ethz.ch/pipermail/r-announce/1997/000001.html

5. **Wickham, Hadley (2010). "A Layered Grammar of Graphics". Journal of Computational and Graphical Statistics, 19(1), 3–28.** — ggplot2 的理论基础论文，阐述了"图形的语法"如何在 R 中实现。
   https://doi.org/10.1198/jcgs.2009.07098

6. **Chambers, John (2020). "S, R, and Data Science". The R Journal, 12(1), 462–476.** — Chambers 在 2020 年回顾 S 和 R 的历史，以及数据科学如何被这两种语言塑造。难得的"知情者回忆"。
   https://journal.r-project.org/archive/2020/RJ-2020-028/index.html

7. **Wikipedia: S (programming language)** — S 语言的历史，包括"旧 S"、"新 S"、S4 等各个版本阶段的详细描述。
   https://en.wikipedia.org/wiki/S_(programming_language)

8. **Wikipedia: R (programming language) — 历史章节** — 提供 R 从 1991 年至今的完整时间线和版本历史。
   https://en.wikipedia.org/wiki/R_(programming_language)#History

9. **Ihaka, Ross (2010). "R: Lessons Learned, Directions for the Future". Joint Statistical Meetings 2010.** — Ihaka 在 JSM 2010 的演讲，回顾了 R 的设计教训和他对未来方向的思考。这是一个创始人对"我们当时做对了什么/做错了什么"的坦诚反思。
   https://www.stat.auckland.ac.nz/~ihaka/downloads/JSM-2010.pdf

10. **Thieme, Nick (2018). "R generation". Significance, 15(4), 14–19.** — 一篇关于 R 社区和 CRAN 维护体系的社会学观察，描述了 R 包生态的繁荣和 CRAN 维护者"接近退休年龄"的可持续性危机。
    https://doi.org/10.1111/j.1740-9713.2018.01169.x

---

*大纲完成时间：2026-05-16*
*研究员注：建议撰稿时特别注意第三章（两个 R 的起源）和第六章（CRAN 的生态效应）——前者是本篇区别于其他语言故事的核心亮点（学术界、教学需求驱动的语言创造），后者是 R 真正的秘密武器（包生态系统的网络效应）。第九章的暗线升华应联系第五章的网络主题——R 虽然不是典型的"网络语言"，但它通过包生态和数据可视化改变了互联网时代"数据如何被理解和传播"的方式。*
