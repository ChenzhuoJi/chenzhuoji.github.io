# 研究大纲：PHP：网站的民主化

## 叙事弧线

### 开头切入点
**以 1995 年 6 月 8 日 Rasmus Lerdorf 在 Usenet 发布的那封原始邮件切入。** 邮件标题："Announce: Personal Home Page Tools (PHP Tools) version 1.0"。打开那封邮件，逐行读它的功能介绍——"你不需要 root 权限"、"你不需要 Perl 或 Tcl"、"你不需要访问 httpd 日志文件"——每一行都是在降低门槛。这就是 PHP 的性格浓缩在那封邮件里：消除依赖，让普通人在共享主机上也能做动态网站。

### 主体故事线
CGI 时代的痛苦（为每个请求 fork 一个进程、写 Perl 脚本要配置一堆环境变量）→ Lerdorf 的个人工具意外被人需要 → PHP/FI 的有机增长 → Zeev 和 Andi 重写引擎（Zend）→ PHP 4 的成熟 → LAMP 栈的形成 → WordPress 等 CMS 引爆 → PHP 成为互联网上最普及的语言之一

### 结尾（暗线升华）
回到"建站权"的概念。在 PHP 之前，做一个带数据库的动态网站需要：系统管理员权限、Perl 知识、CGI 配置、数据库管理。PHP 之后，任何人只要有个共享主机和 FTP 账号就能搭一个留言板。这个"下放"直接催生了博客浪潮（WordPress）、社交网络早期形态（phpBB、vBulletin）、以及无数个人站长。暗线钩子：Python 篇即将讲述另一个"非典型崛起"的故事。

## 关键人物

- **Rasmus Lerdorf**（1968–） — PHP 创始人和前两个版本的作者。生于格陵兰，长于丹麦和加拿大，滑铁卢大学系统工程系毕业。他不是计算机科学家，是一个"遇到问题就写工具解决它"的工程师。他反复说"I don't know how to stop it"——这门语言不是设计出来的，是长出来的。
- **Andi Gutmans**（1972–） — 以色列理工学生，1997 年和 Zeev Suraski 一起重写了 PHP 的解析器，创造了 Zend Engine。后联合创立 Zend Technologies。
- **Zeev Suraski**（1970–） — 和 Andi 一同改写 PHP 3 核心。"Zend" 是 Zeev + Andi 的组合。后来领导 Zend Technologies。
- **Matt Mullenweg**（1984–） — WordPress 联合创始人。WordPress 是 PHP 最著名的"杀手应用"，让 PHP 从一门语言变成了一整个生态的基石。
- **Michel Valdrighi** — b2/cafelog 的作者，WordPress 的前身。

## 时间线

- **1993**: Rasmus Lerdorf 用 C 写了一些 CGI 程序来维护他的个人主页
- **1994**: 开始将工具打包为 "Personal Home Page Tools"（PHP Tools），引入表单处理能力
- **1995-06-08**: 在 Usenet 发布 PHP Tools 1.0 版本
- **1995-1997**: PHP/FI 2 逐渐成型，语法从类 HTML 标签风格转向类似 Perl 的语法
- **1997**: Andi Gutmans 和 Zeev Suraski 重写解析器，PHP 3 项目启动；名字改为递归缩写 PHP: Hypertext Preprocessor
- **1998-06**: PHP 3.0 正式发布
- **1999**: Zend Engine 1.0 诞生；Zend Technologies 在以色列成立
- **2000-05-22**: PHP 4.0 发布（Zend Engine 1.0）
- **2001**: 超全域变量（$_GET, $_POST, $_SESSION）引入
- **2002**: register_globals 默认关闭（安全转折点）
- **2003-05-27**: WordPress 0.70 发布
- **2004-07-13**: PHP 5.0 发布（Zend Engine 2），面向对象大幅改进
- **2004**: Movable Type 更改许可条款，大量用户迁移到 WordPress
- **2008**: GoPHP5 倡议推动行业迁移到 PHP 5
- **2015-12-03**: PHP 7.0 发布（phpng 项目，性能翻倍）
- **2020-11-26**: PHP 8.0 发布，引入 JIT 编译器

## 篇章规划

### 第一章：CGI 的暴政
- **叙事目标**：展示 PHP 诞生之前，做一个动态网站有多痛苦。CGI 为每个请求 fork 一个进程，Perl 脚本散落在 cgi-bin 目录里，配置环境变量像在念咒语。你想做个留言板？先去学 Perl，再理解 environment variables，再搞定 chmod 权限。让读者理解"太复杂了"到底有多复杂——为 PHP 的出现做足铺垫。
- **情绪基调**：焦虑、烦躁——技术的高门槛在阻碍普通人参与
- **配图关键词**：1995 NCSA Mosaic 浏览器截图；Perl CGI 脚本示意（`cgi-bin/guestbook.pl`）；CGI 请求处理示意图（client → server → fork process → CGI script）

