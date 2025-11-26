<template>
    <div>
        <div class="navigation flex align-center justify-between">
            <div class="logo flex align-center">
                <!-- <img src="../../../public/img/safety.png" alt="" class="logo-img m-r-10"> -->
                <div class="logo-text">LOGO</div>
            </div>
            <!-- 导航栏菜单 -->
            <div class="naviga-menu flex align-center">
                <NuxtLink class="menu-text" to="/app/pages/index.vue">首页</NuxtLink>
                <NuxtLink to="/app/pages/plagiarism.vue" class="menu-text">检测查重</NuxtLink>
                <NuxtLink to="/app/pages/blog/historical-results.vue" class="menu-text">历史结果</NuxtLink>
                <NuxtLink to="/app/pages/blog/learn-more.vue" class="menu-text">了解更多</NuxtLink>

                <!-- <div @click="navigaJump('home')" class="menu-text">首页</div>
                <div @click="navigaJump('plagiarism')" class="menu-text">检测查重</div>
                <div @click="navigaJump('historical')" class="menu-text">历史结果</div>
                <div @click="navigaJump('article')" class="menu-text">了解更多</div> -->
            </div>
            <!-- 登录按钮 -->
            <div class="naviga-button flex align-center">
                <div class="flex align-center">
                    <div class="loin m-r-10 text-bold-500">登录</div>
                    <div class="sign text-bold-500">注册</div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
body {
    margin: 0;
    padding: 0;
}

.navigation {
    width: 98%;
    height: 6vh;
    padding-top: 28px;
    padding-bottom: 11px;
    padding-left: 20px;
    padding-right: 20px;

    .logo {
        font-family: var(--font_aiRHjzievx_default);
        font-size: 24px;
        font-weight: 700;
        white-space: pre-wrap;

        .logo-img {
            width: 20px;
            height: 20px;
        }

        .logo-text {
            color: #0A5ADB;
        }
    }

    .naviga-menu {
        row-gap: 24px;
        column-gap: 24px;

        a {
            color: #007bff;
            text-decoration: none;
            font-family: Arial, sans-serif;
            font-size: 16px;
        }

        .menu-text {
            font-size: 14px;
            font-weight: 400;
            color: #6C7C93;
        }

        .menu-text:hover {
            color: #1D2530;
        }
    }

    .naviga-button {
        .loin {
            padding: 10px 19px;
            border-radius: 6px;
            border-color: rgba(229, 231, 235, 1);
            border: 1px solid #E5E7EB;
        }

        .sign {
            background-color: #0A5ADB;
            padding: 10px 19px;
            border-radius: 6px;
            border-color: rgba(229, 231, 235, 1);
            border: 1px solid #E5E7EB;
            color: #fff;
        }
    }
}
</style>