# 研究大纲：特别篇·GitHub：代码的社交网络

## 叙事弧线

- **开头切入点**：2005 年 4 月 4 日，Linux 内核邮件列表炸了。Larry McVoy 宣布收回 BitKeeper 的免费许可——这意味着 Linux 内核开发团队失去了他们用了三年的版本控制系统。Linus Torvalds 在邮件里愤怒地宣布："我将写一个更好的。" 整个开源世界都在问同一个问题：一个版本控制系统，能有多难写？（答案是：Linus 用两个星期就给出了答案。）

- **主体故事线**：双线叙事交替推进。**明线**是技术诞生史——Git 如何在 2005 年的 BitKeeper 危机中诞生（Linus 的设计原则、十天写出原型、Junio Hamano 接棒维护）→ GitHub 如何在一个酒吧的夜晚被构思出来（Tom Preston-Werner、Chris Wanstrath、PJ Hyett）→ Pull Request 的发明如何重新定义了协作→ 微软的 75 亿美元收购。**暗线**是"协作方式的进化史"——从邮件打补丁到版本控制系统，从中央仓库到分布式，从"给我发个 diff"到"开一个 Pull Request"。每次变革都在降低协作门槛，都在扩大"谁可以参与写代码"这个问题的答案。

- **结尾（暗线升华）**：GitHub Copilot 的出现让这个故事的暗线走到了一个奇异的终点——协作的对象不再只是人类了。AI 开始写代码，Pull Request 里出现了机器人的名字。但这也正是"降低门槛"这条暗线的最终形态：写代码曾经是数学家的特权，后来是程序员的职业，现在是任何会说话的人都能做的事。GitHub 从一个"给程序员用的社交网络"变成了"代码之所以存在的基础设施"。这个故事不属于任何一种编程语言，但所有编程语言都被它改变了。

---

## 关键人物

- **Linus Torvalds（1969–）** — Linux 内核的创造者，Git 的创造者。2005 年因为 BitKeeper 许可危机，用两周时间写出了 Git 的原型。设计哲学："如果拿不准，就做和 CVS 相反的事。" Git 的最初用户是 Linux 内核团队，但 Torvalds 在设计之初就考虑了分布式协作的通用需求。2005 年 7 月将 Git 维护权交给 Junio Hamano。

- **Larry McVoy（1962–）** — BitMover 公司创始人，BitKeeper 的创造者。曾在 Sun 工作，设计了 TeamWare。2002 年向 Linux 内核团队免费提供 BitKeeper，2005 年因 Andrew Tridgell 逆向工程 BitKeeper 协议而收回许可。这个决定间接催生了 Git 和 Mercurial。

- **Andrew Tridgell（1967–）** — Samba 项目的创始人，以逆向工程著称。编写了 SourcePuller 工具，能读取 BitKeeper 仓库的元数据。McVoy 认为这违反了 BitKeeper 的许可协议，遂收回 Linux 内核团队的免费许可。Tridgell 本人并未参与 Git 的开发——"Linus 在邮件里骂了我一遍，然后自己去写了一个更好的。"

- **Tom Preston-Werner（1979–）** — GitHub 联合创始人，GitHub 名字的提出者。Ruby 社区活跃成员，Powerset 工程师。2007 年 10 月在旧金山 Zeke's Sports Bar 和 Chris Wanstrath 一起构思了 GitHub。创建了 Grit（Ruby 访问 Git 的库）。2008 年拒绝了微软的 $300K 留任 offer，全职投入 GitHub。GitHub 的 CTO 和 Chief Octocat。2014 年因骚扰指控辞职。

- **Chris Wanstrath（1985–）** — GitHub 联合创始人兼前 CEO。2007 年和 Preston-Werner 一起在 Zeke's Bar 敲定了 GitHub 的雏形。写了 GitHub 的第一个 Rails 应用。主导了 GitHub 从创业公司到被微软收购的整个过程。2018 年收购时，他从这笔交易中个人获利约 2 亿美元。

- **P. J. Hyett** — GitHub 联合创始人。2008 年 1 月加入，是第三个合伙人。负责 GitHub 的运营和社区管理。参与了定价策略、产品方向等关键决策。2014 年后逐渐淡出。

- **Scott Chacon** — GitHub 联合创始人（第四位）。《Pro Git》一书的作者。负责 GitHub 的 CIO 角色和开发者关系。他的 Pro Git 书在 GitHub 上被翻译成 10 种语言，中国读者贡献了最大的翻译团队。