### 第二章：格陵兰来的工程师
- **叙事目标**：介绍 Rasmus Lerdorf——他不是一个"想发明语言"的计算机科学家，他只是一个需要解决自己问题的工程师。出生在格陵兰的迪斯科岛，在丹麦长大，移民加拿大，滑铁卢大学系统工程系。他做 PHP 不是因为宏伟蓝图，是因为他想跟踪谁在访问他的个人主页。
- **情绪基调**：朴实、接地气——这故事的主人公是那种"遇到问题就写两行代码解决掉"的普通人
- **配图关键词**：Rasmus Lerdorf 1990s 早期照片（年轻、戴眼镜、工位前）；格陵兰地图标注 Qeqertarsuaq；滑铁卢大学

### 第三章：那封 Usenet 邮件
- **叙事目标**：详细还原 1995 年 6 月 8 日那封改变互联网的邮件。展示 PHP Tools 1.0 的功能清单——每一个"你不需要"都在降低门槛。"No root access needed. No Perl needed. No SSI needed." 这是 PHP 的基因密码：消除所有障碍，让一个在共享主机上只有 FTP 权限的人也能做动态网站。
- **情绪基调**：历史性瞬间的冲击感——一个简单工具的发布，悄然改变了 web 的走向
- **配图关键词**：Google Groups 中 PHP Tools 1.0 原始邮件的截图；1995 年的个人主页示例（简陋的 Geocities 风格）；Web 服务器示意图（Unix 命令行界面）

### 第四章：有机生长——"我不知道怎么让它停下来"
- **叙事目标**：PHP/FI 的演化故事。Lerdorf 说"我从没想过写一门编程语言，我完全不知道怎么写编程语言。我只是不断地加下一个合理的功能。"PHP 的语法是拼凑的——某些函数名来自它包装的底层 C 库，某些函数名长短被用作哈希函数。这不是精心设计的语言，这是长出来的。但恰恰因为它的非设计性，它极其务实。
- **情绪基调**：惊奇 + 反讽——最好用的语言居然是从一堆拼凑的 CGI 工具里长出来的
- **配图关键词**：早期 PHP/FI 代码示例（`<!--include /text/header.html-->` 风格）；Rasmus Lerdorf 在技术演讲中微笑的照片；Perl 和 C 语言的书籍封面（暗示 PHP 的灵感来源）

### 第五章：两个以色列学生与 Zend 引擎
- **叙事目标**：Andi Gutmans 和 Zeev Suraski 在以色列理工发现 PHP/FI 的解析器有局限，无法处理他们想做的电子商务项目。他们联系了 Lerdorf，然后重写了整个解析器——这就是 PHP 3。后来他们继续做了 Zend Engine（Zeev + Andi），创立 Zend Technologies。PHP 从一个人的副业变成了一家公司的核心。这是故事的转折点：一个非设计的语言获得了专业的引擎。
- **情绪基调**：转折的戏剧性——两个学生写信给远在加拿大的 Lerdorf，然后整个 PHP 的未来被改写了
- **配图关键词**：Andi Gutmans 早期照片；Zeev Suraski 早期照片；Zend Engine logo；以色列理工（Technion）

### 第六章：LAMP 栈——免费的午餐
- **叙事目标**：1998 年 Michael Kunze 在德国《c't》杂志上提出了 LAMP 这个缩写。Linux + Apache + MySQL + PHP（或 Perl/Python）——一个完全免费、完全开源、在任何廉价共享主机上都能跑的 Web 开发栈。这是 PHP 爆发的关键基础设施条件。对比当时的商业替代方案（Microsoft 的 ASP + IIS + SQL Server、Java 的昂贵应用服务器），LAMP 让中学生用零成本就能上线一个网站。
- **情绪基调**：普惠、解放——免费软件让建站成本降到了零
- **配图关键词**：LAMP 栈架构示意图（Linux, Apache, MySQL, PHP 四个方块）；Apache 吉祥物；MySQL logo 早期版本；1998 年《c't》杂志封面或文章截图

