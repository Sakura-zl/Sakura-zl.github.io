---
title: Hexo博客搭建完整教程
date: 2025-09-30 00:34:17
categories:  [Hexo]
tags: [教程, GitHub, 博客搭建, Hexo]
excerpt: 本文详细介绍了如何使用Hexo框架从零开始搭建个人博客，包括环境配置、主题安装、写作与部署等步骤。
---

## 目录

- 环境准备
- 安装 Hexo
- 本地预览
- 部署到 GitHub Pages
- 内容管理
- 主题更换
- 高级配置
- 常见问题

## 环境准备

### 1. 安装 Node.js

Hexo 基于 Node.js，所以需要先安装 Node.js 环境。

**下载地址**：[https://nodejs.org/](https://nodejs.org/)

**安装步骤**：

1. 访问官网下载 LTS（长期支持）版本
2. 运行安装程序，按照提示完成安装
3. 安装完成后验证是否成功：

```
# 打开命令行工具（Windows：CMD或PowerShell，Mac：Terminal）
node -v
npm -v
```

如果显示版本号，说明安装成功。

### 2. 安装 Git

Git 用于版本控制和部署到 GitHub。

**下载地址**：[https://git-scm.com/](https://git-scm.com/)

**安装步骤**：

1. 下载适合你操作系统的版本
2. 运行安装程序，一般使用默认设置即可
3. 安装完成后验证：

```
git --version
```

### 3. 配置 Git（可选但推荐）

```
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱"
```

## 安装 Hexo

### 1. 安装 Hexo 命令行工具

```
# 使用npm全局安装hexo-cli
npm install -g hexo-cli

# 安装完成后验证
hexo -v
```

**PS：安装完成后使用命令`hexo -v`提示“'hexo' 不是内部或外部命令，也不是可运行的程序 或批处理文件。”时**

**检查 npm 全局安装路径**

`npm config get prefix`

如果有返回路径（例如：D:\GlobalNodeModules），将路径添加到系统 PATH

1. **按  `Win + R`**，输入  `sysdm.cpl`，回车
2. 点击"**高级**"选项卡，然后点击"**环境变量**"
3. 在"**系统变量**"中找到  `Path`，双击编辑
4. 点击"**新建**"，添加以下路径：

   `D:\GlobalNodeModules`

5. 点击"确定"保存所有对话框
6. **重新打开命令行窗口**，然后测试：

   `hexo version`

### 2. 初始化博客项目

```
# 创建一个文件夹用于存放博客
mkdir hexo
cd hexo

# 初始化Hexo项目
hexo init

# 安装依赖包
npm install
```

### 3. 项目结构说明

初始化完成后，你会看到以下目录结构：

```
hexo/
├── _config.yml       # 主配置文件
├── package.json      # 项目依赖配置
├── scaffolds/        # 模板文件夹
├── source/           # 源文件目录
│   ├── _posts/       # 文章存放目录
│   └── _drafts/      # 草稿目录
└── themes/           # 主题目录
```

## 本地预览

### 1. 生成静态文件

```
# 清理缓存
hexo clean

# 生成静态文件
hexo g

# 或者使用简写
hexo clean
hexo g
```

### 2. 启动本地服务器

```
# 启动服务器
hexo server

# 或者使用简写
hexo s
```

### 3. 访问博客

在浏览器中打开：`http://localhost:4000`

**服务器选项**：

```
# 指定端口
hexo server -p 5000

# 自定义IP地址
hexo server -i 192.168.1.1

# 静态模式（不加载动态内容）
hexo server -s
```

## 部署到 GitHub Pages

### 1. 创建 GitHub 仓库

1. 登录 GitHub 账号
2. 点击右上角"+"号，选择"New repository"
3. 仓库名必须为：`你的用户名.github.io`
4. 设置为公开（Public）仓库
5. 点击"Create repository"

### 2. 配置 SSH 密钥

#### 生成 SSH 密钥

```
# 生成密钥对
ssh-keygen -t rsa -b 4096 -C "你的GitHub邮箱"
# 一路按回车使用默认设置
```

#### 添加 SSH 密钥到 GitHub

1. 复制公钥内容：

   `type %userprofile%\.ssh\id_rsa.pub`

2. 登录 GitHub → Settings → SSH and GPG keys → New SSH key
3. 粘贴公钥内容，设置标题
4. 点击"Add SSH key"

#### 测试连接

`ssh -T git@github.com`

看到成功提示即表示配置完成。

### 3. 配置部署设置

修改博客根目录下的`_config.yml`文件：

```
# Deployment
## Docs: https://hexo.io/docs/one-command-deployment
deploy:
  type: git
  repo:
    github: git@github.com:你的用户名/你的用户名.github.io.git
  branch: main  # 或者 master，根据你的仓库默认分支而定
```

**重要**：YAML 语法要求冒号后面必须有一个空格！

### 4. 安装部署插件

`npm install hexo-deployer-git --save`

### 5. 执行部署

```
# 完整的部署流程
hexo clean   # 清理
hexo generate   # 生成
hexo deploy   # 部署

# 或者使用组合命令
hexo clean;hexo g;hexo d
```

### 6. 访问在线博客

部署完成后，访问：`https://你的用户名.github.io`

## 内容管理

### 1. 创建新文章

```
# 创建新文章
hexo new "文章标题"

# 指定布局创建
hexo new page "关于我"
```

### 2. 文章 Front-matter 配置

每篇文章开头的 YAML 配置区域：

```
---
title: 文章标题
date: 2024-01-01 12:00:00
tags:
- 标签1
- 标签2
categories: 分类
cover: 封面图片URL
description: 文章描述
---
```

### 3. 文章目录结构

```
source/
├── _posts/           # 发布的文章
│   ├── hello-world.md
│   └── second-post.md
├── _drafts/          # 草稿
│   └── draft-post.md
└── about/            # 关于页面
    └── index.md
```

### 4. 常用内容命令

```
# 发布草稿
hexo publish draft-post

# 显示草稿列表
hexo list draft

# 显示文章列表
hexo list post
```

## 主题更换

### 1. 选择主题

访问  [Hexo 主题官网](https://hexo.io/themes/)  选择喜欢的主题。

### 2. 安装主题（以 stun 为例）

```
# 进入博客目录
cd hexo

# 下载主题
git clone https://github.com/liuyib/hexo-theme-stun.git themes/stun
```

### 3. 应用主题

修改`_config.yml`：

```
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
theme: stun
```

### 4. 安装主题依赖

```
npm install --save hexo-renderer-pug
```

### 5. 主题配置

大多数主题有自己的配置文件，通常位于`themes/主题名/_config.yml`。

## 高级配置

### 1. 站点配置（\_config.yml）

```
# Site
title: 你的博客标题
subtitle: 博客副标题
description: 博客描述
keywords: 关键词1,关键词2
author: 你的名字
language: zh-CN
timezone: Asia/Shanghai

```

### 2. 插件安装

```
# 搜索插件
npm search hexo-plugin

# 安装常用插件
npm install hexo-generator-search --save
npm install hexo-generator-sitemap --save
npm install hexo-deployer-git --save
```

## 常见问题

### 1. 部署失败

**问题**：`hexo d`命令执行失败

**解决方案**：

- 检查 SSH 密钥配置
- 确认仓库地址是否正确
- 检查`_config.yml`中 deploy 配置的缩进和空格

### 2. 本地预览空白

**问题**：本地访问显示空白页面

**解决方案**：

```
# 清理缓存重新生成
hexo clean
hexo generate
hexo server
```

### 3. 样式丢失

**问题**：部署后 CSS 样式丢失

**解决方案**：

- 检查`_config.yml`中的`url`和`root`配置
- 确认主题是否正确安装
- 检查资源文件路径

### 4. 文章不显示

**问题**：新写的文章在网站上不显示

**解决方案**：

- 检查文章 Front-matter 格式
- 确认文章保存在`source/_posts`目录
- 重新生成和部署

### 5. 命令不存在

**问题**：`hexo`命令找不到

**解决方案**：

```
# 重新安装hexo-cli
npm install -g hexo-cli

# 或者使用npx
npx hexo [command]
```

## 常用命令速查表

| 命令                | 简写     | 说明           |
| ------------------- | -------- | -------------- |
| `hexo clean`        | 无       | 清理缓存文件   |
| `hexo generate`     | `hexo g` | 生成静态文件   |
| `hexo server`       | `hexo s` | 启动本地服务器 |
| `hexo deploy`       | `hexo d` | 部署到远程仓库 |
| `hexo new "标题"`   | 无       | 创建新文章     |
| `hexo list post`    | 无       | 显示文章列表   |
| `hexo publish 草稿` | 无       | 发布草稿       |

## 后续维护

### 1. 更新 Hexo

```
# 更新hexo-cli
npm update -g hexo-cli

# 更新项目依赖
npm update
```

### 2. 备份博客

建议将整个博客目录上传到 GitHub 私有仓库进行备份。

### 3. 定期更新

定期检查并更新主题和插件：

```
npm outdated
npm update
```
