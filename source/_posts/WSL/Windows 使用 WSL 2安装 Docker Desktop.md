---
title: Windows 使用 WSL2 安装 Docker Desktop 完整教程
date: 2025-10-20 20:00:00
categories: [WSL]
tags: [Windows, WSL2, Docker, Docker-Desktop, 容器化, 开发环境]
excerpt: 详细讲解在 Windows 系统上使用 WSL2 后端安装和配置 Docker Desktop 的完整流程，包括系统要求、安装步骤和镜像加速配置。
index_img: /img/default_xm.png
---

## 系统要求与前提条件

在开始安装前，请确保您的 Windows 设备满足以下要求。

### 操作系统

- **支持版本**：
    
    - **Windows 10**: 版本 **2004（内部版本 19041 或更高）** 及以上 。
        
    - **Windows 11** 。
        
- **系统架构**: **64 位** 操作系统 。
    
- **启用 WSL 2**: Docker Desktop 依赖 WSL 2（Windows Subsystem for Linux 2）作为后端 。Windows 家庭版无需 Hyper-V，但**必须启用 WSL 2 和虚拟机平台**。
    

### 硬件配置

|组件|最低要求|推荐配置|
|---|---|---|
|内存|4GB|16GB+|
|存储|20GB|50GB SSD|
|CPU|支持虚拟化技术|多核处理器|

> **重要提示**：您的 CPU 必须支持并开启**硬件虚拟化技术**（Intel VT-x 或 AMD-V）。您可以在 Windows 任务管理器的 "性能" 选项卡中查看"虚拟化"是否已启用 。

## 安装 WSL 2 与 Linux 发行版

Docker Desktop 需要 WSL 2 来运行。请按以下步骤启用和配置 WSL 2。

### 启用 WSL 和虚拟机平台功能

1. 以 **管理员身份** 打开 **Windows PowerShell**。
    
2. 依次执行以下命令：

```
# 启用"适用于 Linux 的 Windows 子系统"
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart

# 启用"虚拟机平台"
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

3. **重启计算机** 使更改生效。

### 安装并设置 WSL 2

1. 再次以管理员身份打开 PowerShell。
    
2. 安装或更新 WSL：
    
```
wsl --install
# 或者更新现有 WSL
wsl --update
```
    
3. 将 WSL 的默认版本设置为 **2**：
    
```
wsl --set-default-version 2
```
    
4. （可选）安装一个特定的 Linux 发行版，例如 Ubuntu：
    
```
wsl --install -d Ubuntu
```
    

> **注意**：如果在后续步骤中遇到与 WSL 相关的问题，可以尝试手动下载并安装 **WSL 2 Linux 内核更新包**。

## 安装 Docker Desktop

完成 WSL 2 的配置后，即可安装 Docker Desktop。

1. **下载安装程序**：  
    访问 Docker 官网的 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop) 页面，下载 Windows 版本的安装程序 (`Docker Desktop Installer.exe`)。
    
2. **运行安装程序**：
    
    - 双击下载的 `Docker Desktop Installer.exe` 文件。
        
    - 按照安装向导的提示完成安装。在安装过程中，请确保勾选以下选项：
        
        - **使用 WSL 2 引擎** (Use WSL 2 instead of Hyper-V)
            
        - **将 Docker CLI 添加到 PATH** (Add Docker CLI to PATH)
            
3. **完成安装**：
    
    - 安装完成后，建议**取消勾选** "Launch Docker Desktop" 选项，并**重启电脑**。
        
    - 重启后，通过开始菜单或桌面快捷方式**启动 Docker Desktop**。
        

## 配置 Docker Desktop

首次启动 Docker Desktop 后，建议进行以下配置以优化体验。

### 配置 WSL 2 集成

1. 右键点击系统托盘（右下角）的 Docker 鲸鱼图标，选择 **"Settings"**（设置）。
    
2. 导航至 **"Resources"** > **"WSL Integration"** 。
    
3. 确保已启用您希望使用 Docker 的 WSL 2 发行版（例如 `Ubuntu`）。
    

### 配置国内镜像加速器

为了提升在国内拉取 Docker 镜像的速度，强烈建议配置镜像加速器。

1. 在 Docker Desktop 设置中，进入 **"Docker Engine"** 选项卡。
    
2. 在右侧的 JSON 配置窗口中，添加或修改 `"registry-mirrors"` 项。你可以使用以下国内常用的镜像源 ：

```
{
  "registry-mirrors": [
    "https://mirror.baidubce.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com"
  ]
}
```

3. 点击 **"Apply & Restart"**（应用并重启）使配置生效 。
    

## 验证安装

安装和配置完成后，请验证 Docker 是否正常工作。

1. 打开 **Windows PowerShell** 或 **WSL 终端** (如 Ubuntu)。
    
2. 运行以下命令检查 Docker 版本：
    
    `docker --version`
    
    如果安装成功，将显示版本信息，例如 `Docker version 20.10.24`。
    
3. 运行一个测试容器，验证 Docker 能否正常运行：
    
    `docker run hello-world`
    
    如果看到 "Hello from Docker!" 的欢迎信息，说明你的 Docker 环境已经完全就绪了
