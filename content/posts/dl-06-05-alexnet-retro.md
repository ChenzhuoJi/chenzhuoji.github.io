---
title: 深度学习的故事（五）：回顾篇——AlexNet 逐行解读
date: 2026-05-18
genre: vibe
column: 深度学习的故事
tags: [深度学习, AlexNet, PyTorch, 代码]
description: 角色回归、流程全景、完整实现。四篇故事的代码版片尾曲。
---

> [前三篇](/posts/dl-06-03-alexnet-algo-02)我们用一只橘白猫的视角走完了 AlexNet。这一篇是片尾曲——没有比喻，没有拟人，只有代码、维度和架构。

## 角色对照表

| 故事角色 | 技术对应 | PyTorch / Tensor |
|---|---|---|
| 画像 | 输入图片 | `x: (N, 3, 227, 227)` |
| 猎人手中的模板 | 卷积核权重 | `conv.weight: (96, 3, 11, 11)` |
| 猎人扫描画像 | 卷积运算 | `conv2d(x, weight)` |
| 匹配度 | 卷积输出值 | 特征图上的每个标量 |
| 响应图 | 特征图 (feature map) | `(N, 96, 55, 55)` |
| 负分归零 | ReLU 激活 | `relu(x) = max(0, x)` |
| 筛选池 | 最大池化 | `maxpool(x)` |
| 侧抑制 | LRN (局部响应归一化) | `lrn(x)` |
| 消失的裁判 | Dropout | `dropout(x)` |
| 双生竞技场 | GPU 并行 (模型并行) | 两路独立计算后合并 |
| 纹理 → 图案 | 底层 → 高层语义 | 通道数递增，分辨率递减 |
| 分类王座 | 全连接层 | `fc(x) = Wx + b` |

---

## 完整流程架构图

```
画像入场:  (N, 3, 227, 227)
    │
    ▼
┌── Conv1 ──────────────────────────────────────────────┐
│  nn.Conv2d(3, 96, kernel_size=11, stride=4)           │
│  96 位轮廓猎人 × 11×11 模板                            │
│  输出: (N, 96, 55, 55)             参数: 34,944       │
└───────────────────────────────────────────────────────┘
    │
    ▼
┌── ReLU ────────────────────────────────────────────────┐
│  nn.ReLU()  负分归零                                    │
└───────────────────────────────────────────────────────┘
    │
    ▼
┌── LRN ─────────────────────────────────────────────────┐
│  nn.LocalResponseNorm(5, α=1e-4, β=0.75, k=2)         │
│  侧抑制：相邻通道竞争                                   │
│  尺寸不变: (N, 96, 55, 55)                             │
└───────────────────────────────────────────────────────┘
    │
    ▼
┌── MaxPool1 ────────────────────────────────────────────┐
│  nn.MaxPool2d(3, stride=2)  重叠池化                    │
│  强信号留下: (N, 96, 27, 27)                           │
└───────────────────────────────────────────────────────┘
    │
    ▼
┌── Conv2 ──────────────────────────────────────────────┐
│  nn.Conv2d(96, 256, kernel_size=5, stride=1, pad=2)   │
│  256 位纹理猎人 × 5×5 模板                              │
│  输出: (N, 256, 27, 27)            参数: 614,656      │
└───────────────────────────────────────────────────────┘
    │ → ReLU → LRN → MaxPool2 → (N, 256, 13, 13)
    │
    ▼
┌── Conv3 ──────────────────────────────────────────────┐
│  nn.Conv2d(256, 384, kernel_size=3, stride=1, pad=1)  │
│  (N, 384, 13, 13)                  参数: 885,120      │
└───────────────────────────────────────────────────────┘
    │ → ReLU
    ▼
┌── Conv4 ──────────────────────────────────────────────┐
│  nn.Conv2d(384, 384, kernel_size=3, stride=1, pad=1)  │
│  (N, 384, 13, 13)                  参数: 1,327,488    │
└───────────────────────────────────────────────────────┘
    │ → ReLU
    ▼
┌── Conv5 ──────────────────────────────────────────────┐
│  nn.Conv2d(384, 256, kernel_size=3, stride=1, pad=1)  │
│  (N, 256, 13, 13)                  参数: 884,992      │
└───────────────────────────────────────────────────────┘
    │ → ReLU → MaxPool3 → (N, 256, 6, 6)
    │
    ▼
┌── 展平 ────────────────────────────────────────────────┐
│  x = x.view(N, -1)  →  (N, 9216)                       │
└───────────────────────────────────────────────────────┘
    │
    ▼
┌── FC6 ────────────────────────────────────────────────┐
│  nn.Linear(9216, 4096)  →  ReLU  →  Dropout(0.5)      │
│  (N, 4096)                        参数: 37,752,832     │
└───────────────────────────────────────────────────────┘
    │
    ▼
┌── FC7 ────────────────────────────────────────────────┐
│  nn.Linear(4096, 4096)  →  ReLU  →  Dropout(0.5)      │
│  (N, 4096)                        参数: 16,781,312     │
└───────────────────────────────────────────────────────┘
    │
    ▼
┌── FC8 ────────────────────────────────────────────────┐
│  nn.Linear(4096, 1000)                                 │
│  (N, 1000)                         参数: 4,097,000     │
└───────────────────────────────────────────────────────┘
    │
    ▼
┌── Softmax ─────────────────────────────────────────────┐
│  1000 个类别的概率分布                                  │
│  参数量总计: ~62.4M                                    │
│  卷积层: ~3.7M (6%)                                    │
│  全连接层: ~58.7M (94%)                                │
└───────────────────────────────────────────────────────┘
```

