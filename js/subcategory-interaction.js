/**
 * 子分类交互系统 - 修复版
 * 修复了 data-subcategory 和 data-target 不匹配的问题
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('子分类系统初始化...');
    
    // 获取所有子分类按钮
    const subcategoryBtns = document.querySelectorAll('.subcategory-btn');
    console.log('找到子分类按钮数量:', subcategoryBtns.length);
    
    // 为每个按钮添加点击事件
    subcategoryBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 获取目标子分类ID - 使用 data-subcategory
            const targetId = this.getAttribute('data-subcategory');
            console.log('点击子分类按钮:', targetId);
            
            if (!targetId) {
                console.error('按钮缺少 data-subcategory 属性');
                return;
            }
            
            // 获取当前分类区域
            const categorySection = this.closest('.tools-category-section');
            if (!categorySection) {
                console.error('找不到父级分类区域');
                return;
            }
            
            // 移除同组其他按钮的 active 状态
            const siblingBtns = categorySection.querySelectorAll('.subcategory-btn');
            siblingBtns.forEach(function(b) {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            
            // 添加当前按钮的 active 状态
            this.classList.add('active');
            this.setAttribute('aria-pressed', 'true');
            
            // 隐藏同组所有子分类内容
            const allSubContents = categorySection.querySelectorAll('.subcategory-content');
            allSubContents.forEach(function(content) {
                content.classList.remove('active');
                content.style.display = 'none';
            });
            
            // 显示目标子分类内容 - 通过 ID 选择器
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
                targetContent.style.display = 'block';
                console.log('显示子分类内容:', targetId);
                
                // 添加淡入动画
                targetContent.style.opacity = '0';
                targetContent.style.transform = 'translateY(20px)';
                
                requestAnimationFrame(function() {
                    targetContent.style.transition = 'all 0.4s ease';
                    targetContent.style.opacity = '1';
                    targetContent.style.transform = 'translateY(0)';
                });
            } else {
                console.error('找不到目标子分类内容:', targetId);
            }
        });
    });
    
    // 默认激活每个分类区域的第一个子分类
    const categorySections = document.querySelectorAll('.tools-category-section');
    categorySections.forEach(function(section) {
        const firstBtn = section.querySelector('.subcategory-btn');
        const firstContent = section.querySelector('.subcategory-content');
        
        if (firstBtn && firstContent) {
            firstBtn.classList.add('active');
            firstBtn.setAttribute('aria-pressed', 'true');
            firstContent.classList.add('active');
            firstContent.style.display = 'block';
            console.log('默认激活第一个子分类:', firstBtn.getAttribute('data-subcategory'));
        }
    });
    
    console.log('子分类系统初始化完成');
});

// 添加 CSS 动画关键帧
(function() {
    if (!document.getElementById('subcategory-animations')) {
        const style = document.createElement('style');
        style.id = 'subcategory-animations';
        style.textContent = `
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
            
            .subcategory-content {
                transition: opacity 0.4s ease, transform 0.4s ease;
            }
            
            .subcategory-content.active {
                animation: fadeInUp 0.4s ease forwards;
            }
        ';
        document.head.appendChild(style);
    }
})();
