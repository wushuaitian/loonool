<template>
  <div class="audit-space-page">
    <div class="container">
      <!-- 左列 -->
      <div class="left-column">
        <button class="create-task-btn">创建任务</button>
        <div class="task-list">
          <div v-for="(task, index) in tasks" :key="index" :class="['task-item', { 'active': index === 0 }]">
            <span class="task-name">LOGO图案</span>
            <span v-if="index === 0" class="task-tag">决策者状态可修改</span>
            <span class="task-status">进行中</span>
          </div>
        </div>
      </div>

      <!-- 中列 -->
      <div class="center-column">
        <!-- 上传图片 -->
        <div class="image-upload-section">
          <div v-if="!uploadedImage" class="upload-area">
            <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="handleImageUpload" />
            <div class="upload-placeholder" @click="triggerFileInput">
              <div class="upload-icon">📷</div>
              <div class="upload-text">点击上传图片</div>
              <div class="upload-hint">仅支持单张图片</div>
            </div>
          </div>
          <div v-else class="image-preview">
            <img :src="uploadedImage" alt="上传的图片" class="preview-image" />
            <button class="remove-image-btn" @click="removeImage">×</button>
          </div>
        </div>
        <!-- 标签栏 -->
        <div class="tags-bar">
          <span class="tag-item" :class="{ active: activeTab === 'support' }" @click="switchTab('support')">
            支持 {{ supportCount }}
          </span>
          <span class="tag-item" :class="{ active: activeTab === 'suggestion' }" @click="switchTab('suggestion')">
            建议 {{ suggestionCount }}
          </span>
        </div>

        <!-- 文本块列表 -->
        <div class="text-blocks">
          <div v-for="(block, index) in currentComments" :key="index" class="text-block">
            <div class="text-avatar"></div>
            <p class="text-content">{{ block.content }}</p>
            <div class="text-footer">
              <span class="text-date">{{ block.date }}</span>
            </div>
          </div>
        </div>

        <!-- 评论输入框 -->
        <div class="comment-input-section">
          <div class="comment-input-wrapper">
            <input v-model="commentText" type="text" class="comment-input" placeholder="输入你的评论..."
              @keyup.enter="submitComment" />
            <button class="comment-send-btn" @click="submitComment">
              <span class="send-icon">✈</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 右列 -->
      <div class="right-column">
        <!-- 证据链部分 -->
        <div class="evidence-section">
          <div class="section-header">
            <h3 class="section-title">证据链</h3>
            <div class="upload-btn">上传</div>
          </div>
          <div class="evidence-list">
            <div v-for="(evidence, index) in evidences" :key="index" class="evidence-item">
              <span class="evidence-name">报告1</span>
              <span class="evidence-date">2025-09-30</span>
              <span class="evidence-preview">预览</span>
            </div>
          </div>
        </div>

        <!-- 工具部分 -->
        <div class="tools-section">
          <h3 class="section-title">工具</h3>
          <div class="tools-grid">
            <div v-for="i in 9" :key="i" class="tool-item"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const tasks = ref(Array(5).fill(null))

// 图片上传相关
const uploadedImage = ref<string | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)

// 触发文件选择
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 处理图片上传
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
    // 重置input，允许重复选择同一文件
    target.value = ''
  }
}

// 移除图片
const removeImage = () => {
  uploadedImage.value = null
}

// 当前选中的标签
const activeTab = ref<'support' | 'suggestion'>('support')

