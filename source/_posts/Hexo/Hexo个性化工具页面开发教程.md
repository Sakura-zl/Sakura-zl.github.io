---
title: Hexo个性化工具页面开发教程
date: 2025-10-12 03:00:00
categories: [Hexo]
tags: [Hexo, 前端开发, 静态网站, 工具页面]
excerpt: 本教程详细讲解如何在Hexo博客中创建功能完整的个性化工具页面，包含分类导航、子分类切换、响应式布局和丰富的交互功能。通过四个核心文件的协同工作，实现配置集中管理、静态生成优化和现代化设计。
---

# Hexo个性化工具页面开发教程

## 概述

本教程将详细介绍如何在Hexo博客中创建一个功能完整的个性化工具页面。这个页面采用现代化的设计，包含分类导航、子分类切换、响应式布局和丰富的交互功能。

## 系统架构

整个工具页面系统由四个核心文件组成：

1. **页面模板** (`source/oneself/index.md`) - 包含配置数据和页面结构
2. **生成器脚本** (`scripts/tools-generator.js`) - 处理静态页面生成
3. **样式文件** (`source/css/tools-grid.css`) - 定义页面样式和布局
4. **交互脚本** (`source/js/subcategory-interaction.js`) - 处理用户交互

## 详细实现

### 1. 页面模板配置

首先创建页面模板文件，将工具配置数据直接嵌入到Front Matter中：

```yaml
---
title: 工具
date: 2025-10-11 18:00:00
type: "oneself"
updated: 2025-10-11 19:00:00
tools_config:
  categories:
    - id: "代码仓库"
      name: "代码仓库"
      subcategories:
        - id: "主流仓库"
          name: "主流仓库"
          tools:
            - name: "GitHub"
              url: "https://github.com/"
              icon: "icon-github"
            - name: "GitLab"
              url: "https://gitlab.com/"
              icon: "icon-gitlab-fill"
        - id: "其他仓库"
          name: "其他仓库"
          tools:
            - name: "Gitee"
              url: "https://gitee.com/"
              icon: "icon-gitee-fill"
            - name: "Bitbucket"
              url: "https://bitbucket.org/"
              icon: "icon-bitbucket-fill"
    # 更多分类...
---
```

**配置结构说明：**

- **categories**: 主分类数组，每个分类包含：
  - `id`: 分类唯一标识符
  - `name`: 分类显示名称
  - `subcategories`: 子分类数组
- **subcategories**: 子分类数组，每个子分类包含：
  - `id`: 子分类唯一标识符
  - `name`: 子分类显示名称
  - `tools`: 工具项数组
- **tools**: 工具项数组，每个工具包含：
  - `name`: 工具名称
  - `url`: 工具链接
  - `icon`: 图标类名

### 2. 生成器脚本

创建Hexo生成器脚本，负责在构建时生成静态页面：

