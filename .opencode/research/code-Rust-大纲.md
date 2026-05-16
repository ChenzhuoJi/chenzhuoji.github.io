# 研究大纲：Rust：安全的代价

## 叙事弧线

### 开头切入点
**以物件/场景切入**。2006 年，温哥华，一栋公寓楼的电梯又坏了。住在 21 楼的程序员 Graydon Hoare 背着包爬楼梯——电梯的控制软件是 C++ 写的，内存管理出了错，崩了。这不是第一次了。大多数人在这种时候只会骂一句。但 Hoare 到家后打开了笔记本电脑，开始设计一门新的编程语言。他把它命名为 Rust——一种"过度设计以求生存"的真菌的名字。这个命名在十五年后回头看，准确得令人不安：Rust 确实被设计得极度坚韧——坚韧到愿意为此牺牲学习和编写的舒适。

### 主体故事线
C 和 C++ 统治系统编程三十年，代价是整个行业每年为内存安全漏洞支付数千亿美元的修复成本。Microsoft 说 70% 的安全漏洞是内存错误。美国白宫也发声了。但之前所有解决这个问题的尝试——Java 的垃圾回收、Cyclone 的安全 C 方言、学术界的软硬件方案——都失败了：要么牺牲性能，要么没人用。

Graydon Hoare 的选择是：**不在运行时取巧，不在运行时妥协。所有代价在编译期付清。**这套方案后来被称为"所有权系统"——每个数据只有一个"拥有者"，借用必须有明确的"生命周期"。编译器像一个严苛的法官，逐行审查代码中的每一个引用是否合法。学习曲线陡峭得令人绝望，编译速度慢到被反复吐槽。但跑起来的程序——和 C 一样快、绝对安全、没有数据竞争。

Mozilla 在 2009 年押注了 Rust，因为浏览器（Firefox）正是 C++ 内存错误的重灾区。Brendan Eich——JavaScript 的创造者——看到了 Rust 的潜力。一支由编译器研究者、学术背景的工程师和全球志愿者组成的团队在 Mozilla 的"极客洞穴"会议室里打磨了六年。2015 年 Rust 1.0 发布。

之后的故事像雪崩：Servo 浏览器引擎证明了 Rust 能写浏览器；Dropbox 用 Rust 重写了同步引擎（快了 10 倍）；Discord 用 Rust 替换了 Go（垃圾回收消失了，性能暴涨）；Linux 内核接纳了 Rust；美国政府发报告推荐 Rust；Stack Overflow 年度开发者调查中，Rust 连续八年成为"最受喜爱"的语言。

但代价从未消失。Rust 的陡峭学习曲线和社区里的"借用检查器之战"证明了一件事：安全是有价的——而且很贵。这篇文章讲的是这笔交易——**你为什么付钱，你得到了什么，以及为什么越来越多的人愿意付这笔钱。**

### 结尾（暗线升华）
Rust 的故事不是"一匹黑马杀了回来"——而是"系统编程三十年没有真正的替代者，今天终于有了一个选项"。C 不会消失，C++ 也不会消失，几十亿行旧代码还在跑。但所有写**新**的底层系统代码的人，都在严肃地考虑一件事：能不能不用 C 了？

**下一篇预告钩子**：当语言设计者们在考虑"更安全"和"更快乐"时，另一个变化正在悄悄发生——开发者不再是唯一在写代码的人。AI Coding 来了。前面的 Hello World 不再需要代码框了。

---

## 关键人物

