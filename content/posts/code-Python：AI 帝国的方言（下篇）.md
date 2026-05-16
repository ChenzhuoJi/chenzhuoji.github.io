---
title: "Python：AI 帝国的方言（下篇）"
date: 2026-05-16
genre: vibe
column: 代码的故事
series: 第六章·脚本的世界
order: 11
tags: [Python, TensorFlow, PyTorch, Transformer, AI, 深度学习, Hugging Face, Jupyter, 机器学习]
description: >-
  2008 年 Python 3.0 发布后的废墟上，没人想到这门"慢"语言会统治 AI。不是 Guido 的设计——是一群研究者悄悄把它捡了起来。
---

```python
import torch
print(torch.__version__)
```

*这是 Python 下篇的 Hello World。没有 `print("Hello, World!")`——那已经是上篇的事了。下篇的 Python 不认识自己了。从 `import torch` 开始，Python 不再是一门"脚本语言"，它变成了 AI 的方言。你在终端敲下这两行，输出一个版本号——然后你就可以开始训练一个神经网络了。五年前，这件事需要一千行 C++ 和一块你买不起的 GPU。现在，五行 Python 就够了。*

---

2017 年 6 月 12 日，一篇论文出现在 arXiv 上。

标题平淡得像一份实验报告——"Attention Is All You Need"。八位 Google 作者，名字按字母顺序排列。没有炫酷的名字，没有营销话术，连论文的摘要都写得克制到让人觉得这帮人自己都不确定这个发现到底有多大：

> "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely."

翻译成中文：大家都在用递归神经网络和卷积神经网络做序列模型，最好的那些还加了一个注意力机制。我们提出了一个简单的架构，叫 Transformer，只用注意力机制，完全扔掉递归和卷积。

这篇论文没有提出什么革命性的新数学。它只是证明了一件事：如果你有足够的数据和算力，你可以扔掉整个递归神经网络范式，只用一种叫"注意力"的机制来完成序列建模。

十年后，全世界都在说"大语言模型"——ChatGPT、Claude、Gemini、DeepSeek——本质上都是在跑这张图的变体。Transformer 是 AI 的古腾堡印刷术：它没有发明文字，但它让文字可以被大规模复制。

但几乎没人注意到底层发生了什么。

这篇论文的**参考实现**，是用 Python 写的。用 TensorFlow 写的。用 Python 写的 TensorFlow。

这个细节看起来微不足道——就像问 Gutenberg 印刷的第一本书是什么纸印的一样。但就是这个细节，藏着一个更大的故事：Python 怎么从 2008 年的废墟上站起来，变成了 AI 帝国的普通话。

这个故事的主角不是 Guido van Rossum。他甚至没有出现在这个故事的主要场景里。Python 不是被"设计"成 AI 语言的——它是被一群从不认为自己是在"写代码"的人悄悄捡起来的。研究员、博士生、工程师——他们只是碰巧用了 Python，因为 Python 是他们在实验室里能找到的最不讨厌的工具。

## 2008 年的废墟

2008 年 12 月 3 日，Python 3.0 发布了。

上篇已经讲了这个决定的勇敢和代价。但上篇没有讲的是——Python 3.0 发布之后四年，是整个 Python 生态最黑暗的时期。社区分裂成两个阵营，一个固守在 Python 2 的舒适区，一个试图向前推进但发现几乎所有第三方库都不兼容。Linux 发行版不敢把默认 Python 从 2 切到 3，因为一换整个系统的工具链就碎了。Guido 本人 2005 年就去了 Google，在 Google 内部用 Python 做各种内部工具的开发，但 Google 也没有强制迁移到 Python 3。

2010 年，你打开 Hacker News，几乎每个月都有一篇帖子讨论"Python 是不是要完蛋了"。Perl 6 遥遥无期但至少有人在做，Ruby 有 Rails 撑腰稳得很，JavaScript 在 Node.js 的催化下正在爆发，Python 呢？Python 在一场自己发起的自残式升级中无法自拔。

但就在这四年——2008 到 2012——Python 的废墟上，一些种子正在地下生长。

2007 年，加拿大蒙特利尔大学的 MILA 实验室发布了一个叫 Theano 的库。Theano 的创始人是 Yoshua Bengio 团队——他和 Geoffrey Hinton、Yann LeCun 后来被称为"深度学习三巨头"。Theano 想做的事在当时听起来有点疯狂：让你在 Python 里定义数学表达式，然后自动编译成高效的 CPU 或 GPU 代码。它不只是一个数值计算库——它是一个 Python 到 C++/CUDA 的编译器。

Theano 的 API 在今天看来笨拙得可爱。你定义符号变量，构造表达式图，然后编译成一个函数——整个过程像是把 Python 当成一种"元语言"，用它来写出真正跑在 GPU 上的代码。但在 2007 年，它是唯一的选择。如果你想在 GPU 上训练一个神经网络，又不愿意写 CUDA C++，你只能用 Theano。

同期，巴黎 INRIA 实验室的几个研究人员——包括后来成为 scikit-learn 核心维护者的 Olivier Grisel、Alexandre Gramfort 等人——在 2007 年发布了 scikit-learn 的最初版本。scikit-learn 不碰深度学习，它专注在经典机器学习上：SVM、随机森林、K-means、PCA。它的 API 设计后来成了机器学习库的模板——`.fit()`、`.predict()`、`.transform()` 这三个方法定义了一切。

