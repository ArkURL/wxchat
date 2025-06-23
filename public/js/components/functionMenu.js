// 功能菜单组件 - 微信风格功能选项弹出层
// 提供Web端适用的功能选项界面框架

const FunctionMenu = {
    // 菜单配置 - 简化版，专注AI功能
    menuItems: [
        {
            id: 'ai',
            icon: '🤖',
            title: 'AI对话',
            action: 'ai'
        },
        {
            id: 'file',
            icon: '📁',
            title: '文件',
            action: 'file'
        },
        {
            id: 'emoji',
            icon: '😊',
            title: '表情',
            action: 'emoji'
        },
        {
            id: 'clear-chat',
            icon: '🗑️',
            title: '清空聊天',
            action: 'clearChat'
        }
    ],

    // 组件状态
    isInitialized: false,

    // 初始化菜单
    init() {
        if (this.isInitialized) {
            console.log('FunctionMenu: 已经初始化过了');
            return;
        }

        console.log('FunctionMenu: 开始初始化');
        this.createMenuElement();
        this.bindEvents();
        this.isInitialized = true;
        console.log('FunctionMenu: 初始化完成');
    },

    // 创建菜单DOM元素
    createMenuElement() {
        // 检查是否已存在
        const existingMenu = document.getElementById('functionMenu');
        if (existingMenu) {
            console.log('FunctionMenu: 菜单元素已存在');
            return;
        }

        console.log('FunctionMenu: 创建菜单元素');
        const menuHTML = `
            <div class="function-menu" id="functionMenu">
                <div class="function-menu-overlay"></div>
                <div class="function-menu-content">
                    <div class="function-menu-header">
                        <h3>更多功能</h3>
                        <button class="function-menu-close" id="functionMenuClose">
                            <svg viewBox="0 0 24 24" width="16" height="16">
                                <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="function-menu-grid">
                        ${this.generateMenuItems()}
                    </div>
                </div>
            </div>
        `;

        // 插入到body中
        document.body.insertAdjacentHTML('beforeend', menuHTML);
        console.log('FunctionMenu: 菜单元素创建完成');
    },

    // 生成菜单项HTML - 微信风格
    generateMenuItems() {
        return this.menuItems.map(item => `
            <div class="function-menu-item" data-action="${item.action}" data-id="${item.id}">
                <div class="function-menu-item-icon">${item.icon}</div>
                <div class="function-menu-item-content">
                    <div class="function-menu-item-title">${item.title}</div>
                </div>
            </div>
        `).join('');
    },

    // 绑定事件
    bindEvents() {
        // 菜单项点击事件
        document.addEventListener('click', (e) => {
            const menuItem = e.target.closest('.function-menu-item');
            if (menuItem) {
                const action = menuItem.dataset.action;
                const itemId = menuItem.dataset.id;
                this.handleMenuItemClick(action, itemId);
            }
        });

        // 关闭按钮事件
        document.addEventListener('click', (e) => {
            if (e.target.closest('#functionMenuClose')) {
                this.hide();
            }
        });

        // 遮罩层点击关闭
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('function-menu-overlay')) {
                this.hide();
            }
        });
    },

    // 处理菜单项点击
    handleMenuItemClick(action, itemId) {
        // 分发自定义事件
        const event = new CustomEvent('functionMenu:itemClick', {
            detail: { action, itemId }
        });
        document.dispatchEvent(event);

        // 执行对应的动作
        this.executeAction(action, itemId);
        
        // 关闭菜单
        this.hide();
    },

    // 执行功能动作 - 简化版
    executeAction(action, itemId) {
        switch (action) {
            case 'ai':
                this.handleAI();
                break;
            case 'file':
                this.handleFile();
                break;
            case 'emoji':
                this.handleEmoji();
                break;
            case 'clearChat':
                this.handleClearChat();
                break;
            default:
                console.log(`未实现的功能: ${action}`);
                this.showComingSoon(action);
        }
    },

    // AI对话功能
    handleAI() {
        console.log('启动AI对话功能');
        // 触发AI对话模式事件
        const event = new CustomEvent('functionMenu:itemClick', {
            detail: { action: 'ai', mode: 'start' }
        });
        document.dispatchEvent(event);
    },

    // 文件功能
    handleFile() {
        // 触发文件选择
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.accept = '*/*';
            fileInput.click();
        } else {
            this.showComingSoon('文件');
        }
    },

    // 表情功能
    handleEmoji() {
        const emojis = ['😊', '👍', '❤️', '😂', '🎉', '👏', '🔥', '💯', '🥰', '😍', '🤔', '😅'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        this.insertTextToInput(randomEmoji);
    },

    // 清空聊天功能
    handleClearChat() {
        if (confirm('确定要清空所有聊天记录吗？')) {
            // 触发清空聊天事件
            const event = new CustomEvent('functionMenu:clearChat');
            document.dispatchEvent(event);
        }
    },

    // 显示即将推出提示
    showComingSoon(feature) {
        this.insertTextToInput(`🚧 ${feature}功能即将推出，敬请期待！`);
    },

    // 向输入框插入文本
    insertTextToInput(text) {
        const messageText = document.getElementById('messageText');
        if (!messageText) return;

        const currentValue = messageText.value;
        const cursorPos = messageText.selectionStart;
        
        const newValue = currentValue.slice(0, cursorPos) + text + currentValue.slice(cursorPos);
        messageText.value = newValue;
        
        // 设置光标位置
        const newCursorPos = cursorPos + text.length;
        messageText.setSelectionRange(newCursorPos, newCursorPos);
        
        // 触发input事件以更新UI状态
        messageText.dispatchEvent(new Event('input', { bubbles: true }));
        
        // 聚焦输入框
        messageText.focus();
    },

    // 显示菜单
    show() {
        const menu = document.getElementById('functionMenu');
        if (menu) {
            console.log('FunctionMenu: 显示菜单');
            menu.classList.add('show');
        } else {
            console.error('FunctionMenu: 无法显示菜单，元素不存在');
        }
    },

    // 隐藏菜单
    hide() {
        const menu = document.getElementById('functionMenu');
        if (menu) {
            console.log('FunctionMenu: 隐藏菜单');
            menu.classList.remove('show');
        } else {
            console.error('FunctionMenu: 无法隐藏菜单，元素不存在');
        }
    },

    // 添加自定义菜单项
    addMenuItem(item) {
        this.menuItems.push(item);
        if (this.isInitialized) {
            this.refreshMenu();
        }
    },

    // 刷新菜单
    refreshMenu() {
        const menuGrid = document.querySelector('.function-menu-grid');
        if (menuGrid) {
            menuGrid.innerHTML = this.generateMenuItems();
        }
    }
};

// 导出组件
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FunctionMenu;
}