### 第七章：Hello, World——代码嵌进 HTML
- **叙事目标**：回到 PHP 最核心的设计决策：`<?php ?>` 标签让代码直接嵌进 HTML。这个决定是 PHP 与其他语言的根本区别——它不是让你写一个程序然后输出 HTML，而是在 HTML 里开一个"代码窗口"。这意味着设计师可以在 Dreamweaver 里编辑页面，偶尔插入一段 PHP 调数据库。这个"最低入侵"的设计让 PHP 的门槛低到了极致。
- **情绪基调**：技术解释的透彻感——让读者理解为什么 `<?php ?>` 是一个天才的设计
- **配图关键词**：PHP 代码嵌入 HTML 的简单示例截图；Dreamweaver 或 FrontPage 早期界面（与 PHP 配合使用）；PHP 手册早期版本文档

### 第八章：WordPress——杀手应用
- **叙事目标**：2003 年，Matt Mullenweg 和 Mike Little fork 了 b2/cafelog，创造了 WordPress。这个博客系统完全用 PHP 和 MySQL 写成，安装过程简单到令人发指：解压、创建数据库、运行安装脚本。2004 年 Movable Type 改变许可条款，大量博客作者逃到 WordPress。从此 PHP 不再只是一门语言——它成了整个互联网的内容发布平台。到 2024 年，43% 的网站在跑 WordPress。
- **情绪基调**：蜂拥而至的迁移浪潮——一个巨大生态开始自我加速
- **配图关键词**：Matt Mullenweg 早期照片；WordPress 0.70 安装界面截图；Movable Type logo（对比暗示）；WordPress 仪表盘早期版本

### 第九章：负面遗产——安全、质量与"草台班子"的代价
- **叙事目标**：PHP 的成功也要付出代价。低门槛导致大量写得糟糕的代码在网上运行。register_globals 让无数网站有 SQL 注入漏洞。函数命名不一致、参数顺序混乱成为笑谈。PHP 被专业程序员鄙视了很多年。但另一方面，正是这个"草台班子"生态催生了现代 Web 安全意识的觉醒——SQL 注入的教训是 PHP 开发者群体用血换来的。这是一个硬币的两面。
- **情绪基调**：坦诚、自嘲——承认缺点但不否定历史贡献
- **配图关键词**：PHP 函数命名不一致的搞笑示例；OWASP Top 10 安全风险列表；PHP 安全相关的早期漫画或 meme

### 第十章：PHP 的今天和明天
- **叙事目标**：PHP 没有死。PHP 7 的 phpng 项目让性能翻倍，PHP 8 引入 JIT 编译。Laravel 这样的现代框架让 PHP 重新变得体面。它在 2024 年仍然有 76% 的网站使用率（W3Techs 数据）。但它不再是年轻人的首选语言——它的生态位已经被 JavaScript（全栈）、Python（数据科学/后端）、Go（云服务）蚕食。PHP 的故事是一个关于"够了就是够了"的哲学：不是最好的语言，但却是当时最合适的。
- **情绪基调**：平和的回顾——在技术演进的河流中，PHP 曾经是那条足够宽的船
- **配图关键词**：PHP 8 发布公告截图；Laravel logo；PHP 版本历史时间线（1995–2024）；PHP 吉祥物（elephant，如果有）

### 文末人物群像
- Rasmus Lerdorf（在 Etsy 时期的近照）
- Andi Gutmans（Zend 时期的职业照）
- Zeev Suraski
- Matt Mullenweg
- 可选：Lerdorf + Gutmans + Suraski 三人同框照

## 推荐阅读

- https://groups.google.com/g/comp.infosystems.www.authoring.cgi/c/PyJ25gZ6z7A/m/M9FkTUVDfcwJ — PHP Tools 1.0 原始 Usenet 发布邮件，历史的第一手资料
- https://en.wikipedia.org/wiki/PHP — PHP 维基百科条目，事实核查用
- https://en.wikipedia.org/wiki/Rasmus_Lerdorf — Rasmus Lerdorf 生平背景
- https://en.wikipedia.org/wiki/Zend_Engine — Zend Engine 的技术背景
- https://en.wikipedia.org/wiki/LAMP_(software_bundle) — LAMP 栈的历史
- https://en.wikipedia.org/wiki/WordPress — WordPress 的发展和影响力
- https://en.wikipedia.org/wiki/Common_Gateway_Interface — CGI 规范背景
- https://webdevelopmenthistory.com/1993-cgi-scripts-and-early-server-side-web-programming/ — CGI 脚本时代的生动描述，包含 PHP 诞生的语境
- https://www.php.net/manual/en/history.php.php — PHP 官方历史页面，第一人称叙述
- https://www.youtube.com/watch?v=wCZ5TJCBWMg — "25 Years of PHP (by the Creator of PHP)"，Rasmus Lerdorf 本人的演讲
