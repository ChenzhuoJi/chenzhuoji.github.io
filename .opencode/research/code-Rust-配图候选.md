# Rust：安全的代价 — 配图候选清单

> 第一阶段候选搜索 | 2026-05-16
> 
> 来源策略：优先 Wikipedia Commons 公有领域 / CC 协议图片

---

## 第一章：电梯坏了

### 1. Graydon Hoare 肖像
- **候选**：Wikipedia 上 Graydon Hoare 重定向到 Rust 页面，无独立肖像页。
- **替代方案**：搜索 MIT Technology Review 2018 年报道《The Era of Rust》中的 Hoare 照片（需注意版权）
- **Flickr**：Exey Panteleev 拍摄的 "Geekography" 系列中有一张题为 "Rust" 的照片（File:Rust (43904924980).jpg），CC BY 2.0，但画面为裸体女性，**不可用**
- **推荐途径**：Phase 2 时尝试从 MIT Technology Review 文章获取 Hoare 的肖像（编者授权的新闻图片），或使用 RustConf/GOTO 会议视频截图

### 2. 锈菌（rust fungus）照片
- **候选**：`File:Stem rust close up.jpg`
  - 来源：Wikipedia Commons，公有领域（USDA ARS）
  - 链接：https://commons.wikimedia.org/wiki/File:Stem_rust_close_up.jpg
  - 描述：秆锈菌（Puccinia graminis）在麦秆上的微距特写，橙红色锈斑清晰可见
  - 适合作为 Rust 语言命名的隐喻插图

- **备选**：
  - `File:Puccinia graminis 106744072.jpg` — CC BY, iNaturalist 照片
  - `File:Puccinia graminis on Elytrigia repens, Minera, North Wales, Oct 2021.jpg` — CC BY-SA

### 3. Vancouver apartment building（时代氛围）
- **候选**：`File:West Vancouver Apt Buildings.jpg`
  - 来源：Wikipedia Commons，拍摄于 2006 年 4 月
  - 链接：https://commons.wikimedia.org/wiki/File:West_Vancouver_Apt_Buildings.jpg
  - 描述：西温哥华公寓楼群，2006 年摄影，符合 Rust 诞生的时间和地点氛围

- **备选**：
  - `File:The West End - panoramio - Colin W.jpg` — 温哥华西区住宅，2006 年
  - `File:Spectrum 2, Vancouver.jpg` — 温哥华公寓高层

---

## 第二章：来自过去的技术

### 4. OCaml logo（最初的编译器在 OCaml 编写）
- **候选**：`File:OCaml Logo.svg`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:OCaml_Logo.svg
  - 描述：OCaml 语言的官方 logo——一匹骆驼
  - 适合标注："Rust 的编译器最初是用 OCaml 写的（38,000 行）"

### 5. C 语言代码截图（1990s 风格）
- **候选**：无直接现成的 1990s C 代码截图在 Commons 上
- **建议**：Phase 2 时从 K&R C 书籍扫描件中截取一段经典 C 代码，如 Dennis Ritchie 的 "Hello, World" 原始代码
- **可替代**：展示 C 语言手册封面以暗示 C 的影响

### 6. Cyclone programming language（安全 C 方言）
- **候选**：Commons 上未找到 Cyclone logo 或相关图片
- **建议**：Phase 2 时搜索 Cyclone 语言论文的封面页（"Cyclone: A Safe Dialect of C" — USENIX 2002）
- **可替代**：仅用文字标注，Cyclone 在 Commons 上缺乏视觉素材

---

## 第三章：Mozilla 的赌注

### 7. Brendan Eich portrait（2000s）
- **候选**：`File:Brendan_Eich_Mozilla_Foundation_official_photo.jpg`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:Brendan_Eich_Mozilla_Foundation_official_photo.jpg
  - 描述：Brendan Eich 2012 年的 Mozilla 官方照片，适合放在正文或文末人物章节
  - 说明："Brendan Eich——JavaScript 之父、Mozilla 联合创始人。他在 2009 年推动 Mozilla 正式赞助 Rust。"

