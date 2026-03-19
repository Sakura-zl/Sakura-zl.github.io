// 工具页面导航脚本 - 简化版
(function() {
  'use strict';
  
  console.log('[ToolsNav] 脚本加载');
  
  // 等待DOM加载
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  
  function init() {
    console.log('[ToolsNav] 初始化开始');
    
    // 获取所有按钮
    var buttons = document.querySelectorAll('.subcategory-btn');
    console.log('[ToolsNav] 找到按钮数量:', buttons.length);
    
    if (buttons.length === 0) {
      console.log('[ToolsNav] 没有按钮，退出');
      return;
    }
    
    // 绑定点击事件
    buttons.forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var targetId = this.getAttribute('data-subcategory');
        console.log('[ToolsNav] 点击按钮:', targetId);
        
        if (!targetId) {
          console.log('[ToolsNav] 没有目标ID');
          return;
        }
        
        // 获取当前分类区域
        var section = this.closest('.tools-category-section');
        if (!section) {
          console.log('[ToolsNav] 找不到分类区域');
          return;
        }
        
        // 更新按钮状态
        var siblingBtns = section.querySelectorAll('.subcategory-btn');
        siblingBtns.forEach(function(b) {
          b.classList.remove('active');
          b.style.background = '';
          b.style.color = '';
        });
        
        this.classList.add('active');
        this.style.background = '#ff69b4';
        this.style.color = '#fff';
        
        // 隐藏所有内容
        var allContents = section.querySelectorAll('.subcategory-content');
        allContents.forEach(function(content) {
          content.style.display = 'none';
          content.classList.remove('active');
        });
        
        // 显示目标内容
        var targetContent = document.getElementById(targetId);
        if (targetContent) {
          targetContent.style.display = 'block';
          targetContent.classList.add('active');
          targetContent.style.opacity = '0';
          
          setTimeout(function() {
            targetContent.style.transition = 'opacity 0.3s';
            targetContent.style.opacity = '1';
          }, 10);
          
          console.log('[ToolsNav] 已显示内容:', targetId);
        } else {
          console.log('[ToolsNav] 找不到目标内容:', targetId);
        }
      });
    });
    
    console.log('[ToolsNav] 初始化完成');
  }
})();
