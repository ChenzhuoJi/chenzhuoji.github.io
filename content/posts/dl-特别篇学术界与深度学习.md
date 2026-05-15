---
title: "特别篇·学术界与深度学习：冰山之下的知识"
date: 2026-05-15
genre: vibe
column: 深度学习的故事
series: 特别篇
order: 23
tags: [学术界, NeurIPS, ICML, ICLR, CVPR, arXiv, 论文, 会议, 特别篇]
description: "在那些改变一切的关键论文背后，是每年数万篇被发表、数十万篇被拒绝的研究。深度学习不仅是一场技术革命，更是一个巨大而残酷的学术产业。"
---

## 被遗忘的大多数

当你阅读《深度学习的故事》这套专栏时，你看到的是一个由"关键论文"串起来的历史——AlexNet、ResNet、Transformer、GPT。这些名字被反复提及，它们的作者被当作明星，它们的发表日期被当作时代的节点。

但这是一个经过高度选择后的叙事。

在每一篇改变一切的论文背后，有成千上万篇同样发表在顶会上的论文——它们的方法被引用了几次就沉没了。在每一篇顶会论文背后，有数十篇被拒绝的投稿——它们可能有着同样好的想法，只是运气不佳、实验不够充分或者方向提前了几年。在每一个被拒绝的投稿背后，有数百次失败的实验——模型不收敛、结果不显著、基线比不过、代码有bug——这些失败从不被发表，但它们是每个实验室的日常。

这是深度学习的另一面：它是一门实验学科，而且是一门绝大多数实验都会失败的实验学科。那些闪闪发光的关键论文是冰山的一角，而冰山的其余部分——数万篇期刊会议文章、数百万次失败的训练——才是支撑这个领域的真实结构。

## 会议文化

与传统科学不同，深度学习和AI研究的主要发表渠道不是期刊，而是会议。

在物理学或生物学中，一篇论文从投稿到在期刊上发表通常需要数月甚至数年。审稿过程是单轮或双轮的，发表后可供同行引用和质疑。这是一个慢速但相对完整的流程。但在深度学习中，速度就是一切。

机器学习领域的三大顶会——NeurIPS、ICML和ICLR——每年各接收数千篇论文。从投稿到接收决定通常在四到六个月之间。一旦被接收，作者在几周后就可以在公开的会议论文集中提供论文的最终版本。这种快节奏与领域的进展速度相匹配：如果一个想法需要一年半才能发表，它在当时的学术情境中可能已经过时了。

这种会议文化塑造了深度学习研究的几个特征。

首先，可复现性一直是一个被反复提及但未完全解决的问题。会议论文的审稿周期通常只有几个月，审稿人没有时间——也没有义务——去复现代码并验证结果。大多数论文提交时附带代码——这已经成为领域的默认规范。但代码可运行不等于结果可复现：超参数的选择、数据集预处理的方式、硬件的随机性——这些因素在复现时往往导致结果与论文宣称的不一致。

其次，增量式改进占据着文献的主体。每年有大量的论文在某个基准数据集上把准确率提高零点几个百分点——用更复杂的架构、更精细的调参或者更大的模型。这些论文可能不是"突破性"的，但它们共同构成了领域进步的基础：今天的SOTA是昨天的一百个改进积累的结果。

第三，会议文化鼓励了激烈的竞争。一个基准数据集上的最高准确率被称为"SOTA"。被刷新的那一刻，之前的记录就自动作废——没有引用的价值，没有讨论的意义，只有被遗忘。这种竞争驱动了快速进步，但也带来了代价——研究者倾向于选择那些"容易刷高"的数据集，回避那些没有现成基准的、可能更有价值的问题。

## 三大顶会

NeurIPS——神经信息处理系统大会——是机器学习领域历史最悠久、规模最大的会议。1987年创办时，它只是一个关于神经网络的小型跨学科研讨会，参会者不到一百人。到2024年，NeurIPS收到了超过一万篇投稿，参会人数超过两万人。它的范围已经远远超出了神经网络，涵盖了机器学习、优化、概率模型、强化学习和AI伦理等几乎所有方向。在深度学习的时代，NeurIPS是每一个研究者最想发表论文的场所——也是最难被接收的场所之一，接收率通常在百分之二十到二十五之间。

ICML——国际机器学习大会——是机器学习的旗舰会议，创办于1980年，比NeurIPS更早。ICML的风格比NeurIPS更偏向算法和理论，近年来它与NeurIPS的界限越来越模糊——两者接收的论文在主题上高度重叠，审稿人和作者群体也几乎一致。ICML的接收率与NeurIPS相当，竞争同样激烈。

ICLR——国际学习表征大会——是三大顶会中最年轻的一个，2013年才首次举办。ICLR由杨立昆和约舒亚·本吉奥等人发起，旨在填补NeurIPS和ICML在"表征学习"——也就是深度学习——这一核心方向上的空白。ICLR引入了一个在当时颇具争议的审稿方式：在论文正式审稿之前，先将投稿放在公开平台上接受同行的公开评审和讨论。经过多年的运行，这种开放评审的模式被认为显著提高了审稿质量，并已被其他会议部分采纳。在深度学习社区，ICLR的声望迅速上升，到2020年代已成为与NeurIPS和ICML并驾齐驱的三大顶会之一。

