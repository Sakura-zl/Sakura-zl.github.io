---
title: 免费图床搭建指南：GitHub + PicGo 组合
date: 2025-10-11 17:25:00
categories: [GitHub]
tags: [教程, PicGo]
excerpt: 使用GitHub仓库和PicGo搭建完全免费的图床服务，享受稳定可靠的图片存储和CDN加速，告别图片加载慢、存储贵的烦恼。
---

# 免费图床搭建指南：GitHub + PicGo 组合

## 什么是图床？

图床（Image Hosting）是专门用于存储图片的服务器，通过图床可以方便地在网络上分享图片链接。使用 GitHub 仓库作为图床具有以下优势：

- **完全免费**：GitHub 提供免费的存储空间
- **稳定可靠**：GitHub 服务器稳定，图片不易丢失
- **版本控制**：可以追踪图片的修改历史
- **CDN 加速**：可以通过 jsDelivr 等 CDN 加速访问

## 准备工作

### 1. 创建 GitHub 仓库

1. 登录 GitHub 账号
2. 点击右上角"+"号，选择"New repository"
3. 填写仓库信息：
   - Repository name: `image-gallery`（或其他你喜欢的名称）
   - Description: `个人图床仓库`
   - 选择 **Public**（公开仓库）
   - 勾选"Add a README file"
4. 点击"Create repository"

### 2. 生成 GitHub Token

1. 点击 GitHub 右上角头像 → Settings
2. 左侧菜单选择"Developer settings"
3. 选择"Personal access tokens" → "Tokens (classic)"
4. 点击"Generate new token" → "Generate new token (classic)"
5. 填写 Token 信息：
   - Note: `PicGo`
   - Expiration: 建议选择"Never"或较长时间
   - 勾选权限：`repo`（全选）、`workflow`
6. 点击"Generate token"
7. **重要**：立即复制生成的 Token 并妥善保存

## PicGo 安装和配置

### 1. 下载安装 PicGo

PicGo 支持多个平台：

- **Windows**: 从[GitHub Releases](https://github.com/Molunerfinn/PicGo/releases)下载.exe 安装包
- **macOS**: 下载.dmg 文件
- **Linux**: 下载.AppImage 文件

### 2. 配置 GitHub 图床

1. 打开 PicGo 应用
2. 左侧选择"图床设置" → "GitHub 图床"
3. 填写配置信息：

```
仓库名: 你的用户名/仓库名
   例如: Sakura-zl/image-bed

分支: main (或master)

Token: 粘贴刚才生成的GitHub Token

存储路径: img/ (可选，用于在仓库中创建文件夹)

自定义域名: https://cdn.jsdelivr.net/gh/你的用户名/仓库名
```

4. 点击"确定"保存配置
5. 点击"设为默认图床"

### 3. 验证配置

1. 在 PicGo 主界面点击"上传区"
2. 拖拽一张图片或点击"选择文件"
3. 上传成功后，会在"相册"中显示图片
4. 复制 Markdown 链接格式：`![图片描述](图片链接)`

## 使用方法

### 1. 快速上传图片

- **拖拽上传**：直接将图片拖到 PicGo 窗口
- **剪贴板上传**：截图后按`Ctrl+Shift+P`（Windows）或`Cmd+Shift+P`（macOS）
- **右键上传**：在图片文件上右键选择"通过 PicGo 上传"

### 2. 链接格式

PicGo 支持多种链接格式：

- **Markdown**: `![描述](链接)`
- **HTML**: `<img src="链接" alt="描述">`
- **URL**: 纯图片链接
- **UBB**: `[img]链接[/img]`

### 3. 批量上传

1. 在 PicGo 中点击"上传区"
2. 选择多张图片或拖拽多个文件
3. 上传成功后可以批量复制链接

## 高级配置

### 1. 使用 jsDelivr CDN 加速

在 PicGo 的"自定义域名"中设置：

```
https://cdn.jsdelivr.net/gh/你的用户名/仓库名
```

这样可以享受 CDN 加速，提高图片加载速度。

### 2. 配置水印（可选）

如果需要为图片添加水印，可以使用 PicGo 的插件功能：

1. 在 PicGo 中安装"watermark"插件
2. 配置水印文字、位置、透明度等

### 3. 图片压缩

安装"picgo-plugin-compress"插件，自动压缩上传的图片。

## 常见问题解决

### 1. 上传失败

**可能原因**：

- Token 失效或权限不足
- 仓库名填写错误
- 网络连接问题

**解决方法**：

- 重新生成 Token
- 检查仓库名格式：`用户名/仓库名`
- 检查网络连接

### 2. 图片无法显示

**可能原因**：

- CDN 缓存问题
- 图片路径错误

**解决方法**：

- 等待 CDN 缓存更新（通常几分钟）
- 检查图片在 GitHub 仓库中的实际路径

### 3. 上传速度慢

**解决方法**：

- 使用 CDN 加速
- 检查网络连接
- 考虑使用国内图床作为备选

## 最佳实践

### 1. 图片命名规范

建议使用有意义的文件名：

- 避免使用中文和特殊字符
- 使用小写字母、数字和连字符
- 示例：`hexo-blog-setup-2024.jpg`

### 2. 文件夹组织

在 GitHub 仓库中创建文件夹分类：

```
/img/
  /blog/           # 博客图片
  /screenshots/    # 截图
  /avatars/        # 头像
  /icons/          # 图标
```

### 3. 定期备份

虽然 GitHub 很稳定，但仍建议：

- 定期导出 PicGo 相册数据
- 重要图片本地备份

## 总结

使用 GitHub + PicGo 搭建免费图床是一个性价比极高的解决方案：

✅ **完全免费** - 无需支付任何费用  
✅ **稳定可靠** - GitHub 服务器保障  
✅ **易于使用** - PicGo 提供友好的图形界面  
✅ **版本控制** - 可以追踪图片修改历史  
✅ **CDN 加速** - 通过 jsDelivr 提升访问速度

这个方案特别适合博客作者、开发者以及需要频繁分享图片的用户。现在就开始搭建你的免费图床吧！

---

**相关资源**：

- [PicGo GitHub 仓库](https://github.com/Molunerfinn/PicGo)
- [jsDelivr CDN](https://www.jsdelivr.com/)
- [GitHub 文档](https://docs.github.com/)

> 如有问题，欢迎在评论区留言讨论！