---

## 逐行 PyTorch 实现

```python
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import transforms, datasets

# ─── 完整网络定义 ─────────────────────────────────────

class AlexNet(nn.Module):
    def __init__(self, num_classes=1000):
        super().__init__()

        # 特征提取器：5 个卷积层
        self.features = nn.Sequential(
            # Conv1: 轮廓猎人 × 96, 模板 11×11
            # 画像 227 → 55, 步长 4 大幅降维
            nn.Conv2d(3, 96, kernel_size=11, stride=4),
            nn.ReLU(inplace=True),
            nn.LocalResponseNorm(size=5, alpha=1e-4, beta=0.75, k=2),
            nn.MaxPool2d(kernel_size=3, stride=2),

            # Conv2: 纹理猎人 × 256, 模板 5×5
            # 27 → 27 (padding=2 保持尺寸)
            nn.Conv2d(96, 256, kernel_size=5, stride=1, padding=2),
            nn.ReLU(inplace=True),
            nn.LocalResponseNorm(size=5, alpha=1e-4, beta=0.75, k=2),
            nn.MaxPool2d(kernel_size=3, stride=2),

            # Conv3: 图案猎人 × 384, 模板 3×3
            nn.Conv2d(256, 384, kernel_size=3, stride=1, padding=1),
            nn.ReLU(inplace=True),

            # Conv4: 深层组合 × 384
            nn.Conv2d(384, 384, kernel_size=3, stride=1, padding=1),
            nn.ReLU(inplace=True),

            # Conv5: 最后 256 个特征图 → 池化到 6×6
            nn.Conv2d(384, 256, kernel_size=3, stride=1, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(kernel_size=3, stride=2),
        )

        # 分类器：3 个全连接层
        self.classifier = nn.Sequential(
            nn.Dropout(p=0.5),
            nn.Linear(256 * 6 * 6, 4096),  # 9216 → 4096
            nn.ReLU(inplace=True),
            nn.Dropout(p=0.5),
            nn.Linear(4096, 4096),
            nn.ReLU(inplace=True),
            nn.Linear(4096, num_classes),
        )

    def forward(self, x):
        # x: (N, 3, 227, 227)  — 画像入场
        x = self.features(x)
        # x: (N, 256, 6, 6)    — 通过 5 关
        x = x.view(x.size(0), -1)
        # x: (N, 9216)         — 展平为王座做准备
        x = self.classifier(x)
        # x: (N, 1000)         — 1000 类别的原始分数
        return x


# ─── 参数初始化（按论文原文） ─────────────────────

def init_weights(model):
    for name, module in model.named_modules():
        if isinstance(module, nn.Conv2d):
            # Conv: 高斯 N(0, 0.01)
            nn.init.normal_(module.weight, mean=0, std=0.01)
            # Conv2, Conv4, Conv5 的偏置初始化为 1
            # 其他 Conv 偏置初始化为 0
            if 'Conv2d' in name and any(c in name for c in ['2', '4', '5']):
                nn.init.constant_(module.bias, 1)
            else:
                nn.init.constant_(module.bias, 0)
        elif isinstance(module, nn.Linear):
            # FC: 高斯 N(0, 0.01)
            nn.init.normal_(module.weight, mean=0, std=0.01)
            # FC6, FC7 偏置 = 1, FC8 偏置 = 0
            if module.out_features != 1000:
                nn.init.constant_(module.bias, 1)
            else:
                nn.init.constant_(module.bias, 0)


# ─── 训练配置 ─────────────────────────────────────

def configure_training():
    model = AlexNet(num_classes=1000)
    init_weights(model)

    optimizer = optim.SGD(
        model.parameters(),
        lr=0.01,
        momentum=0.9,
        weight_decay=0.0005,  # L2 正则化
    )

    scheduler = optim.lr_scheduler.MultiStepLR(
        optimizer,
        milestones=[30, 60, 80],  # 在第 30/60/80 轮衰减
        gamma=0.1,                 # 学习率 × 0.1
    )

    criterion = nn.CrossEntropyLoss()
    return model, optimizer, scheduler, criterion


# ─── 数据预处理 ─────────────────────────────────────

train_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.RandomCrop(224),     # 随机裁剪 → 训练多样化
    transforms.RandomHorizontalFlip(),  # 随机翻转
    transforms.ToTensor(),
])

test_transform = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
])

# 训练时 data loader 示例：
# train_loader = DataLoader(
#     datasets.ImageNet(root='./data', split='train', transform=train_transform),
#     batch_size=128, shuffle=True
# )


# ─── 一次训练循环 ─────────────────────────────────────

def train_one_epoch(model, loader, optimizer, criterion, device):
    model.train()
    total_loss = 0

    for images, labels in loader:
        # images: (128, 3, 224, 224) — 128 张画像同时入场
        # labels: (128,)              — 每张画像的真实类别
        images, labels = images.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(images)    # 前向: 画像走完整个流程
        loss = criterion(outputs, labels)
        loss.backward()             # 反向: 信使 (梯度) 从后往前传
        optimizer.step()            # 更新: 所有猎人调整模板

        total_loss += loss.item()

    return total_loss / len(loader)


# ─── 推理流程（测试时 Dropout 的权重缩放） ──────────

def predict(model, image, device):
    """
    image: (1, 3, 224, 224) — 单张画像
    返回: 1000 个类别的概率分布
    """
    model.eval()
    with torch.no_grad():
        # nn.Dropout 在 eval 模式下自动缩放权重
        # 不需要手动处理
        logits = model(image.to(device))
        probs = torch.softmax(logits, dim=1)
    return probs
```