## 视觉与语言的会议

在三大综合性顶会之外，计算机视觉和自然语言处理领域拥有自己的旗舰会议。

CVPR——计算机视觉与模式识别会议——是计算机视觉领域的第一会议。每年六月的CVPR是视觉研究者最重要的展示窗口，投稿量在2024年超过了一万两千篇，接收率不到百分之二十三。ICCV——国际计算机视觉会议——奇数年举办，与CVPR交替，地位相当。视觉领域的论文风格倾向于强调可复现的基准评估，这在很大程度上塑造了深度学习时代的视觉研究的方法论和实验标准。

ACL——计算语言学会年会——和EMNLP——自然语言处理经验方法会议——是自然语言处理领域的两大主要会议。ACL的历史更久（1962年创办），EMNLP规模更大。BERT、GPT等模型的原始论文都发表在NLP会议上（BERT发表于NAACL，GPT系列最初主要通过arxiv发布或发表在特定领域会议上）。两个会议的接收率都在百分之二十到二十五之间。

AAAI和IJCAI——人工智能领域的综合性会议——覆盖AI的各个子方向。它们的影响因子近年被三大顶会超过，但在AI的广义范围内仍然有重要地位。

## arXiv一刻

arXiv改变了AI研究的节奏。

arXiv是一个由康奈尔大学运营的预印本平台，研究者可以在论文经过同行评审之前就公开发布。在物理学和高能物理领域，arXiv自1990年代以来就是标准做法。但在AI领域，arXiv在2010年代后期才成为主流——并逐渐取代了会议作为"第一时间获取新结果"的渠道。

今天，一项重要结果的发布时间线是这样的：作者在arXiv上发布预印本——这个链接会立即在Twitter/X和各类AI新闻聚合平台上传播。几小时之内，全球的研究者就看到了。接下来的几天内，各大实验室开始讨论、复现和扩展这个结果。几个月后，论文正式在会议或期刊上出版——但到那时，它已经被社区消化了。

这种节奏意味着会议的作用正在从"发布新结果"转变为"认证质量"。一个NeurIPS的接收徽章仍然是简历上的重要凭证——它意味着这篇论文经过了几位审稿人的筛选，达到了一定的质量标准。但真正重要的结果在会议论文集中出现之前就已经被广泛接受了。

这种模式也有一些明显的问题。在缺乏质量控制的预印本平台上，错误的方法、无法复现的结果、甚至有问题的论文也可以在社区中获得相当的关注并形成传播。

## 随机性的力量

深度学习学术界最不为人谈论的一个事实是：接收过程有很大的随机性。

几项研究系统地分析了机器学习会议的审稿过程，发现在同一个会议上，同一篇论文被分配给不同的审稿人，获得接收的概率可能相差百分之三十到五十。审稿人的疲劳程度、专业领域是否匹配、甚至当天的心情——这些因素对论文命运的影响，可能超过了论文本身的质量差异。

这意味着每年有数千篇质量合格的论文因"运气不好"被拒绝，也有同样数量质量平庸的论文因"运气好"被接收。被接收的论文不一定更好，被拒绝的论文也不一定更差。

许多今天被视为经典的工作在第一次投稿时曾被拒绝。2017年的Transformer论文——现在AI时代的基础——最初在ICLR 2018被拒绝。ResNet在CVPR 2015被接收，但审稿人对它的评价中混杂了不少怀疑——"太深了训练不起来""梯度消失"。Ian Goodfellow在生成对抗网络论文被NIPS 2014接收后的回忆是：审稿人认为它的"实验不够充分"，基于当时的评审标准，它差点落选。

这就是学术界的本质——一个嘈杂的、不完全的、充满随机性的人类系统。关键论文之所以成为关键论文，不仅因为它们本身的质量，也因为它们在正确的时间、正确的地点、被正确的人读到。

## 浮在水面

深度学习已经成为一门实验学科。这个领域的进展不再由理论推导推进，而是由反复的实验、大规模的试错和工程创新推动的。

在论文线中写到的每一个改变方向的想法——从注意力的引入到残差连接，从自注意力到RLHF——都可以在论文线之前的数年里找到零散的先行工作。这些工作没有成为"关键论文"，原因多种多样——实验规模不够大、写作不够清晰、时机不对、或者仅仅是因为审稿人没有理解它的意义。

这些被遗忘的论文和它们的作者，构成了深度学习的学术基础设施。他们中的大多数人在发表他们的论文时没有得到头条新闻的报道，没有在演讲前受到排着长队的听众的簇拥，没有后来被列入深度学习的教科书中。但他们的工作——那些没有成为关键论文的论文、那些没有被引入实践的方向、那些在会议的角落被展示的海报——是这个领域的底色。

今天的深度学习已经是一个巨大的学术产业。全球有数十万名研究者、每年有数万篇论文发表、有数百亿美元的经费投入。但那个基本的模式仍然没有改变：绝大多数实验会失败，绝大多数论文不会被记住，绝大多数研究者不会成为"明星"。