- **Graydon Hoare**（1977?–）—— Rust 的创造者。Mozilla 员工，2006 年做 Rust 作为个人项目。受困于电梯故障而决定造一门安全的系统语言。Rust 的名字取自"锈菌"——过度设计以求生存。2013 年离开项目核心团队。之后在 Apple 工作。他的名言："technology from the past come to save the future from itself"（来自过去的技术前来拯救未来于自身）。
- **Brendan Eich**（1961–）—— JavaScript 创造者、Mozilla 联合创始人。2009 年在 Mozilla 内部推动对 Rust 的赞助。看到了 Rust 用于构建安全浏览器引擎的潜力。安排了第一批全职工程师在 Rust 上工作。
- **Patrick Walton**——早期 Rust 核心开发者，Mozilla 工程师。离开编程语言博士项目加入 Mozilla 做 Rust。参与了 Rust 的所有关键设计决策。后来在 Meta 工作。
- **Niko Matsakis**——Rust 核心团队关键成员，Mozilla 工程师。学术背景研究内存和编程语言。在类型系统和借用检查器方面做出关键贡献。
- **Felix Klock**——Mozilla 法国办公室的 Rust 开发者，学术背景。参与了 Rust 的早期设计。
- **Manish Goregaokar**——早期 Rust 开发者，后来负责开发者工具团队。评价 Rust "mostly decades-old research"。
- **Steve Klabnik**——Rust 文档和社区核心人物。2012 年加入，写了大量 Rust 文档（包括《The Rust Programming Language》第二版）。
- **Dave Herman**——Mozilla Research 联合创始人。把 Rust 团队所在的会议室命名为"the nerd cave"。
- **Aaron Turon**——Rust 核心团队成员，参与设计了 Rust 2015 版本的关键特性。
- **Shane Miller**——AWS Rust 团队创始人，Rust Foundation 第一任执行董事。
- **Mara Bos**——Rust 库团队负责人，Fusion Engineering（无人机公司）联合创始人。用 Rust 重写了无人机控制软件。

---

## 时间线

| 年份 | 事件 |
|------|------|
| 2006 | Graydon Hoare 在 Mozilla 的个人时间开始做 Rust 项目，命名来源于锈菌 |
| 2009 | Mozilla 正式赞助 Rust；Brendan Eich 推动资源投入；"nerd cave" 成立 |
| 2010 | Rust 所有权系统基本成型；编译器从 OCaml 自举到 Rust（目标 LLVM） |
| 2011 | Rust logo 出炉——基于自行车飞轮的设计 |
| 2012.01.20 | Rust 0.1 首次公开发布，支持 Windows/Linux/macOS |
| 2012 | Servo 浏览器引擎项目在 Mozilla 启动，使用 Rust |
| 2013 | 垃圾回收器从 Rust 中移除；Graydon Hoare 从核心团队离职；纯所有权系统成为唯一内存管理方案 |
| 2013.04 | Mozilla 与 Samsung 宣布合作开发 Servo |
| 2014.03 | Rust RFC（征求意见）流程上线 |
| 2015.05.15 | Rust 1.0 稳定版发布，承诺向后兼容 |
| 2016 | Firefox 45 首次包含 Rust 代码；Servo 首版发布；Dropbox 开始用 Rust 重写同步引擎 |
| 2017.09 | Firefox 57（Quantum）大量使用 Servo 组件，CSS 渲染引擎用 Rust 重写，性能大幅提升 |
| 2020 | Mozilla 裁员 250 人，Servo 团队解散，Rust 未来引发担忧 |
| 2020 | Dropbox Sync Engine 用 Rust 完成重写（从 Python 迁移）；Discord 用 Rust 替换 Go 核心组件（快 10 倍） |
| 2020.11 | Rust Core Team 宣布 Rust Foundation 计划 |
| 2021.02.08 | Rust Foundation 成立——AWS、Google、Huawei、Microsoft、Mozilla 五家创始公司 |
| 2021.04 | Google 宣布 Android 开源项目正式支持 Rust 作为 C/C++ 替代 |
| 2021.11 | Rust 审核团队集体辞职（治理争议） |
| 2022.12 | Linux 内核初步支持 Rust（v6.1）——由 Miguel Ojeda 推动多年 |
| 2023 | US 白宫/NSA/ONCD 推荐使用 Rust 等内存安全语言；Rust 连续七年 Stack Overflow "最受喜爱" |
| 2024 | Rust 在 Linux 内核中进一步推广（更多驱动用 Rust 重写） |
| 2026 | Rust 1.95 发布；Rust 仍然在 Stack Overflow 开发者调查中排名最受喜爱语言前三 |

---

## 篇章规划

### 第一章：电梯坏了

- **叙事目标**：从 Graydon Hoare 2006 年爬 21 层楼梯的故事切入，建立 Rust 的诞生场景。阐述核心问题——C 和 C++ 统治系统编程三十年，但内存安全漏洞是最大的安全隐患。Microsoft 70% 的 CVE 是内存错误。之前所有"安全系统语言"的尝试（Java/Cyclone/软硬件方案）都失败了，因为要么牺牲性能，要么没人用。Hoare 的野心：不牺牲性能的内存安全。没有垃圾回收的安全。调性：紧迫、引子、悬念——"有没有第三种可能？"
- **配图关键词**：
  - "Graydon Hoare portrait 2006" (年轻 Hoare 照片)
  - "Mozilla Vancouver office 2006" (Mozilla 温哥华办公室)
  - "CVE memory safety statistics Microsoft" (数据图示——70% 内存漏洞)
  - "Rust fungus macro photo" (锈菌显微镜照片，隐喻"过度设计以求生存")