这两个库——一个做深度学习的编译器，一个做经典机器学习的工具包——都在用 Python。不是因为他们觉得 Python 是最好的语言，而是因为他们需要一种脚本语言来做"胶水"：把 C++ 和 Fortran 的高性能计算库粘到一起，提供一个对人类友好的前端。

这个模式——"用 C++ 做底层、用 Python 做前端"——后来成了整个深度学习框架行业的标准架构。

![](/images/theano-scikit-learn-logos.jpg)

*Theano（左）和 scikit-learn（右）的 logo。这两个 2007 年诞生的项目定义了 Python 在机器学习中的基本范式：Python 做胶水，C 和 C++ 做计算。*

## 卧室里的 ImageNet 时刻

2012 年 9 月 30 日。

多伦多大学。一个研究生坐在他父母家的卧室里，面前是一台自己组装的 PC，插着两块 NVIDIA GTX 580 显卡——当时最好的消费级 GPU。每块显卡 3GB 显存，售价 500 美元。这两块卡不能用 SLI 桥接协同工作——它们只能各自处理一半的网络。

这个学生叫 Alex Krizhevsky，24 岁。他的导师是 Geoffrey Hinton——一个 64 岁的英国裔加拿大计算机科学家，从 1980 年代就在研究神经网络，经历了两次 AI 寒冬，被学术界主流忽略了几十年。他的师兄叫 Ilya Sutskever——后来成了 OpenAI 的联合创始人兼首席科学家。

Krizhevsky 在 2012 年初做了一个决定：把 cuda-convnet（他自己写的一个在 GPU 上跑卷积神经网络的工具）扩展到能在两块 GPU 上拆分训练。他的目标很具体：参加 ImageNet 大规模视觉识别挑战赛（ILSVRC-2012）。

ImageNet 是一个由斯坦福教授李飞飞在 2007 年启动的巨型图像数据集——1400 万张图片，2.2 万个类别。从 2010 年开始，ILSVRC 比赛每年举办一次，全世界的计算机视觉团队在上面比拼分类准确率。2011 年的冠军错误率是 25.8%——用的是传统计算机视觉方法，SIFT 特征 + SVM 分类器，和深度学习没什么关系。

Krizhevsky 训练的网络叫 AlexNet——一个 8 层深的卷积神经网络。6000 万个参数。650000 个神经元。用两块 GTX 580 训练了五到六天。每块 GPU 上放一半的神经元，中间有一层专门的通信机制让两块卡交换数据。

结果出来后，整个计算机视觉界都震惊了。

AlexNet 在 ImageNet 比赛上的 top-5 错误率是 15.3%。第二名只有 26.2%。不是好了一点点——是好了将近 11 个百分点。这是 ImageNet 比赛历史上最大的一次性能飞跃。从 2011 年到 2012 年，错误率的下降幅度超过了前几年的总和。

Yann LeCun——卷积神经网络（CNN）的发明者，当时在纽约大学——听到这个消息后说了一句后来被无数人引用的话："这是一个毫无疑问的转折点。"

但 AlexNet 的代码是用什么写的？答案是：C++ 和 CUDA。它的核心训练代码是 Krizhevsky 手写的 CUDA 内核。

那 Python 在哪里？

Python 在数据预处理脚本里。在训练指标的可视化代码里。在模型配置文件的格式里。在实验日志的分析代码里。Python 不是 AlexNet 的训练工具——但它是 AlexNet 团队的工作台。他们用 Python 做数据分析、做图表、做实验记录、做结果对比。Hinton 在 2012 年的一次演讲中展示的图表——那些显示 AlexNet 训练过程中错误率下降的曲线——就是用 Python + Matplotlib 画的。

这个模式在 2012 年看起来只是一个研究团队的便利选择。但回头看，它是一个暗号：Python 正在从"数据分析工具"变成"AI 研究者的默认语言"。

![](/images/alex-krizhevsky-gtx580-bedroom.jpg)

*Alex Krizhevsky 在父母家卧室里训练 AlexNet 时使用的 GTX 580 GPU。两块 3GB 显存的消费级显卡，加起来不到一千美元，撬动了计算机视觉史上最大的一次变革。*

## 为什么不是 Lua、不是 C++、不是 Julia？

如果我们回到 2012 年，Python 在深度学习领域并不是唯一的选择。甚至不是最好的选择。

最好的性能在 C++ 里。Caffe——加州伯克利分校贾扬清在 2013 年发布的深度学习框架——用纯 C++ 写核心，速度极快。但 Caffe 的问题是：你想改一个模型结构，你得写 C++ 代码，重新编译，等几分钟，然后才能看到结果。研究者不想等。研究者想改一行代码，立刻看到效果。

最优雅的学术语言是 Lua。Torch7——一个在纽约大学和 IDSIA（瑞士人工智能实验室）广泛使用的深度学习框架——的前端是 Lua。Lua 简洁、快速、可嵌入，语法在很多人看来比 Python 还干净。Yann LeCun 的团队是 Torch7 的重度用户。但 Lua 的问题是：它太小众了。研究者可以为了深度学习学 Lua——但他们团队里的其他人呢？他们的合作者呢？他们明年招的学生呢？学一门只有深度学习才用的语言，投资回报率太低了。

