---
title: ComfyUI安装 ComfyUI Manager
date: 2025-09-30 18:19:44
categories: [ComfyUI]
tags: [插件管理,  安装教程]
excerpt: 介绍ComfyUI Manager其安装方法，只需几个简单步骤，即可便捷管理自定义节点、直接下载工作流，极大提升你的使用体验。
---

#### **常规安装步骤 (Git Clone)**

1. 打开你的 ComfyUI 安装目录，进入  `custom_nodes`  文件夹。
2. 在文件夹地址栏输入  `cmd`  并回车，在此处打开命令窗口。
3. 输入以下命令并回车：

   `git clone https://github.com/ltdrdata/ComfyUI-Manager.git comfyui-manager`

4. **重启 ComfyUI**。完全重启后，界面右上角或右侧菜单栏会出现一个  **"Manager" 按钮**。

#### **网络问题处理**

如果执行 Git 命令时遇到网络问题无法连接，可以使用代理地址。只需在原命令的  `github.com`  前加上  `https://ghfast.top/`  即可。

`git clone https://ghfast.top/https://github.com/ltdrdata/ComfyUI-Manager.git comfyui-manager`

### 🛠️ 使用 ComfyUI Manager

安装成功后，你就可以体验 ComfyUI Manager 带来的便利了：

- **一键安装缺失节点**：这是 Manager 最核心的功能之一。当你导入一个别人的工作流，如果出现节点缺失的报错，只需点击  **Manager > Install Missing Custom Nodes**，它就会自动列出所有缺失的节点，你只需逐个点击安装即可。
- **搜索并安装新插件**：点击  **Manager > Custom Nodes Manager**，你可以在搜索框中输入插件名称（如  `translation`），找到后点击  **Install**  按钮即可安装。
- **更新 ComfyUI 和插件**：在 Manager 的界面中，你可以方便地更新 ComfyUI 本体（**Update ComfyUI**）或所有已安装的插件（**Update All**）。