### 第二章：来自过去的技术

- **叙事目标**：追溯 Rust 的智力谱系——它不是从零开始的。Hoare 引用了一堆 1970s–1990s 的语言：CLU、BETA、Mesa、Erlang、Newsqueak、Sather、Limbo……"来自过去的技术前来拯救未来于自身"。Rust 最初在 OCaml 中编写编译器（38,000 行）。早期包含 typestates 系统、`obj` 关键字、垃圾回收器。所有权系统的雏形在 2010 年出现。调性：考古挖掘。"这门语言看上去像未来，但它挖的是过去的地基。"
- **配图关键词**：
  - "OCaml logo" (最初的编译器在 OCaml 中编写)
  - "Cyclone programming language logo" (安全的 C 方言前身)
  - "Hoare presentation slide 2010" (Hoare 第一次展示 Rust 的幻灯片)
  - "CLU language manual cover" (受影响的早期语言之一)

### 第三章：Brendan Eich 的赌注

- **叙事目标**：2009 年，Mozilla 正式赞助 Rust。Brendan Eich——JavaScript 之父——看到了 Rust 对浏览器的意义。Firefox 的 C++ 代码库是内存安全灾难。Eich 把 Patrick Walton、Niko Matsakis、Felix Klock 等工程师安排到 Rust 项目上。Mozilla 的"nerd cave"诞生。主角团登场。调性：公司内部剧变——一个"20% 项目"变成了 Mozilla 最有野心的技术押注。
- **配图关键词**：
  - "Brendan Eich Mozilla 2009" (Eich 在 Mozilla 的照片)
  - "Mozilla headquarters Mountain View 2009" (Mozilla 总部 650 Castro)
  - "The nerd cave sign Mozilla" (极客洞穴的门牌/会议室)
  - "Firefox C++ memory bug history" (Firefox 历史内存漏洞截图)
  - "Patrick Walton portrait" / "Niko Matsakis portrait"

### 第四章：所有权的诞生

- **叙事目标**：这篇文章的技术核心篇。Rust 最关键的设计革命——所有权系统（ownership）和借用检查器（borrow checker）。解释这个革命性但难学的概念：每个值有且仅有一个"所有者"、借用必须有明确生命周期、编译器在编译时做检查。2013 年，Rust 团队犯下了一个极其大胆的决定——移除垃圾回收器，完全依赖所有权系统。Rust 0.1 发布时社区的震惊和困惑。调性：把技术概念转化为叙事——"Rust 做了一件闻所未闻的事：在编译器里装了一个比 C++ 更严格的警察。代价是写代码像在和编译器辩论。"
- **配图关键词**：
  - "Rust ownership diagram" (所有权与借用示意图——简单版)
  - "Rust compiler error message example" (经典的"borrow checker"报错截图)
  - "Rust 0.1 release announcement" (2012 年首次发布的公告截图)
  - "Rust LLVM compiler pipeline" (编译器流水线)
  - "Steve Klabnik portrait"（Rust 文档作者）

### 第五章：火的试炼（2013–2015）

- **叙事目标**：从 0.1 到 1.0 的九年长征。Graydon Hoare 2013 年退出核心团队——项目长大了，超出了个人能控制的范围。社区接手后的治理实验：RFC 流程、Core Team 机制、Code of Conduct。最痛苦的变化期：typestates 移除、pure 关键字移除、各种特殊指针类型砍掉、通道语法移除、垃圾回收器移除。2014 年 Dr. Dobb's Journal 报道："Rust 被广泛认为是一门极其优雅的语言，但采用进展缓慢——因为它每版都在剧烈变化。" 团队决定锁定 1.0。"在 1.0 之前，我们在寻找正确的设计；在 1.0 之后，我们在坚持正确的承诺。" 2015 年 5 月 15 日，Rust 1.0 发布——全球 Rustacean 面基庆祝。调性：淬火与痛苦的生长——要到达稳定，必须先经历极大的不稳定。
- **配图关键词**：
  - "Graydon Hoare stepping down 2013" (Hoare 退出公告)
  - "Rust RFC process screenshot" (RFC 追踪页面)
  - "Rust 1.0 launch party photo" (2015 年 1.0 发布派对)
  - "Dr. Dobb's Journal Rust article 2014" (当年报道截图)
  - "Rust community meetup 2015" (早期 Rust 社区聚会照片)