### 8. Mozilla HQ 门牌
- **候选**：`File:MozillaCaliforniaHeadquarters.JPG`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:MozillaCaliforniaHeadquarters.JPG
  - 描述：Mozilla 基金会总部，650 Castro Street, Mountain View，2009 年 6 月拍摄
  - 说明："Mozilla 总部，2009 年。就是在这栋楼里，Rust 从一个人的业余项目变成了 Mozilla 的正式项目。"

### 9. Nerd cave 会议室
- **候选**：无直接的 "nerd cave" 门牌照片在 Commons 上
- **建议**：Phase 2 时搜索 MIT Technology Review 或 The Register 文章中可能出现的 "nerd cave" 签名照片

---

## 第四章：所有权的诞生

### 10. Rust 编译器错误信息截图
- **候选**：无现成截图在 Commons 上
- **建议**：Phase 2 时自行编译一段经典的借用检查器错误，截图保存。例如：
  ```rust
  fn main() {
      let s = String::from("hello");
      let r = &s;
      drop(s);
      println!("{}", r); // error: borrow of moved value
  }
  ```

### 11. Niko Matsakis portrait
- **候选**：Commons 上搜索 "Niko Matsakis" 无结果
- **建议**：Phase 2 时从 Rust 官方博客、RustConf 演讲视频或 GitHub 个人资料获取肖像

### 12. 内存所有权示意图
- **候选**：Commons 上无现成 Rust 所有权示意图
- **建议**：Phase 2 时自行绘制简单的所有权与借用示意图（公有领域），或使用《The Rust Programming Language》书中开源插图的修改版本

---

## 第五章：火的试炼 2013-2015

### 13. Rust 0.1 发布页面
- **候选**：Commons 上无 Rust 0.1 发布公告截图
- **建议**：Phase 2 时截图 https://www.mail-archive.com/rust-dev@mozilla.org/msg00001.html 或 2012 年的 Rust 博客

### 14. Rust 2015 版本号时间线
- **候选**：无现成时间线图
- **建议**：Phase 2 时自行制作简洁的时间线图

### 15. Rust logo 演进
- **候选**：
  - Rust 当前 logo：`File:Rust_programming_language_black_logo.svg`
  - Logo 齿轮（不含字母）：`File:Rust Programming Language Logo Gear only.svg`
  - 来源：Wikipedia Commons，Rust Foundation 版权
  - 链接：https://commons.wikimedia.org/wiki/File:Rust_programming_language_black_logo.svg
  - 描述：Rust 语言的官方 logo——自行车飞轮中嵌入字母 R。2011 年基于自行车链轮设计

### 16. Patrick Walton portrait
- **候选**：Commons 上搜索 "Patrick Walton Rust" 无结果
- **建议**：Phase 2 时从 Rust 社区渠道获取肖像。Patrick Walton 后来在 Meta 工作，可尝试搜索他的公开演讲照片

---

## 第六章：Servo

### 17. Servo logo
- **候选**：`File:Servo Logo.svg`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:Servo_Logo.svg
  - 描述：Servo 浏览器引擎的官方 logo

- **备选**：
  - `File:Servo.png` — 较新版本的 Servo logo
  - `File:Logo_of_Servo_(software).svg` — Servo logo 的另一种版本

### 18. Firefox 浏览器
- **候选**：`File:Home_page_servo_v0.01.png`（Servo 渲染维基百科首页的早期截图）
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:Home_page_servo_v0.01.png
  - 描述：Servo v0.01 渲染的维基百科首页，2016 年

- **备选**：`File:Servo showing wiki - 12 Dec 2024.png` — 较新版本渲染截图

### 19. Servo 架构图
- **候选**：Commons 上无专门架构图
- **建议**：Phase 2 时从 Servo 官方博客或论文中获取

---

## 第七章：安全有价

### 20. Ferris the Crab 吉祥物
- **候选**：`File:Original Ferris.svg`
  - 来源：Wikipedia Commons，CC0 公有领域
  - 链接：https://commons.wikimedia.org/wiki/File:Original_Ferris.svg
  - 描述：Ferris 螃蟹——Rust 的非官方吉祥物，作者 Karen Rustad Tölva
  - 说明："Ferris——Rust 社区的吉祥物。一只螃蟹，因为 Rust 的 '借用检查器' 像螃蟹的钳子一样紧紧抓住你的代码不放。"