```javascript
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Hexo工具页面生成器
 * 在hexo generate时从页面Front Matter中读取工具配置并生成静态页面
 * 自动读取页面模板的Front Matter配置（包含工具数据）
 */
hexo.extend.generator.register('tools-page', function(locals) {
  try {
    // 读取页面模板的Front Matter配置
    const pageTemplatePath = path.join(hexo.source_dir, 'oneself', 'index.md');
    if (!fs.existsSync(pageTemplatePath)) {
      console.warn('页面模板文件不存在:', pageTemplatePath);
      return;
    }
    
    const pageTemplateContent = fs.readFileSync(pageTemplatePath, 'utf8');
    const frontMatter = parseFrontMatter(pageTemplateContent);
    
    // 从Front Matter中读取工具配置
    if (!frontMatter.tools_config || !frontMatter.tools_config.categories) {
      console.warn('工具配置数据不存在或格式不正确');
      return;
    }
    
    // 生成工具页面的HTML内容
    const htmlContent = generateToolsPage(frontMatter.tools_config.categories);
    
    return {
      path: 'oneself/index.html',
      data: {
        ...locals,
        content: htmlContent,
        layout: 'page',
        title: frontMatter.title,
        type: frontMatter.type,
        date: frontMatter.date,
        updated: frontMatter.updated
      },
      layout: ['page']
    };
  } catch (error) {
    console.error('工具页面生成器错误:', error);
    return;
  }
});

/**
 * 解析Front Matter配置
 * @param {string} content 文件内容
 * @returns {Object} Front Matter对象
 */
function parseFrontMatter(content) {
  let frontMatter = {};
  
  try {
    // 匹配Front Matter块
    const frontMatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (frontMatterMatch) {
      const frontMatterContent = frontMatterMatch[1];
      
      // 使用js-yaml解析完整的Front Matter内容
      const parsedFrontMatter = yaml.load(frontMatterContent);
      
      if (parsedFrontMatter) {
        frontMatter = parsedFrontMatter;
      }
    }
  } catch (error) {
    console.warn('Front Matter解析失败:', error);
  }
  
  return frontMatter;
}

/**
 * 生成工具页面的HTML内容
 * @param {Array} categories 分类数据
 * @returns {string} HTML内容
 */
function generateToolsPage(categories) {
  let contentHTML = `
<!-- 主布局容器 - 左右分栏布局 -->
<div class="tools-layout-container">

<!-- 左侧分类导航区域 -->
<div class="tools-categories-nav">
  <ul class="categories-list" id="categories-nav-list">
`;

  // 生成左侧导航
  categories.forEach((category, index) => {
    const isFirstCategory = index === 0;
    contentHTML += `
    <li class="category-nav-item">
      <a href="#${category.id}" class="category-nav-link ${isFirstCategory ? 'active' : ''}">${category.name}</a>
    </li>
`;
  });

  contentHTML += `
  </ul>
</div>

<!-- 右侧工具内容区域 -->
<div class="tools-content" id="tools-content">
`;

  // 生成工具内容
  categories.forEach((category, index) => {
    const isFirstCategory = index === 0;
    const categoryIndex = index + 1; // CSS变量从1开始
    
    contentHTML += `
  <div id="${category.id}" class="tools-category-section" style="--n: ${categoryIndex}">
    <div class="category-header-container">
      <h2 class="category-section-title">${category.name}</h2>
      <div class="subcategory-nav">
        <ul>
`;

    // 生成子分类导航
    category.subcategories.forEach((subcategory, subIndex) => {
      const isFirstSubcategory = subIndex === 0;
      contentHTML += `
          <li><button class="subcategory-btn ${isFirstSubcategory ? 'active' : ''}" data-subcategory="${subcategory.id}">${subcategory.name}</button></li>
`;
    });

    contentHTML += `
        </ul>
      </div>
    </div>
`;

    // 生成子分类内容
    category.subcategories.forEach((subcategory, subIndex) => {
      const isFirstSubcategory = subIndex === 0;
      contentHTML += `
    <div id="${subcategory.id}" class="subcategory-content ${isFirstSubcategory ? 'active' : ''}">
      <div class="tools-grid">
`;

      // 生成工具项
      subcategory.tools.forEach(tool => {
        contentHTML += `
        <a href="${tool.url}" class="tool-item" target="_blank" rel="noopener">
          <div class="tool-icon"><i class="iconfont ${tool.icon}"></i></div>
          <div class="tool-content">
            <h3 class="tool-name">${tool.name}</h3>
          </div>
        </a>
`;
      });

      contentHTML += `
      </div>
    </div>
`;
    });

    contentHTML += `
  </div>
`;
  });

  contentHTML += `
</div>

</div>

<!-- 加载工具交互脚本 -->
<!-- <script src="/js/subcategory-interaction.js"></script> -->
`;

  return contentHTML;
}
```

**生成器脚本核心功能：**

