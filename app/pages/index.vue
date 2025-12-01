<template>
    <div id="app">
        <!-- 导航栏 -->
        <div class="navigation flex align-center justify-between">
            <div class="logo flex align-center">
                <img src="/img/logo.png" alt="" class="logo-img">
                <div class="logo-text">LOONOOL</div>
            </div>
            <!-- 导航栏菜单 -->
            <div class="naviga-menu flex align-center">
                <!-- <div @click="navigaJump('home')" class="menu-text" :class="{ 'menu-active': activeMenu == 'home' }">
                    首页
                </div> -->
                  <div @click="navigaJump('ReviewSpace')" class="menu-text" :class="{ 'menu-active': activeMenu == 'ReviewSpace' }">
                    创建空间
                </div>
                <div @click="navigaJump('AiTool')" class="menu-text"
                    :class="{ 'menu-active': activeMenu === 'AiTool' }">
                    检测查重
                </div>
                <div @click="navigaJump('historical')" class="menu-text"
                    :class="{ 'menu-active': activeMenu == 'historical' }">
                    历史结果
                </div>
                <div @click="navigaJump('problem')" class="menu-text"
                    :class="{ 'menu-active': activeMenu == 'problem' }">
                    帮助中心
                </div>
            </div>
            <!-- 登录按钮 -->
            <div class="naviga-button flex align-center">
                <div class="flex align-center">
                    <div class="loin m-r-10 text-bold-500" @click="loginOpen('login')">登录</div>
                    <div class="sign text-bold-500" @click="loginOpen('register')">注册</div>
                </div>
            </div>
            <!-- 手机端汉堡菜单按钮 -->
            <div class="mobile-menu-btn" @click="toggleMobileMenu">
                <span class="hamburger-line" :class="{ 'active': mobileMenuOpen }"></span>
                <span class="hamburger-line" :class="{ 'active': mobileMenuOpen }"></span>
                <span class="hamburger-line" :class="{ 'active': mobileMenuOpen }"></span>
            </div>
        </div>
        <!-- 手机端侧边栏菜单 -->
        <div class="mobile-menu-overlay" :class="{ 'active': mobileMenuOpen }" @click="toggleMobileMenu"></div>
        <div class="mobile-menu" :class="{ 'active': mobileMenuOpen }">
            <div class="mobile-menu-header">
                <div class="logo flex align-center">
                    <img src="/img/logo.png" alt="" class="logo-img">
                    <div class="logo-text">LOONOOL</div>
                </div>
                <div class="close-btn" @click="toggleMobileMenu">×</div>
            </div>
            <div class="mobile-menu-content">
                <!-- <div @click="handleMobileMenuClick('home')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu == 'home' }">
                    首页
                </div> -->
                <div @click="handleMobileMenuClick('ReviewSpace')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu == 'ReviewSpace' }">
                    创建空间
                </div>
                <div @click="handleMobileMenuClick('AiTool')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu === 'AiTool' }">
                    检测查重
                </div>
                <div @click="handleMobileMenuClick('historical')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu == 'historical' }">
                    历史结果
                </div>
                <div @click="handleMobileMenuClick('problem')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu == 'problem' }">
                    了解更多
                </div>
            </div>
            <div class="mobile-menu-footer">
                <div class="mobile-login-btn" @click="handleMobileLogin('login')">登录</div>
                <div class="mobile-register-btn" @click="handleMobileLogin('register')">注册</div>
            </div>
        </div>
        <component :is="component"> </component>
    </div>

    <el-dialog v-model="loginVisible" :title="curretnTitle" :width="dialogWidth" 
        :class="['login-dialog', curretnDialog === 'register' ? 'register-dialog' : '']"
        :close-on-click-modal="false" :show-close="true">
        <el-form ref="formRef" :label-position="top" label-width="auto" :model="formLabelAlign" style="max-width: 600px"
            :rules="rules">
            <el-form-item label="电子邮箱" label-position="top" prop="email">
                <el-input v-model="formLabelAlign.email" placeholder="请输入你的邮箱" />
            </el-form-item>
            <el-form-item label="密码" label-position="top" prop="password">
                <el-input v-model="formLabelAlign.password" type="password" placeholder="请输入你的密码" show-password />
            </el-form-item>
            <el-form-item label-position="top">
                <el-button class="w-p-100 login-submit-btn" type="primary" @click="loginButton">登录</el-button>
            </el-form-item>
            <el-form-item label-position="top">
                <div class="text-button" v-if="curretnDialog == 'login'" @click="loginOpen('register')">还没有账号? 立即注册
                </div>
                <div class="text-button" v-else @click="loginOpen('login')">已有账号?登录</div>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from "vue";
