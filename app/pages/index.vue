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
                <div @click="navigaJump('ReviewSpace')" class="menu-text"
                    :class="{ 'menu-active': activeMenu == 'ReviewSpace' }">
                    创建空间
                </div>
                <!-- <div @click="navigaJump('auditSpace')" class="menu-text"
                    :class="{ 'menu-active': activeMenu == 'auditSpace' }">
                    决策空间
                </div> -->
                  <div @click="navigaJump('mySpace')" class="menu-text"
                    :class="{ 'menu-active': activeMenu == 'mySpace' }">
                    我的空间
                </div>
                <!-- <div @click="navigaJump('AiTool')" class="menu-text"
                    :class="{ 'menu-active': activeMenu === 'AiTool' }">
                    检测查重
                </div> -->
                <!-- <div @click="navigaJump('historical')" class="menu-text"
                    :class="{ 'menu-active': activeMenu == 'historical' }">
                    历史结果
                </div> -->
                <div @click="navigaJump('problem')" class="menu-text"
                    :class="{ 'menu-active': activeMenu == 'problem' }">
                    帮助中心
                </div>
            </div>
			
			
            <!-- 登录按钮/用户头像 -->
            <div class="naviga-button flex align-center">
                <div  v-if="isLoggedIn">
                    <el-dropdown trigger="click" max-height="400" @visible-change="handleMsgDropdownVisibleChange">
                        <div class="iconBox" @click="msgApi">
                            <img src="/img/msg.png" alt="" class="msg-img">
                            <span v-if="hasNewMessage" class="msg-badge"></span>
                        </div>
                        <template #dropdown>
                        <el-dropdown-menu class="msg-dropdown-menu">
                            <template v-if="msgApiList.length === 0">
                                <div class="msg-empty">
                                    <div class="msg-empty-text">消息为空</div>
                                </div>
                            </template>
                            

                            <el-dropdown-item v-else class="msg-item" v-for="(item,index) in msgApiList" :key="index">
                                    <img :src="item.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" alt="" class="msg-item-img">
                                    <div class="msg-text">{{item.workspaceName}}</div>
                                    <div class="msg-time">{{formatDateTime(item.createdAt)}}</div>
                             </el-dropdown-item>
                            
                        </el-dropdown-menu>
                        </template>
                    </el-dropdown>
			    </div>
                <div v-if="!isLoggedIn" class="flex align-center">
                    <div class="loin m-r-10 text-bold-500" @click="loginOpen('login')">登录</div>
                    <div class="sign text-bold-500" @click="loginOpen('register')">注册</div>
                </div>
                <div v-else class="user-avatar-container" @click="toggleUserMenu">
                    <!-- <img :src="userInfo.avatar || '/img/default-avatar.png'" :alt="userInfo.email || '用户'" class="user-avatar"> -->
                    <img :src="userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                        class="h-40 w-40">

                    <div v-if="userMenuOpen" class="user-menu">
                        <div class="user-menu-item" @click="navigaJump('userProfile')">查看信息</div>
                        <div class="user-menu-item" @click="handleLogout">退出登录</div>
                    </div>
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
                <!-- <div @click="handleMobileMenuClick('auditSpace')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu == 'auditSpace' }">
                    决策空间
                </div> -->
                <!-- <div @click="handleMobileMenuClick('AiTool')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu === 'AiTool' }">
                    检测查重
                </div> -->
                  <div @click="handleMobileMenuClick('mySpace')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu == 'mySpace' }">
                    我的空间
                </div>
                <!-- <div @click="handleMobileMenuClick('historical')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu == 'historical' }">
                    历史结果
                </div> -->
                <div @click="handleMobileMenuClick('problem')" class="mobile-menu-item"
                    :class="{ 'menu-active': activeMenu == 'problem' }">
                    了解更多
                </div>
            </div>
            <div class="mobile-menu-footer">
                <div v-if="!isLoggedIn">
                    <div class="mobile-login-btn" @click="handleMobileLogin('login')">登录</div>
                    <div class="mobile-register-btn" @click="handleMobileLogin('register')">注册</div>
                </div>
                <div v-else class="mobile-user-info">
                    <div class="mobile-user-avatar-container">
                        <!-- userInfo.avatar -->
                        <!-- <img :src="userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" class="mobile-user-avatar"> -->
                        <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="">
                        <!-- <div class="mobile-user-email">{{ userInfo.email || '用户' }}</div> -->
                    </div>
                    <div class="mobile-logout-btn" @click="handleLogout">退出登录</div>
                </div>
            </div>
        </div>
        <component :is="component" :spaceId="currentSpaceId" @spaceCreated="handleSpaceCreated"> </component>
    </div>

    <el-dialog v-model="loginVisible" :title="curretnTitle" :width="dialogWidth"
        :class="['login-dialog', curretnDialog === 'register' ? 'register-dialog' : '']" :close-on-click-modal="false"
        :show-close="true">
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
import { ref, reactive, computed, onMounted, onUnmounted, nextTick } from "vue";
import Home from "./home-page.vue";
import Plagiarism from "./plagiarism.vue";
import Historical from "./historical-results.vue";
import Article from "./blog/index.vue";
import problem from "./problem.vue";
// 我的工具
import mySpace from "./my-space.vue";
// 个人信息页
import userProfile from "./user-profile.vue";