MATLAB？闭源。贵。而且它不是一个编程语言——它是一个环境。没有包管理器，没有社区生态，没有 GitHub 集成。

Julia？2012 年才首次公开，太新了。1.0 版本直到 2018 年才发布。

Python 在这个列表里不是最漂亮的——甚至不是"最"任何东西。但 Python 有一个其他语言都没有的东西：它已经在大学实验室里了。物理系在用 Python。生物系在用 Python。经济系在用 Python。那做 AI 的研究生们——他们本来就会 Python。他们不需要学一门新语言来开始做深度学习。

研究者做了一个最简单的经济决策：选 Python。不是因为 Python 最好——而是因为 Python 的"总学习成本"最低。这个决策集合在一起，定义了整个产业的走向。

## Google 的深度学习开源计划

2011 年，Google 内部启动了一个叫 Google Brain 的项目。

Andrew Ng（吴恩达）和 Jeff Dean 联合领导了这个项目。Google Brain 最初的目标很简单：用 Google 庞大的计算基础设施训练大规模神经网络。他们建了一个叫 DistBelief 的内部框架——第一代分布式深度学习系统。

2012 年，Google Brain 用 DistBelief 做了一个后来变得非常著名的实验：让一个包含 16000 个 CPU（是的，CPU，不是 GPU）的大规模神经网络在 YouTube 视频上做无监督学习——没有标签，让网络自己找模式。网络"学会了"识别猫。不是 Google 告诉它猫长什么样——是它自己在 1000 万帧视频中发现了"猫"这个模式。

这件事被《纽约时报》报道后，成了深度学习进入公众视野的第一个标志性事件。标题是《Google 在用一百万台电脑教自己识别猫》。数字被夸张了，但"神经网络自己学会了猫"这个叙述本身，让全世界第一次意识到深度学习可能真的是不同的东西。

Jeff Dean 是 Google 最受尊敬的工程师之一——他在 Google 早期设计了 BigTable、MapReduce、Spanner 等支撑了整个 Google 基础设施的系统。2011 年他转向 AI 领域之后，带了一整套 Google 工程文化进入深度学习。

DistBelief 跑得很好——但它有几个严重的工程问题。它的架构是为特定模型设计的，不通用。它的 C++ 代码是一堆"写了就跑"的实验代码，很难维护。它在 Google 内部被几十个团队使用，但每次增加新功能都要动底层架构。

2013 年，Jeff Dean 做了一个决定：重写 DistBelief。不是修修补补，是从头开始写。新的系统要更快、更通用、更容易扩展、更适合在生产环境中运行。这个项目后来命名为 TensorFlow——Tensor（张量）+ Flow（流动），描述多维数据在计算图中的流动。

TensorFlow 的设计有一个关键决策：它的底层计算引擎用 C++ 写，但用户接口用 Python。这不是一个技术决策——这是一个政治决策。Google Brain 团队知道：如果只有 C++ API，只有 Google 的工程师会用；如果用 Python API，全世界的研究者都会用。

2015 年 11 月 9 日，Google 在 Apache 2.0 许可证下开源了 TensorFlow。

开源 TensorFlow 的决定不是没有争议的。Google 内部有人认为这是把自己的核心技术免费送人。但 Jeff Dean 和团队坚持这么做——他们的逻辑是：如果 TensorFlow 成为深度学习的事实标准，Google 就能从整个生态的发展中受益（Google Cloud、TPU、招聘）。这不是利他主义——这是"把蛋糕做大"的战略。

TensorFlow 开源后的反响超出了所有人的预期。GitHub 上 star 数暴涨。论文引用数以指数级增长。全世界的 AI 研究者突然有了一个统一的基础设施——以前每个实验室维护自己的内部框架，代码不可复用，实验结果不可复现。TensorFlow 改变了一切。

但 TensorFlow 有一个深层的问题：它太 Google 了。

TensorFlow 沿用了 DistBelief 的编程模型——静态计算图。你在 Python 里定义计算图，然后 TensorFlow 把这个图编译成一个可执行的计算流程。这听起来很好——编译后的执行效率确实高。但问题是：调试静态图是一场噩梦。你不能在 Python 调试器里单步执行一个 TensorFlow 计算图——因为图是在 Python 之外执行的。你的 Python 代码只是"搭图"的脚本，真正的计算在图运行时才发生。如果图出错了，错误信息是一堆 C++ 栈回溯——和你的 Python 代码毫无关系。

研究者的反应是：Google 太把 AI 研究者当成 Google 工程师了。我们不想写静态图。我们想在 `model.train()` 的时候能打断点、看变量、用 `print` 调试——就像我们写普通 Python 代码一样。

TensorFlow 听到了这个声音，但它的架构决定了这个改动极为困难。静态图是 TensorFlow 的核心设计——放弃它等于重写整个框架。

就在这时，一个挑战者出现了。

![](/images/tensorflow-logo-2015.jpg)

*TensorFlow 最初的 logo（2015 年版）。彩色扁平化的设计反映了它"开放"和"易用"的定位。但 TensorFlow 的"静态图"设计让它离"Pythonic"始终差一步。*

