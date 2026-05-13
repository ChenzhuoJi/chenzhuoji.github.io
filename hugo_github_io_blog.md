# Hugo博客写作与发布简明步骤
前置条件：本地博客可通过 hugo server -D 正常预览；已创建 GitHub 仓库（示例：https://github.com/Chenzhuoji/仓库名）

## 一、写作步骤
1. 打开博客项目文件夹
2. 命令行执行：hugo new posts/文章名.md（按分类/年份创建可先建子文件夹，如 posts/2025/，生成时写 hugo new posts/2025/文章名.md
3. 打开生成的 content/posts/下的 .md 文件，用 Markdown 格式写作
   - 插入图片：![图片描述](/images/图片名.jpg)
   - 插入代码块：用 ``` 包裹代码（标注语言如 python）
   - 需将文件头 draft: true 改为 draft: false
4. 本地预览：命令行执行 hugo server，浏览器访问 http://localhost:1313
5. 修改站点信息（标题、菜单等）：编辑根目录 hugo.toml 文件

## 二、首次发布到 GitHub Pages 步骤
1. 生成静态文件：博客根目录执行 hugo --cleanDestinationDir（文件在 public/ 文件夹）
2. 初始化 public 仓库：
   cd public
   git init
   git add .
   git commit -m "deploy"
3. 推送到 gh-pages 分支：
   git remote add origin https://github.com/Chenzhuoji/仓库名.git
   git branch -M gh-pages
   git push -u origin gh-pages --force（--force 覆盖旧内容，不影响源码分支）
4. 开启 GitHub Pages：
   打开仓库 → Settings → Pages → Deployment / Branch 选择 gh-pages 分支、/ 文件夹 → 点击 Save
5. 访问网站：等待 1-2 分钟后，访问 https://Chenzhuoji.github.io/仓库名/（若仓库名是 Chenzhuoji.github.io，直接访问 https://Chenzhuoji.github.io/）

## 三、后续更新博客流程
每次新增/修改文章后，执行以下命令即可：
hugo --cleanDestinationDir
cd public
git add .
git commit -m "update"
git push --force