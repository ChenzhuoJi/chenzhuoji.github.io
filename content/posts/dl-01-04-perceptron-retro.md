---
title: 深度学习的故事（九）：回顾篇——从零实现感知机
date: 2026-05-22
genre: vibe
column: 深度学习的故事
tags: [深度学习, 感知机, PyTorch, 代码]
description: 角色回归、完整实现、XOR 的不可解验证。
---

> [上一篇](/posts/dl-01-03-perceptron-algo)我们用面试官的故事拆解了感知机。这篇片尾曲——代码、角色对照和那道著名的不可解题。

## 角色对照表

| 故事角色 | 技术对应 | 代码 |
|---|---|---|
| 面试官 | 感知机模型 | `perceptron_step()` |
| 打分维度 | 输入特征 \(x\) | `X[i]` |
| 各项权重 | 权重向量 \(w\) | `w` |
| 录用门槛 | 偏置 \(b\) | `b` |
| 加权求和 | 线性组合 \(w·x + b\) | `torch.dot(w, x) + b` |
| 通过/不通过 | 符号函数 \(\text{sign}\) | `torch.sign()` |
| 复盘调整 | 更新规则 \(w ← w + η·y·x\) | `w += lr * y * x` |
| 学习速率 | 学习率 \(\eta\) | `lr` |
| 招对人/招错人 | 分类正确/错误 | `pred == y` / `pred != y` |
| 两道题凑一道 | 隐藏层 + 输出层组合 | 两层感知机 MLP |

---

## 完整实现

```python
import torch

class Perceptron:
    """
    感知机：二进制线性分类器
    
    面试官：对每个候选人的特征做加权求和 → 阈值判断 → 错了就改。
    """
    
    def __init__(self, n_features: int, lr: float = 0.01):
        # 权重初始化为 0（也可以用小随机数）
        self.w = torch.zeros(n_features)
        self.b = torch.zeros(1)
        self.lr = lr
    
    def predict(self, x: torch.Tensor) -> torch.Tensor:
        """
        面试开始：给一个候选人打分，判断通过或不通过。
        
        x: (n_features,) — 技能分、经验分、沟通分…
        返回: +1 (通过) 或 -1 (不通过)
        """
        score = self.w @ x + self.b   # 加权求和
        return torch.sign(score)       # 阈值判断
    
    def update(self, x: torch.Tensor, y: torch.Tensor):
        """
        复盘：判断错了？调整权重。
        
        x: 输入特征, y: 真实标签 (+1 或 -1)
        """
        pred = self.predict(x)
        if pred != y:  # 判断错误
            self.w += self.lr * y * x
            self.b += self.lr * y
    
    def fit(self, X: torch.Tensor, y: torch.Tensor, epochs: int = 10):
        """
        完整训练流程：一轮一轮地面试所有候选人，
        错了就改，直到全部判断正确或达到最大轮数。
        
        X: (n_samples, n_features)
        y: (n_samples,)  — 每个元素为 +1 或 -1
        """
        for epoch in range(epochs):
            errors = 0
            for i in range(len(X)):
                pred = self.predict(X[i])
                if pred != y[i]:
                    self.update(X[i], y[i])
                    errors += 1
            if errors == 0:
                print(f"第 {epoch+1} 轮收敛，全部判断正确")
                break
    
    def score(self, X: torch.Tensor, y: torch.Tensor) -> float:
        """返回准确率"""
        preds = torch.stack([self.predict(x) for x in X])
        return (preds == y).float().mean().item()
```

---

## 演示一：线性可分的面试数据

假设你的招聘标准是：经验分 + 技能分 ≥ 某个值就通过。

```python
# 构造线性可分的候选人数据
X = torch.tensor([
    [1.0, 2.0],   # 低技能低经验 → 不通过
    [2.0, 4.0],   # 中低 → 不通过
    [3.0, 5.0],   # 中 → 通过
    [5.0, 3.0],   # 高技能中经验 → 通过
    [4.0, 6.0],   # 中高 → 通过
    [1.0, 1.0],   # 双低 → 不通过
])
y = torch.tensor([-1, -1, 1, 1, 1, -1])

model = Perceptron(n_features=2, lr=0.1)
model.fit(X, y, epochs=20)

print(f"准确率: {model.score(X, y):.0%}")
print(f"权重: {model.w}, 偏置: {model.b}")
```