### 第六章：Servo——杀手应用

- **叙事目标**：Rust 需要一个东西证明自己——Servo 就是它。Mozilla 和 Samsung 在 2012–2013 年联合开发的浏览器引擎，全部用 Rust 写。Servo 团队和 Rust 团队互相喂养：新特性在 Servo 中测试，Servo 的需求回馈到 Rust。2016 年 Servo 首版发布，能渲染网页了。2017 年 Firefox 57（Quantum）大规模采用 Servo 组件——CSS 引擎用 Rust 重写后性能暴涨。这是 Rust 的第一个"生产环境验证"——用自己写的浏览器引擎来证明自己。Rust 在 Firefox 内部从"实验项目"变成了"关键基础设施"。调性：证明的时刻——"Rust 不只是学术实验，它能写世界上最复杂的软件。"
- **配图关键词**：
  - "Servo logo" (Servo 机器人 Logo)
  - "Servo rendering Wikipedia 2016" (Servo 渲染维基百科的截图)
  - "Tom Servo MST3K" (命名来源——电影《神秘科学剧院 3000》中的机器人)
  - "Firefox Quantum 57 screenshot" (Firefox Quantum 版本)
  - "Servo team group photo Mozilla" (Servo 团队合影)

### 第七章：安全有价

- **叙事目标**（本篇文眼）：安全的代价究竟是什么？作者本人的亲身感受和社区的大量讨论揭示了 Rust 的"黑暗三角"：① 学习曲线陡峭——借用检查器让新程序员崩溃（"战时共产主义"的内存观），《Rust 程序设计语言》被戏称为"与借用检查器搏斗的 500 页教程"；② 编译速度慢——Rust 编译器的检查比 C++ 更多更严，大型项目的编译是 C 的几倍时间；③ 生态从零开始——2015 年 crates.io 只有几千个包，和 Python/C++/JS 的生态无法比。但代价的回报是什么？Discord 从 Go 转 Rust 后快了 10 倍（垃圾回收开销归零）、Dropbox 同步引擎用 Rust 重写后从 Python 的 Python 变的稳健可靠、Android 和 Linux 内核引入 Rust 后消除了整类安全漏洞。调性：坦诚——不回避 Rust 的问题。像 Ruby 篇一样，"快乐有价"的对称篇。
- **配图关键词**：
  - "Rust learning curve meme" (程序员社区中的 Rust 学习曲线梗图)
  - "Discord Go to Rust migration chart" (Discord 的技术博客截图)
  - "Dropbox sync engine Rust" (Dropbox 用 Rust 重写同步引擎的博客截图)
  - "Cargo.toml screenshot" (Cargo 包管理——生态的象征)
  - "Rust compile time meme" (编译慢的梗图)

### 第八章：Mozilla 之后——Rust 基金会和它的新靠山

- **叙事目标**：2020 年 Mozilla 裁员 250 人——Servo 团队全灭。Rust 的前途瞬间成谜——"一个被自己母公司裁掉的语言"。但 Rust 没有死。AWS、Google、Huawei、Microsoft 在 2021 年成立 Rust Foundation。这些巨头对 Rust 的需求比 Mozilla 更大。Amazon（AWS）的 Rust 团队——Shane Miller 领导——在云基础设施中大规模部署 Rust（节省一半电费、性能相等或更好）。Google 宣布 Android 原生支持 Rust。Microsoft 在 Windows 内核中试验 Rust。"Rust 从 Mozilla 的孩子变成了整个行业的公共品。" 2022 年 Linux 内核 v6.1 接入 Rust——Linus Torvalds 的谨慎拥抱。治理争议：2021 年底审核团队集体辞职事件。调性：少年意外长大——"Rust 不是在 Mozilla 的庇护下长大的。它是在行业巨头的争夺中长大的。"
- **配图关键词**：
  - "Mozilla layoffs 2020 news" (Mozilla 裁员新闻截图)
  - "Rust Foundation founding announcement" (2021 年 Rust 基金会成立公告)
  - "AWS Shane Miller portrait" (AWS Rust 团队创始人的照片)
  - "Android Rust logo" (Android 支持 Rust 的公告)
  - "Linux kernel Rust support commit" (Linus 合并 Rust 到内核的 commit)
  - "NSA/ONCD memory safety report" (美国政府推荐 Rust 的报告)

