<!-- 首页 -->
<template>
    <div class="home">
        <!-- 介绍 -->
        <div class="introduc introduc-one bg-img">
            <div class="introduc-title text-bold-600">视觉内容进入商业世界前的安全层。</div>
            <div class="introduc-text-one p-t-50 text-16 text-bold-600 text-center">查重・存证・维权 —— 一站式原创设计保护平台</div>
            <div class="introduc-text-one p-t-20 text-16 text-bold-600 text-center">精准识别抄袭风险，锁定原创权属，让每一份创意都有专属 “保护盾”
            </div>

            <!-- 输入框和按钮区域 -->
            <div class="input-container flex align-center justify-center p-t-50">
                <div class="input-wrapper flex align-center">
                    <input type="text" class="space-input" placeholder="点击创建空间名称" v-model="spaceName"
                        @focus="inputFocus" @blur="inputBlur" />
                    <button class="enter-btn" @click="enterSpace">
                        <span class="btn-text">进入</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { loonoolWorkspaces } from "../../composables/login";
import { ElMessage } from 'element-plus'

import { ref } from 'vue';

// 空间名称输入框
const spaceName = ref('')
const emit = defineEmits(['spaceCreated']); 


// 输入框聚焦事件
const inputFocus = () => {
    // 可以添加聚焦时的样式变化
}

// 输入框失焦事件
const inputBlur = () => {
    // 可以添加失焦时的样式变化
}

// 进入空间按钮点击事件
const enterSpace = () => {
    if (!spaceName.value.trim()) {
        console.log('请输入空间名称')
        return
    }
    loonoolWorkspaces({
        name: spaceName.value,
    }).then(res => {
        ElMessage.success(res.message);
        if (res.code === 200 && res.data?.id) {
            // 通过事件通知父组件切换组件并传递id
            emit('spaceCreated', res.data.id)
            localStorage.setItem(workspaceId, res.data.id);
        }
    }).catch(err => {
        console.error(err);
        // 显示错误提示
        const errorMsg = err?.response?.data?.message || err?.message || '创建失败，请稍后重试';
        // ElMessage.error(errorMsg);
    })

    console.log('进入空间:', spaceName.value)
    // 这里可以添加进入空间的逻辑
}

</script>

<style scoped lang="scss">
.home {
    height: auto;
    font-size: 20px;
    color: #333;
    font-family: PingFangSC, PingFang SC;
}

.introduc {
    width: 100%;
    height: calc(100vh - 15vh);
    color: #1D2129;
}

.introduc-one {
    padding-top: 140px;
    background-image: url('/img/introduc-one.png');

    .introduc-title {
        margin: auto;
        width: 700px;
        text-align: center;
        font-size: 80px;
    }

    .enter {
        color: #fff;
        padding: 10px 30px;
        background-color: #1D2129;
    }

    .view-report {
        padding: 10px 30px;
        border: 2px solid #1D2129;
    }
}


/* 新增样式 */
.input-container {
    width: 100%;
    max-width: 600px;
    margin: auto;
}

.input-wrapper {
    width: 100%;
    height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 30px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    align-items: center;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
}

.space-input {
    flex: 1;
    padding: 0 20px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: #333;
    transition: all 0.3s ease;

    &::placeholder {
        color: #999;
    }

    &:focus {
        color: #1D2129;
    }
}

.enter-btn {
    width: 80px;
    height: 40px;
    background-color: #2134DE;
    border: none;
    border-radius: 20px;
    color: white;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-right: 20px;

    &:hover {
        background-color: #1a2bb8;
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }
}

.btn-text {
    display: block;
    line-height: 1;
}
</style>