// 工具页 ai生成
import AiTool from "./tool-ai.vue";
// 创建空间页 ai生成
import ReviewSpace from "./review-space.vue";
// 审核空间页 ai生成
import auditSpace from "./audit-space.vue";
// icon
import { Bell } from '@element-plus/icons-vue'


import {
    loonoolUserRegister,
    loonoolUserLogin
} from "../../composables/login.ts";
import {
    msgList
} from "../../composables/msg.ts";
import { baseUrl } from "../../plugins/api.ts";
import { ElMessage } from 'element-plus';
//消息列表
const msgApiList = reactive([]);

// 是否有新消息提示
const hasNewMessage = ref(false);

// SSE 连接实例
let eventSource = null;

// 初始化 SSE 消息连接
const initSSEMsg = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.warn('未找到 token，无法建立 SSE 连接');
        return;
    }

    // 如果已有连接，先关闭
    if (eventSource) {
        eventSource.close();
        eventSource = null;
    }

    // SSE 服务器地址（使用 api.ts 中的 baseUrl）
    const sseUrl = `${baseUrl}loonool/notifications/stream`;
    
    try {
        // 创建 EventSource 连接
        // 注意：EventSource 不支持自定义请求头，token 需要通过 URL 参数传递
        const urlWithToken = `${sseUrl}?token=${encodeURIComponent(token)}`;
        eventSource = new EventSource(urlWithToken);
        
        // 监听消息事件
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('收到 SSE 消息:', data);
                
                // 处理消息数据
                if (Array.isArray(data)) {
                    // 如果是数组，直接替换消息列表（初始加载，不显示提示）
                    msgApiList.length = 0;
                    msgApiList.push(...data);
                    hasNewMessage.value = false;
                } else if (data && data.data && Array.isArray(data.data)) {
                    // 如果数据在 data 字段中（初始加载，不显示提示）
                    msgApiList.length = 0;
                    msgApiList.push(...data.data);
                    hasNewMessage.value = false;
                } else if (data && data.workspaceName) {
                    // 如果是单条消息，添加到列表开头（新消息，显示提示）
                    msgApiList.unshift(data);
                    // 限制列表长度，避免过多消息
                    if (msgApiList.length > 100) {
                        msgApiList.pop();
                    }
                    // 显示新消息提示
                    hasNewMessage.value = true;
                }
            } catch (error) {
                console.error('解析 SSE 消息失败:', error);
            }
        };
        
        // 监听自定义事件（如果需要）
        eventSource.addEventListener('notification', (event) => {
            try {
                const data = JSON.parse(event.data);
                console.log('收到 SSE 通知事件:', data);
                if (data && data.workspaceName) {
                    msgApiList.unshift(data);
                    if (msgApiList.length > 100) {
                        msgApiList.pop();
                    }
                    // 显示新消息提示
                    hasNewMessage.value = true;
                }
            } catch (error) {
                console.error('解析 SSE 通知事件失败:', error);
            }
        });
        
        // 监听连接打开
        eventSource.onopen = () => {
            console.log('SSE 连接已建立');
        };
        
        // 监听错误
        eventSource.onerror = (error) => {
            console.error('SSE 连接错误:', error);
            // EventSource 会自动重连，但如果连接被关闭（如 401），需要手动处理
            if (eventSource && eventSource.readyState === EventSource.CLOSED) {
                console.warn('SSE 连接已关闭，可能需要重新认证');
            }
        };
    } catch (error) {
        console.error('创建 SSE 连接失败:', error);
    }
};

// 断开 SSE 连接
const disconnectSSEMsg = () => {
    if (eventSource) {
        eventSource.close();
        eventSource = null;
        console.log('SSE 连接已断开');
    }
};

