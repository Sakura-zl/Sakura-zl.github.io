/**
 * 工具分类页面交互功能模块
 * 处理工具分类页面的交互功能
 * 
 * 主要功能：
 * 1. 分类导航点击滚动和活跃状态管理
 * 2. 滚动时自动更新导航活跃状态
 * 3. 子分类内容切换功能
 * 
 * 注意：页面内容已在 hexo generate 时静态生成
 */

/**
 * 初始化交互功能
 */
function initializeInteraction() {
  // 获取DOM元素
  const navLinks = document.querySelectorAll('.category-nav-link');
  const sections = document.querySelectorAll('.tools-category-section');
  const subcategoryBtns = document.querySelectorAll('.subcategory-btn');

  /**
   * 处理分类导航点击事件
   * 平滑滚动到对应分类并更新活跃状态
   * 
   * @param {Event} e - 点击事件对象
   */
  function handleNavClick(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // 更新导航活跃状态
      navLinks.forEach(link => link.classList.remove('active'));
      this.classList.add('active');
      
      // 平滑滚动到目标分类
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  /**
   * 更新导航活跃状态基于滚动位置
   * 根据当前可见的分类区域高亮对应的导航链接
   */
  function updateActiveNav() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // 偏移量确保更好的可见性
      const sectionHeight = section.clientHeight;
      
      // 检查当前滚动位置是否在分类区域内
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // 更新导航链接活跃状态
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  /**
   * 处理子分类按钮点击事件
   * 切换显示对应的子分类内容
   */
  function handleSubcategoryClick() {
    const parentSection = this.closest('.tools-category-section');
    const subcategoryId = this.getAttribute('data-subcategory');
    
    if (!parentSection || !subcategoryId) return;
    
    // 更新子分类按钮活跃状态
    const allButtons = parentSection.querySelectorAll('.subcategory-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    
    // 显示对应的子分类内容
    const allContents = parentSection.querySelectorAll('.subcategory-content');
    allContents.forEach(content => content.classList.remove('active'));
    
    const targetContent = parentSection.querySelector(`#${subcategoryId}`);
    if (targetContent) {
      targetContent.classList.add('active');
    }
  }

  // 绑定事件监听器
  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
  });
  
  subcategoryBtns.forEach(button => {
    button.addEventListener('click', handleSubcategoryClick);
  });
  
  // 监听滚动事件更新导航状态
  window.addEventListener('scroll', updateActiveNav);
}

// 页面加载完成后启动
document.addEventListener('DOMContentLoaded', function() {
  // 页面内容已在生成时静态渲染，直接初始化交互功能
  initializeInteraction();
});