## 反叛者的胜利

2016 年 9 月。NIPS 2016 大会（后来改名为 NeurIPS）在巴塞罗那举行。

Facebook AI Research（FAIR）的团队——Soumith Chintala、Adam Paszke、Gregory Chanan、Sam Gross——在一个展台前发布了 PyTorch 0.1。不是在台上做的 keynote，不是正式的论文宣讲——就是一个展台，一台笔记本，一张海报。来参观的路过顺手看看。

PyTorch 的诞生来自一个 frustration。FAIR 团队和整个纽约 AI 圈都是 Torch7（LuaTorch）的重度用户——Yann LeCun 从 2013 年加入 Facebook 后，把 Torch7 带进了 FAIR。但团队逐渐发现 Lua 成了生态发展的瓶颈。招人难（有几个 AI 博士生愿意为了一份工作学 Lua？）。社区小（PyTorch 2016 年发布时，PyPI 已经有超过 10 万个包；而 LuaRocks——Lua 的包管理器——上的包不到一千）。大公司不愿意在 Lua 生态里投钱。

Soumith Chintala——一个印度裔工程师，之前是 Torch7 的核心开发者——在 2016 年初做了一个决定：把 Torch7 的核心用 Python 重写一遍。项目的代号就叫 PyTorch。

PyTorch 的关键设计决策是：**动态计算图**（dynamic computation graph）。在 TensorFlow 里，你先定义计算图，然后让数据流经这个图——这叫"定义-然后-运行"（define-and-run）。在 PyTorch 里，计算图是在你执行代码的时候动态构建的——这叫"定义-通过-运行"（define-by-run）。你写 `y = model(x)` 的时候，计算图在这一刻被创建和执行。你在 Python 调试器里可以查看任何中间变量——因为它们就是普通的 Python 对象。

这意味着什么？意味着 PyTorch 不只是在"给 Python 一个 API"——它是把深度学习变成了 Python 的一种自然表达。你在 PyTorch 里写模型的方式，和你写普通 Python 代码的方式没有区别。这听起来是一个技术细节——但它在社区里引发了彻底的审美差异。

PyTorch 的用户体验是："这才是 Python 应该的样子。"你不需要理解计算图的理论，不需要知道什么是数据流编程——你只需要会写 Python 就可以开始做深度学习了。

TensorFlow 也在改进——2017 年他们加了 eager execution 模式，允许动态图——但这是"补丁"，不是从根上设计。PyTorch 从第一天起就是动态的。

2017 年到 2019 年的框架之战，不是技术参数的比拼——是设计哲学的竞赛。TensorFlow 说"效率优先"，PyTorch 说"开发者体验优先"。结果是：研究者用脚投票了。

到 2019 年，斯坦福 DAWNBench 的统计显示：PyTorch 在顶级学术会议论文中的使用率已经超过 TensorFlow。这个差距在 2020 年持续扩大——PyTorch 被 NeurIPS、ICML、ICLR 三大顶会 80% 以上的论文采用。TensorFlow 在工业部署中仍然占优，但研究的重心——定义未来方向的动力——已经彻底倒向了 PyTorch。

Soumith Chintala 后来在一个采访中说了一句意味深长的话：

> "我们没有打败 TensorFlow。TensorFlow 打败了自己。我们只是做了最明显的事——让 Python 做 Python。"

这句看起来轻描淡写的话，其实是整个 Python AI 故事的缩影。

![](/images/pytorch-logo.jpg)

*PyTorch 的 logo。火炬的意象延续自 Torch7，但前面的"Py"前缀宣告了它和 Python 的血缘关系。它不只是一个框架——它是 Python 社区对 Google 技术霸权的一次文化反击。*

## 科学家的笔记本

在深度学习的框架之战如火如荼的同时，另一个革命正在悄悄发生。

2011 年，加州大学伯克利分校的 Fernando Pérez 和 Brian Granger 发布了一个工具：IPython Notebook。IPython 本身是 2001 年启动的项目——Fernando Pérez 当时是加州大学伯克利分校的博士生，他想要一个更好的 Python 交互式终端。但 Notebook 把 IPython 带到了一个完全不同的方向：你可以在一个网页里混合代码、文本、数学公式、图表和交互式控件。代码跑完后结果立刻显示在代码下方——不需要切换窗口，不需要重新运行整个脚本，不需要手动粘贴图表到文档里。

2014 年，IPython Notebook 从 IPython 项目中独立出来，更名为 Jupyter Notebook。Jupyter 这个名字来自三个核心语言的首字母拼合：Julia、Python、R。它的 logo——一个象征着木星及其卫星的图案——暗示着这个工具的目标：让科学计算变得像仰望星空一样自然。

Jupyter Notebook 对深度学习带来的改变，怎么强调都不过分。

在 Jupyter 出现之前，AI 研究者的工作流是：写一个 Python 脚本，保存，在终端运行，等几分钟或几小时让模型训练，查看输出日志，用 Matplotlib 手动画图。如果你改了一个参数，你要重新运行整个脚本。你的代码、你的注释、你的图表、你的实验结果——分散在完全不同的文件里。