1. **注册生成器**: 使用 `hexo.extend.generator.register()` 注册自定义生成器
2. **配置解析**: 解析页面模板中的Front Matter配置
3. **HTML生成**: 根据配置数据动态生成HTML结构
4. **错误处理**: 完善的错误处理和日志记录

### 3. 样式文件

创建完整的CSS样式文件，定义页面的视觉表现：

```css
/**
 * 工具网格布局样式
 * 
 * 定义工具分类页面的整体布局和组件样式
 * 
 * 主要功能模块：
 * 1. 主布局系统 - 左右分栏布局
 * 2. 分类导航 - 左侧粘性导航栏
 * 3. 工具网格 - 4列响应式网格布局
 * 4. 子分类系统 - 子分类导航和内容切换
 * 5. 响应式设计 - 多设备适配
 * 6. 暗色模式支持 - 主题切换适配
 * 7. 动画效果 - 入场动画和交互反馈
 */

/* ===== 主布局样式 ===== */

/**
 * 工具布局容器
 * 采用左右分栏布局，左侧导航，右侧内容
 */
.tools-layout-container {
  display: flex;
  gap: 30px;
  margin: 40px 0;
  min-height: 600px;
}

/**
 * 左侧分类导航
 * 固定宽度1/6，支持粘性定位和滚动
 */
.tools-categories-nav {
  flex: 1;
  max-width: 16.67%;
  background: var(--board-color);
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 80px; /* 距离顶部80px开始冻结 */
  height: fit-content;
  margin-left: -5px;
  margin-right: 5px;
  z-index: 1;
  max-height: calc(100vh - 120px); /* 限制最大高度 */
  overflow-y: auto; /* 内容过多时可滚动 */
}

.categories-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-nav-item {
  margin-bottom: 8px;
}

.category-nav-link {
  display: block;
  padding: 8px 12px;
  background: var(--body-bg-color);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  font-size: 0.95em;
  transition: all 0.3s ease;
  border: 1px solid var(--line-color);
  white-space: nowrap; /* 防止文字换行 */
  text-align: center;
}

.category-nav-link:hover,
.category-nav-link.active {
  background: var(--link-hover-bg-color);
  color: #3c4858;
  border-color: #3c4858;
}

.category-nav-link.active {
  font-weight: 600;
}

/**
 * 右侧工具内容区域
 * 占据5/6宽度，支持滚动边距
 */
.tools-content {
  flex: 5;
  max-width: 83.33%;
  scroll-margin-top: 80px; /* 与左侧导航冻结位置保持一致 */
}

/* ===== 分类区域样式 ===== */

.tools-category-section {
  background: transparent;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--line-color);
  margin-bottom: 16px;
  scroll-margin-top: 80px;
  isolation: isolate; /* 创建新的堆叠上下文 */
  animation: fadeInUp 0.6s ease forwards; /* 入场动画 */
}

.category-header-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 16px;
  gap: 16px;
  flex-wrap: wrap;
}

.category-section-title {
  font-size: 1.1em;
  font-weight: 700;
  color: var(--post-heading-color);
  padding: 8px 16px;
  margin: 0;
  flex-shrink: 0;
}

/* ===== 工具网格样式 ===== */

/**
 * 工具网格布局
 * 4列网格布局，支持响应式调整
 */
.tools-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

/**
 * 工具项卡片
 * 统一高度和样式的工具卡片
 */
.tool-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  background: transparent;
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s ease;
  border: 1px solid var(--line-color);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-align: left;
  height: 40px; /* 统一卡片高度 */
  min-height: 40px; /* 确保最小高度一致 */
  z-index: 1;
  position: relative; /* 为悬停箭头提供定位上下文 */
}

.tool-item:hover {
  background: var(--link-hover-bg-color);
  border-color: #3c4858;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding-right: 24px; /* 为箭头留出空间 */
}

/**
 * 工具图标样式
 */
.tool-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 1.5em;
  color: #3c4858;
  min-width: 24px;
}

.tool-content {
  flex: 1;
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: static;
}

.tool-name {
  font-size: 0.85em;
  font-weight: 600;
  margin: 0;
  color: var(--post-heading-color);
  line-height: 1.2;
  text-align: left;
}

/**
 * 工具卡片悬停时显示箭头
 */
.tool-item:hover::after {
  content: '➔';
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #3c4858;
  font-weight: normal;
  font-size: 1.1em;
  opacity: 0.8;
  transition: all 0.3s ease;
}

/* ===== 子分类导航样式 ===== */

.subcategory-nav {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--body-bg-color);
  border-radius: 8px;
  border: 1px solid var(--line-color);
  margin: 0;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  height: 42px; /* 统一高度 */
  min-height: 42px; /* 确保最小高度一致 */
  z-index: 1;
  position: relative;
  isolation: isolate; /* 创建独立的堆叠上下文 */
}

.subcategory-nav ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.subcategory-nav ul::-webkit-scrollbar {
  display: none;
}

.subcategory-btn {
  padding: 6px 12px;
  background: transparent;
  border: none;
  border-radius: 0;
  color: var(--text-color);
  font-size: 0.85em;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  flex-shrink: 0;
}

.subcategory-btn:hover {
  background: transparent;
  color: #3c4858;
  transform: translateY(-1px);
}

.subcategory-btn.active {
  background: var(--link-hover-bg-color);
  color: #3c4858;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.subcategory-content {
  display: none;
  animation: fadeInUp 0.4s ease forwards;
}

.subcategory-content.active {
  display: block;
}

/* ===== 响应式设计 ===== */

/**
 * 平板设备适配 (1024px及以下)
 */
@media (max-width: 1024px) {
  .tools-layout-container {
    flex-direction: column;
    gap: 20px;
  }
  
  .tools-categories-nav,
  .tools-content {
    max-width: 100%;
  }
  
  .tools-categories-nav {
    position: static;
  }
  
  .categories-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 10px;
  }
  
  .category-nav-item {
    margin-bottom: 0;
  }
}

/**
 * 移动设备适配 (768px及以下)
 */
@media (max-width: 768px) {
  .tools-layout-container {
    margin: 30px 0;
    gap: 16px;
  }
  
  .tools-categories-nav,
  .tools-category-section {
    padding: 16px;
  }
  
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .tool-item {
    padding: 6px;
    gap: 6px;
  }
  
  .tool-icon {
    margin-right: 8px;
    font-size: 1.2em;
    min-width: 20px;
  }
}

/**
 * 小屏幕设备适配 (480px及以下)
 */
@media (max-width: 480px) {
  .tools-categories-nav,
  .tools-category-section {
    padding: 12px;
  }
  
  .tool-item {
    padding: 8px;
    flex-direction: row;
    text-align: left;
    gap: 8px;
  }
  
  .tool-icon {
    margin-right: 0;
    width: 18px;
    height: 18px;
    font-size: 0.9em;
  }
  
  .categories-list {
    grid-template-columns: 1fr;
  }
  
  .tools-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
}

/* ===== 暗色模式支持 ===== */

[data-user-color-scheme="dark"] .tools-categories-nav,
[data-user-color-scheme="dark"] .tools-category-section {
  background: var(--board-color-dark);
  border-color: var(--line-color-dark);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

[data-user-color-scheme="dark"] .category-nav-link,
[data-user-color-scheme="dark"] .tool-item {
  background: transparent;
  border-color: var(--line-color-dark);
}

[data-user-color-scheme="dark"] .tools-category-section:hover,
[data-user-color-scheme="dark"] .tools-categories-nav:hover {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
}

[data-user-color-scheme="dark"] .category-section-title,
[data-user-color-scheme="dark"] .tool-name {
  color: var(--post-heading-color-dark);
}

[data-user-color-scheme="dark"] .subcategory-nav {
  background: var(--body-bg-color-dark);
  border-color: var(--line-color-dark);
}

[data-user-color-scheme="dark"] .subcategory-btn {
  background: transparent;
  border-color: transparent;
  color: var(--text-color-dark);
}

[data-user-color-scheme="dark"] .subcategory-btn:hover {
  background: transparent;
  color: var(--post-heading-color-dark);
}

[data-user-color-scheme="dark"] .subcategory-btn.active {
  background: var(--link-hover-bg-color-dark);
  border-color: var(--post-heading-color-dark);
  color: var(--post-heading-color-dark);
}

/* ===== 动画效果 ===== */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/**
 * 灵活动画延迟系统
 * 
 * 使用CSS变量和calc()函数实现动态动画延迟
 * 支持无限数量的分类，无需手动添加CSS规则
 * 
 * 实现原理：
 * - 每个分类区域设置 --n CSS变量表示索引
 * - 使用 calc(0.1s * (var(--n) - 1)) 计算延迟时间
 * - 第一个分类延迟0s，第二个0.1s，第三个0.2s，依此类推
 * 
 * 优势：
 * - 无需为每个分类手动编写CSS规则
 * - 支持任意数量的分类
 * - 易于维护和扩展
 * - 与生成器脚本完美配合
 */
.tools-category-section:nth-child(n) {
  animation-delay: calc(0.1s * (var(--n) - 1));
}

/**
 * 默认CSS变量值
 * 确保在没有动态设置时也有合理的默认行为
 */
.tools-category-section {
  --n: 1; /* 默认值 */
}
```

