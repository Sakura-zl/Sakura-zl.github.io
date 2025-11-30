---
title: Hexo 源码与生成站点分离部署教程
date: 2025-10-01 00:43:46
categories:  [Hexo]
tags: [GitHub, 源码管理]
excerpt: 本教程将指导您如何将 Hexo 博客的源码与生成的静态站点完全分开管理，使用独立的 Git 仓库进行版本控制。
---

## 步骤说明

### 第一步：在 GitHub 创建新仓库

1. 访问  [GitHub](https://github.com/)  并登录您的账户
2. 点击右上角 "+" 号，选择 "New repository"
3. 填写仓库信息：

   - **Repository name**: `hexo-sakura`（或其他您喜欢的名称）
   - **Description**: 可选，填写仓库描述
   - 选择  **Public**  或  **Private**
   - **不勾选** "Initialize this repository with a README"

4. 点击 "Create repository"

### 第二步：本地 Hexo 目录初始化

打开终端，进入您的 Hexo 博客根目录，执行以下命令：

```
# 1. 初始化 Git
git init

# 2. 添加远程仓库
git remote add origin <你的新仓库地址>

# 示例：
# git remote add origin https://github.com/你的用户名/hexo-sakura.git
```

### 第三步：验证远程仓库配置

```
# 3. 查看远程仓库是否添加成功
git remote -v
```

正常输出应该显示：

```
origin  https://github.com/你的用户名/hexo-sakura.git (fetch)
origin  https://github.com/你的用户名/hexo-sakura.git (push)
```

### 第四步：提交源码文件

```
# 4. 添加文件到暂存区
git add .

# 5. 提交更改
git commit -m "initial commit"
```

### 第五步：推送到远程仓库

根据您的默认分支名称选择相应的命令：

```
# 如果默认分支是 main
git push -u origin main

# 如果默认分支是 master
git push -u origin master
```

---

## 完整操作流程

```
# 进入 Hexo 博客目录
cd /path/to/your/hexo-blog

# 完整的 Git 操作流程
git init
git remote add origin <仓库地址>
git remote -v
git add .
git commit -m "initial commit"
git push -u origin master  # 或 main
```

---

## 注意事项

1. **分支名称**：GitHub 现在默认使用  `main`  作为主分支，但有些系统可能仍使用  `master`
2. **首次推送**：`-u`  参数设置上游分支，后续推送只需  `git push`
3. **忽略文件**：确保您的  `.gitignore`  文件已正确配置，避免提交不必要的文件
4. **敏感信息**：不要将包含密码或 API 密钥的配置文件提交到仓库

---

## 后续维护

完成首次推送后，日常更新流程：

```
# 添加更改
git add .

# 提交更改
git commit -m "描述本次更新的内容"

# 推送到远程仓库
git push
```

现在您的 Hexo 源码已经与生成的静态站点完全分离，可以独立进行版本管理和备份了！