但那些失败和那些被遗忘的论文是这个领域的养料。没有它们，就不会有那些偶尔涌现的"关键论文"——因为关键不是凭空出现的，它建立在一个广阔而深厚的基础上，而这个基础的大部分始终在水面之下。

---

## 深度学习与AI主要会议及期刊一览

### 顶级会议

| 缩写 | 全称 | 领域 | 创办年份 | 接收率 |
|------|------|------|----------|--------|
| **NeurIPS** | Conference on Neural Information Processing Systems | 机器学习综合 | 1987 | ~22% |
| **ICML** | International Conference on Machine Learning | 机器学习 | 1980 | ~25% |
| **ICLR** | International Conference on Learning Representations | 表征学习/深度学习 | 2013 | ~25% |
| **CVPR** | Conference on Computer Vision and Pattern Recognition | 计算机视觉 | 1983 | ~23% |
| **ICCV** | International Conference on Computer Vision | 计算机视觉 | 1987 | ~24%（奇数年） |
| **ECCV** | European Conference on Computer Vision | 计算机视觉 | 1990 | ~27%（偶数年） |
| **ACL** | Annual Meeting of the Association for Computational Linguistics | 自然语言处理 | 1962 | ~22% |
| **EMNLP** | Conference on Empirical Methods in Natural Language Processing | 自然语言处理 | 1996 | ~22% |
| **AAAI** | AAAI Conference on Artificial Intelligence | AI综合 | 1980 | ~20% |
| **IJCAI** | International Joint Conference on Artificial Intelligence | AI综合 | 1969 | ~25% |
| **ICRA** | International Conference on Robotics and Automation | 机器人 | 1984 | ~40% |
| **CoRL** | Conference on Robot Learning | 机器人学习 | 2017 | ~35% |
| **KDD** | ACM SIGKDD Conference on Knowledge Discovery and Data Mining | 数据挖掘 | 1994 | ~20% |
| **WWW** | The Web Conference | 互联网/数据挖掘 | 1994 | ~18% |
| **SIGIR** | International ACM SIGIR Conference on Research and Development in Information Retrieval | 信息检索 | 1978 | ~25% |
| **USENIX** | USENIX Annual Technical Conference | 系统/ML系统 | 1990 | ~18% |
| **MLSys** | Conference on Machine Learning and Systems | ML系统 | 2018 | ~30% |
| **Interspeech** | Annual Conference of the International Speech Communication Association | 语音 | 1988 | ~45% |
| **ICASSP** | International Conference on Acoustics, Speech, and Signal Processing | 语音/信号处理 | 1976 | ~45% |
| **ISMIR** | International Society for Music Information Retrieval Conference | 音乐信息检索 | 2000 | ~30% |
| **FAccT** | ACM Conference on Fairness, Accountability, and Transparency | AI伦理/公平 | 2018 | ~25% |
| **AISTATS** | International Conference on Artificial Intelligence and Statistics | ML/统计 | 1985 | ~33% |
| **UAI** | Conference on Uncertainty in Artificial Intelligence | 概率模型 | 1985 | ~30% |
| **COLT** | Conference on Learning Theory | 学习理论 | 1988 | ~30% |
| **ICLR** workshop track | — | 各方向 | — | ~45% |

### 重要期刊

| 缩写 | 全称 | 影响因子范围 | 备注 |
|------|------|-------------|------|
| **JMLR** | Journal of Machine Learning Research | ~6.0 | ML领域最权威期刊，完全开源 |
| **TPAMI** | IEEE Transactions on Pattern Analysis and Machine Intelligence | ~20.0 | 计算机视觉与模式识别顶刊 |
| **TNNLS** | IEEE Transactions on Neural Networks and Learning Systems | ~12.0 | 神经网络领域期刊 |
| **IJCV** | International Journal of Computer Vision | ~12.0 | 计算机视觉顶刊 |
| **MLJ** | Machine Learning Journal | ~5.0 | 历史最悠久的ML期刊之一 |
| **AIJ** | Artificial Intelligence Journal | ~9.0 | AI综合期刊，创刊于1970 |
| **JMLT** | Journal of Machine Learning Theory | 新刊 | 偏理论方向 |
| **TMLR** | Transactions on Machine Learning Research | 新刊 | ICLR姊妹刊，持续征稿 |

### 国内核心期刊 (部分)

| 缩写 | 全称 |
|------|------|
| **计算机学报** | Chinese Journal of Computers |
| **软件学报** | Journal of Software |
| **计算机研究与发展** | Journal of Computer Research and Development |
| **自动化学报** | Acta Automatica Sinica |
| **模式识别与人工智能** | Pattern Recognition and Artificial Intelligence |
| **中国科学：信息科学** | Science China: Information Sciences |

### 国内顶级会议

| 缩写 | 全称 |
|------|------|
| **CCAI** | 中国人工智能大会 |
| **CCDM** | 中国数据挖掘会议 |
| **NCIG** | 全国计算机图形学大会 |
| **PRCV** | 中国模式识别与计算机视觉大会 |
| **NLPCC** | 自然语言处理与中文计算会议 |