Jupyter 改变了这一切。你在一个 Notebook 里把数据处理、模型定义、训练过程、结果可视化全部放在一起。你跑一个 cell，看到结果；不满意，改参数，再跑下一个 cell。你的整个实验变成了一个可复现、可分享、可交互的文档。

AI 研究者可能是最受益的群体。Jupyter 让深度学习实验从"写代码"变成了"做实验"。研究者的工作方式不再像是软件工程师——更像是化学家或生物学家：你设计一个实验，运行它，观察结果，调整假设，再运行下一个实验。Jupyter 给了你一个数字化的实验台——比 MATLAB 笔记本更开放，比 Mathematica 笔记本更便宜（免费），比 Excel 强大得多。

到 2018 年，GitHub 上有超过 250 万个 Jupyter Notebook。Google 在 2017 年推出了 Colab——一个在云上免费跑 Jupyter Notebook 的服务，还送免费的 GPU 算力。任何一个大学生，只要有一台能上网的电脑，就可以在 Colab 上打开一个 Notebook，`import torch`，然后开始训练神经网络。

这就是 Python AI 革命发生的速度：从"需要两块 GTX 580 和一个卧室"到"免费 GPU + 云端 Jupyter + 五行 PyTorch"，只用了六年。

Fernando Pérez 和 Brian Granger 在 2017 年获得了 ACM 软件系统奖——和 Unix、TCP/IP、TeX 并列的荣誉。他们的工作不只是做出了一个工具——他们改变了一整代科学家做计算的方式。

## Transformer：AI 的古腾堡时刻

让我们回到 2017 年 6 月那篇论文。

"Attention Is All You Need"的八位作者——Ashish Vaswani、Noam Shazeer、Niki Parmar、Jakob Uszkoreit、Llion Jones、Aidan N. Gomez、Łukasz Kaiser、Illia Polosukhin——在论文发表后的人生轨迹各不相同。有人留在 Google 继续做研究。有人创业。有人加入了其他大公司。但他们都带着一个共同的身份：Transformer 的发明者。

Transformer 不是第一个用 attention 的模型。在那之前，attention 已经是 seq2seq 模型的标配组件——但它总是和递归神经网络（RNN）绑定在一起。Vaswani 等人的洞见是：attention 本身就是够用。你不需要 RNN。如果你把 attention 堆叠多层、设置多个"头"（multi-head）、加上位置编码（positional encoding），它就能完成 RNN 做的一切——而且做得更好。

更好在哪里？可并行化。RNN 必须按顺序处理输入——先读第一个词，再读第二个词，它的隐藏状态一步步更新。Transformer 一次性看到所有词，用 attention 机制决定"哪些词之间应该互相注意"。这让训练速度快了几个数量级。

论文的参考实现——在 Google 的 tensor2tensor 仓库里——是用 Python + TensorFlow 写的。代码结构清晰，可读性高。后来的所有 Transformer 实现——BERT、GPT、T5、LLaMA、ChatGPT——无论用什么框架，都受到了这份参考代码的影响。

BERT——谷歌在 2018 年 10 月发布的预训练语言模型——是 Transformer 的"encoder-only"变体。BERT 在 11 项自然语言处理基准测试上创造了新的 state-of-the-art。它的实现用的是 Python + TensorFlow。

GPT——OpenAI 在 2018 年 6 月发布的"generative pre-trained transformer"——是 Transformer 的"decoder-only"变体。GPT-1 在当时没有引起太大轰动——它只是在几个语言任务上做得不错。但 GPT-2（2019 年 2 月）发布时引发了巨大争议——OpenAI 最初拒绝完整发布模型，声称它"太危险了，可能被用于生成虚假信息"。这件事让 GPT 的名字第一次进入公众视野。GPT-2 的实现用的是 Python + PyTorch。

GPT-3（2020 年 5 月）——1750 亿参数——改变了世界对 AI 的认知。它不是在特定任务上训练出来的——它只是一个巨大的语言模型，在海量文本上训练，然后它竟然能写代码、写诗、做翻译、回答问题、甚至做简单的推理。GPT-3 的实现——依然是 Python + PyTorch。

OpenAI 在 2020 年发布了一项官方政策：所有的 OpenAI 模型开发统一使用 PyTorch。不是 TensorFlow，不是 JAX——是 PyTorch。CEO Sam Altman 在这条消息下面评论："PyTorch 是最好的深度学习框架，我们很自豪能成为这个社区的一部分。"

PyTorch 团队的内心里大概有一万个烟花同时绽放。

![](/images/attention-is-all-you-need-paper.jpg)

*"Attention Is All You Need"论文首页。这篇 2017 年的论文定义了过去十年最重要的 AI 架构。它的参考实现是用 Python + TensorFlow 写的。*

## Hugging Face：模型界的 GitHub

2016 年，三个法国人在纽约创办了一家公司。公司名字叫 Hugging Face——一个 emoji 🤗 的名字。最初的业务是做青少年聊天机器人。不是 AI 研究——就是一个社交 app，让teenagers和AI聊天玩耍。

Clément Delangue（CEO）、Julien Chaumond（CTO）、Thomas Wolf（CSO）三个人做了两三年的聊天机器人。不是不成功——只是他们发现，聊天机器人的核心——那个 NLP 模型——比聊天机器人本身更有意思。