### 第九章：重写一切的野心（但你在编译期付钱）

- **叙事目标**：总结 RUST 的遗产和暗线收束。Rust 证明了"没有垃圾回收的安全内存管理"是可能的——这不是学术猜想，而是可以落地到生产环境的。但它的真正冲击在于：第一次给 C 和 C++ 创造了一个真正意义上的"更安全替代品"——不是通过增加运行时开销，而是通过提高编程的门槛。Rust 选的路是"在编译期付代价，运行时免费"。C 选择了"对程序员友好，对机器残酷"；Rust 选择了"对编译器残酷，对机器友好"。整个故事的核心矛盾：**为什么我们要为安全买单？因为安全的 bug 由你的用户付钱——而且你赔不起。** 暗线收束到"云·无处不在"时代——我们的手机、服务器、IoT 设备、汽车、电梯里都在跑 Rust。那个 2006 年坏掉的电梯——Rust 可能就是它最终的解决方案。
- **配图关键词**：
  - "Rust logo evolution" (Rust logo 演变——自行车飞轮)
  - "Stack Overflow most loved 2023" (连续七年最受喜爱排名)
  - "Graydon Hoare keynote 2019" (Hoare 在 RustConf 的最后一次演讲)
  - "Ferris the Crab" (Rust 的非官方吉祥物——螃蟹 Ferris)
  - "Rust vs C++ safety comparison" (安全性对比图示)
  - "Rust in production companies logo wall" (使用 Rust 的公司——AWS/Dropbox/Discord/Cloudflare/Figma)

---

## 推荐阅读

1. **https://en.wikipedia.org/wiki/Rust_(programming_language)** — Rust 语言的 Wikipedia 页面，完善的历史叙述和特性清单，Good Article 质量
2. **https://www.technologyreview.com/2023/02/14/1067869/rust-worlds-fastest-growing-programming-language/** — MIT Technology Review 的 Clive Thompson 长篇报道（电梯故事的源头），叙事优美、细节丰富，是本文最重要的参考资料
3. **https://en.wikipedia.org/wiki/Servo_(software)** — Servo 浏览器引擎的 Wikipedia 页面，了解 Rust 的第一个大型生产级项目
4. **https://en.wikipedia.org/wiki/Cyclone_(programming_language)** — Cyclone 安全 C 方言的 Wikipedia 页面，理解 Rust 之前的"安全系统语言"尝试——为什么它们失败了
5. **https://doc.rust-lang.org/book/** — 《The Rust Programming Language》官方书的前几章，用于理解所有权和借用系统（作为事实参考，非叙事参考）
6. **https://www.kernel.org/doc/html/next/rust/index.html** — Linux 内核的 Rust 支持文档，了解 Rust 进入 Linux 内核的过程和现状
7. **https://blog.rust-lang.org/2015/05/15/Rust-1.0.html** — Rust 1.0 发布公告，了解 1.0 发布时的目标、承诺和情绪
8. **https://foundation.rust-lang.org/** — Rust Foundation 官网，了解 2021 年基金会成立的组织架构和财务状况
9. **https://discord.com/blog/why-discord-is-switching-from-go-to-rust** — Discord 从 Go 迁移到 Rust 的技术博客，具体展示了 RUST 的"安全代价"回报——10 倍性能提升的原因
10. **https://dropbox.tech/infrastructure/rewriting-the-heart-of-our-sync-engine** — Dropbox 用 Rust 重写核心同步引擎的技术博客
11. **https://aws.amazon.com/blogs/opensource/why-aws-loves-rust-and-how-were-helping/** — AWS 的 Rust 立场博客，了解云计算巨头为何押注 Rust
12. **https://www.whitehouse.gov/oncd/briefing-room/2024/02/26/memory-safety-past-present-and-future/** — 美国白宫 ONCD 关于内存安全的报告，显示 Rust 被美国政府推荐为替代 C/C++ 的选择
13. **https://github.com/rust-lang/rust** — Rust 编译器源码仓库，GitHub 上有大量 issue/discussion 记录设计决策的第一手历史档案