import Home from "./home-page.vue";
import Plagiarism from "./plagiarism.vue";
import Historical from "./historical-results.vue";
import Article from "./blog/index.vue";
import problem from "./problem.vue";

// 工具页 ai生成
import AiTool from "./tool-ai.vue";
// 创建空间页 ai生成
import ReviewSpace from "./review-space.vue";


import {
    loonoolUserRegister,
    loonoolUserLogin
} from "../../composables/login.ts";

//  组件切换
const component = ref(ReviewSpace);

const activeMenu = ref('ReviewSpace');

// 响应式对话框宽度
const isMobile = ref(false);
const dialogWidth = computed(() => {
    return isMobile.value ? '90%' : '500px';
});

// 检测屏幕尺寸
const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
    checkMobile();
    window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
    window.removeEventListener('resize', checkMobile);
});

// 移动端菜单控制
const mobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};

// 移动端菜单点击处理
const handleMobileMenuClick = (event) => {
    navigaJump(event);
    mobileMenuOpen.value = false; // 点击后关闭菜单
};

// 移动端登录/注册点击处理
const handleMobileLogin = (type) => {
    loginOpen(type);
    mobileMenuOpen.value = false; // 点击后关闭菜单
};


// 登录弹窗
const loginVisible = ref(false);
// 登录状态 true为登录 false为注册
const curretnDialog = ref('login');
const curretnTitle = ref('Create Account');
const loginOpen = (text) => {
    if (text == 'login') {
        curretnTitle.value = '欢迎回来';
    } else {
        curretnTitle.value = '创建账户';
    }
    curretnDialog.value = text;

    // 打开弹窗
    loginVisible.value = true;
};


// 表单
const formLabelAlign = reactive({
    email: '',
    password: '',
});
const formRef = ref();


// 邮箱验证规则
const validateEmail = (rule, value, callback) => {
    if (!value) {
        callback(new Error('请输入邮箱地址'));
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            callback(new Error('请输入正确的邮箱格式'));
        } else {
            callback();
        }
    }
};

// 表单校验规则
const rules = reactive({
    email: [
        { required: true, validator: validateEmail, trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度至少6位', trigger: 'blur' }
    ]
});



const loginButton = async () => {
    try {
        // 执行表单验证
        await formRef.value.validate();

        if (curretnDialog.value == 'login') {
            // 登录逻辑
            console.log("执行登录");
            loonoolUserLogin({
                email: formLabelAlign.email,
                passwordHash: formLabelAlign.password,
            }).then(res => {
                console.log(res, 'resresresresres');
                loginVisible.value = false;
            }).catch(err => {
                console.error(err);
            })
        } else {
            // 注册逻辑
            loonoolUserRegister({
                email: formLabelAlign.email,
                passwordHash: formLabelAlign.password,
            }).then(res => {
                console.log(res, 'resresresresres');
                loginVisible.value = false;
            }).catch(err => {
                console.error(err);
            })
        }
    } catch (error) {
        // 验证失败，Element Plus 会自动显示错误信息
        console.log("表单验证失败", error);
    }
};
/**
 * 导航跳转
 */
const navigaJump = (event) => {
    switch (event) {
        case 'home':
            component.value = Home
            activeMenu.value = 'home'
            break;
        case 'plagiarism':
            component.value = Plagiarism
            activeMenu.value = 'plagiarism'

            break;
        case 'historical':
            component.value = Historical
            activeMenu.value = 'historical'

            break;
        case 'article':
            component.value = Article
            activeMenu.value = 'article'

            break;
        // ai 生成 问题页
        case 'problem':
            component.value = problem
            activeMenu.value = 'problem'

            break;
        // ai 生成工具页
        case 'AiTool':
            component.value = AiTool
            activeMenu.value = 'AiTool'

            break;
        // ai 生成创建空间
        case 'ReviewSpace':
            component.value = ReviewSpace
            activeMenu.value = 'ReviewSpace'
            break;
        default:
            break;
    }
};

</script>



<style lang="scss">
body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

#app {
    overflow-x: hidden;
    width: 100%;
    max-width: 100vw;
    box-sizing: border-box;
}

