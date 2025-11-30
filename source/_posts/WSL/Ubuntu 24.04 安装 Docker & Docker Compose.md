---
title: Ubuntu 24.04 安装 Docker 和 Docker Compose 完整指南
date: 2025-10-20 22:00:00
categories: [WSL]
tags: [Ubuntu, Docker, Docker-Compose, WSL, 容器化, 开发环境]
excerpt: 详细讲解在 Ubuntu 24.04 LTS 上通过系统仓库安装 Docker 和 Docker Compose 的完整步骤，包括配置国内镜像源和常用管理命令。
index_img: /img/default_xm.png
---

## 概述

本笔记介绍如何在 Ubuntu 24.04 LTS 上，通过系统仓库安装 `docker.io` 包来快速搭建 Docker 环境。此方法安装的是 Ubuntu 官方维护的 Docker 版本，通常更易于安装且与系统兼容性好。

## 第一步：安装 Docker 

### 1. 更新软件包列表

首先更新本地的软件包列表，以确保获取最新的软件包信息。

``` bash
sudo apt update
```

### 2. 安装 docker.io

安装 Ubuntu 官方维护的 Docker 版本。

``` bash
sudo apt install docker.io -y
```

### 3. 启动 Docker 服务并设置开机自启

安装完成后，需要启动 Docker 服务并将其设置为开机自动启动。

``` bash
sudo systemctl start docker
sudo systemctl enable docker
```

### 4. 验证安装

通过查看 Docker 版本号来验证安装是否成功。

``` bash
docker --version
```

**预期输出示例**：`Docker version 27.5.1, build 27.5.1-0ubuntu3~22.04.2`

### 5. （可选）将用户添加到 docker 组

默认情况下，执行 Docker 命令需要 `sudo` 权限。为了避免每次输入 `sudo`，可以将当前用户加入到 `docker` 用户组。

``` bash
sudo usermod -aG docker $USER
```

**注意**：执行此命令后，需要**重新登录系统**或重启终端，组权限更改才会生效。

## 第二步：配置国内镜像源

为了加速 Docker 镜像的拉取，建议配置国内镜像源。

### 1. 创建配置目录

创建 Docker 的配置目录。

``` bash
sudo mkdir -p /etc/docker
```

### 2. 配置镜像源

将国内镜像源地址添加到 Docker 的配置文件中。

``` bash
sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
        "https://docker.m.daocloud.io",
        "https://docker.imgdb.de",
        "https://docker-0.unsee.tech",
        "https://docker.hlmirror.com",
        "https://docker.1ms.run",
        "https://func.ink",
        "https://lispy.org",
        "https://docker.xiaogenban1993.com"
    ]
}
EOF
```

> **重要提示**：国内镜像源的可用性会随时间变化。如果拉取镜像失败，建议尝试注释掉部分镜像源，或搜索当前可用的镜像地址进行替换。

### 3. 重启 Docker 服务使配置生效

使镜像源配置生效。

``` bash
# 重新加载系统服务配置
sudo systemctl daemon-reload
# 重启 Docker 服务
sudo systemctl restart docker
```

### 4. 验证配置

检查配置的镜像源是否已成功加载。

``` bash
docker info | grep "Registry Mirrors" -A 10
```

## 第三步：安装 Docker-Compose

### 1. 安装 Docker-Compose

通过系统包管理器安装 Docker-Compose。

``` bash
sudo apt install docker-compose -y
```

### 2. 验证安装

检查 Docker-Compose 版本以验证安装。

``` bash
docker-compose version
```

**预期输出示例**：`docker-compose version 1.29.2`

> **注意**：通过 `apt` 安装的 `docker-compose` 版本可能不是最新的。若需最新版本，可考虑从 Docker 官方 GitHub 仓库下载，但本笔记遵循所选教程方法。

## 常用管理命令

### 服务管理

- **查看 Docker 服务状态**：`sudo systemctl status docker`
    
- **停止 Docker 服务**：`sudo systemctl stop docker`
    
- **重启 Docker 服务**：`sudo systemctl restart docker`
    

### 系统与日志

- **查看 Docker 日志**：`sudo journalctl -u docker.service -f`
    
- **查看 Docker 磁盘使用情况**：`docker system df`
    

## 测试运行

安装配置完成后，可以运行一个测试容器来验证整个环境是否工作正常。

``` bash
docker run hello-world
```

如果看到 "Hello from Docker!" 等提示信息，说明 Docker 已正确安装和配置。

## 卸载方法

如果需要卸载 Docker 和 Docker-Compose，可以执行以下命令。

### 1. 卸载软件包

``` bash
sudo apt remove docker.io docker-compose -y
```

### 2. 清理残留数据

为了彻底清除 Docker，可以删除其工作目录和容器运行时数据。

``` bash
sudo rm -rf /var/lib/docker
sudo rm -rf /var/lib/containerd
```

> **警告**：此操作将**永久删除**所有 Docker 镜像、容器、卷和网络，且不可恢复。请确保已备份重要数据。

希望这份笔记能帮助您顺利完成 Docker 环境的搭建！
