<template>
  <!-- 工具页 ai生成 -->
  <div class="ai-tool-page">
    <!-- 主要内容区域 -->
    <div class="content-wrapper">
      <!-- 标题 -->
      <div class="main-title">
        视觉内容进入商业世界前的安全层。
      </div>

      <!-- 副标题 -->
      <div class="subtitle">
        查重・存证・维权 —— 一站式原创设计保护平台
      </div>
      
      <!-- 补充说明 -->
      <div class="subtitle-extra">
        精准识别抄袭风险，锁定原创权属，让每一份创意都有专属 "保护盾"
      </div>

      <!-- 上传区域 -->
      <div class="upload-section">
        <div class="upload-container" 
             @click="triggerFileInput"
             @dragover.prevent="handleDragOver"
             @dragleave.prevent="handleDragLeave"
             @drop.prevent="handleDrop"
             :class="{ 'drag-over': isDragOver }">
          <input 
            ref="fileInputRef"
            type="file" 
            accept="image/jpeg,image/png,image/gif"
            @change="handleFileSelect"
            style="display: none;"
          />
          
          <div class="upload-content">
            <div class="upload-icon-wrapper">
              <svg v-if="!uploadedImages.length" class="upload-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- 照片图标 -->
                <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5" fill="none"/>
                <path d="M3 15l5-5 4 4 5-5 4 4v2H3z" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                <circle cx="8" cy="9" r="1.5" fill="currentColor"/>
              </svg>
              <div v-else class="image-preview-grid">
                <div 
                  v-for="(img, index) in uploadedImages" 
                  :key="index"
                  class="preview-item"
                >
                  <img :src="img.url" :alt="img.name" class="preview-image">
                  <div class="remove-btn" @click.stop="removeImage(index)">×</div>
                  <div v-if="img.uploading" class="uploading-overlay">
                    <div class="loading-spinner"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="!uploadedImages.length" class="upload-text">
              点击添加图片
            </div>
          </div>

          <div class="submit-btn"
               :class="{ 'has-images': uploadedImages.length > 0 }"
               @click.stop="handleSubmit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </div>
        </div>

        <!-- 说明文字 -->
        <div class="upload-hint">
          上传最大5MB的JPEG\PNG或GIF格式图片，即可立即进行原创性验证。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 文件输入引用
const fileInputRef = ref<HTMLInputElement | null>(null)

// 拖拽状态
const isDragOver = ref(false)

// 已上传的图片列表
const uploadedImages = ref<Array<{
  name: string
  url: string
  file: File
  uploading?: boolean
}>>([])

// 触发文件选择
const triggerFileInput = () => {
  if (uploadedImages.value.length >= 5) {
    ElMessage.warning('最多只能上传5张图片')
    return
  }
  fileInputRef.value?.click()
}

// 处理文件选择
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    processFiles(Array.from(target.files))
  }
  // 重置input，允许重复选择同一文件
  if (target) {
    target.value = ''
  }
}

// 处理拖拽悬停
const handleDragOver = (event: DragEvent) => {
  isDragOver.value = true
}

// 处理拖拽离开
const handleDragLeave = () => {
  isDragOver.value = false
}

// 处理文件拖放
const handleDrop = (event: DragEvent) => {
  isDragOver.value = false
  if (event.dataTransfer?.files) {
    const files = Array.from(event.dataTransfer.files)
    processFiles(files)
  }
}

// 处理文件
const processFiles = (files: File[]) => {
  const remainingSlots = 5 - uploadedImages.value.length
  const filesToProcess = files.slice(0, remainingSlots)

  if (files.length > remainingSlots) {
    ElMessage.warning(`最多只能上传5张图片，已选择前${remainingSlots}张`)
  }

  filesToProcess.forEach(file => {
    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      ElMessage.error(`${file.name} 不是支持的格式（JPEG/PNG/GIF）`)
      return
    }

    // 检查文件大小（5MB）
    if (file.size > 5 * 1024 * 1024) {
      ElMessage.error(`${file.name} 文件大小超过5MB`)
      return
    }

    // 创建预览URL
    const url = URL.createObjectURL(file)
    uploadedImages.value.push({
      name: file.name,
      url: url,
      file: file,
      uploading: false
    })
  })
}

// 移除图片
const removeImage = (index: number) => {
  const removed = uploadedImages.value[index]
  if (removed) {
    URL.revokeObjectURL(removed.url)
    uploadedImages.value.splice(index, 1)
  }
}

