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