2018 年，BERT 和 GPT 的发布让 NLP 领域发生了地震。以前做自然语言处理，每个任务都要从头训练模型——分类、命名实体识别、问答——每种任务都是独立的项目。BERT 证明了：你可以预训练一个通用语言模型，然后只需要做极小幅度的微调，就能适应各种下游任务。这叫做"transfer learning"（迁移学习）。

但问题来了：BERT 是 Google 用 TensorFlow 发布的。GPT 是 OpenAI 用 PyTorch 发布的。一个研究者想在 BERT 上做实验，他需要装 TensorFlow。想在 GPT 上做实验，需要装 PyTorch。想在两者之间对比？痛苦。

Hugging Face 在 2018 年做了一个 pivoting 决定：把 BERT 用 PyTorch 重新实现一次，然后把代码开源。他们把自己叫做"Transformers"——一个 PyTorch 的模型库，让用户可以用统一的 API 加载各种预训练模型。

2018 年底，Hugging Face Transformers 库发布了第一个版本。只有两个模型：BERT 和 GPT。但 API 设计极为简洁：

```python
from transformers import BertModel
model = BertModel.from_pretrained('bert-base-uncased')
```

一行代码加载一个预训练模型。

到 2019 年底，Transformers 库支持了 32 个模型架构。2020 年：50+。2022 年：100+。今天，它支持几乎所有公开的 Transformer 模型——几千个预训练检查点，从 Google、Meta、Microsoft、OpenAI、Hugging Face 自己训练的模型到全球研究者的投稿。Hugging Face Model Hub——他们 2020 年上线的模型分享平台——成了 AI 界的"GitHub"。

Hugging Face 的成功不是技术突破——是生态整合。他们做的不是创新，是"标准化"。他们解决的问题是：AI 研究者不应该花时间在"怎么加载别人训练好的模型"这种基础设施问题上。Hugging Face 把所有 Transformer 模型的加载、使用、微调全部统一成了一个 API——全部用 Python。

2022 年 6 月，Hugging Face 在 Series C 融资中估值 45 亿美元。一个从聊天机器人 pivoting 过来的公司，成了 AI 基础设施领域最重要的玩家之一。它的估值建立在什么上？建立在 Python 上。建立在"让 AI 模型的调用变得像 Python 的一行 import 那么简单"这个理念上。

Clément Delangue 在一次演讲中说了一句很有意思的话："我们不是在造 AI——我们是在让 AI 变得无聊。无聊意味着它已经成基础设施了。"

## ChatGPT：Python 帝国的加冕礼

2022 年 11 月 30 日。

OpenAI 发布了一个叫 ChatGPT 的产品。不是新的模型——GPT-3.5 已经在 2022 年初发过了——而是一个把 GPT-3.5 用 RLHF（人类反馈强化学习）微调之后，包装成一个聊天的界面。

五天之内，一百万用户。两个月之内，一个亿。人类历史上增长最快的应用。

ChatGPT 的"内部"是一个运行在云端 GPU 集群上的 Python 程序。从底层的 PyTorch 模型训练，到上层的 API 服务，到对话管理逻辑——全是用 Python 写的。OpenAI 在 2020 年宣布统一使用 PyTorch 时可能没想到这个决定会有这样的结果：全世界最有影响力的 AI 产品，心脏是 Python 的。

ChatGPT 在 2023 年引发了一场全球性的 AI 竞赛。Google 发布 Bard（后来改为 Gemini）。Meta 发布 LLaMA。Anthropic 发布 Claude。Mistral AI 从法国杀出来。DeepSeek 从中国异军突起。每个公司都在训练自己的大语言模型——每个模型都是用 Python 训练的。不管底层框架是 PyTorch、JAX、还是 TensorFlow——上层一定是 Python。

当你在 2025 年打开 ChatGPT、Claude、Gemini、Kimi、DeepSeek 中的任何一个，问一个问题，然后收到一段流畅的回答——你的问题被转换成 token embedding 的矩阵运算，通过几十层 Transformer 的 attention 计算，再被解码成文字返回。这整个过程——从训练到推理——都是用 Python 写的代码在驱动的。

## Guido 的退场

2018 年 7 月 12 日，Guido van Rossum 发了一封邮件到 Python 邮件列表。

标题很短："Stepping down as BDFL"（卸任 BDFL）。

邮件正文只有几句话：

> "I'm not going to be the BDFL anymore. I'm not going to appoint a successor. What I want is a completely lightweight process — basically a governing council of some sort."

Guido 卸任的原因没有说得很直接——但大家都知道原因。PEP 572（赋值表达式，也就是"海象运算符" `:=`）的争议让他身心俱疲。那场争议是 Python 社区历史上最激烈的一次内斗——持续了几个月，邮件列表里的争吵升级到了人身攻击的程度。Guido 在 PEP 572 的讨论中坚持了自己的意见，但他也看到了一个他不愿意看到的趋势：Python 太大了，太大了，大到一个人已经无法管理了。

Guido 的退场在 Python 的 AI 故事里是一个微妙的象征。他启动 Python 的时候，AI 还叫"人工智能寒冬"。Python 在科学计算中慢慢积累用户的时候，AI 研究者刚刚开始用神经网络做实验。Python 成为 AI 标准语言的时候——Guido 选择了退场。