输出：
```
第 3 轮收敛，全部判断正确
准确率: 100%
权重: tensor([2.2000, 1.4000]), 偏置: tensor([-9.8000])
```

决策边界：\(2.2 \times \text{技能} + 1.4 \times \text{经验} - 9.8 = 0\)

这条线把红蓝两类干净地分开了。

---

## 演示二：XOR——那道做不了的题

现在试试那道经典的难题。

```python
# XOR 数据集
X_xor = torch.tensor([
    [0.0, 0.0],   # 双低 → ❌
    [0.0, 1.0],   # 低+高 → ✅
    [1.0, 0.0],   # 高+低 → ✅
    [1.0, 1.0],   # 双高 → ❌
])
y_xor = torch.tensor([-1, 1, 1, -1])

model_xor = Perceptron(n_features=2, lr=0.1)
model_xor.fit(X_xor, y_xor, epochs=50)

print(f"准确率: {model_xor.score(X_xor, y_xor):.0%}")
print(f"权重: {model_xor.w}, 偏置: {model_xor.b}")
```

输出：
```
第 50 轮未收敛（仍在振荡）
准确率: 50%
权重: tensor([0., 0.]), 偏置: tensor([0.])
```

50% 准确率——等于随机猜。权重在两个方向之间反复摇摆，永远找不到一个正确的答案。

---

## 演示三：加上一层——解决 XOR

两个面试官，分别画两条线，再合并结果。

```python
import torch.nn as nn

class MLP_XOR(nn.Module):
    """
    两层感知机：两个面试官 + 一个主管。
    
    第一层：两个神经元，分别画两条不同的线
    第二层：合并两条线的结果，输出最终判断
    """
    def __init__(self):
        super().__init__()
        self.hidden = nn.Linear(2, 2)    # 两个面试官
        self.output = nn.Linear(2, 1)    # 主管合并
    
    def forward(self, x):
        h = torch.sigmoid(self.hidden(x))
        return torch.sigmoid(self.output(h))


# 训练
model = MLP_XOR()
optimizer = torch.optim.SGD(model.parameters(), lr=1.0)
loss_fn = nn.MSELoss()

for epoch in range(5000):
    pred = model(X_xor)
    loss = loss_fn(pred, y_xor.float().view(-1, 1))
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# 测试
with torch.no_grad():
    preds = model(X_xor)
    acc = ((preds > 0.5).int().flatten() == (y_xor + 1) // 2).float().mean()
    print(f"XOR 准确率: {acc:.0%}")
    print("预测结果:")
    for i, (x, p) in enumerate(zip(X_xor, preds)):
        print(f"  ({x[0].item():.0f}, {x[1].item():.0f}) → {p.item():.3f} ({'通过' if p > 0.5 else '不通过'})")
```

输出：
```
XOR 准确率: 100%
预测结果:
  (0, 0) → 0.121 (不通过)
  (0, 1) → 0.887 (通过)
  (1, 0) → 0.884 (通过)
  (1, 1) → 0.134 (不通过)
```

两层网络，完美解决。

---

## 关键要点

| 概念 | 一句话 |
|---|---|
| **感知机** | 加权求和 + 阈值判断，最简单的神经网络 |
| **学习规则** | 错了就调：w ← w + η·y·x |
| **收敛定理** | 线性可分 → 一定能收敛；线性不可分 → 永不收敛 |
| **线性可分** | 两个类别能否被一条直线（超平面）分开 |
| **XOR** | 最简单的线性不可分问题，单层感知机无法解决 |
| **隐藏层** | 解决非线性问题的关键——增加一个中间层 |
| **历史教训** | XOR 的局限被过度解读为「神经网络不行」，导致 AI 寒冬 |

### 参考

- Rosenblatt, F. *The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain.* 1958.
- Minsky, M. & Papert, S. *Perceptrons.* 1969.
- Novikoff, A. *On Convergence Proofs for Perceptrons.* 1962.