- **Junio Hamano** — Git 的维护者。2005 年 7 月从 Torvalds 手中接管 Git 的维护工作。至今仍是 Git 项目的主要维护者。Google 支付他的薪水来全职维护 Git。如果说 Linus 是 Git 的父亲，Hamano 就是 Git 的养父——Git 从原型走向成熟，绝大部分是他和社区完成的。

- **Simon Oxley** — 图形设计师。创建了 Octocat 形象（最初叫 Octopuss），挂在 iStock 上出售。GitHub 以买断形式获得了这个形象的使用权。他后来还为 Twitter 设计了小鸟 logo。

---

## 时间线

- **2002**: Linux 内核开发团队开始使用 BitKeeper 作为版本控制系统。Larry McVoy 为开源项目提供免费许可。
- **2005 年 4 月初**: Andrew Tridgell 逆向工程了 BitKeeper 协议。McVoy 收回 Linux 内核团队的免费许可。Linus 在 LKML 上宣布将自写版本控制系统。
- **2005 年 4 月 3 日**: Git 开发正式开始。
- **2005 年 4 月 6 日**: Linus 宣布 Git 项目，次日实现自托管。
- **2005 年 4 月 18 日**: Git 第一次成功合并多个分支。
- **2005 年 4 月 29 日**: Git 基准测试——每秒钟打 6.7 个补丁到 Linux 内核树。
- **2005 年 6 月 16 日**: Git 成功管理了 Linux 内核 2.6.12 发布。
- **2005 年 7 月 26 日**: Linus 将 Git 维护权交给 Junio Hamano。
- **2005 年 12 月 21 日**: Git 1.0 发布。
- **2007 年 10 月 1 日**: Tom Preston-Werner 开始开发 Grit（Ruby 访问 Git 的库）。
- **2007 年 10 月 19 日**: 在 Zeke's Sports Bar 聚会后，Chris Wanstrath 做出了 GitHub 仓库的第一个 commit。"GitHub wasn't supposed to be a startup."
- **2008 年 1 月**: PJ Hyett 加入。进入私人 beta。
- **2008 年 2 月 8 日**: GitHub, Inc.（最初名 Logical Awesome LLC）成立。
- **2008 年 4 月 10 日**: GitHub 正式公开上线。没有邀请 TechCrunch。
- **2008 年 7 月**: Powerset 被微软收购。Preston-Werner 拒绝了 $300K 留任 offer，全职投入 GitHub。
- **2009 年 2 月 24 日**: GitHub 宣布拥有 46,000 个公开仓库，17,000 个是在前一个月创建的。
- **2009 年**: GitHub 用户突破 10 万。推出 GitHub Enterprise（$5,000/年起）。
- **2010 年**: GitHub 托管仓库达到 100 万个。
- **2011 年**: GitHub 在 commit 数量上超过了 SourceForge 和 Google Code。用户达到 100 万。
- **2012 年 7 月**: Andreessen Horowitz 投资 $1 亿，估值 $7.5 亿。
- **2013 年 1 月**: GitHub 用户突破 300 万，仓库超过 500 万。
- **2014 年 4 月**: 联合创始人 Tom Preston-Werner 因骚扰指控辞职。Chris Wanstrath 接任 CEO。
- **2015 年 7 月**: Sequoia Capital 领投 $2.5 亿 B 轮，估值约 $20 亿。
- **2018 年 2 月 28 日**: GitHub 遭遇史上第三大 DDoS 攻击（峰值 1.35 Tbps）。
- **2018 年 6 月 4 日**: 微软宣布以 $75 亿收购 GitHub。
- **2018 年 10 月 26 日**: 收购正式完成。Nat Friedman 出任 CEO。
- **2019 年**: GitHub 宣布免费提供无限私有仓库。推出 GitHub Sponsors、GitHub Mobile。
- **2020 年 4 月**: GitHub 向所有用户免费开放全部核心功能。收购 npm。
- **2020 年 7 月**: GitHub Archive Program——将开源代码储存到北极斯瓦尔巴特的废弃矿洞中，保存 500–1000 年。
- **2021 年 6 月**: GitHub Copilot 技术预览发布（基于 OpenAI Codex）。
- **2021 年 11 月**: Nat Friedman 卸任，Thomas Dohmke 出任 CEO。
- **2023 年 1 月**: GitHub 宣布超过 1 亿开发者用户。
- **2025 年 5 月**: GitHub 用户达到 1.5 亿。仓库数量突破 10 亿。