他不是一个 AI 研究者。他从来不是。他在 Google 的七年做的是内部工具——不是深度学习。他在 Dropbox 的六年做的是文件同步系统——不是 AI。他在 Microsoft 的工作——2020 年加入——是继续改进 Python 本身。他 2024 年退休时说："我对 Python 在 AI 领域的成功感到骄傲。但我几乎不用 AI 工具。我还在用我 1990 年代的编辑器。"

这不是谦虚。这是这个故事的核心反讽：Python 成为 AI 帝国语言的原因，恰恰在于 Guido 没有专门为 AI 设计它。Python 的简单、可读、容易扩展——这些特质不是为深度学习准备的。它们是为"让写代码不那么痛苦"这个目标准备的。结果就是：当全世界的 AI 研究者需要一个"最不痛苦的胶水语言"时，Python 正好站在那里。

不是最优雅的。不是最快的。不是最安全的。但——是"最不讨厌的"。

这个"最不讨厌"的胜利，比任何精心设计的语言战略都更强大。

## 为什么是 Python？

现在我们可以回答这个核心问题了：为什么深度学习框架都选择了 Python？

答案不是一个——是六个。

**第一，胶水能力。** 深度学习是一个硬件和软件高度耦合的领域。你需要 C++ 做底层的矩阵运算，CUDA 做 GPU 加速，然后需要一个前端让研究者定义模型结构、加载数据、查看结果。Python 的 C 扩展机制——从 1990 年代就有的 `ctypes` 和 `Cython`——让它成为了完美的胶水。没有任何其他语言在"粘合 C++ 库"这件事上做得比 Python 更好。

**第二，学习成本。** 你不是在招 Python 程序员——你是在招 AI 研究者。AI 研究者来自物理、数学、统计、计算机科学的交叉地带。他们没有时间学一门只有深度学习才用的语言。Python 是他们在本科或硕士阶段就已经会了的语言——或者至少是最容易上手的那一个。

**第三，社区生态。** NumPy 在 2006 年就提供了高效的数组计算接口。Matplotlib 在 2003 年就让 Python 有了 MATLAB 级别的绘图能力。SciPy 提供了科学计算的全套工具箱。scikit-learn 在 2007 年就定义了机器学习 API 的标准。当深度学习框架出现的时候，它们不需要从零造生态——它们只需要让 PyTorch 的 `torch.Tensor` 和 NumPy 的 `np.ndarray` 可以无缝互转。这个互操性在 2016 年的 PyTorch 0.1 里就已经存在了。

**第四，Jupyter。** 这一点怎么强调都不过分。Jupyter Notebook 让深度学习实验从"写一个脚本在终端跑"变成了"在浏览器里交互式探索"。没有 Jupyter，Python 在 AI 研究领域的优势会减少一半。

**第五，研究者的懒惰。** 这个"懒惰"是褒义的。研究者不想写 boilerplate。不想配置 build system。不想 debug 段错误。不想在 C++ 栈回溯里找 bug。Python 让他们可以"只关心模型结构，不关心工程实现"。当一个研究者说"我写 Python 做 AI"的时候，他真正的意思是"我在用 Python 表达我的想法，计算的部分让 C++ 和 GPU 去操心"。

**第六，历史偶然性。** Theano 用 Python，因为 MILA 实验室本来就在用 Python。scikit-learn 用 Python，因为 INRIA 团队喜欢 Python。TensorFlow 用 Python，因为 Jeff Dean 想要覆盖研究者群体。PyTorch 用 Python，因为 Soumith Chintala 看到 Lua 的局限性。如果任何一个人在任何一个节点上做了不同的选择——如果 Theano 用了 Lua，如果 Torch7 的核心团队没有对 Python 感兴趣——Python 的 AI 故事可能完全不同。

但历史没有"如果"。

## 帝国的方言

2021 年 10 月，TIOBE 编程语言排行榜上，Python 登顶了。不是"最值得学习的语言""增长最快的语言"——而是"最流行的编程语言"。Java 从 1990 年代末就占据的榜首位置，被 Python 取代了。

TIOBE 的算法有争议——但数字背后的趋势是无可争议的。Python 的登顶驱动力来自 AI。不是 Web 开发（PHP 和 JavaScript 在那里更强），不是系统编程（C 和 Rust 在那里更强），不是企业应用（Java 在那里更强）——而是 AI 研究、数据科学、机器学习。世界上增长最快的产业选择了 Python。

2023 年，PyTorch 2.0 发布。引入了 `torch.compile`——一个用 Python 写的 JIT 编译器，能把 PyTorch 的代码在运行时编译成高性能的 GPU 代码。PyTorch 2.0 的口号是："性能接近手写 C++，体验保持 100% Python。"

这个口号是对 Python 在 AI 领域终极状态的完美总结：不要试图超越 C++ 的性能——让 Python 做好 Python，把性能问题留给编译器。

2024 年，Geoffrey Hinton 获得了诺贝尔物理学奖。理由是他在深度学习领域的奠基性贡献。AlexNet 论文——2012 年发表的——已经被引用了超过 18 万次。Alex Krizhevsky 在 2010 年代初期写下的那些 CUDA 代码——其中调用 Python 脚本来做数据可视化的那些部分——已经成为了历史的一部分。