// 评论数据
const supportComments = ref([
  {
    content: '基于比较的思考不会造成逻辑混乱，因为即使比较也可以连接成一个和谐的整体。有些概念只有通过它们的对立面才能成为现实，比如"上"与"下"相连，"横"与"竖"相连等等。',
    date: '2025-09-20'
  },
  {
    content: '基于比较的思考不会造成逻辑混乱，因为即使比较也可以连接成一个和谐的整体。有些概念只有通过它们的对立面才能成为现实，比如"上"与"下"相连，"横"与"竖"相连等等。',
    date: '2025-09-20'
  },
  {
    content: '基于比较的思考不会造成逻辑混乱，因为即使比较也可以连接成一个和谐的整体。有些概念只有通过它们的对立面才能成为现实，比如"上"与"下"相连，"横"与"竖"相连等等。',
    date: '2025-09-20'
  },
  {
    content: '基于比较的思考不会造成逻辑混乱，因为即使比较也可以连接成一个和谐的整体。有些概念只有通过它们的对立面才能成为现实，比如"上"与"下"相连，"横"与"竖"相连等等。',
    date: '2025-09-20'
  }
])

const suggestionComments = ref([
  {
    content: '建议示例1',
    date: '2025-09-22'
  }
])

// 评论计数
const supportCount = computed(() => supportComments.value.length)
const suggestionCount = computed(() => suggestionComments.value.length)

// 当前显示的评论列表
const currentComments = computed(() => {
  switch (activeTab.value) {
    case 'support':
      return supportComments.value
    case 'suggestion':
      return suggestionComments.value
    default:
      return supportComments.value
  }
})

// 切换标签
const switchTab = (tab: 'support' | 'suggestion') => {
  activeTab.value = tab
}

// 评论输入
const commentText = ref('')

// 提交评论
const submitComment = () => {
  if (!commentText.value.trim()) {
    return
  }

  const today = new Date().toISOString().split('T')[0] || '2025-09-20'
  const newComment = {
    content: commentText.value.trim(),
    date: today
  }

  switch (activeTab.value) {
    case 'support':
      supportComments.value.push(newComment)
      break
    case 'suggestion':
      suggestionComments.value.push(newComment)
      break
  }

  commentText.value = ''
}

const evidences = ref(Array(4).fill(null))
</script>

<style scoped lang="scss">
.audit-space-page {
  min-height: 100vh;
  width: 100%;
  background: #ffffff;
  padding: 20px;
  font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;

  // 渐变背景
  // background: linear-gradient(135deg,
  //     #fff5e6 0%,
  //     #ffe6f0 25%,
  //     #e6e6ff 50%,
  //     #e0f0ff 75%,
  //     #f0f8ff 100%);
  // background-size: 200% 200%;
  // animation: gradientShift 15s ease infinite;

  // @keyframes gradientShift {
  //   0% {
  //     background-position: 0% 50%;
  //   }

  //   50% {
  //     background-position: 100% 50%;
  //   }

  //   100% {
  //     background-position: 0% 50%;
  //   }
  // }
}

.container {
  display: flex;
  gap: 20px;
  max-width: 1600px;
  margin: 0 auto;
  height: calc(100vh - 40px);
}

// 左列
.left-column {
  width: 280px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  // background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  overflow-y: auto;

  // 自定义滚动条样式
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.35);
    }
  }
}

.create-task-btn {
  width: 100%;
  padding: 12px 20px;
  // background: #e9ecef;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  color: #495057;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #dee2e6;
  }
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.task-item {
  padding: 12px 16px;
  background: #f8f9fa;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #f1f3f5;
  }

  &.active {
    background: #0081ff;
    color: #ffffff;

    .task-name,
    .task-tag,
    .task-status {
      color: #ffffff;
    }
  }
}

.task-name {
  font-size: 14px;
  font-weight: 500;
  color: #212529;
}

.task-tag {
  font-size: 12px;
  color: #6c757d;
}

.task-status {
  font-size: 12px;
  color: #6c757d;
  align-self: flex-end;
}

// 中列
.center-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  padding-right: 10px;

  // 自定义滚动条样式
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.35);
    }
  }
}

// 图片上传区域
.image-upload-section {
  width: 100%;
  margin-bottom: 10px;
}

.upload-area {
  width: 100%;
  border: 2px dashed #e9ecef;
  border-radius: 8px;
  background: #f8f9fa;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    border-color: #0081ff;
    background: #f0f7ff;
  }
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.upload-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.6;
}

