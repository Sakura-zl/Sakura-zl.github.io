---
title: Windows 11 中使用 VS Code 连接 WSL Ubuntu 24.04 完整教程
date: 2025-10-20 23:30:00
categories: [WSL]
tags: [Windows11, VS Code, WSL, Ubuntu, 开发环境, 远程开发]
excerpt: 详细讲解如何在 Windows 11 中配置 VS Code 连接 WSL 2 中的 Ubuntu 24.04，实现跨平台无缝开发体验。
index_img: /img/default_xm.png
---

## 概述

本指南详细介绍如何在 Windows 11 系统中配置 VS Code，使其能够连接并编辑 WSL 2 中的 Ubuntu 24.04 子系统文件，实现跨平台无缝开发体验。

## 环境要求

### 系统要求

- **Windows 11** (版本 22H2 或更高版本)
    
- **WSL 2** (Windows 子系统 for Linux 2.0)
    
- **Ubuntu 24.04 LTS** (通过 Microsoft Store 安装)
    
- **Visual Studio Code** (最新版本)
    

### 必要组件

- WSL 2 后端
    
- VS Code Remote - WSL 扩展
    

## 安装与配置步骤

### 1. 启用 WSL 功能

如果尚未启用 WSL，需要在 Windows 中开启此功能：

``` powershell
# 以管理员身份运行 PowerShell
wsl --install
```

或者手动启用：

``` powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```
完成后**重启计算机**。

### 2. 设置 WSL 2 为默认版本

``` powershell
wsl --set-default-version 2
```

### 3. 安装 Ubuntu 24.04

通过 Microsoft Store 安装 Ubuntu 24.04 LTS，或使用命令行：

``` powershell
wsl --install -d Ubuntu-24.04
```

### 4. 安装 VS Code 及必要扩展

#### 安装 VS Code

从 [官网](https://code.visualstudio.com/) 下载并安装 VS Code。

#### 安装 WSL 扩展

1. 打开 VS Code
    
2. 进入扩展市场 (Ctrl+Shift+X)
    
3. 搜索 **"WSL"**
    
4. 安装由 **Microsoft** 发布的扩展
    

## 连接与使用方法

### 在 VS Code 内连接

如果已经打开了 VS Code：

1. 点击左下角的 **远程连接** 图标 (显示为 `><`)
    
2. 在弹出的命令面板中选择：
    
    - **"Connect to WSL"** - 连接到当前 WSL 会话
        
    - **"New WSL Window"** - 在新窗口中连接
        

## 环境配置

### 1. 扩展管理

在 WSL 环境中，需要重新安装必要的扩展：

1. 连接到 WSL 后，打开扩展面板 (Ctrl+Shift+X)
    
2. 之前在 Windows 中安装的扩展会显示 **"在 WSL: Ubuntu-24.04 中安装"**
    
3. 点击安装按钮，将其安装到 WSL 环境中
    

## 总结

通过以上配置，你可以在 Windows 11 中享受完整的 Linux 开发环境，同时利用 VS Code 强大的编辑和调试功能。这种配置结合了 Windows 的易用性和 Linux 的开发效率，是现代跨平台开发的理想解决方案。
