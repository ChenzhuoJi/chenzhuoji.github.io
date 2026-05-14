---
title: 深度学习的故事（十）：152 层的赌局——ResNet 与 ILSVRC 2015
date: 2026-05-23
genre: vibe
column: 深度学习的故事
tags: [深度学习, ResNet, Kaiming He, ImageNet]
description: 2015 年，一群人发现了「更深更差」的怪现象，然后做了一件简单到令人不安的事。
---

> [上一回](/posts/dl-01-04-perceptron-retro)我们回溯到了感知机的年代——1958 年，第一颗螺丝钉。
>
> 现在我们把时钟拨回 2015 年。这一年发生了一件很多人认为不可能的事：一台机器第一次在图像识别上超越了人类。

## 2014：更深就是更好

2014 年底，计算机视觉界达成了一个共识：**更深就是更好。**

这个共识不是凭空来的。ILSVRC 2014 的结果摆在所有人面前——ImageNet 竞赛每年都在用同一套基准衡量全世界的算法水平。

冠军是 Google 的 GoogLeNet，22 层，top-5 错误率 6.67%。亚军是 Oxford 的 VGG，19 层，7.32%。

对比一下 2012 年的 AlexNet——8 层，15.3%。仅仅两年，层数翻了不到三倍，错误率降了一半多。

于是整个领域开始疯狂加层。Google 在做更深版本的 Inception。Oxford 做完 VGG-16 马上做了 VGG-19。全世界的实验室都在尝试：能不能堆到 30 层？50 层？

北京，微软亚洲研究院（MSRA），何恺明的团队也在做这件事。

## 暗礁

何恺明、张祥雨、任少卿、孙剑——这个四人组已经在深度卷积网络上做了好几轮高质量的工作。SPP-net、PReLU、Faster R-CNN……他们不是新手。

但他们在加层这件事上撞到了一堵看不见的墙。

尝试很直接：在 CIFAR-10 上训练一个 20 层的网络，测一下。再堆到 56 层，测一下。

结果令人困惑。

**56 层的训练误差比 20 层更高。**

这不是过拟合——过拟合是测试误差高但训练误差低。这是训练误差本身就更高。也就是说：56 层的网络在训练数据上就比 20 层的表现更差。

这不是梯度消失。他们做了当时已知的所有防止梯度消失的措施：He 初始化（何恺明自己刚提出的归一化方案）、BatchNorm、正确的学习率调度。梯度传得回去。但网络就是训不动。

就好像更多的层数不仅没有帮助，反而成了累赘。

> **说明 · 退化问题（Degradation Problem）**
>
> 随着网络深度增加，准确率达到饱和后迅速下降。这不是过拟合（训练误差也在上升），说明是优化困难。
>
> 直觉上，更深的网络不应该比更浅的网络差——因为如果额外层什么都不做（恒等映射），深度网络至少能达到浅层网络的性能。但标准 SGD 优化器在参数空间中很难学到「什么都不做」这个简单函数。

团队花了几个月时间反复尝试。调整初始化、调整学习率、加正则化、改结构……都没有解决这个问题。

直到他们想出了一个极其简单、简单到让人不安的想法。

## 捷径

假设你想让一个网络学到一个函数 \(\mathcal{H}(x)\)。

通常你直接堆几层，期望它们拟合出 \(\mathcal{H}(x)\)。但实验证明，当层数多了以后，网络很难拟合出复杂的 \(\mathcal{H}(x)\)。

那如果换个思路呢？

不让网络直接学 \(\mathcal{H}(x)\)，而是让它学 **残差** \(\mathcal{F}(x) = \mathcal{H}(x) - x\)。然后通过一个快捷连接把 \(x\) 加回来：

$$
\mathcal{H}(x) = \mathcal{F}(x) + x
$$

换句话说：**在每一层的输入和输出之间，搭一条直通车道。** 如果这一层学不到有用的东西，数据至少可以通过这条车道原样传过去——网络退化成浅层网络的性能，至少不损失。

这层额外的「什么都不做」——显式的恒等映射——被一个简单的结构实现：

```
输入 x
    │
    ├──→ Conv → BN → ReLU → Conv → BN ──→  F(x)
    │                                        │
    └────────────────────────────────────────┘  └──→  F(x) + x → ReLU
```

这个结构叫做**残差块**（Residual Block）。

> **说明 · 残差块**
>
> 对于输入 \(x\)，经过两层权重层（Conv → BN → ReLU → Conv → BN）得到残差 \(\mathcal{F}(x)\)，然后通过快捷连接（shortcut connection）跳过一个或多个层，将原始输入 \(x\) 与残差相加：\(\mathcal{F}(x) + x\)。
>
> 快捷连接没有引入额外的参数，也没有增加计算复杂度——只是一个逐元素加法。
>
> 关键特性：当 \(\mathcal{F}(x) = 0\) 时，\(\mathcal{H}(x) = x\)——即恒等映射。这意味着网络可以选择性地「关闭」某些层，在训练过程中自主决定哪些层是必要的。

何恺明团队把这个简单的改动加到了他们的网络上。结果几乎是戏剧性的：

同样的 56 层网络，用普通结构，训练误差高于 20 层版本。换成残差结构，56 层的训练误差**低于** 20 层版本。

那堵墙，消失了。

孙剑后来在接受采访时说：**"We even didn't believe this single idea could be so significant."**