// 提交处理
const handleSubmit = () => {
  if (uploadedImages.value.length === 0) {
    ElMessage.warning('请先上传图片')
    return
  }

  // 这里可以添加实际的提交逻辑
  ElMessage.success('开始进行原创性验证...')
  
  // 模拟上传过程
  uploadedImages.value.forEach(img => {
    img.uploading = true
  })

  // 模拟上传完成
  setTimeout(() => {
    uploadedImages.value.forEach(img => {
      img.uploading = false
    })
    ElMessage.success('验证完成')
  }, 2000)
}
</script>

<style scoped lang="scss">
.ai-tool-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  display: flex;
//   align-items: center;
  justify-content: center;
  padding: 10% 20px;

  // 渐变背景
  background: linear-gradient(
    135deg,
    #fff5e6 0%,
    #ffe6f0 25%,
    #e6e6ff 50%,
    #e0f0ff 75%,
    #f0f8ff 100%
  );
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
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  padding-top: 0;

  @media (max-width: 768px) {
    width: 100%;
  }
}

// 主标题
.main-title {
  margin: auto;
  width: 700px;
  text-align: center;
  font-size: 60px;
  font-weight: 600;
  color: #1D2129;
  line-height: 1.2;
  font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;
  margin-bottom: 0;
  margin-top: 0;

  @media (max-width: 768px) {
    font-size: 32px;
    width: 90%;
  }
}

// 副标题
.subtitle {
  font-size: 16px;
  font-weight: 600;
  color: #1D2129;
  text-align: center;
  padding-top: 50px;
  margin-bottom: 0;
  font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
    padding-top: 30px;
  }
}

// 补充说明
.subtitle-extra {
  font-size: 16px;
  font-weight: 600;
  color: #1D2129;
  text-align: center;
  padding-top: 20px;
  margin-bottom: 60px;
  font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
    padding-top: 15px;
    margin-bottom: 40px;
  }
}

// 上传区域
.upload-section {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
}

.upload-container {
  width: 100%;
  background: #FFFFFF;
  border: 1px solid #E4E5EA;
  border-radius: 50px;
  padding: 12px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  max-height: 120px;
  overflow: hidden;

  &:hover {
    border-color: #DDE0E7;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  }

  &.drag-over {
    border-color: #2134DE;
    border-style: dashed;
    background: #F7F8FA;
  }

  @media (max-width: 768px) {
    border-radius: 24px;
    padding: 10px 16px;
    min-height: 56px;
    max-height: 100px;
  }
}

.upload-content {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    gap: 12px;
  }
}

.upload-icon-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.upload-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  color: #86909C;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }
}

.upload-text {
  font-size: 16px;
  color: #4E5969;
  font-weight: 400;
  font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;

  @media (max-width: 768px) {
    font-size: 14px;
  }
}

// 图片预览网格
.image-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40px, 1fr));
  gap: 6px;
  width: 100%;
  max-width: 500px;
  max-height: 80px;
  overflow-y: auto;
  padding-right: 4px;

  // 自定义滚动条样式
  &::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #DDE0E7;
    border-radius: 2px;
    
    &:hover {
      background: #C9CDD4;
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(36px, 1fr));
    gap: 5px;
    max-width: 100%;
    max-height: 70px;
  }
}

.preview-item {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #E4E5EA;
  background: #F7F8FA;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border-radius: 4px;
  }

  .preview-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .remove-btn {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 16px;
    height: 16px;
    background: #FF4D4F;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    cursor: pointer;
    z-index: 2;
    transition: transform 0.2s;

    @media (max-width: 768px) {
      width: 14px;
      height: 14px;
      font-size: 10px;
      top: -3px;
      right: -3px;
    }

    &:hover {
      transform: scale(1.1);
    }
  }

  .uploading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .loading-spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
}

.add-more-btn {
  width: 40px;
  height: 40px;
  border: 1px dashed #DDE0E7;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F7F8FA;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    border-radius: 4px;
  }

  &:hover {
    border-color: #2134DE;
    background: #E3E3FF;
  }

  .add-icon {
    font-size: 18px;
    color: #4E5969;
    font-weight: 300;
    line-height: 1;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
}

// 提交按钮
.submit-btn {
  width: 40px;
  height: 40px;
  background: #C9CDD4;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s;
  color: white;
  flex-shrink: 0;
  margin-left: 15px;

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    margin-left: 10px;
  }

  &.has-images {
    background: #2134DE;
    
    &:hover {
      background: #1a2bb8;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(33, 52, 222, 0.3);
    }
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
    }
  }
}

// 说明文字
.upload-hint {
  margin-top: 20px;
  font-size: 14px;
  color: #4E5969;
  text-align: center;
  font-weight: 400;
  font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 12px;
    padding: 0 20px;
  }
}
</style>