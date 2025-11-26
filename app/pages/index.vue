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
                <div @click="navigaJump('home')" class="menu-text" :class="{ 'menu-active': activeMenu == 'home' }">
                    首页
                </div>
                <div @click="navigaJump('plagiarism')" class="menu-text"
                    :class="{ 'menu-active': activeMenu === 'plagiarism' }">
                    检测查重
                </div>
                <div @click="navigaJump('historical')" class="menu-text"
                    :class="{ 'menu-active': activeMenu == 'historical' }">
                    历史结果
                </div>
                <div @click="navigaJump('article')" class="menu-text"
                    :class="{ 'menu-active': activeMenu == 'article' }">
                    了解更多
                </div>
            </div>
            <!-- 登录按钮 -->
            <div class="naviga-button flex align-center">
                <div class="flex align-center">
                    <div class="loin m-r-10 text-bold-500" @click="loginOpen('login')">登录</div>
                    <div class="sign text-bold-500" @click="loginOpen('register')">注册</div>
                </div>
            </div>
        </div>
        <component :is="component"> </component>
    </div>

    <el-dialog v-model="loginVisible" :title="curretnTitle" width="500" class="login-dialog"
        :close-on-click-modal="false">
        <el-form ref="formRef" :label-position="top" label-width="auto" :model="formLabelAlign" style="max-width: 600px"
            :rules="rules">
            <el-form-item label="Email Address" label-position="top" prop="email">
                <el-input v-model="formLabelAlign.email" placeholder="you@example.com" />
            </el-form-item>
            <el-form-item label="Password" label-position="top" prop="password">
                <el-input v-model="formLabelAlign.password" placeholder="Enter your password" />
            </el-form-item>
            <el-form-item label-position="top">
                <el-button class="w-p-100" type="primary" @click="loginButton" v-if="curretnDialog">Log In</el-button>
                <el-button class="w-p-100" type="primary" @click="loginButton" v-else>Sign Up</el-button>
            </el-form-item>
            <el-form-item label-position="top">
                <el-divider>or</el-divider>
            </el-form-item>
            <el-form-item label-position="top">
                <div class="text-button" v-if="curretnDialog" @click="loginOpen('login')">Don't have an account? Sign up
                </div>
                <div class="text-button" v-else @click="loginOpen('register')">Already have an account? Log in</div>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import Home from "./home-page.vue";
import Plagiarism from "./plagiarism.vue";
import Historical from "./historical-results.vue";
import Article from "./blog/index.vue";


import {
    loonoolUserRegister,
    loonoolUserLogin
} from "../../composables/login.ts";

//  组件切换
const component = ref(Home);

const activeMenu = ref('home');


// 登录弹窗
const loginVisible = ref(false);
// 登录状态 true为登录 false为注册
const curretnDialog = ref('login');
const curretnTitle = ref('Create Account');
const loginOpen = (text) => {
    curretnDialog.value = !curretnDialog.value;
    if (text == 'login') {
        curretnTitle.value = 'Welcome Back';
    } else {
        curretnTitle.value = 'Create Account';
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
        default:
            break;
    }
};

</script>



<style lang="scss">
body {
    margin: 0;
    padding: 0;
}

#app {
    overflow-x: hidden;
}

.navigation {
    width: 98%;
    height: 6vh;
    padding-top: 28px;
    padding-bottom: 11px;
    padding-left: 20px;
    padding-right: 20px;
    box-shadow: inset 0px -1px 1px 0px rgba(219, 219, 219, 0.5);

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
        }

        .sign {
            padding: 10px 32px;
            border-radius: 26px;
            border: 1px solid #2B57FF;
            color: #2B57FF;
        }
    }


}

.el-dialog__title {
    font-weight: 600 !important;
    font-size: 26px !important;
}

.login-dialog {
    .el-form-item__label {
        font-weight: 600;
        color: #000;
    }

    .el-input__wrapper {
        min-height: 40px;
    }


    .text-button {
        font-weight: 500;
        font-size: 16px;
        text-align: center;
        border-radius: 8px;
        width: 100%;
        margin: auto;
        padding: 5px 10px;
    }

    .text-button:hover {
        background-color: #E0E9F5;
        color: #0A5ADB;

    }

}
</style>