// 格式化时间函数
const formatDateTime = (dateTime) => {
    if (!dateTime) {
        return '';
    }
    
    let date;
    // 如果是时间戳（数字），转换为Date对象
    if (typeof dateTime === 'number') {
        // 判断是秒级时间戳还是毫秒级时间戳
        date = new Date(dateTime > 1000000000000 ? dateTime : dateTime * 1000);
    } else if (typeof dateTime === 'string') {
        // 如果是字符串，尝试解析
        // 处理常见的日期格式
        if (dateTime.includes('T')) {
            // ISO格式: 2025-12-11T17:22:23.000Z
            date = new Date(dateTime);
        } else if (dateTime.match(/^\d{4}-\d{2}-\d{2}/)) {
            // 已经是 YYYY-MM-DD 格式，直接返回
            return dateTime;
        } else {
            date = new Date(dateTime);
        }
    } else {
        return String(dateTime);
    }
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
        // 如果无法解析，返回原始值
        return String(dateTime);
    }
    
    // 格式化为 YYYY-MM-DD HH:mm:ss
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 处理消息下拉菜单显示状态变化
const handleMsgDropdownVisibleChange = (visible) => {
    // 当下拉菜单打开时，清除新消息提示
    if (visible) {
        hasNewMessage.value = false;
    }
};

// 备用 HTTP 接口（用于初始加载或 SSE 失败时）
const msgApi = () => {
    msgList({}).then(res => {
        console.log(res, 'HTTP 消息列表响应');
        if (res && res.data && Array.isArray(res.data)) {
            msgApiList.length = 0;
            msgApiList.push(...res.data);
            // 清除新消息提示（因为已经主动查看了）
            hasNewMessage.value = false;
        }
    }).catch(err => {
        console.error('获取消息列表失败:', err);
    })
};

//  组件切换
const component = ref(ReviewSpace);

const activeMenu = ref('ReviewSpace');

// 当前空间ID
const currentSpaceId = ref(null);

// 处理空间创建成功事件
const handleSpaceCreated = (spaceId) => {
  currentSpaceId.value = spaceId;
  navigaJump('auditSpace');
};

// 用户登录状态
const isLoggedIn = ref(false);
const userInfo = ref({
    email: '',
    avatar: '',
    username: ''
});
const userMenuOpen = ref(false);

// 检查登录状态
const checkLoginStatus = () => {
    const token = localStorage.getItem('token');
    const savedUserInfo = localStorage.getItem('userInfo');
    if (token && savedUserInfo) {
        isLoggedIn.value = true;
        try {
            userInfo.value = JSON.parse(savedUserInfo);
        } catch (e) {
            console.error('解析用户信息失败', e);
        }
    }
};

// 切换用户菜单
const toggleUserMenu = () => {
    userMenuOpen.value = !userMenuOpen.value;
};

// 退出登录
const handleLogout = () => {
    // 断开 SSE 连接
    disconnectSSEMsg();
    
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    isLoggedIn.value = false;
    userInfo.value = {
        email: '',
        avatar: '',
        username: ''
    };
    userMenuOpen.value = false;
    // 清空消息列表
    msgApiList.length = 0;
    // 清除新消息提示
    hasNewMessage.value = false;
    ElMessage.success('已退出登录');
};