---

## 篇章规划

### 第一章：帝国反击——BitKeeper 危机

- **叙事目标**：以戏剧性的冲突开场——2005 年春天，Larry McVoy 宣布收回 BitKeeper 的免费许可，Linux 内核开发团队失去了版本控制系统。Linus Torvalds 在邮件列表里发飙，然后说出了那句经典的"I'll write a better one"。这不是一个技术问题，是一个人的尊严问题。开篇即高潮，让读者感受到 2005 年开源世界的那种紧张和愤怒氛围。
- **配图关键词**：Larry McVoy portrait, Linux kernel mailing list screenshot (2005), Andrew Tridgell at Samba, BitKeeper logo

### 第二章：十天写出 Git——Linus 的复仇

- **叙事目标**：讲述 Git 的诞生过程——Linus 的极端务实主义。设计原则："支持分布式工作流"、"如果拿不准就和 CVS 做相反的事"、"数据完整性高于一切"。Git 在十天内从零成长为可用工具，一个月内管理了 Linux 内核的发布。重点写 Linus 的设计决策：为什么是快照而非 diff、为什么有 SHA-1 校验、为什么分支这么轻量。然后转向 Junio Hamano 的接管——Git 从"一个人写的工具"变成了"社区维护的基础设施"。Git 赢了 Mercurial 不是因为技术上更好，而是因为 Linus 的品牌和 Linux 内核的背书。但它在用户体验上输了——command line interface 是出了名的难用。这就为 GitHub 的登场埋下了伏笔。
- **配图关键词**：Linus Torvalds in Portland office, Git logo (first version), SHA-1 commit hash diagram, Junio Hamano portrait

### 第三章：群星之前——版本控制的黑暗时代（暗线插入）

- **叙事目标**：暗线的第一次展开——在 Git 之前，人类是怎么协作写代码的？从 1972 年的 SCCS（把人锁在文件外面）、到 RCS、到 CVS（允许并行编辑但合并是噩梦）、到 Subversion（中央集权的救世主）、到 BitKeeper（第一个让分布式真正可用的系统）。每一种工具都在回答同一个问题：多个人怎么在同一份代码上工作而不互相覆盖？Git 的答案是"每个人都有一个完整的仓库"。从此，"协作"不再需要中央服务器。这段历史是 GitHub 故事的背景音乐——GitHub 之所以能改变世界，是因为 Git 先改变了版本控制的底层逻辑。
- **配图关键词**：SCCS manual (1972), CVS logo, Subversion logo, version control timeline infographic, RCS file format screenshot

### 第四章：Zeke's Bar 那一夜

- **叙事目标**：故事的最大转折——从技术史诗切换到人物故事。2007 年 10 月 19 日，旧金山 SOMA 区的一家体育酒吧。Tom Preston-Werner 向 Chris Wanstrath 展示了一个叫 Grit 的 Ruby 库。"我有一个半生不熟的想法：做一个给程序员分享 Git 仓库的网站。叫 GitHub。" 两人一拍即合。三月的周末开发、越南春卷店里的定价讨论、私人 beta、TechCrunch 没有被邀请的公开上线。最精彩的部分：Preston-Werner 拒绝了微软的 $300K 留任 offer，选择全职投入 GitHub——"当老去的那天，我想回头看自己的人生说'哇，那真是一场冒险'，而不是'哇，我真的很安全。'"
- **配图关键词**：Tom Preston-Werner portrait, Chris Wanstrath portrait, Zeke's Sports Bar San Francisco, GitHub first commit screenshot (Oct 19 2007), Powerset logo

### 第五章：Pull Request——社交编程的杀手锏

- **叙事目标**：GitHub 真正的创新不是 Git 托管，也不是精美的 UI，而是 Pull Request。这个概念看似简单——"你改了代码，请求我合并"——但它重新定义了开源的协作方式。在 GitHub 之前，给一个开源项目贡献代码的流程是：发现 bug → 下载源码 → 修改 → 生成 patch → 发给邮件列表 → 等待被注意。在 GitHub 之后：Fork → 修改 → Pull Request → 讨论 → Merge。门槛从"我需要说服一个 gatekeeper"降到了"我只需要点几个按钮"。Fork 不再是威胁（Unix 在 80 年代的碎片化教训），而是协作的前提。"Fork 是新的贡献。" 本章案例：Ruby on Rails 第一个迁移到 GitHub 的大型项目，它如何成为 GitHub 的活广告。
- **配图关键词**：GitHub Pull Request UI (early version), Fork icon, Railsconf 2008 photo, GitHub "Fork" button closeup