（我们甚至不敢相信，这么简单一个想法，效果竟然如此显著。）

## 152 层

2015 年的 ImageNet 竞赛，MSRA 带着他们新设计的网络参战了。

这个网络的名字，就是 ResNet（Residual Network）。

它的深度：**152 层。**

是 VGG-19 的 8 倍，是 GoogLeNet 的 7 倍。在这之前，没有人敢想象这么深的网络能被训练出来。

ResNet 用了一种「瓶颈」设计来保持计算量可控：每个残差块包含三层——1×1 卷积降维 → 3×3 卷积 → 1×1 卷积恢复维度。三层加起来，计算量只相当于一个 3×3 层。

152 层就是这样堆起来的——50 多个瓶颈块，每个块只学一点点残差修正，通过快捷连接串联成一条巨大的高速公路。

> **说明 · 瓶颈块（Bottleneck Block）**
>
> 用于 50 层以上的 ResNet。每个块的结构：
>
> 256 维 → 1×1 Conv (64) → 3×3 Conv (64) → 1×1 Conv (256)
>
> 先在内部降低维度（256→64），做完 3×3 卷积后再恢复（64→256），使 3×3 层的计算量减少到直接做 256→256 的 1/16。
>
> 快捷连接在块的输入和输出之间直接相连（256→256 的恒等映射）。

结果公布时，整个领域安静了几秒钟。

**ResNet 的 top-5 错误率：3.57%。**

第二名 Qualcomm：4.87%。第三名 Trimps-Soushen：4.65%。

差距超过了一个百分点——在 ImageNet 上，这个差距是巨大的。

但真正让这条消息传遍全世界的不是名次，是那个数字本身。

**3.57%。**

在那之前，业界普遍接受的「人类水平」ImageNet top-5 错误率是 5.1%（由 Andrej Karpathy 在 2014 年做的一个自测实验估算）。也就是说，ResNet 不仅赢了比赛——**它越过了人类基准线。**

2015 年 12 月 10 日，《纽约时报》发表了标题为 "A Learning Advance in Artificial Intelligence Rivals Human Abilities" 的报道。这是主流媒体第一次报道机器在视觉识别上达到人类水平。

## 余波

接下来的事情发生得很快。

CVPR 2016 最佳论文奖——毫无悬念。

不到一年，几乎所有主流视觉架构都用上了残差连接。Google 把自己的 Inception 和残差连接结合，做出了 Inception-ResNet。

ResNet 的影响超出了视觉。2017 年的 Transformer 论文用了残差连接。GPT、BERT、AlphaFold——这些后来改变领域的模型，都或多或少站在了那条 shortcut 的肩膀上。

而何恺明本人呢？2016 年从中科院 MSRA 加入 Facebook AI Research（FAIR）。2024 年成为 MIT 副教授。他在 MSRA 发表的每一篇主要论文——SPP-net、PReLU、ResNet、Faster R-CNN、Mask R-CNN——都成了行业标准。

这是那种十年一遇的学术生涯。

但最值得记住的，可能还是那个极其简单的想法：**如果学不会更好的，至少别比现在差。** 把这个直觉翻译成数学，就是一个加法运算。

捷径，有时就是了不起的创新。

---

> *下一篇预告：ResNet 算法篇——残差块详解、退化问题的可视化、从零搭建 34 层 ResNet。*

## 回顾篇：ILSVRC 冠军进化史

| 年份 | 模型 | 层数 | Top-5 错误率 |
|---|---|---|---|
| 2012 | AlexNet (Krizhevsky) | 8 | 15.3% |
| 2013 | Clarifai (Zeiler & Fergus) | ~8 | 11.7% |
| 2014 | GoogLeNet (Szegedy) | 22 | 6.67% |
| 2014 | VGG (Simonyan & Zisserman) | 19 | 7.32% |
| **2015** | **ResNet (He et al.)** | **152** | **3.57%** |
| 2016 | GoogLeNet v4 / Inception-ResNet | ~22+ | ~3.1% |
| 2017 | SENet (Hu et al.) | ~154 | 2.25% |

### ResNet 关键数字

| 项目 | 数值 |
|---|---|
| 论文 | *Deep Residual Learning for Image Recognition* (CVPR 2016 Best Paper) |
| 团队 | Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun (MSRA) |
| 最大深度 | 152 层（有 1202 层的实验但未用于竞赛） |
| 核心参数 | ~60M（152 层 ResNet） |
| 参数量 vs 深度 | 约 25M（50 层 ResNet） |
| Top-5 错误率 | 3.57%（集成） |
| 人类基准 | ~5.1%（Karpathy 2014 估算） |
| 引用量 | 20 万+（截至 2026） |

### 参考

- He, K., Zhang, X., Ren, S., Sun, J. *Deep Residual Learning for Image Recognition.* CVPR 2016.
- He, K., Zhang, X., Ren, S., Sun, J. *Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification.* ICCV 2015.
- Szegedy et al. *Going Deeper with Convolutions.* CVPR 2015.
- Simonyan & Zisserman. *Very Deep Convolutional Networks for Large-Scale Image Recognition.* ICLR 2015.
- Microsoft AI Blog. *Microsoft Researchers Win ImageNet Computer Vision Challenge.* Dec 10, 2015.
- Markoff, J. *A Learning Advance in Artificial Intelligence Rivals Human Abilities.* The New York Times, Dec 10, 2015.