---

## 训练超参数速查

| 参数 | 值 |
|---|---|
| 优化器 | SGD + Momentum (0.9) |
| 初始学习率 | 0.01 |
| 学习率衰减 | 第 30/60/80 轮 × 0.1 |
| 最终学习率 | 0.00001 |
| Batch size | 128 |
| 权重衰减 (L2) | 0.0005 |
| Dropout 比率 | 0.5 (FC6, FC7) |
| LRN (size / α / β / k) | 5 / 1e-4 / 0.75 / 2 |
| 训练轮数 | ~90 |
| 训练时间 | 5-6 天 (2× GTX 580) |
| 测试时增强 | 10-crop (5 位置 × 2 翻转) 取平均 |

---

## 参数分布全景

```
层        参数量        占比       故事对应
─────────────────────────────────────────
Conv1      34,944       0.06%     96 位轮廓猎人
Conv2     614,656       0.98%     256 位纹理猎人
Conv3     885,120       1.42%     384 位图案猎人
Conv4   1,327,488       2.13%     384 位深层猎手
Conv5     884,992       1.42%     256 位终局猎手
─────────────────────────────────────────
卷积合计  3,747,200       6.01%
─────────────────────────────────────────
FC6    37,752,832      60.54%     第一王座
FC7    16,781,312      26.91%     第二王座
FC8     4,097,000       6.57%     最终宣判
─────────────────────────────────────────
全连接  58,631,144      94.02%
─────────────────────────────────────────
总计    62,378,344      100%
```

**六成的参数集中在第一个全连接层**——9216 个特征到 4096 个神经元，每一个连接都是一个可学习的权重。这也是 Dropout 必须加在这里的原因：没有它，这 3700 万个连接会精准记住训练集。

---

## 关键要点

| 组件 | 一句话 |
|---|---|
| **卷积** | 用可学习的模板在图像上滑动扫描，提取局部特征 |
| **ReLU** | 负值归零，永不饱和，速度是 tanh 的 6 倍 |
| **LRN** | 相邻通道竞争，保证学到的特征多样化 |
| **重叠池化** | 3×3 窗口步长 2，保留最强信号并降维 |
| **Dropout** | 随机屏蔽一半神经元，防止过拟合 |
| **数据增强** | 裁剪 + 翻转 + 颜色抖动，训练集膨胀 2048 倍 |
| **GPU 并行** | 模型切两半，消费级硬件训练超出单卡容量的模型 |

---

> *下一篇预告：我们将回到更早的年代——感知机。在 AlexNet 引爆革命之前，那个人们还不相信神经网络的时代，有过一次更早的黎明、和一场长达二十年的寒冬。*
