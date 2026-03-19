/**
 * 工具页面简化版交互脚本
 * 最简化的实现，确保基本功能可用
 */

(function() {
    'use strict';
    
    console.log('[Tools] 脚本开始加载');
    
    // 等待DOM加载完成
    function init() {
        console.log('[Tools] DOM已加载，初始化...');
        
        // 获取所有按钮
        var buttons = document.querySelectorAll('.subcategory-btn');
        console.log('[Tools] 找到按钮数量:', buttons.length);
        
        // 为每个按钮绑定点击事件
        buttons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var targetId = this.getAttribute('data-subcategory');
                console.log('[Tools] 点击按钮，目标:', targetId);
                
                if (!targetId) return;
                
                // 获取当前分类区域
                var section = this.closest('.tools-category-section');
                if (!section) return;
                
                // 更新按钮状态
                var siblingButtons = section.querySelectorAll('.subcategory-btn');
                siblingButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                
                // 隐藏所有内容
                var contents = section.querySelectorAll('.subcategory-content');
                contents.forEach(function(content) {
                    content.style.display = 'none';
                    content.classList.remove('active');
                });
                
                // 显示目标内容
                var targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    targetContent.classList.add('active');
                    console.log('[Tools] 已显示内容:', targetId);
                } else {
                    console.error('[Tools] 找不到目标内容:', targetId);
                }
            });
        });
        
        console.log('[Tools] 初始化完成');
    }
    
    // 确保DOM已加载
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();