.navigation {
    width: 98%;
    height: 6vh;
    padding-top: 28px;
    padding-bottom: 11px;
    padding-left: 20px;
    padding-right: 20px;
    box-shadow: inset 0px -1px 1px 0px rgba(219, 219, 219, 0.5);
    position: relative;

    .logo {
        font-family: var(--font_aiRHjzievx_default);
        font-size: 24px;
        font-weight: 700;
        white-space: pre-wrap;

        .logo-img {
            width: 40px;
            height: 40px;
        }

        .logo-text {
            color: #0A5ADB;
        }
    }

    .naviga-menu {
        row-gap: 24px;
        column-gap: 24px;

        .menu-text {
            font-size: 18px;
            font-weight: 400;
            color: #6C7C93;
            cursor: pointer;
        }

        .menu-text:hover {
            color: #1D2530;
        }

        .menu-active {
            font-weight: 500;
            color: #2134DE !important;
        }
    }

    .naviga-button {
        .loin {
            padding: 10px 32px;
            border-radius: 26px;
            border: 1px solid #E5E7EB;
            background-color: #2134DE;
            color: #fff;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent; // 移除移动端点击高亮
        }

        .sign {
            padding: 10px 32px;
            border-radius: 26px;
            border: 1px solid #2B57FF;
            color: #2B57FF;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent; // 移除移动端点击高亮
        }
    }

    // 手机端汉堡菜单按钮
    .mobile-menu-btn {
        display: none;
        flex-direction: column;
        justify-content: space-around;
        width: 30px;
        height: 30px;
        cursor: pointer;
        z-index: 1001;

        .hamburger-line {
            width: 100%;
            height: 3px;
            background-color: #1D2530;
            border-radius: 3px;
            transition: all 0.3s ease;

            &.active:nth-child(1) {
                transform: rotate(45deg) translate(8px, 8px);
            }

            &.active:nth-child(2) {
                opacity: 0;
            }

            &.active:nth-child(3) {
                transform: rotate(-45deg) translate(8px, -8px);
            }
        }
    }
}

// 手机端侧边栏菜单遮罩
.mobile-menu-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;

    &.active {
        opacity: 1;
        pointer-events: all;
    }
}