**样式文件核心特性：**

1. **现代布局系统**：
   - 使用Flexbox和CSS Grid实现响应式布局
   - 左右分栏设计，左侧导航粘性定位
   - 4列工具网格，支持多设备适配

2. **交互反馈**：
   - 悬停状态显示箭头指示器
   - 平滑过渡动画增强用户体验
   - 活跃状态视觉突出

3. **响应式设计**：
   - 平板设备：切换为垂直布局，2列网格
   - 移动设备：进一步优化间距和尺寸
   - 小屏幕：单列导航，紧凑布局

4. **主题支持**：
   - 完整的暗色模式适配
   - 使用CSS变量确保主题一致性
   - 平滑的主题切换效果

5. **动画效果**：
   - 淡入上浮入场动画
   - 渐进式动画延迟
   - 平滑的状态切换

### 4. 交互脚本

创建JavaScript交互脚本，处理页面的动态功能：

```javascript
/**
 * 工具页面交互功能
 * 
 * 主要功能：
 * 1. 分类导航点击处理
 * 2. 滚动状态更新
 * 3. 子分类切换功能
 * 4. 响应式行为适配
 * 
 * 设计原则：
 * - 渐进增强：基础功能在无JavaScript时仍可用
 * - 性能优化：使用事件委托和防抖技术
 * - 用户体验：提供流畅的交互反馈
 */

// 等待DOM完全加载后初始化
document.addEventListener('DOMContentLoaded', function() {
  initializeInteraction();
});

/**
 * 初始化所有交互功能
 */
function initializeInteraction() {
  // 初始化分类导航交互
  initializeCategoryNavigation();
  
  // 初始化子分类切换
  initializeSubcategorySwitching();
  
  // 初始化滚动监听
  initializeScrollObserver();
  
  // 初始化响应式行为
  initializeResponsiveBehavior();
}

/**
 * 初始化分类导航交互
 * 处理左侧导航点击和滚动状态更新
 */
function initializeCategoryNavigation() {
  const categoryLinks = document.querySelectorAll('.category-nav-link');
  const categorySections = document.querySelectorAll('.tools-category-section');
  
  // 为每个分类链接添加点击事件
  categoryLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // 平滑滚动到目标分类
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // 更新活跃状态
        updateActiveCategory(this);
      }
    });
  });
  
  // 使用Intersection Observer监听分类区域可见性
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeLink = document.querySelector(`.category-nav-link[href="#${entry.target.id}"]`);
        if (activeLink) {
          updateActiveCategory(activeLink);
        }
      }
    });
  }, observerOptions);
  
  // 观察所有分类区域
  categorySections.forEach(section => {
    sectionObserver.observe(section);
  });
}

/**
 * 更新活跃的分类导航项
 * @param {HTMLElement} activeLink 当前活跃的链接
 */
function updateActiveCategory(activeLink) {
  // 移除所有活跃状态
  document.querySelectorAll('.category-nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  // 添加新的活跃状态
  activeLink.classList.add('active');
}

/**
 * 初始化子分类切换功能
 * 处理子分类按钮点击和内容显示
 */
function initializeSubcategorySwitching() {
  const subcategoryButtons = document.querySelectorAll('.subcategory-btn');
  
  // 使用事件委托处理子分类按钮点击
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('subcategory-btn')) {
      const button = e.target;
      const subcategoryId = button.getAttribute('data-subcategory');
      const parentCategory = button.closest('.tools-category-section');
      
      if (parentCategory && subcategoryId) {
        // 切换子分类显示
        switchSubcategory(parentCategory, subcategoryId, button);
      }
    }
  });
}

/**
 * 切换子分类显示
 * @param {HTMLElement} parentCategory 父级分类容器
 * @param {string} subcategoryId 子分类ID
 * @param {HTMLElement} activeButton 当前点击的按钮
 */
function switchSubcategory(parentCategory, subcategoryId, activeButton) {
  // 获取所有子分类内容和按钮
  const subcategoryContents = parentCategory.querySelectorAll('.subcategory-content');
  const subcategoryButtons = parentCategory.querySelectorAll('.subcategory-btn');
  
  // 隐藏所有子分类内容
  subcategoryContents.forEach(content => {
    content.classList.remove('active');
  });
  
  // 移除所有按钮的活跃状态
  subcategoryButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // 显示目标子分类内容
  const targetContent = parentCategory.querySelector(`#${subcategoryId}`);
  if (targetContent) {
    targetContent.classList.add('active');
  }
  
  // 设置当前按钮为活跃状态
  activeButton.classList.add('active');
}

