---
title: Windows 系统 Git SSH 密钥配置完整教程
date: 2025-10-21 00:08:00
categories: [GitHub]
tags: [Windows, Git, SSH, 密钥配置, GitHub, 安全认证]
excerpt: 详细讲解在 Windows 系统上生成和配置 Git SSH 密钥的完整流程，包括密钥生成、代理配置、GitHub 添加和连接测试。
index_img: /img/default_xm.png
---

## 1. 生成 SSH 密钥

``` powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- 按 Enter 使用默认保存路径 `C:\Users\用户名\.ssh\id_ed25519`
    
- 设置密码（可选，直接按 Enter 跳过）
    

## 2. 启动 SSH 代理服务

``` powershell
# 启动 ssh-agent
eval $(ssh-agent -s)
```

## 3. 添加 SSH 密钥到代理

``` powershell
# 添加 ED25519 密钥
ssh-add /c/Users/用户名/.ssh/id_ed25519
```

如果遇到权限问题，可以尝试：

``` powershell
# 以管理员权限运行
Start-Process PowerShell -Verb RunAs
```

## 4. 复制公钥到剪贴板

``` powershell
# 使用 cat 命令查看
cat C:\Users\用户名\.ssh\id_ed25519.pub
```

## 5. 将公钥添加到 GitHub

1. 登录 GitHub
    
2. 点击右上角头像 → **Settings**
    
3. 左侧菜单选择 **SSH and GPG keys**
    
4. 点击 **New SSH key**
    
5. 填写信息：
    
    - **Title**: 标识名称（如 "My Windows PC"）
        
    - **Key type**: 保持默认 Authentication Key
        
    - **Key**: 粘贴复制的公钥内容
        

## 6. 创建 SSH 配置文件（可选但推荐）

``` powershell
# 创建配置文件
notepad C:\Users\用户名\.ssh\config
```

添加以下内容：

``` text
# GitHub
Host github.com
    HostName github.com
    User git
    IdentityFile C:\Users\用户名\.ssh\id_ed25519
    IdentitiesOnly yes
```

## 7. 测试 SSH 连接

``` powershell
ssh -T git@github.com
```

成功时会显示：

``` text
Hi 用户名! You've successfully authenticated, but GitHub does not provide shell access.
```


## 注意事项

- 确保 GitHub 仓库存在且有写入权限
    
- 如果使用多账户，需要在 SSH 配置文件中分别配置
    
- 定期更新 SSH 密钥（建议每年一次）
    
- 备份 SSH 密钥到安全位置
    

按照以上步骤操作，即可成功配置 Windows 系统的 Git SSH 密钥认证。