### 21. Rust 学习曲线梗图 / "Rust is hard" meme
- **候选**：Commons 上无此类截图
- **建议**：Phase 2 时搜索 Reddit r/rust 中常见的学习曲线梗图，注意合理使用界限
- **可替代**：自行制作简洁的对比图

### 22. Stack Overflow 最受喜爱语言排名
- **候选**：Commons 上无现成的 Stack Overflow 调查截图
- **建议**：Phase 2 时截取 Stack Overflow 年度调查页面的相关部分

---

## 第八章：巨头接管

### 23. Rust Foundation logo
- **候选**：`File:Rust Foundation logo.png`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:Rust_Foundation_logo.png
  - 描述：Rust Foundation 官方 logo

### 24. Dropbox logo
- **候选**：`File:Dropbox logo 2017.svg`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:Dropbox_logo_2017.svg

### 25. Discord logo
- **候选**：`File:Discord Color Text Logo (2015-2021).svg`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:Discord_Color_Text_Logo_(2015-2021).svg

### 26. Linux kernel logo (Tux)
- **候选**：`File:Tux.svg`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:Tux.svg
  - 描述：Tux——Linux 内核官方吉祥物

### 27. Microsoft Azure logo
- **候选**：`File:Microsoft Azure Logo.svg`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:Microsoft_Azure_Logo.svg

### 28. AWS logo
- **候选**：`File:Amazon Web Services Logo.svg`
  - 来源：Wikipedia Commons
  - 链接：https://commons.wikimedia.org/wiki/File:Amazon_Web_Services_Logo.svg

### 29. 公司 logo 墙（第八章结尾使用）
- **建议**：Phase 2 时将以上 4~6 个公司 logo 并列排放，组成 "Rust 的采用者" 群像

---

## 文末人物肖像

大纲所列关键人物，按策略规范集中在文末展示。

### 30. Graydon Hoare
- **状态**：Commons 上无可用肖像
- **建议途径**：
  - MIT Technology Review 2018 年报道（需确认版权）
  - GOTO 2019 或 RustConf 演讲视频截图（合理使用）
  - 他的个人网站或 Mozilla 员工页面存档

### 31. Brendan Eich
- **候选**：`File:Brendan_Eich_Mozilla_Foundation_official_photo.jpg` ✅ 已找到
- 可复用第三章的同一张

### 32. Niko Matsakis
- **状态**：Commons 上无可用肖像
- **建议途径**：Rust 官方博客文章、RustConf 演讲、Twitter/GitHub 头像

### 33. Patrick Walton
- **状态**：Commons 上无可用肖像
- **建议途径**：Mozilla 时期的员工照片存档、Rust 社区活动照片

### 34. Steve Klabnik
- **状态**：Commons 上无肖像照片（仅有视频文件和鞋子截图）
- **建议途径**：Klabnik 的个人网站、Twitter 头像、Rust 书籍作者照片

---

## 总结：需要外部补充的素材

以下项目在 Wikipedia Commons 上未找到合适素材，Phase 2 需要从其他渠道获取：

| 素材 | 建议来源 |
|------|---------|
| Graydon Hoare 肖像 | MIT Technology Review / GOTO 会议 / RustConf |
| Nerd cave 门牌 | MIT Technology Review 文章 |
| Rust 编译器报错截图 | 自行编译截图（CC0 发布） |
| Rust 0.1 发布页面截图 | 自行从 Mozilla 邮件列表存档截图 |
| 内存所有权示意图 | 自行绘制（CC0 发布） |
| Patrick Walton 肖像 | Rust 社区 / Mozilla 照片存档 |
| Niko Matsakis 肖像 | Rust 官方博客 / RustConf |
| Steve Klabnik 肖像 | 个人网站 / Rust 书籍作者页 |
| Stack Overflow 排名截图 | 自行从调查页面截图 |
| Rust 学习曲线梗图 | Reddit / 自行制作 |
| Cyclone logo 或相关图片 | USENIX 论文封面 |
| CLU 语言手册封面 | 搜索 MIT 档案或维基百科文章图片 |

---

*本清单仅作候选记录，不下载任何文件。Phase 2 终稿落图时再做下载和路径更新。*