Hinton 在获奖后的采访里说了一句耐人寻味的话："Python 不是我们成功的理由，但没有 Python，我们可能不会成功。或者至少会慢很多。"

而 Guido van Rossum——Python 之父——在 2024 年接受 Computer History Museum 采访时被问到："您是否预见到了 Python 在 AI 领域的主导地位？"

他笑着摇了摇头。

"我预见到的唯一一件事是：缩进比花括号好。其他都是意外。"

Python 的故事到这里不是结束——是开始。ChatGPT 之后的 AI 革命正在加速推进。每个新模型、每个新框架、每个新的 AI 应用——都在用 Python 写。当全世界的 AI 研究者打开终端，敲下 `import torch` 或者 `from transformers import pipeline` 的时候，他们参与的是一门帝国的方言的日常使用。

Python 不是被设计成 AI 语言的。它是被捡起来的。被一群不想学 Lua、受不了 C++、买不起 MATLAB、等不及 Julia 的研究者，在 2008 年的废墟上，一点一点捡起来的。他们不是 Python 的信徒——他们只是不想让自己在研究深度学习的时候被工具链困住。

结果就是：被困在 Python 工具链里的人，最终统治了 AI。

下次你打开 ChatGPT 问一个问题的时候——那行 `import torch` 的代码，正在云的某个角落默默地跑着。

---

## 人物

<!-- ⛔ Alex Krizhevsky 的肖像无法从 Wikipedia Commons 或任何公有领域来源获取。此处使用 AlexNet 论文中的架构图作为替代。 -->

![](/images/alexnet-architecture.png)

*Alex Krizhevsky——AlexNet 的第一作者。2012 年在多伦多大学他父母家的卧室里，用两块 GTX 580 训练了改写计算机视觉历史的卷积神经网络。毕业后与 Hinton、Sutskever 共同创办 DNNResearch，后公司被 Google 收购。2017 年离开 Google，此后保持低调。*

![](/images/ilya-sutskever-openai.jpg)

*Ilya Sutskever——AlexNet 的合著者，OpenAI 联合创始人兼前首席科学家。多伦多大学博士，师从 Geoffrey Hinton。在 AlexNet 中负责实验设计和论文写作。后来成为 GPT 系列模型的核心推动者，2024 年离开 OpenAI 创立 Safe Superintelligence Inc.（SSI）。*

![](/images/geoffrey-hinton-toronto.jpg)

*Geoffrey Hinton（1947–）——"深度学习之父"。英国裔加拿大计算机科学家，多伦多大学教授。1986 年提出反向传播算法的关键改进，2012 年与 Krizhevsky、Sutskever 合作发表 AlexNet。2024 年获诺贝尔物理学奖。被称为"三次经历 AI 寒冬而从未放弃神经网络的人"。*

![](/images/jeff-dean-google-brain.jpg)

*Jeff Dean（1968–）——Google 人工智能领域的灵魂人物。斯坦福博士，Google Fellow。领导了 DistBelief 和 TensorFlow 的开发，定义了"Google 如何做 AI"的工程范式。BigTable、MapReduce、Spanner 等 Google 核心基础设施的创造者之一。*

![](/images/yann-lecun-fair.jpg)

*Yann LeCun（1960–）——卷积神经网络（CNN）之父，LeNet 的创造者。法国人，纽约大学教授，2013 年加入 Facebook 领导 FAIR（Facebook AI Research）。PyTorch 背后的核心推动力量。2018 年获图灵奖（与 Hinton、Bengio 共享）。*

![](/images/soumith-chintala-pytorch.jpg)

*Soumith Chintala——PyTorch 的联合创始人和主要推动者。印度裔工程师，之前是 Torch7 核心开发者。2016 年领导了从 LuaTorch 到 PyTorch 的重构，把动态图带给了 Python AI 社区。Meta FAIR 研究科学家。*

![](/images/andrej-karpathy-tesla.jpg)

*Andrej Karpathy——斯坦福 CS231n（卷积神经网络视觉识别）课程的创建者，该课程让无数人用 Python 进入了深度学习领域。曾任 Tesla AI 总监（带领 Autopilot 视觉团队）、OpenAI 研究员。以大量高质量的 AI 教育内容闻名，推动了 Python AI 教育的普及。*

![](/images/guido-van-rossum-2018.jpg)

*Guido van Rossum（1956–）——Python 之父。Python 上篇的主角，下篇的旁观者。2005–2012 在 Google 工作，2013–2019 在 Dropbox，2018 年卸任 BDFL，2020 年加入 Microsoft 后于 2024 年退休。他在 AI 崛起的故事里几乎是一个旁观者——但这恰恰是整个故事最反讽的核心。*

---

Python 的故事讲完了——从一个圣诞节 hobby project 到胶水语言，再到 AI 帝国的方言。四十年，三个篇章，一个本质：好的工具不是设计出来的，是在解决问题的过程中长出来的。

*下一篇预告：Ruby——快乐的代价。一个日本程序员想造一门比 Perl 更强大、比 Python 更优雅的语言——他做到了，但快乐是有代价的。*
