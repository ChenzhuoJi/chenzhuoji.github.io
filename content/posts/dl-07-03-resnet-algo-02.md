---
title: 深度学习的故事（十二）：152 层的旅程——瓶颈与全景
date: 2026-05-24
genre: vibe
column: 深度学习的故事
tags: [深度学习, ResNet, 瓶颈块, 架构]
description: 穿过 50 多个残差块，从 224 像素到最终的分类——一张图片的完整旅程。
---

> [上一回](/posts/dl-07-02-resnet-algo-01)，我发现了捷径的力量——一个简单的加法，让我在深不见底的网络中保住了自己。
>
> 这一回，我将走完这场旅程的全部 152 层。

## 压缩与扩张：瓶颈

继续往下走，我遇到了一个新的结构。

它看起来和之前的残差块不太一样。之前的块是两个 3×3 卷积首尾相连。但这个块——有三个层，而且每层的通道数在变化。

```
输入: 256 通道
    │
    ├── 1×1 Conv (64)    ← 把我压缩到 64 通道
    ├── 3×3 Conv (64)    ← 在低维空间处理
    ├── 1×1 Conv (256)   ← 把我恢复到 256 通道
    │
    └── + (捷径: 256 通道的我直接通过)
```

我先是**被压缩**了。256 个通道收缩到 64 个。

感觉像什么？想象你本来是带着 256 人团队出行，突然被要求只能带 64 个人上飞机。你不得不把大多数人留在原地，只带最核心、最精简的版本上路。

然后在那个被压缩的空间里，3×3 卷积开始处理我。因为通道数少，计算量只有原来的四分之一。

处理完之后，我**被扩张**回来——用一个 1×1 卷积把我恢复到 256 通道。这个操作把我的处理结果「翻译」回完整的维度，和捷径上的我汇合。

> **说明 · 瓶颈块（Bottleneck Block）**
>
> 用于 ResNet-50 及以上的深层版本。核心思想：先用 1×1 卷积降维，处理完再用 1×1 卷积恢复。
>
> ```python
> class Bottleneck(nn.Module):
>     def __init__(self, in_channels, mid_channels, out_channels, stride=1):
>         super().__init__()
>         self.conv1 = nn.Conv2d(in_channels, mid_channels, 1, stride=stride)
>         self.bn1 = nn.BatchNorm2d(mid_channels)
>         self.conv2 = nn.Conv2d(mid_channels, mid_channels, 3, stride=1, padding=1)
>         self.bn2 = nn.BatchNorm2d(mid_channels)
>         self.conv3 = nn.Conv2d(mid_channels, out_channels, 1)
>         self.bn3 = nn.BatchNorm2d(out_channels)
>         self.relu = nn.ReLU(inplace=True)
>         
>         self.shortcut = nn.Sequential()
>         if stride != 1 or in_channels != out_channels:
>             self.shortcut = nn.Sequential(
>                 nn.Conv2d(in_channels, out_channels, 1, stride=stride),
>                 nn.BatchNorm2d(out_channels),
>             )
>     
>     def forward(self, x):
>         out = self.relu(self.bn1(self.conv1(x)))  # 压缩
>         out = self.relu(self.bn2(self.conv2(out)))  # 处理
>         out = self.bn3(self.conv3(out))  # 恢复
>         out += self.shortcut(x)
>         out = self.relu(out)
>         return out
> ```
>
> 为什么叫瓶颈？入口宽 → 中间窄 → 出口宽，形似瓶颈。
>
> 计算量对比：
> - 普通 3×3 (256→256)：256 × 256 × 3 × 3 = 589,824 次乘法
> - 瓶颈 (256→64→256)：256×64×1×1 + 64×64×3×3 + 64×256×1×1 = 16,384 + 36,864 + 16,384 = 69,632 次乘法
>
> 节省了 **8 倍**计算量。

这个设计是 ResNet 能堆到 152 层的关键。没有瓶颈，计算量早就爆炸了。

## 四个阶段

继续往下走。

我发现 ResNet 的结构是有节奏的。它分成四个阶段，像一首有四个乐章的曲子。

**Stage 1（预激活）**：一个 7×7 的大卷积 + 最大池化，把我从 224×224 快速降到 56×56。这是热身。

**Stage 2（3 个残差块）**：56×56 的空间分辨率，64 通道。我开始学习基础的纹理和图案。

