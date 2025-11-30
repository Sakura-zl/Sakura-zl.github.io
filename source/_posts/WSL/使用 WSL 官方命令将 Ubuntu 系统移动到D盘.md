---
title: 使用 WSL 官方命令将 Ubuntu 系统移动到 D 盘完整教程
date: 2025-10-20 21:00:00
categories: [WSL]
tags: [WSL, Ubuntu, 系统迁移, 磁盘管理, 空间优化]
excerpt: 详细讲解如何使用 WSL 官方自带的导出/导入功能，将 Ubuntu 子系统从 C 盘迁移到 D 盘，以释放 C 盘空间。
index_img: /img/default_xm.png
---

## 概述

本教程介绍如何使用WSL官方自带的导出/导入功能，将Ubuntu子系统从C盘迁移到D盘，以释放C盘空间。

## 详细步骤

### 停止WSL服务

在开始菜单搜索"PowerShell"，**以管理员身份运行**，执行以下命令关闭所有WSL子系统：



``` powershell
wsl --shutdown
```

### 查看当前WSL发行版信息

执行以下命令查看已安装的WSL发行版及其状态：

``` powershell
wsl -l -v
```

记录下你要迁移的Ubuntu系统的确切名称（如：`Ubuntu-24.04`、`Ubuntu`等）。

### 导出系统到压缩包

将Ubuntu系统导出为tar压缩包。请替换以下参数：

- `Ubuntu-24.04`：你的Ubuntu发行版名称
    
- `D:\Ubuntu-24\Ubuntu.tar`：导出的压缩包保存路径
    
``` powershell
wsl --export Ubuntu-24.04 D:\Ubuntu-24\Ubuntu.tar
```

### 注销原系统

从WSL中移除当前的Ubuntu系统：

``` powershell
wsl --unregister Ubuntu-24.04
```

### 在D盘创建目标文件夹

在D盘创建用于存放新系统的文件夹：

``` powershell
New-Item -ItemType Directory -Path "D:\Ubuntu-24.04" -Force
```
### 导入系统到D盘

将导出的压缩包导入到D盘的新位置：

``` powershell
wsl --import Ubuntu-24.04 D:\Ubuntu-24 D:\Ubuntu-24\Ubuntu.tar
```

### 设置默认用户

导入的系统默认使用root用户，需要切换回原来的普通用户：

``` powershell
# 首先启动一次系统
wsl -d Ubuntu-24.04

# 在WSL终端中执行（替换YourUsername为你的用户名）：
# Ubuntu2404 config --default-user YourUsername

# 或者在PowerShell中执行（根据发行版选择对应命令）：
# Ubuntu-22.04: 
Ubuntu2404.exe config --default-user YourUsername
# Ubuntu-20.04: 
Ubuntu2004.exe config --default-user YourUsername
# 普通Ubuntu:
Ubuntu.exe config --default-user YourUsername
```

## 验证迁移是否成功

### 方法一：检查系统路径

1. 打开文件资源管理器，导航到 `D:\Ubuntu-24.04\`
    
2. 确认该目录下存在以下文件：
    
    - `ext4.vhdx`（虚拟硬盘文件）
        
    - `metadata.json`（元数据文件）
        

### 方法二：通过WSL命令验证

1. 查看WSL发行版详情：
    
``` powershell
wsl -l -v
```

输出应显示你的Ubuntu系统正在运行或已停止，且版本为2。

2. 检查系统运行状态：
    
``` powershell
wsl -d Ubuntu-24.04 -- uname -a
```

应正常输出Linux内核信息。

3. 验证磁盘空间：
    
``` powershell
wsl -d Ubuntu-24.04 -- df -h /
```

查看根分区的大小，确认系统正常运行。

### 方法三：检查C盘空间变化

1. 迁移前记录C盘剩余空间
    
2. 迁移后再次检查C盘空间，应该有明显增加
    

### 方法四：验证用户配置

启动Ubuntu系统并检查：

``` powershell
wsl -d Ubuntu-24.04
```

确认：

- ✅ 正常进入系统
    
- ✅ 显示正确的用户名（不是root）
    
- ✅ 家目录文件完整
    
- ✅ 已安装的软件仍然可用
    

## 清理工作

确认系统正常运行后，可以删除导出的临时文件：

``` powershell
Remove-Item D:\Ubuntu-24\Ubuntu.tar
```

## 注意事项

- 确保D盘有足够的空间（建议至少20GB可用空间）
    
- 导出/导入过程可能需要较长时间，取决于系统大小
    
- 如果遇到权限问题，请始终使用管理员权限运行PowerShell
    
- 建议在操作前备份重要数据
    

## 故障排除

如果迁移后遇到问题：

1. 重新执行导出/导入流程
    
2. 检查WSL版本：`wsl --status`
    
3. 确保使用正确的发行版名称
    
4. 如无法启动，可尝试：`wsl --set-version Ubuntu-22.04 2`
    

通过以上步骤，你应该能够成功将Ubuntu系统迁移到D盘并验证迁移结果。
