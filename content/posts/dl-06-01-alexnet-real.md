---
title: 深度学习的故事（一）：卧室里的计算机——AlexNet 现实篇
date: 2026-05-14
genre: vibe
column: 深度学习的故事
tags: [深度学习, AlexNet, 历史]
description: 2012 年秋天，三个人、两块显卡、一间卧室，改写了人工智能的历史。
---

> 2011 年，如果你在计算机视觉会议上说「神经网络」，大多数人会给你一个礼貌的微笑——就像在一群天文学家面前推销占星术。
>
> 多伦多大学的一间卧室里，两个研究生正准备做一件离谱的事。没有顶级实验室，没有集群，只有两张游戏显卡和一个疯狂的信念。
>
> 一年后，他们将亲手引爆一场革命。

## 黑暗时代

那是计算机视觉的「古典时期」。

2010 年 ImageNet 竞赛冠军的方案是：密集 SIFT 特征 + 坐标编码 + 线性 SVM，跑在三台双路四核至强服务器上，训练了四天。2011 年冠军用了 Fisher 向量编码。大家在特征工程上精雕细琢，错误率缓慢下降。

神经网络？过时了，不 work。

Geoffrey Hinton 已经在这个「过时」的方向上坚持了三十年。他的学生 Alex Krizhevsky 是组里公认最强的程序员。另一个学生 Ilya Sutskever 安静但极其执着。三个被遗忘的说书人，对着空荡荡的场子讲一个没人相信的故事。

## "我们试试"

Ilya 有一个执念：规模等于能力。不是线性增长，是质的飞跃。

2011 年的一天，他对 Alex 说：我们试试 ImageNet。

ImageNet——Fei-Fei Li 团队建立的巨型数据集，一百二十万张图片，一千个分类。在此之前没人敢用神经网络碰这么大的数据。主流观点是参数量会爆炸，根本训不动。

Alex 花几个月写了一个叫 `cuda-convnet` 的程序，在 CUDA 上实现的 CNN。起初只在 CIFAR-10 这种小数据集跑过，效果不错，但没人当回事。

ImageNet 是另一个量级。

## 卧室机房

Alex 在网上买了两块 NVIDIA GeForce GTX 580——消费级游戏显卡，每块 3GB 显存，不到五百美元。他把它们装进一台普通 PC，机箱塞在父母家卧室的地板上。

训练开始了。

两块显卡满负荷运转时，散热风扇像一台吸尘器，二十四小时不停，持续了五六天。Alex 的父母为这间「卧室机房」支付了相当可观的电费。

Alex 把网络切成两半，分别放在两块 GPU 上，只在某些层通信，其他时候各算各的。CPU 也没闲着——实时对训练图像做随机裁剪、翻转、调色。程序精巧得像个工艺品。

**等待前向传播 → 算梯度 → 调参数 → 再前向传播。** 六千多万个参数，一百二十万张图片，九十轮循环。

「一切都像是在和时间赛跑，」Sutskever 后来说，「GPU 出现了，感觉像是一个奇迹。」

## 佛罗伦萨

2012 年 10 月。意大利佛罗伦萨。ECCV 大会。

Alex 站在台上，展示 ImageNet 竞赛的结果。

**Top-5 错误率：15.3%。**

第二名：**26.2%**。

十个百分点的差距。这是 ImageNet 竞赛史上从未有过的单年提升——之前的冠军每年不过进步两三个点。

会场一片寂静。然后是骚动。

组织者一度怀疑数据有误。十五点三——不可能。反复核实后，结果是真的。

Yann LeCun 也在台下。他是 CNN 的奠基人之一。他站起来，在座无虚席的会场里说：

> **"This is an unequivocal turning point in the history of computer vision. This is proof."**

Fei-Fei Li 后来回忆：「在那之前，大多数人把神经网络看作一件满是灰尘的古董，封在玻璃柜里，围着天鹅绒绳锁。」

在那间佛罗伦萨的会议室里，玻璃碎了。

## 连锁反应

接下来发生得很快。

Google、Microsoft、百度——三家巨头同时向 Hinton 的三人组竞价。最终 Google 以约四千四百万美元收购了他们成立不到三个月的公司 DNNResearch。

不到两年，ImageNet 竞赛所有参赛者都转向了神经网络。不到五年，Top-5 错误率被压到 2.25%，超过人类水平。2017 年，这项竞赛宣布退役。

Hinton 后来说了句总结这一切的话：

> **"Ilya thought we should do it, Alex made it work, and I got the Nobel Prize."**

一个相信不可能的人，一个把不可能变成现实的人，一个在荒野中坚持呐喊了三十年终于等到回声的人。

而这一切，始于 2011 年一间卧室里，一个研究生对另一个研究生说的话：**"I think we should do it."**

---

> [下一回，我是一只橘白的猫——走进 AlexNet 的第一层](/posts/dl-06-02-alexnet-algo-01)。看 96 组眼睛如何拆解我的轮廓。

## 回顾篇：AlexNet 小传

关键节点时间线：

```
1958  感知机（Rosenblatt）        第一个会「学习」的机器
1969  寒冬一击（Minsky）          感知机做不了 XOR
1986  反向传播（Rumelhart）       多层网络有法可训
1998  LeNet-5（LeCun）            CNN 识别支票数字
2006  深度信念网络（Hinton）       深度学习复兴
2009  CIFAR-10（Krizhevsky）      小型 CNN 在小数据上跑通
2012  AlexNet → 引爆革命          深度学习时代正式开始
```

### 参考来源

- Krizhevsky, Sutskever, Hinton. *ImageNet Classification with Deep Convolutional Neural Networks.* NIPS 2012.
- Computer History Museum. *Oral History: Alex Krizhevsky.* 2024.
- Stephen Witt. *The Man Who Made A.I.* The New Yorker, 2023.
- Fei-Fei Li. *The Worlds I See.* 2023.