/**
 * 初始化滚动监听
 * 优化滚动性能和用户体验
 */
function initializeScrollObserver() {
  // 使用防抖技术优化滚动性能
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // 在滚动停止后执行的操作
      updateStickyNavigation();
    }, 100);
  });
}

/**
 * 更新粘性导航状态
 * 根据滚动位置调整导航栏行为
 */
function updateStickyNavigation() {
  const nav = document.querySelector('.tools-categories-nav');
  if (!nav) return;
  
  // 根据滚动位置调整导航栏样式
  const scrollY = window.scrollY;
  if (scrollY > 100) {
    nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
  } else {
    nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  }
}

/**
 * 初始化响应式行为
 * 处理不同屏幕尺寸下的特殊行为
 */
function initializeResponsiveBehavior() {
  // 监听窗口大小变化
  window.addEventListener('resize', debounce(() => {
    handleResponsiveLayout();
  }, 250));
  
  // 初始调用
  handleResponsiveLayout();
}

/**
 * 处理响应式布局调整
 */
function handleResponsiveLayout() {
  const isMobile = window.innerWidth <= 768;
  const nav = document.querySelector('.tools-categories-nav');
  
  if (nav) {
    if (isMobile) {
      // 移动端：取消粘性定位
      nav.style.position = 'static';
      nav.style.maxHeight = 'none';
    } else {
      // 桌面端：恢复粘性定位
      nav.style.position = 'sticky';
      nav.style.maxHeight = 'calc(100vh - 120px)';
    }
  }
}

