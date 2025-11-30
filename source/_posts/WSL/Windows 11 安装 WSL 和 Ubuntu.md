---
title: Windows 11 安装 WSL 和 Ubuntu 24.04 完整指南
date: 2025-10-20 19:00:00
categories: [WSL]
tags: [Windows11, WSL, Ubuntu, 开发环境, 子系统]
excerpt: 详细讲解在 Windows 11 上手动安装 WSL 2 和 Ubuntu 24.04 的完整步骤，包括启用功能、安装内核更新和系统配置。
index_img: /img/default_xm.png
---

## 准备工作

1. 确保Windows 11已更新到最新版本
    
2. 确保系统有足够的存储空间（建议至少10GB可用空间）
    

## 第一步：启用WSL功能

1. 按 `Win + X` 键，选择"Windows PowerShell（管理员）"或"命令提示符（管理员）"
    
2. 在打开的窗口中输入以下命令：
    
``` powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
```

3. 继续输入以下命令启用虚拟机平台：
    
``` powershell
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

4. 重启计算机
    

## 第二步：手动安装WSL内核更新

1. 访问你提供的GitHub发布页面：  
    [https://github.com/microsoft/WSL/releases](https://github.com/microsoft/WSL/releases)
    
2. 找到最新的WSL内核更新包（通常是 `.msixbundle` 文件）
    
    - 推荐下载最新版本，如：`Microsoft.WSL_2.0.9.0_x64_ARM64.msixbundle`
        
3. 下载完成后，右键点击下载的文件，选择"使用PowerShell安装"
    
    - 或者以管理员身份打开PowerShell，导航到下载目录，执行：
        
	    `Add-AppxPackage .\Microsoft.WSL_2.0.9.0_x64_ARM64.msixbundle`
    

## 第三步：安装Ubuntu

1. 访问你提供的Microsoft Store链接：  
    [https://apps.microsoft.com/detail/9N6SVWS3RX71](https://apps.microsoft.com/detail/9N6SVWS3RX71)
    
2. 点击"获取"按钮，然后选择"下载"
    
3. 等待下载和安装完成
    

## 第四步：设置WSL 2为默认版本

1. 以管理员身份打开PowerShell
    
2. 运行以下命令：
    

``` powershell
wsl --set-default-version 2
```

## 第五步：启动和配置Ubuntu

1. 点击开始菜单，找到并点击"Ubuntu"
    
2. 首次启动需要等待安装完成
    
3. 系统会提示你创建新的UNIX用户名和密码
    
    - 输入你想要的用户名（推荐使用小写字母）
        
    - 设置密码（输入时不会显示字符，这是正常的）
        

## 验证安装

1. 打开PowerShell或命令提示符
    
2. 输入以下命令检查WSL状态：
    
``` powershell
wsl --list --verbose
```

应该看到类似这样的输出：

``` powershell
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

## 常见问题解决

### 如果WSL 2安装失败：

1. 确保已启用BIOS/UEFI中的虚拟化功能
    
2. 检查Windows功能中"虚拟机平台"是否已启用
    

### 如果Ubuntu启动失败：

1. 在PowerShell中运行：
    
``` powershell
wsl --install -d Ubuntu
```

### 设置WSL版本：

如果需要将特定发行版设置为WSL 1或2：

``` powershell
wsl --set-version Ubuntu 2
```

## 基本使用

1. 在PowerShell中直接输入 `wsl` 即可进入Ubuntu环境
    
2. 或者在开始菜单中点击Ubuntu图标启动
    

## 更新系统

在Ubuntu终端中运行：

``` bash
sudo apt update && sudo apt upgrade
```

这样就完成了在Windows 11上手动安装WSL和Ubuntu的全部过程！