// 手机端侧边栏菜单
.mobile-menu {
    display: none;
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100%;
    background-color: #fff;
    z-index: 1000;
    transition: right 0.3s ease;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
    flex-direction: column;

    &.active {
        right: 0;
    }

    .mobile-menu-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid #E5E7EB;

        .logo {
            font-size: 20px;

            .logo-img {
                width: 32px;
                height: 32px;
            }
        }

        .close-btn {
            font-size: 32px;
            color: #6C7C93;
            cursor: pointer;
            line-height: 1;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            -webkit-tap-highlight-color: transparent; // 移除移动端点击高亮
            border-radius: 50%;
            transition: all 0.2s ease;

            &:hover {
                color: #1D2530;
                background-color: #F3F4F6;
            }

            &:active {
                background-color: #E5E7EB;
                transform: scale(0.95);
            }
        }
    }

    .mobile-menu-content {
        flex: 1;
        padding: 20px 0;
        overflow-y: auto;

        .mobile-menu-item {
            padding: 16px 20px;
            font-size: 16px;
            font-weight: 400;
            color: #6C7C93;
            cursor: pointer;
            border-bottom: 1px solid #F3F4F6;
            transition: all 0.2s ease;
            -webkit-tap-highlight-color: transparent; // 移除移动端点击高亮
            min-height: 48px; // 增加触摸目标大小
            display: flex;
            align-items: center;

            &:hover {
                background-color: #F9FAFB;
                color: #1D2530;
            }

            &:active {
                background-color: #F0F4FF;
            }

            &.menu-active {
                font-weight: 500;
                color: #2134DE;
                background-color: #F0F4FF;
            }
        }
    }

    .mobile-menu-footer {
        padding: 20px;
        border-top: 1px solid #E5E7EB;
        display: flex;
        flex-direction: column;
        gap: 12px;

        .mobile-login-btn {
            padding: 12px 24px;
            border-radius: 26px;
            border: 1px solid #E5E7EB;
            background-color: #2134DE;
            color: #fff;
            text-align: center;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            -webkit-tap-highlight-color: transparent; // 移除移动端点击高亮
            min-height: 44px; // 增加触摸目标大小
            display: flex;
            align-items: center;
            justify-content: center;

            &:active {
                background-color: #1a28b8;
                transform: scale(0.98); // 点击反馈
            }
        }

        .mobile-register-btn {
            padding: 12px 24px;
            border-radius: 26px;
            border: 1px solid #2134DE;
            color: #2B57FF;
            text-align: center;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            -webkit-tap-highlight-color: transparent; // 移除移动端点击高亮
            min-height: 44px; // 增加触摸目标大小
            display: flex;
            align-items: center;
            justify-content: center;

            &:active {
                background-color: #F0F4FF;
                transform: scale(0.98); // 点击反馈
            }
        }
    }
}

// 响应式设计 - 手机端适配
@media (max-width: 768px) {
    .navigation {
        padding-left: 16px;
        padding-right: 16px;
        height: auto;
        min-height: 60px;
        padding-top: 16px;
        padding-bottom: 16px;
        width: 100%;
        box-sizing: border-box;

        .logo {
            font-size: 20px;

            .logo-img {
                width: 32px;
                height: 32px;
            }
        }

        .naviga-menu {
            display: none;
        }

        .naviga-button {
            display: none;
        }

        .mobile-menu-btn {
            display: flex;
            width: 32px;
            height: 32px;
            padding: 4px;
            -webkit-tap-highlight-color: transparent; // 移除移动端点击高亮
        }
    }

    .mobile-menu-overlay {
        display: block;
    }

    .mobile-menu {
        display: flex;
    }

    // 防止移动端横向滚动
    #app {
        overflow-x: hidden;
        width: 100%;
        max-width: 100vw;
    }
}

// 小屏幕手机适配
@media (max-width: 480px) {
    .navigation {
        padding-left: 12px;
        padding-right: 12px;
        min-height: 56px;
        padding-top: 12px;
        padding-bottom: 12px;

        .logo {
            font-size: 18px;

            .logo-img {
                width: 28px;
                height: 28px;
            }
        }

        .mobile-menu-btn {
            width: 28px;
            height: 28px;
        }
    }

    .mobile-menu {
        width: 100%;
        right: -100%;

        &.active {
            right: 0;
        }

        .mobile-menu-header {
            padding: 16px;

            .logo {
                font-size: 18px;

                .logo-img {
                    width: 28px;
                    height: 28px;
                }
            }

            .close-btn {
                font-size: 28px;
                width: 28px;
                height: 28px;
            }
        }

        .mobile-menu-content {
            padding: 16px 0;

            .mobile-menu-item {
                padding: 14px 16px;
                font-size: 15px;
            }
        }

        .mobile-menu-footer {
            padding: 16px;

            .mobile-login-btn,
            .mobile-register-btn {
                padding: 14px 20px;
                font-size: 15px;
                min-height: 48px; // 增加触摸目标大小
            }
        }
    }
}