**Stage 3（4 个残差块）**：第一次下采样。28×28 的空间，128 通道。我继续变深，空间缩小，通道翻倍。

**Stage 4（6 个残差块）**：14×14，256 通道。更深层的语义开始浮现。

**Stage 5（3 个残差块）**：7×7，512 通道。这是最后的特征提取阶段——7×7 的空间分辨率，512 个通道。然后一个全局平均池化把我浓缩成一个向量。

最后，一个 1000 维的全连接层从我身上提取出最终的分类结果。

> **说明 · ResNet-50 架构全景**
>
> ```
> 输入: 224×224×3
>    │
>    ├── 7×7 Conv, 64, stride=2          → 112×112×64
>    ├── 3×3 MaxPool, stride=2            → 56×56×64
>    │
>    ├── Stage 1: [1×1, 64     ] × 3      → 56×56×256
>    │             3×3, 64
>    │             1×1, 256
>    │
>    ├── Stage 2: [1×1, 128    ] × 4      → 28×28×512
>    │             3×3, 128
>    │             1×1, 512
>    │
>    ├── Stage 3: [1×1, 256    ] × 6      → 14×14×1024
>    │             3×3, 256
>    │             1×1, 1024
>    │
>    ├── Stage 4: [1×1, 512    ] × 3      → 7×7×2048
>    │             3×3, 512
>    │             1×1, 2048
>    │
>    ├── Global Avg Pool                 → 2048
>    ├── FC 1000                         → 1000
>    └── Softmax                         → 类别概率
> ```

## ResNet 家族

在走出网络之前，我瞥见了旁边几条通道上的同伴。不同的 ResNet 版本，有不同的深度和结构。

**ResNet-18** —— 34 岁的中年人。最简单的两层残差块。适合快速实验。**ResNet-34** —— 稍深一些的版本。**ResNet-50** —— 我就是这个版本。引入了瓶颈块，是精度和速度的最佳平衡。**ResNet-101** —— 50 个瓶颈块，堆到了 101 层。更精准，也更慢。**ResNet-152** —— 2015 年 ImageNet 冠军。60 个瓶颈块，152 层。我的大哥。

> **说明 · ResNet 版本对比**
>
> | 版本 | 层数 | 块类型 | 块数 | 参数量 | Top-5 错误率（单模型）|
> |---|---|---|---|---|---|
> | ResNet-18 | 18 | 基础块 | 8 | 11.7M | ~10.9% |
> | ResNet-34 | 34 | 基础块 | 16 | 21.8M | ~10.5% |
> | **ResNet-50** | **50** | **瓶颈块** | **16** | **25.6M** | **~8.9%** |
> | ResNet-101 | 101 | 瓶颈块 | 33 | 44.5M | ~8.5% |
> | ResNet-152 | 152 | 瓶颈块 | 50 | 60.2M | ~8.3% |
>
> 所有版本遵循同一结构模板，区别在于每个阶段的块数。

有趣的是，ResNet-18 和 ResNet-34 使用基础残差块（两个 3×3），而 ResNet-50 及以上使用瓶颈块（1×1 → 3×3 → 1×1）。这是因为深层网络的通道数越来越大（最高到 2048），需要瓶颈来压缩计算量。

## 出口

我走完了全部路程。

从 224×224×3 的原始像素，到 7×7×2048 的抽象特征，到 2048 维的向量，到最后的 1000 个类别概率。

一路走来，我经过了 50 多个残差块。在每个块里，我都分裂成两个自己——一个被变换、一个保持原样——然后重聚。

我的核心身份从未丢失。

在第 1 层，我是一张天空下有红色尾灯的汽车照片。

在第 152 层，我被识别为一辆汽车——类别编号 468。

我还是我。

```python
import torchvision.models as models
import torch

# 加载一个预训练 ResNet-50
resnet50 = models.resnet50(pretrained=True)
resnet50.eval()

# 我是一个预处理好的图片
x = torch.randn(1, 3, 224, 224)  # (batch, channels, height, width)

# 走完 152 层
with torch.no_grad():
    out = resnet50(x)  # → (1, 1000) 类别的原始分数
    
pred_class = out.argmax(dim=1)
```

> *下一篇预告：回顾篇——从零搭建 ResNet：完整代码实现。*