/**
 * 防抖函数
 * @param {Function} func 要防抖的函数
 * @param {number} wait 等待时间
 * @returns {Function} 防抖后的函数
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// 导出函数供其他模块使用（如果使用模块系统）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initializeInteraction,
    initializeCategoryNavigation,
    initializeSubcategorySwitching
  };
}
```

**交互脚本核心功能：**

1. **分类导航**：
   - 平滑滚动到目标分类
   - 自动更新活跃状态
   - 使用Intersection Observer优化性能

2. **子分类切换**：
   - 动态显示/隐藏子分类内容
   - 按钮状态管理
   - 事件委托优化性能

3. **滚动优化**：
   - 防抖技术减少滚动事件触发频率
   - 动态调整导航栏样式
   - 响应式粘性定位

4. **响应式适配**：
   - 窗口大小变化监听
   - 移动端布局调整
   - 性能优化处理

## 部署和使用

### 1. 文件结构

确保项目具有正确的文件结构：

```
hexo-blog/
├── scripts/
│   └── tools-generator.js
├── source/
│   ├── css/
│   │   └── tools-grid.css
│   ├── js/
│   │   └── subcategory-interaction.js
│   └── oneself/
│       └── index.md
└── _config.yml
```

### 2. 安装依赖

确保已安装必要的Node.js依赖：

```bash
npm install js-yaml
# 或者使用pnpm
pnpm add js-yaml
```

### 3. 构建和部署

使用标准的Hexo命令构建和部署：

```bash
# 清理缓存
hexo clean

# 生成静态文件
hexo generate

# 启动本地服务器测试
hexo server

# 部署到服务器
hexo deploy
```

### 4. 自定义配置

可以根据需要修改以下配置：

- **工具数据**：在 `source/oneself/index.md` 的Front Matter中修改 `tools_config`
- **样式主题**：在 `source/css/tools-grid.css` 中调整颜色和布局
- **交互行为**：在 `source/js/subcategory-interaction.js` 中自定义交互逻辑

## 最佳实践

### 1. 性能优化

- **代码分割**：将CSS和JS文件分开加载
- **懒加载**：对图片和资源使用懒加载
- **缓存策略**：合理设置缓存头

### 2. 可访问性

- **键盘导航**：确保所有功能支持键盘操作
- **屏幕阅读器**：添加适当的ARIA标签
- **颜色对比**：确保文字和背景有足够的对比度

### 3. 浏览器兼容性

- **渐进增强**：确保基础功能在所有浏览器中可用
- **特性检测**：使用现代浏览器特性时进行检测
- **回退方案**：为不支持的功能提供替代方案

### 4. 维护性

- **模块化设计**：保持代码的模块化和可复用性
- **文档注释**：为重要函数添加详细的注释
- **错误处理**：完善的错误处理和日志记录

## 总结

本教程详细介绍了如何在Hexo博客中创建功能完整的个性化工具页面。通过四个核心文件的协同工作，实现了：

1. **配置集中管理**：将工具数据集成到页面Front Matter中
2. **静态生成优化**：使用Hexo生成器在构建时生成页面
3. **现代化设计**：采用响应式布局和丰富的交互效果
4. **完整的功能**：包含分类导航、子分类切换、暗色模式等特性
5. **灵活动画系统**：使用CSS变量和calc()函数实现动态动画延迟，支持无限分类数量

**关键技术亮点：**

- **CSS变量动画延迟**：使用 `calc(0.1s * (var(--n) - 1))` 实现动态动画延迟，无需为每个分类手动编写CSS规则
- **生成器脚本集成**：在生成HTML时为每个分类区域设置CSS变量值 `--n`
- **无限扩展性**：支持任意数量的分类，不受CSS规则数量限制
- **性能优化**：使用Intersection Observer和事件委托技术提升交互性能

这个解决方案不仅功能强大，而且具有良好的可维护性和扩展性，可以根据具体需求进行定制和扩展。

通过本教程的学习，你应该能够：
- 理解Hexo生成器的工作原理
- 掌握现代CSS布局技术
- 实现复杂的JavaScript交互功能
- 创建专业级的静态网站页面
- 使用CSS变量和calc()函数实现动态样式
- 优化动画性能和用户体验

希望这个教程对你的项目开发有所帮助！