### 第六章：从工具到平台——GitHub 为什么赢了

- **叙事目标**：2010 到 2015 年，GitHub 从一个简单的 Git 托管服务成长为一个平台。它不是靠自己做到的——Ruby on Rails 社区搬过来了，Node.js 社区搬过来了，Python 社区搬过来了，最后连微软都把 .NET Core 放上来了。GitHub 做了什么？Issues 跟踪、Wiki、GitHub Pages（让每个项目都有一个网站）、代码审查（Code Review）、OStatus 集成——每一个功能都是在"降低协作门槛"这条线上再走一步。它还做了一个最关键的事：让开源项目可以"被发现"——Explore、Trending、Stars。程序员的第一份简历变成了 GitHub 个人主页。"招聘：看看你的 GitHub。" 本章还要讲公司的文化——没有经理、没有考勤、开放式办公、酒吧冰箱里的啤酒。GitHub 的员工叫自己"Hubbernauts"。
- **配图关键词**：GitHub Office San Francisco (Six Apart building), GitHub trending page, GitHub profile screenshot, Hubbernauts team photo, Octocat sticker-covered laptops

### 第七章：Octocat、北极存档与一亿人

- **叙事目标**：三个最能代表 GitHub 文化的故事。**第一**，Octocat——Simon Oxley 在 iStock 上卖的 $50 卡通图，被 GitHub 用买断价格买下，成为了世界上最知名的技术吉祥物。**第二**，GitHub Archive Program——2020 年把 21TB 的开源代码储存在北极的废弃矿洞里，用胶片制成，预期保存 1000 年。人类文明的一个备份。**第三**，2023 年 GitHub 达到 1 亿用户——全世界每 80 个人里就有一个 GitHub 用户。这三个故事分别对应：文化符号、文明遗产、规模效应。但也是在这一章，加入一丝批判性的视角：GitHub 成了一座围墙花园？微软收购后，开发者还信任它吗？GitLab 的崛起意味着什么？
- **配图关键词**：Simon Oxley original Octopuss design, Octodex variations, Svalbard mine exterior, Arctic World Archive, GitHub Archive film reel, GitLab vs GitHub logo comparison

### 第八章：微软的拥抱——75 亿美元的赌注

- **叙事目标**：2018 年 6 月 4 日，微软宣布以 75 亿美元收购 GitHub。整个开源社区的反应："微软要杀了 GitHub！" 但事情没有发生。这章讲这笔交易背后的逻辑——2014 年上任的 CEO Satya Nadella 改变了微软对开源的态度。微软不再是那个视 Linux 为癌瘤的公司了。微软自己的代码（.NET Core、VS Code、TypeScript、PowerShell）都放在了 GitHub 上。收购 GitHub 是"拥抱开源"的终极标志。更重要的是，收购后的 GitHub 没有死——GitHub Actions、GitHub Codespaces、GitHub Copilot 都是在微软旗下诞生的。Nat Friedman 和 Thomas Dohmke 两任 CEO 都来自开源/跨平台背景（Xamarin）。这章也要提到争议：GitHub 与 ICE 的合同引发员工抗议、Copilot 的版权诉讼。
- **配图关键词**：Satya Nadella portrait, Nat Friedman portrait, Microsoft acquisition announcement (June 4 2018), GitHub Actions logo, GitHub Copilot screenshot

### 第九章：后记——代码的社交网络

- **叙事目标**：收束全篇，把明线和暗线汇合。明线回忆：从 BitKeeper 危机到 Git 到 GitHub 到 Copilot——二十年的技术史浓缩在这一篇里。暗线回响：协作的门槛在不断降低——Linus 在 1991 年公布 Linux 时说"这只是我的个人爱好"，现在一个人可以 Fork 整个 Linux 内核、做出修改、提交 Pull Request。AI 时代的 GitHub Copilot 让这个门槛降到了新低——你甚至不需要会写代码了。但这也是"代码的社交网络"的终点吗？当 AI 写的代码占主流时，人类还在一起"社交编程"吗？结尾微酸但不悲观——也许下一个二十年，社交编程的对象不再是人类之间，而是人类和 AI 之间。但 GitHub 仍然是那个舞台。
- **配图关键词**：GitHub timeline infographic (2005-2025), GitHub logo evolution, GitHub Universe conference crowd, modern developer desk with AI tools

