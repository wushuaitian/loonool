<template>
  <!-- 创建空间 -->
  <div class="review-space-page">
    <!-- 主要内容区域 -->
    <div class="content-wrapper">
      <!-- 标题 -->
      <div class="main-title">
        创建您的工作空间
      </div>

      <!-- 副标题 -->
      <div class="subtitle">
        为您的创意项目建立一个专属空间，集中管理您的原创作品
      </div>

      <!-- 创建表单区域 -->
      <div class="form-section">
        <el-form ref="formRef" :model="formData" :rules="rules" label-position="top" class="create-space-form">
          <!-- 空间名称 -->
          <el-form-item label="空间名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入空间名称（如：我的设计作品集）" size="large" :prefix-icon="Folder"
              maxlength="50" show-word-limit />
          </el-form-item>

          <!-- 空间描述 -->
          <el-form-item label="空间描述" prop="description">
            <el-input v-model="formData.description" type="textarea" :rows="4" placeholder="请简要描述这个空间的用途（可选）"
              maxlength="200" show-word-limit />
          </el-form-item>

          <!-- 提交按钮 -->
          <el-form-item>
            <div class="form-actions">
              <el-button type="primary" size="large" :loading="isCreating" @click="handleCreate" class="create-btn">
                <span v-if="!isCreating">创建空间</span>
                <span v-else>创建中...</span>
              </el-button>
              <el-button size="large" @click="handleReset" :disabled="isCreating">
                重置
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Folder } from '@element-plus/icons-vue'

import { loonoolWorkspaces } from "../../composables/login";

// 定义事件
const emit = defineEmits(['spaceCreated'])


// 表单引用
const formRef = ref()

// 创建状态
const isCreating = ref(false)

// 表单数据
const formData = reactive({
  name: '',
  description: ''
})

// 表单验证规则
const rules = {
  name: [
    { required: true, message: '请输入空间名称', trigger: 'blur' },
    { min: 2, max: 50, message: '空间名称长度在 2 到 50 个字符', trigger: 'blur' }
  ],
  description: [
    { max: 200, message: '描述不能超过 200 个字符', trigger: 'blur' }
  ]
}

// 创建空间
const handleCreate = async () => {
  if (!formRef.value) return

  try {
    // 表单验证
    await formRef.value.validate()

    isCreating.value = true

    // TODO: 调用创建空间的API
    // 这里可以添加实际的API调用
    // const response = await createSpace(formData)

    // 调用创建空间API
    loonoolWorkspaces({
      name: formData.name,
      description: formData.description,
    }).then(res => {
      ElMessage.success(res.message);
      if (res.code === 200 && res.data?.id) {
        // 通过事件通知父组件切换组件并传递id
        emit('spaceCreated', res.data.id)
        localStorage.setItem(workspaceId, res.data.id);

        // 创建成功后重置表单
        handleReset()
      }
    }).catch(err => {
      console.error(err);
      // 显示错误提示
      const errorMsg = err?.response?.data?.message || err?.message || '创建失败，请稍后重试';
      ElMessage.error(errorMsg);
    })

  } catch (error) {
    if (error?.fields) {
      // 表单验证失败
      ElMessage.warning('请完善空间信息')
    } else {
      // API调用失败
      ElMessage.error('请完善空间信息')
      console.error('创建空间失败:', error)
    }
  } finally {
    isCreating.value = false
  }
}

// 重置表单
const handleReset = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  formData.name = ''
  formData.description = ''
}
</script>

<style scoped lang="scss">
.review-space-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 8% 20px;
  padding-bottom: 60px;

  // 渐变背景
  background: linear-gradient(135deg,
      #fff5e6 0%,
      #ffe6f0 25%,
      #e6e6ff 50%,
      #e0f0ff 75%,
      #f0f8ff 100%);
  background-size: 200% 200%;
  animation: gradientShift 15s ease infinite;

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 16px;
    padding-top: 60px;
    padding-bottom: 40px;
  }
}

.content-wrapper {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  @media (max-width: 768px) {
    width: 100%;
  }
}

// 主标题
.main-title {
  margin: auto;
  width: 100%;
  text-align: center;
  font-size: 48px;
  font-weight: 600;
  color: #1D2129;
  line-height: 1.2;
  font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;
  margin-bottom: 20px;
  margin-top: 0;

  @media (max-width: 768px) {
    font-size: 32px;
    margin-bottom: 16px;
  }
}

// 副标题
.subtitle {
  font-size: 16px;
  font-weight: 400;
  color: #4E5969;
  text-align: center;
  margin-bottom: 50px;
  font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 30px;
    padding: 0 10px;
  }
}

// 表单区域
.form-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    gap: 30px;
  }
}

.create-space-form {
  background: #FFFFFF;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #E4E5EA;
  width: 100%;

  @media (max-width: 768px) {
    padding: 24px 20px;
    border-radius: 16px;
  }

  :deep(.el-form-item__label) {
    font-weight: 600;
    color: #1D2129;
    font-size: 16px;
    margin-bottom: 12px;
    font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;

    @media (max-width: 768px) {
      font-size: 14px;
    }
  }

  :deep(.el-input__wrapper) {
    border-radius: 8px;
    box-shadow: 0 0 0 1px #E4E5EA inset;

    &:hover {
      box-shadow: 0 0 0 1px #C9CDD4 inset;
    }

    &.is-focus {
      box-shadow: 0 0 0 1px #2134DE inset;
    }
  }

  :deep(.el-textarea__inner) {
    border-radius: 8px;
    border: 1px solid #E4E5EA;

    &:hover {
      border-color: #C9CDD4;
    }

    &:focus {
      border-color: #2134DE;
    }
  }

  :deep(.el-radio-group) {
    width: 100%;
    display: flex;
    gap: 12px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  :deep(.el-radio-button) {
    flex: 1;

    .el-radio-button__inner {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #E4E5EA;
      background: #FFFFFF;
      color: #4E5969;
      font-weight: 500;
      transition: all 0.3s;

      &:hover {
        border-color: #2134DE;
        color: #2134DE;
      }
    }

    &.is-active .el-radio-button__inner {
      background: #2134DE;
      border-color: #2134DE;
      color: #FFFFFF;
    }
  }
}

.form-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }

  .create-btn {
    min-width: 160px;
    height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 8px;
    background: #2134DE;
    border: none;

    &:hover {
      background: #1a2bb8;
    }

    @media (max-width: 768px) {
      width: 100%;
      min-width: auto;
    }
  }

  :deep(.el-button) {
    min-width: 120px;
    height: 48px;
    font-size: 16px;
    border-radius: 8px;

    @media (max-width: 768px) {
      width: 100%;
      min-width: auto;
    }
  }
}
</style>