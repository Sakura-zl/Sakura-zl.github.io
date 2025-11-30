---
title: Hexo博客文章加密功能使用指南
date: 2025-10-10 23:50:00
categories: [Hexo]
tags: [加密, 教程]
---

# Hexo 博客文章加密功能使用指南

本文详细介绍了如何在 Hexo 博客中为文章添加密码保护功能，只有输入正确密码的用户才能阅读文章内容。

## 功能概述

通过使用 `hexo-blog-encrypt` 插件，你可以为特定的文章设置密码保护。当用户访问加密文章时，需要输入正确的密码才能查看完整内容。

## 安装步骤

### 1. 安装插件

```bash
npm install hexo-blog-encrypt --save
```

### 2. 配置 Hexo

在 `_config.yml` 文件中添加以下配置：

```yaml
# Blog encrypt
encrypt:
  enable: true
  default_abstract: 这是一篇加密文章，需要密码才能查看
  default_message: 请输入密码查看
  default_password: ""
  default_template:
    - tag-script
    - tag-encrypt
```

## 使用方法

### 为单篇文章添加密码

在文章的 Front-matter 中添加以下字段：

```yaml
---
title: 你的文章标题
date: 2025-10-10
password: 你的密码
abstract: 加密提示信息（可选）
message: 密码输入提示（可选）
---
```

### 参数说明

- **password**（必需）：文章的访问密码
- **abstract**（可选）：加密文章的摘要信息，默认使用全局配置
- **message**（可选）：密码输入框的提示信息，默认使用全局配置

## 示例

### 示例 1：基本加密

```yaml
---
title: 私人日记
date: 2025-10-10
password: mysecret123
---
```

### 示例 2：自定义提示信息

```yaml
---
title: 项目文档
date: 2025-10-10
password: project2025
abstract: 这是项目内部文档，需要授权才能查看
message: 请输入项目密码：
---
```

### 示例 3：分类加密

你还可以为整个分类的文章设置相同的密码：

```yaml
---
title: 团队会议记录
date: 2025-10-10
categories: [内部文档]
password: team123
---
```

## 高级配置

### 全局默认密码

如果你希望所有加密文章使用相同的默认密码，可以在 `_config.yml` 中设置：

```yaml
encrypt:
  enable: true
  default_abstract: 这是一篇加密文章
  default_message: 请输入密码
  default_password: "globalpassword123"
```

### 自定义模板

你还可以自定义加密页面的显示模板：

```yaml
encrypt:
  enable: true
  default_template:
    - tag-script
    - tag-encrypt
    - your-custom-template
```

## 注意事项

1. **密码安全**：请使用强密码，避免使用简单密码
2. **密码管理**：建议使用密码管理器来管理不同文章的密码
3. **浏览器缓存**：加密状态会在浏览器会话中保持，关闭浏览器后需要重新输入密码
4. **SEO 影响**：加密文章的内容不会被搜索引擎索引
5. **备份重要**：请定期备份你的文章内容

## 故障排除

### 常见问题

1. **加密不生效**

   - 检查插件是否正确安装
   - 确认 `_config.yml` 中的 `encrypt.enable` 设置为 `true`
   - 重启 Hexo 服务器

2. **密码输入后无法解密**

   - 确认密码正确（区分大小写）
   - 清除浏览器缓存后重试
   - 检查文章 Front-matter 格式是否正确

3. **样式显示异常**
   - 检查主题是否兼容加密插件
   - 确认没有 CSS 冲突

## 总结

通过 `hexo-blog-encrypt` 插件，你可以轻松为 Hexo 博客文章添加密码保护功能。这个功能特别适合：

- 私人日记和笔记
- 内部项目文档
- 付费内容预览
- 团队内部资料

希望这个指南能帮助你更好地保护你的博客内容！
