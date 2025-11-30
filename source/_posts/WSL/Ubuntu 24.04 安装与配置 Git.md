---
title: Ubuntu 24.04 安装与配置 Git 完整教程
date: 2025-10-20 23:00:00
categories: [WSL]
tags: [Ubuntu, Git, 版本控制, WSL, SSH配置, 开发工具]
excerpt: 详细讲解在 Ubuntu 24.04 系统上安装 Git、配置用户信息、设置 SSH 密钥以及常用 Git 别名配置的完整流程。
index_img: /img/default_xm.png
---

## 📋 简介

Git 是一个开源的分布式版本控制系统，用于高效地处理任何大小项目的版本管理。本指南详细介绍在 Ubuntu 24.04 系统上安装和配置 Git 的方法。

### ✅ 通过 APT 安装

这是最官方、最稳定的安装方式。

#### 安装步骤

1. **更新软件包列表**
    
    ``` bash
    sudo apt update
    ```
    
    此命令同步软件包索引，确保获取最新的版本信息。
    
2. **安装 Git**
    
    ``` bash
    sudo apt install git
    ```
    
    当系统提示确认时，输入 `Y` 并按回车键继续。
    
3. **验证安装**
    
    ``` bash
    git --version
    ```
    
    成功安装后，终端会显示类似 `git version 2.43.0` 的版本信息。
    

#### 卸载方法

``` bash
sudo apt remove git
sudo apt autoremove
```

## ⚙️ 基础配置

### 必需配置

安装 Git 后，首先配置用户信息，这在提交代码时是必需的。

``` bash
# 配置用户名
git config --global user.name "你的用户名"

# 配置邮箱地址
git config --global user.email "你的邮箱@example.com"
```

**注意**：

- `user.name` 可以是真实姓名或常用昵称
    
- `user.email` 应与 GitHub、GitLab 等代码托管平台使用的邮箱一致
    

### 常用配置选项

``` bash
# 设置默认编辑器为 Vim
git config --global core.editor "vim"

# 设置大小写敏感
git config --global core.ignorecase false

# 设置换行符处理（Windows/Linux 协作时重要）
git config --global core.autocrlf input

# 启用彩色输出
git config --global color.ui auto

# 设置默认分支名称
git config --global init.defaultBranch main
```

### 配置验证

``` bash
# 查看所有全局配置
git config --global --list

# 查看特定配置项
git config --global user.name
git config --global user.email
```

---

## 🛠️ 进阶配置

### SSH 密钥配置（推荐）

为安全连接远程仓库，建议配置 SSH 密钥。

``` bash
# 生成 SSH 密钥（如果已有可跳过）
ssh-keygen -t ed25519 -C "your_email@example.com"

# 启动SSH代理
eval "$(ssh-agent -s)"

# 将公钥添加到 SSH 代理
ssh-add ~/.ssh/id_ed25519

# 查看公钥内容
cat ~/.ssh/id_ed25519.pub
```

将输出的公钥内容添加到你的 GitHub、GitLab 或 Gitee 账户中。

### **验证连接**

``` bash
ssh -T git@github.com
```

初次连接时，可能会看到类似如下的提示：

``` text
The authenticity of host 'github.com (IP_ADDRESS)' can't be established.
ED25519 key fingerprint is SHA256:+DiY3wvvV6TuJJhbpZisF/zLDA0zPMSvHdkr4UvCOqU.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```
输入 `yes` 并回车确认。

**连接成功的提示**：  
如果SSH密钥配置正确，你会看到如下信息：

``` text
Hi [你的用户名]! You've successfully authenticated, but GitHub does not provide shell access.
```

这表明你的公钥已成功添加，并且GitHub通过了身份验证。

### 别名配置

提高工作效率的常用 Git 别名：

``` bash
# 状态相关
git config --global alias.s "status -s"
git config --global alias.ss "status"

# 提交相关
git config --global alias.cm "commit -m"
git config --global alias.ca "commit --amend"
git config --global alias.cane "commit --amend --no-edit"

# 日志相关
git config --global alias.lg "log --oneline --graph --decorate"
git config --global alias.ll "log --pretty=format:'%C(yellow)%h%Creset %C(blue)%ad%Creset %C(green)%an%Creset %s' --date=short"

# 分支相关
git config --global alias.br "branch"
git config --global alias.co "checkout"
```

## 🔍 故障排除

### 常见问题及解决方案

**权限被拒绝错误**

``` bash
# 确保有足够的权限
sudo apt update
```

**Git 命令未找到**

``` bash
# 检查安装状态
which git
git --version
```

**连接远程仓库失败**

``` bash
# 测试 SSH 连接
ssh -T git@github.com
```

**配置信息不生效**

``` bash
# 检查配置文件
cat ~/.gitconfig
```

---

## 💡 最佳实践建议

**定期更新**

``` bash
sudo apt update && sudo apt upgrade git
```

**备份配置**

``` bash
# 备份 Git 配置
cp ~/.gitconfig ~/.gitconfig.backup
```

**项目特定配置**

``` bash
# 在项目目录中设置特定配置（会覆盖全局配置）
git config user.name "项目专用名称"
git config user.email "project@example.com"
```

---

## 📝 总结

在 Ubuntu 24.04 上安装 Git 是一个简单直接的过程：

- **推荐使用 APT 安装**：`sudo apt install git`
    
- **务必进行基础配置**：用户名和邮箱地址
    
- **建议配置 SSH 密钥**：提高安全性和便利性
    
- **可选的别名配置**：显著提升工作效率
    

完成以上步骤后，你就可以在 Ubuntu 24.04 上愉快地使用 Git 进行版本控制了！

> **提示**：如果在安装或配置过程中遇到任何问题，请查看故障排除部分或查阅 Git 官方文档。