// 初始化时检查登录状态
onMounted(() => {
    checkLoginStatus();
    
    // 如果已登录，初始化 SSE 连接
    if (isLoggedIn.value) {
        initSSEMsg();
    } else {
        // 如果未登录，使用 HTTP 接口获取消息（如果有的话）
        // msgApi();
    }
    
    // 点击外部关闭用户菜单
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.nodeType === 1) {
            const element = target;
            if (!element.closest || !element.closest('.user-avatar-container')) {
                userMenuOpen.value = false;
            }
        }
    });
});

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
    // 组件卸载时断开 SSE 连接
    disconnectSSEMsg();
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

    // 在弹窗打开后清空表单数据和验证状态
    nextTick(() => {
        if (formRef.value) {
            formRef.value.resetFields();
        } else {
            // 如果表单引用还未初始化，直接重置数据
            formLabelAlign.email = '';
            formLabelAlign.password = '';
        }
    });
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
                // 保存 token
                if (res?.token || res?.data?.token) {
                    localStorage.setItem('token', res?.token || res?.data?.token);
                }
                // 保存用户信息
                const userData = {
                    email: formLabelAlign.email,
                    avatar: res?.avatar || res?.data?.avatar || '',
                    username: res?.username || res?.data?.username || res?.email || res?.data?.email || formLabelAlign.email
                };
                localStorage.setItem('userInfo', JSON.stringify(userData));
                userInfo.value = userData;
                isLoggedIn.value = true;
                
                // 登录成功后初始化 SSE 连接
                initSSEMsg();
                
                // 显示返回的提示语
                const message = res?.message || res?.msg || res?.data?.message || '登录成功';
                ElMessage.success(message);
                loginVisible.value = false;
            }).catch(err => {
                console.error(err);
                // 显示错误提示
                const errorMsg = err?.response?.data?.message || err?.message || '登录失败，请稍后重试';
                ElMessage.error(errorMsg);
            })
        } else {
            // 注册逻辑
            loonoolUserRegister({
                email: formLabelAlign.email,
                passwordHash: formLabelAlign.password,
            }).then(res => {
                console.log(res, 'resresresresres');
                // 显示返回的提示语
                const message = res?.message || res?.msg || res?.data?.message || '注册成功';
                ElMessage.success(message);
                loginVisible.value = false;
            }).catch(err => {
                console.error(err);
                // 显示错误提示
                const errorMsg = err?.response?.data?.message || err?.message || '注册失败，请稍后重试';
                ElMessage.error(errorMsg);
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

        // ai 生成审查空间
        case 'auditSpace':
            component.value = auditSpace
            activeMenu.value = 'auditSpace'
            break;

        // 我的空间
         case 'mySpace':
            component.value = mySpace
            activeMenu.value = 'mySpace'
            break;
        // 个人信息页
        case 'userProfile':
            component.value = userProfile
            activeMenu.value = 'userProfile'
            userMenuOpen.value = false
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

        .user-avatar-container {
            position: relative;
            cursor: pointer;
            -webkit-tap-highlight-color: transparent;

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                border: 2px solid #E5E7EB;
                transition: all 0.2s ease;

                &:hover {
                    border-color: #2134DE;
                    box-shadow: 0 0 0 2px rgba(33, 52, 222, 0.1);
                }
            }

            .user-menu {
                position: absolute;
                top: calc(100% + 8px);
                right: 0;
                background: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                min-width: 120px;
                z-index: 1000;
                overflow: hidden;

                .user-menu-item {
                    padding: 12px 16px;
                    font-size: 14px;
                    color: #1D2530;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:hover {
                        background-color: #F3F4F6;
                        color: #2134DE;
                    }

                    &:active {
                        background-color: #E5E7EB;
                    }
                }
            }
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

        .mobile-user-info {
            display: flex;
            flex-direction: column;
            gap: 12px;

            .mobile-user-avatar-container {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background-color: #F9FAFB;
                border-radius: 8px;

                .mobile-user-avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid #E5E7EB;
                }

                .mobile-user-email {
                    flex: 1;
                    font-size: 14px;
                    color: #1D2530;
                    font-weight: 500;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }

            .mobile-logout-btn {
                padding: 12px 24px;
                border-radius: 26px;
                border: 1px solid #E5E7EB;
                background-color: #fff;
                color: #EF4444;
                text-align: center;
                font-weight: 500;
                cursor: pointer;
                transition: all 0.2s ease;
                -webkit-tap-highlight-color: transparent;
                min-height: 44px;
                display: flex;
                align-items: center;
                justify-content: center;

                &:active {
                    background-color: #FEF2F2;
                    transform: scale(0.98);
                }
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
    background-image: url('/img/login-bg.png');
    background-size: cover;
    padding: 0;
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
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
	
.iconBox{
	width: 44px;
	height: 44px;
	background: #E9EBFC;
	display:flex;
	justify-content: center;
	align-items: center;
    border-radius:50%;
    margin-right:20px;
    margin-top:-4px;
    position: relative;
    cursor: pointer;
}
.msg-img{
	width: 20px;
	height: 20px;
}
.msg-badge{
	position: absolute;
	top: 4px;
	right: 4px;
	width: 8px;
	height: 8px;
	background-color: #FF4444;
	border-radius: 50%;
	border: 1px solid #fff;
	z-index: 10;
	animation: pulse 2s infinite;
}
@keyframes pulse {
	0% {
		transform: scale(1);
		opacity: 1;
	}
	50% {
		transform: scale(1.2);
		opacity: 0.8;
	}
	100% {
		transform: scale(1);
		opacity: 1;
	}
}
.msg-dropdown-menu {
    width: 400px !important;
}

.msg-item{
    width: 400px;
    height: 44px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: border-box;
    
    .msg-item-img{
        width:26px;
        height:26px;
        border-radius:50%;
        margin-right:8px;
        flex-shrink: 0;
    }
    .msg-text{
        flex:1;
        height: 20px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 14px;
        color: #85909C;
        line-height: 20px;
        text-align: left;
        font-style: normal;
        overflow:hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-right: 12px;
    }
    .msg-time{
        flex-shrink: 0;
        height: 17px;
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 12px;
        color: #85909C;
        line-height: 17px;
        text-align: right;
        font-style: normal;
        white-space: nowrap;
    }
}

.el-dropdown-menu__item:not(.is-disabled):hover{
    background-color: #F7F8FA !important;
    color: #85909C;
    border-radius: 8px;
}

.msg-empty{
    padding: 40px 20px;
    text-align: center;
    min-width: 200px;
    
    .msg-empty-text{
        font-size: 14px;
        color: #85909C;
        line-height: 20px;
    }
}
</style>