---

## 推荐阅读

1. **Wikipedia: Git** — https://en.wikipedia.org/wiki/Git
   Git 的完整历史、技术架构、设计理念。Linus 的命名典故（"I'm an egotistical bastard, and I name all my projects after myself"）和设计原则都在这里。

2. **Wikipedia: GitHub** — https://en.wikipedia.org/wiki/GitHub
   GitHub 的公司史、产品演变、收购细节、争议。包含从 2007 年第一个 commit 到 2025 年 1 亿 5000 万用户的完整时间线。

3. **Tom Preston-Werner, "How I Turned Down $300,000 from Microsoft to go Full-Time on GitHub" (2008)** — https://tom.preston-werner.com/2008/10/18/how-i-turned-down-300k.html
   GitHub 诞生的第一手记录——Zeke's Bar 的场景、微软收购 Powerset 的背景、拒绝 $300K 的心理搏斗。文章本身也是一篇精彩的技术叙事文。

4. **WIRED, "Lord of the Files: How GitHub Tamed Free Software (And More)" (2012)** — https://www.wired.com/2012/02/github-2/
   最好的 GitHub 早期深度报道。包含了 Linus 在波特兰家中演示 Git 的细节、GitHub 办公室的描写、以及"GitHub 是程序员的 Facebook"这个经典比喻的来源。

5. **Wikipedia: BitKeeper** — https://en.wikipedia.org/wiki/BitKeeper
   BitKeeper 的完整历史，包括与 Linux 内核的关系、2005 年的许可危机细节、Andrew Tridgell 逆向工程事件。

6. **Wikipedia: Andrew Tridgell** — https://en.wikipedia.org/wiki/Andrew_Tridgell
   触发 BitKeeper 危机的关键人物。Samba 的创始人，以"除非别人不让我逆向工程，否则我无法停止"的态度闻名。

7. **Wikipedia: Junio Hamano** — https://en.wikipedia.org/wiki/Junio_Hamano
   Git 的"第二父亲"。从 2005 年 7 月接棒维护至今的信息。

8. **Linus Torvalds, Google Tech Talk on Git (2007)** — https://www.youtube.com/watch?v=4XpnKHJAok8
   Linus 本人的 Git 介绍演讲。精彩之处在于他花一半时间先骂了一遍 CVS 和 SVN，然后才讲 Git。"如果你拿不准，就和 SVN 做相反的事"就出自这里。

9. **GitHub Archive Program 官方页面** — https://archiveprogram.github.com/
   北极存档计划的详情。技术细节：piqlFilm 胶片、21TB 数据、Svalbard 矿洞、预期保存 1000 年。项目 Silica（石英玻璃储存 10000 年）。

10. **The Changelog: "GitHub's Founding Story with Tom Preston-Werner" (2021)** — https://changelog.com/podcast/432
    一个非常详细的口述史播客。Preston-Werner 亲自回忆了从 Zeke's Bar 到微软收购的整个过程。

11. **Wikipedia: Microsoft acquisition of GitHub** — https://en.wikipedia.org/wiki/GitHub#Acquisition_by_Microsoft
    收购的背景、各界反应、竞争平台（GitLab、Bitbucket）的用户迁移潮。

12. **Pro Git (Second Edition) by Scott Chacon and Ben Straub** — https://git-scm.com/book/en/v2
    GitHub 联合创始人写的 Git 教科书。免费在线版，是理解 Git 设计的最佳入门资源。序言中有 Git 诞生的背景。

---

## 写作备忘

- **特别篇定位**：这是"代码的故事"栏目的特别篇，位于后记（order: 99）之后，order: 100。不设 Hello World 章节。叙事风格上，既要有主篇的紧凑感（聚焦诞生时刻和关键决策），又要带一点后记的松弛（因为这是特别篇）。可以用更自由的叙事节奏。

- **与栏目暗线的连接**：这篇的暗线——"协作方式的进化"——与栏目主线（"计算如何渗透世界"）并行。Git 和 GitHub 不改变"计算机能做什么"，而是改变"谁可以参与让计算机做事"。这是整个栏目暗线在"谁在写代码"这个维度上的自然延伸。

- **注意避免**：不要写成 GitHub 功能指南，不要写成 Git 教程，不要写成公司发展史。保持"聚焦诞生时刻"的叙事策略——每一章都有一个具体的历史场景作为锚点。