.upload-text {
  font-size: 16px;
  color: #495057;
  margin-bottom: 8px;
  font-weight: 500;
}

.upload-hint {
  font-size: 12px;
  color: #adb5bd;
}

.image-preview {
  position: relative;
  border-radius: 8px;
  overflow: visible;
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 20px;
}

.preview-image {
  max-width: 300px;
  max-height: 300px;
  width: auto;
  height: auto;
  display: block;
  object-fit: contain;
}

.remove-image-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
  border: none;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
}

.avatar-section {
  display: flex;
  justify-content: center;
  padding: 40px 0 60px 0;
}

.avatar {
  position: relative;
  width: 120px;
  height: 150px;
}

.avatar-head {
  width: 80px;
  height: 80px;
  background: #8b4513;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 50px;
    background: #8b4513;
    border-radius: 0 0 30px 30px;
  }
}

.avatar-body {
  width: 100px;
  height: 70px;
  background: #ff8c00;
  margin: 10px auto 0;
  border-radius: 8px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background: #ffffff;
    border-radius: 8px 8px 0 0;
  }
}

.tags-bar {
  display: flex;
  gap: 30px;
  justify-content: flex-start;
  padding: 20px 0;
  border-bottom: 1px solid #e9ecef;
}

.tag-item {
  font-size: 14px;
  color: #6c757d;
  cursor: pointer;
  padding-bottom: 8px;
  transition: color 0.2s;
  position: relative;

  &:hover {
    color: #0081ff;
  }

  &.active {
    color: #0081ff;

    // border-bottom: 4px solid #0081ff;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 10%;
      right: 0;
       width: 60%;
      height: 4px;
      background: #0081ff;
      border-radius: 2px; // 圆角效果
    }
  }
}

.text-blocks {
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

.text-block {
  // background: #ffffff;
  // border: 1px solid #e9ecef;
  // border-radius: 8px;
  padding: 20px;
  display: flex;
  gap: 12px;
}

.text-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e9ecef;
  flex-shrink: 0;
}

.text-content {
  font-size: 14px;
  line-height: 1.8;
  color: #212529;
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.text-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-date {
  font-size: 12px;
  color: #6c757d;
}

.send-icon {
  font-size: 16px;
  color: #adb5bd;
  cursor: pointer;

  &:hover {
    color: #0081ff;
  }
}

.comment-input-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.comment-input-wrapper {
  display: flex;
  gap: 12px;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 50px;
  padding: 12px 16px;
}

.comment-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #212529;
  background: transparent;

  &::placeholder {
    color: #adb5bd;
  }
}

.comment-send-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    .send-icon {
      color: #0081ff;
    }
  }

  .send-icon {
    font-size: 18px;
    color: #adb5bd;
  }
}

// 右列
.right-column {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: auto;
  padding-right: 10px;

  // 自定义滚动条样式
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    transition: background 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.35);
    }
  }
}

.evidence-section,
.tools-section {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.upload-btn {
  font-size: 14px;
  color: #000;
  cursor: pointer;
  transition: all 0.2s;
}

.evidence-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.evidence-item {
  background: #ffffff;
  padding: 12px 16px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
}

.evidence-name {
  color: #212529;
  font-weight: 500;
}

.evidence-date {
  color: #6c757d;
  font-size: 12px;
}

.evidence-preview {
  color: #0081ff;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    text-decoration: underline;
  }
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.tool-item {
  aspect-ratio: 1;
  background: #e9ecef;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #dee2e6;
  }
}

// 响应式设计
@media (max-width: 1400px) {
  .container {
    flex-wrap: wrap;
  }

  .left-column,
  .right-column {
    width: 100%;
    max-width: 100%;
  }

  .center-column {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .audit-space-page {
    padding: 12px;
  }

  .container {
    flex-direction: column;
    height: auto;
  }

  .left-column,
  .center-column,
  .right-column {
    width: 100%;
  }
}
</style>