/**
 * 工具页面调试脚本
 */

console.log('=== 工具页面调试信息 ===');
console.log('页面URL:', window.location.href);
console.log('文档加载状态:', document.readyState);

// 检查关键元素
const subcategoryBtns = document.querySelectorAll('.subcategory-btn');
const subcategoryContents = document.querySelectorAll('.subcategory-content');
const categorySections = document.querySelectorAll('.tools-category-section');

console.log('找到子分类按钮数量:', subcategoryBtns.length);
console.log('找到子分类内容数量:', subcategoryContents.length);
console.log('找到分类区域数量:', categorySections.length);

// 列出所有按钮
subcategoryBtns.forEach((btn, index) => {
    console.log(`按钮 ${index}:`, btn.textContent, 'data-subcategory:', btn.getAttribute('data-subcategory'));
});

// 列出所有内容区域
subcategoryContents.forEach((content, index) => {
    console.log(`内容 ${index}:`, content.id, 'class:', content.className);
});

// 测试点击第一个按钮
if (subcategoryBtns.length > 0) {
    console.log('准备测试点击第一个按钮...');
    setTimeout(() => {
        console.log('模拟点击第二个按钮（如果存在）');
        if (subcategoryBtns[1]) {
            subcategoryBtns[1].click();
            console.log('已触发点击');
        }
    }, 2000);
}

console.log('=== 调试信息结束 ===');