.el-dialog__title {
    font-weight: 600 !important;
    font-size: 28px !important;
    color: #1D2530 !important;
    margin-bottom: 48px;
    padding: 0;
}

.login-dialog {
    .el-dialog {
        border-radius: 16px;
        overflow: hidden;
        position: relative;
    }

    .el-dialog__header {
        padding: 32px 32px 0 32px;
        position: relative;
    }

    .el-dialog__headerbtn {
        top: 24px;
        right: 24px;
        width: 32px;
        height: 32px;
        background-color: #F3F4F6;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;

        &:hover {
            background-color: #E5E7EB;
        }

        .el-dialog__close {
            color: #9CA3AF;
            font-size: 16px;
            font-weight: 300;
        }
    }

    .el-dialog__body {
        padding: 0 32px 32px 32px;
        position: relative;
        padding-top: 0;
    }

    // 登录弹窗底部渐变效果
    &:not(.register-dialog) {
        .el-dialog__body::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 6px;
            background: linear-gradient(90deg, #FCE7F3 0%, #E9D5FF 100%);
            border-radius: 0 0 16px 16px;
        }
    }

    .el-form-item__label {
        font-weight: 500;
        color: #1D2530;
        font-size: 14px;
        margin-bottom: 10px;
        padding: 0;
    }
    
    .el-form-item {
        margin-bottom: 24px;
    }

    .el-input__wrapper {
        min-height: 48px;
        border-radius: 50px;
        box-shadow: 0 0 0 1px #BFDBFE inset;
        background-color: #fff;
        transition: all 0.2s ease;
        padding: 0 16px;

        &:hover {
            box-shadow: 0 0 0 1px #93C5FD inset;
        }

        &.is-focus {
            box-shadow: 0 0 0 1px #60A5FA inset;
        }
    }

    &.register-dialog {
        .el-input__wrapper {
            background-color: #F3F4F6;
            box-shadow: none;
            border: none;

            &:hover {
                background-color: #E5E7EB;
                box-shadow: none;
            }

            &.is-focus {
                background-color: #fff;
                box-shadow: 0 0 0 1px #60A5FA inset;
            }
        }
    }

    .el-input__inner {
        color: #1D2530;
        font-size: 14px;

        &::placeholder {
            color: #9CA3AF;
        }
    }

    .login-submit-btn {
        min-height: 48px;
        border-radius: 50px;
        font-size: 16px;
        font-weight: 500;
        background-color: #2134DE;
        border: none;
        margin-top: 0;
        width: 100%;

        &:hover {
            background-color: #2563EB;
        }
    }

    .text-button {
        font-weight: 400;
        font-size: 14px;
        text-align: center;
        width: 100%;
        margin: auto;
        padding: 16px 10px 0 10px;
        color: #1D2530;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            color: #3B82F6;
        }
    }
}

// 移动端登录对话框优化
@media (max-width: 768px) {
    .el-dialog__title {
        font-size: 22px !important;
    }

    .login-dialog {
        .el-dialog__body {
            padding: 20px 16px;
        }

        .el-form-item__label {
            font-size: 14px;
        }

        .el-input__wrapper {
            min-height: 44px; // 增加触摸目标大小
        }

        .el-button {
            min-height: 44px; // 增加触摸目标大小
            font-size: 16px;
        }

        .text-button {
            font-size: 14px;
            padding: 8px 10px;
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}

// 小屏幕手机登录对话框优化
@media (max-width: 480px) {
    .el-dialog__title {
        font-size: 20px !important;
    }

    .login-dialog {
        .el-dialog__body {
            padding: 16px 12px;
        }

        .el-form-item {
            margin-bottom: 20px;
        }

        .el-form-item__label {
            font-size: 13px;
            margin-bottom: 8px;
        }

        .el-input__wrapper {
            min-height: 48px;
            font-size: 16px; // 防止iOS自动缩放
        }

        .el-button {
            min-height: 48px;
            font-size: 16px;
        }

        .text-button {
            font-size: 14px;
            min-height: 44px;
        }
    }
}
</style>