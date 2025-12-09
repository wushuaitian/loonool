<template>
  <!-- 决策空间 -->
  <div class="audit-space-page">
    <div class="container">
      <!-- 左列 -->
      <div class="left-column">
        <!-- 创建任务 -->
        <div class="left-top flex">
          <div class="left-task left-button text-bold-500 text-16">
            创建任务
            <div class="task-create text-12" @click="createTask()">点击创建</div>
          </div>
          <div class="left-invita left-button text-bold-500 text-16">
            创建任务
            <div class="invita-create text-12">点击邀请 </div>
          </div>

        </div>
        <!-- 任务列表 -->
        <div class="task-list flex flex-column">
          <div class="task-item b-r-8 flex justify-between align-center" v-for="(item, index) in taskList" :key="index"
            @click="taskItemClick(item, index)" :class="index == taskCurrentId ? 'task-item-active' : ''">
            <div class="task-item-title text-16 text-bold-400 flex align-center">
              <img src="/img/introduc-one.png" alt="" class="task-img">
              <div class="text-14 m-l-10 text-bold-500">LOGO图案 </div>
            </div>
            <div class="task-item-content">
              <div class="task-item-status m-l-10" :class="getStatusClass(item.status)">
                <span class="status-dot"></span>
                <span class="status-text">{{ item.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 中列 -->
      <div class="center-column">
        <div class="center-top">
          <!-- 上传区域 -->
          <el-upload v-if="!uploadedImageUrl" class="upload-demo" drag
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15" :limit="1" :show-file-list="false"
            :on-change="handleFileChange" :auto-upload="false">
            <img src="/img/upload-img.png" alt="" class="upload-img">
            <div class="el-upload__text text-14 text-bold-400 m-t-10">
              点击上传
            </div>
          </el-upload>
          <!-- 图片展示区域 -->
          <div v-else class="display-img flex flex-column">
            <div class="img-wrapper">
              <img :src="uploadedImageUrl" class="img-center">
              <div class="delete-btn" @click="removeImage">
                <span class="delete-icon">×</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 评论 -->
        <div class="center-comment">
          <div class="comment-top flex justify-between align-center">
            <div class="comment-tab-item flex justify-start ">
              <span class="tag-item text-bold-500 text-16" @click="commentTab('support')"
                :class="activeComment === 'support' ? 'tag-item-active' : ''">
                支持 <span class="text-14" v-show="activeComment == 'support'">11111</span>
              </span>
              <span class="tag-item text-bold-500 text-16" @click="commentTab('suggestion')"
                :class="activeComment === 'suggestion' ? 'tag-item-active' : ''">
                建议 <span class="text-14" v-show="activeComment == 'suggestion'">11111</span>
              </span>
            </div>
            <div class="comment-time text-14 text-14">任务结束时间: <span class="m-l-5 ">2025-09-23</span></div>
          </div>

          <!-- 评论内容 -->
          <div class="comment-content">
            <div class="comment-list">
              <div class="comment-item flex" v-for="(item, index) in commentList" :key="index">
                <div class="comment-avatar">
                  <img :src="item.avatar" alt="" class="avatar-img">
                </div>
                <div class="comment-info flex-1">
                  <div class="comment-header flex justify-between align-center">
                    <div class="comment-name text-16 text-bold-500">{{ item.name }}</div>
                    <div class="comment-date text-14 text-gray">{{ item.date }}</div>
                  </div>
                  <div class="comment-text text-14 text-black m-t-10">{{ item.content }}</div>
                </div>
              </div>
            </div>
            <!-- 输入框 -->
            <div class="comment-input-wrapper flex align-center">
              <input type="text" class="comment-input flex-1" placeholder="建议必须发表、支持可以发可不发" v-model="commentInput" />
              <div class="comment-send-btn flex align-center justify-center" @click="sendComment">
                <img src="/img/upload-img.png" alt="发送" class="send-icon">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右列 -->
      <div class="right-column">
        <!-- 证据链 -->
        <div class="evidence-chain">
          <div class="evidence-header flex justify-between align-center">
            <div class="evidence-title text-16 text-bold-500">证据链</div>
            <div class="upload-evidence-btn text-14 text-bold-400" @click="uploadEvidence">上传证据</div>
          </div>
          <div class="evidence-list flex flex-column">
            <div class="evidence-item flex align-center" v-for="(item, index) in evidenceList" :key="index">
              <div class="evidence-icon-wrapper">
                <img src="/img/report-img.png" alt="PDF" class="evidence-icon">
              </div>
              <div class="evidence-info flex-1 flex justify-between">
                <div class="evidence-name text-14 text-bold-500">{{ item.name }}</div>
                <div class="evidence-date text-12 text-gray">{{ item.date }}</div>
              </div>
              <div class="evidence-share-btn text-12 text-bold-400" @click="shareEvidence(item, index)">分享</div>
            </div>
          </div>
        </div>

        <!-- 工具 -->
        <div class="tools-section m-t-20 flex flex-column">
          <div class="tools-title text-16 text-bold-500 m-b-20">工具</div>
          <div class="tools-grid">
            <div class="tool-item b-r-8" v-for="(tool, index) in toolsList" :key="index"
              @click="toolClick(tool, index)">
              <img v-if="tool.icon" :src="tool.icon" alt="" class="tool-icon">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 创建任务弹窗 -->
    <el-dialog v-model="createTaskDialogVisible" title="创建任务" :width="600" :close-on-click-modal="false"
      class="create-task-dialog">
      <div class="create-task-content">
        <!-- 标签页 -->
        <el-tabs v-model="activeTaskTab" class="task-tabs">
          <el-tab-pane label="图片" name="image"></el-tab-pane>
          <el-tab-pane label="文案" name="copy"></el-tab-pane>
          <el-tab-pane label="文档" name="document"></el-tab-pane>
          <el-tab-pane label="视觉图" name="visual"></el-tab-pane>
          <el-tab-pane label="UI" name="ui"></el-tab-pane>
        </el-tabs>

        <!-- 任务名称输入 -->
        <div class="task-name-section">
          <label class="task-name-label">任务名称</label>
          <el-input v-model="taskName" placeholder="请输入任务名称" class="task-name-input" />
        </div>

        <!-- 上传区域 -->
        <div class="task-upload-section">
          <el-upload class="task-upload" drag :action="uploadAction" :auto-upload="false" :file-list="fileList"
            :limit="1" :on-change="dialogFileChange">
            <div class="upload-content">
              <div class="upload-text">点击上传</div>
            </div>
          </el-upload>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeCreateTaskDialog">取消</el-button>
          <el-button type="primary" @click="confirmCreateTask">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, onMounted, watch } from 'vue';
import { tasksuploadImage, workspacesTasks } from "../../composables/login";


// 定义 props 接收 spaceId
const props = defineProps({
  spaceId: {
    type: [String, Number],
    default: null
  }
})



// 左侧

/**
 * 获取任务列表
 */
const getTaskList = async () => {
  const res = await workspacesTasks({
    workspaceId: localStorage.getItem("workspaceId")
  })
  console.log(res,'resresres');
  
  if (res.code == 200) {
    taskList.value = res.data
  }
}


// 任务列表
const taskList = ref([
  {
    name: '任务',
    status: '进行中'
  },
  {
    name: '任务',
    status: '已完成'
  }, {
    name: '任务',
    status: '未完成'
  }, {
    name: '任务',
    status: '进行中'
  }, {
    name: '任务',
    status: '进行中'
  },
])

// 获取状态样式类
const getStatusClass = (status) => {
  if (status === '已完成') {
    return 'status-completed'
  } else if (status === '未完成') {
    return 'status-incomplete'
  } else {
    return 'status-progress'
  }
}

// 任务列表 当前点击
const taskCurrentId = ref(null)

const taskItemClick = (item, index) => {
  taskCurrentId.value = index
}


// 中间

// 上传的图片URL
const uploadedImageUrl = ref('')

// 上传
const handleFileChange = (file, fileList) => {
  console.log('文件变化:', file, fileList)
  // 生成图片预览URL
  if (file.raw) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedImageUrl.value = e.target.result
    }
    reader.readAsDataURL(file.raw)
  } else if (file.url) {
    uploadedImageUrl.value = file.url
  }
}

// 删除图片，重新显示上传区域
const removeImage = () => {
  uploadedImageUrl.value = ''
}

// 当前评论选择
const activeComment = ref('support')

const commentTab = (tab) => {
  activeComment.value = tab
}

// 评论列表数据
const commentList = ref([
  {
    avatar: '/img/flower.png',
    name: '负责人',
    content: '根据对比来思考并不会让人逻辑混乱,因为即使是对比也可以联结称一个和谐的整体。有些概念只有通过它的对立面才能成为现实,比如"上"连着"下","水平"连着"垂直",等等',
    date: '2025-09-20'
  },
  {
    avatar: '/img/flower.png',
    name: '负责人',
    content: '根据对比来思考并不会让人逻辑混乱,因为即使是对比也可以联结称一个和谐的整体。有些概念只有通过它的对立面才能成为现实,比如"上"连着"下","水平"连着"垂直",等等',
    date: '2025-09-20'
  },
  {
    avatar: '/img/flower.png',
    name: '负责人',
    content: '根据对比来思考并不会让人逻辑混乱,因为即使是对比也可以联结称一个和谐的整体。有些概念只有通过它的对立面才能成为现实,比如"上"连着"下","水平"连着"垂直",等等',
    date: '2025-09-20'
  },
  {
    avatar: '/img/flower.png',
    name: '负责人',
    content: '根据对比来思考并不会让人逻辑混乱,因为即使是对比也可以联结称一个和谐的整体。有些概念只有通过它的对立面才能成为现实,比如"上"连着"下","水平"连着"垂直",等等',
    date: '2025-09-20'
  }
])

// 评论输入
const commentInput = ref('')

const sendComment = () => {
  if (commentInput.value.trim()) {
    // 发送评论逻辑
    console.log('发送评论:', commentInput.value)
    commentInput.value = ''
  }
}

// 右侧
// 证据链列表
const evidenceList = ref([
  {
    name: '报告1',
    date: '2025-09-30'
  },
  {
    name: '报告1',
    date: '2025-09-30'
  },
  {
    name: '报告1',
    date: '2025-09-30'
  },
  {
    name: '报告1',
    date: '2025-09-30'
  },
  {
    name: '报告1',
    date: '2025-09-30'
  }
])

// 上传证据
const uploadEvidence = () => {
  console.log('上传证据')
  // 上传逻辑
}

// 分享证据
const shareEvidence = (item, index) => {
  console.log('分享证据:', item, index)
  // 分享逻辑
}

// 工具列表
const toolsList = ref([
  { icon: null },
  { icon: null },
  { icon: null },
  { icon: null },
  { icon: null },
  { icon: null },
  { icon: null },
  { icon: null },
  { icon: null }
])

// 工具点击
const toolClick = (tool, index) => {
  console.log('点击工具:', tool, index)
  // 工具点击逻辑
}


// 创建任务弹窗相关
const createTaskDialogVisible = ref(false)
const activeTaskTab = ref('image')
const taskName = ref('')
const fileList = ref([])
const uploadAction = ref('https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15')
const uploadedFile = ref(null) // 存储上传的文件对象
const fileStream = ref(null)   // 存储文件流


// 打开创建任务弹窗
const createTask = () => {
  createTaskDialogVisible.value = true
  // 重置表单
  taskName.value = ''
  fileList.value = []
  activeTaskTab.value = 'image'
  uploadedFile.value = null
  fileStream.value = null
}

// 关闭创建任务弹窗
const closeCreateTaskDialog = () => {
  createTaskDialogVisible.value = false
  taskName.value = ''
  fileList.value = []
  uploadedFile.value = null
  fileStream.value = null
}

// 文件变化处理
const dialogFileChange = (file, fileList) => {
  console.log('文件变化:', file)
  if (file && file.raw) {
    uploadedFile.value = file

    // 创建 FormData 对象用于上传
    const fileData = new FormData()
    fileData.append("file", file.raw)

    // 如果需要将文件转换为流格式
    const reader = new FileReader()
    reader.onload = (e) => {
      fileStream.value = e.target.result
      console.log('文件已转换为流:', fileStream.value)
    }
    reader.readAsArrayBuffer(file.raw)
  }
}

// 确认创建任务
const confirmCreateTask = () => {
  if (!taskName.value.trim()) {
    ElMessage.warning('请输入任务名称')
    return
  }

  tasksuploadImage({
    file: fileStream.value,
    workspaceId: String(workspaceId.value),
    taskName: taskName.value,

  }).then(res => {
    console.log(res, 'resresres');

  })
  // 这里可以添加创建任务的逻辑
  console.log('创建任务:', {
    name: taskName.value,
    type: activeTaskTab.value,
    file: fileList.value,
    fileStream: fileStream.value
  })
  ElMessage.success('任务创建成功')
  // closeCreateTaskDialog()
}


// 空间ID
const workspaceId = ref(null)

onMounted(() => {
  if (props.spaceId) {
    console.log('接收到的 spaceId:', props.spaceId)
    workspaceId.value = props.spaceId

    getTaskList()
  }
})

// 监听 spaceId 变化
watch(() => props.spaceId, (newId) => {
  if (newId) {
    console.log('spaceId 更新为:', newId)
    // 这里可以根据 spaceId 加载相关数据
  }
}, { immediate: true })
</script>

<style scoped lang="scss">
// 颜色变量
$bg-white: #ffffff;
$bg-gray-light: #F7F8FA;
$bg-gray-lighter: #F1F3F5;
$bg-gray-lightest: #E9ECEF;
$bg-blue-light: #E9EEFF;
$bg-blue-lighter: #D4DEFF;
$bg-blue-lightest: #E9EBFC;
$color-primary: #2134DE;
$color-primary-hover: #1a2bb8;
$color-text: #1D2129;
$color-text-gray: #4E5969;
$color-text-light: #85909C;
$color-text-lighter: #86909C;
$color-text-lightest: #646E7C;
$color-progress: #FFAB01;
$color-completed: #5CD81A;
$color-incomplete: #FF1B1B;
$bg-progress: #F8EEDB;
$bg-completed: #E1F3DB;
$bg-incomplete: #F8D9DB;

// 滚动条样式混入
@mixin scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

// 按钮交互混入
@mixin button-interaction {
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: $bg-blue-lighter;
  }

  &:active {
    transform: scale(0.95);
  }
}

.audit-space-page {
  min-height: 100vh;
  width: 100%;
  background: $bg-white;
  padding: 20px;
  font-weight: 400;
  font-family: PingFangSC, PingFang SC, -apple-system, BlinkMacSystemFont, sans-serif;
}

.container {
  display: flex;
  gap: 20px;
  max-width: 1600px;
  margin: 0 auto;
  height: calc(100vh - 40px);
}

.left-column {
  width: 350px;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 8px;
  overflow-y: auto;
  @include scrollbar;

  .left-top {
    gap: 10px;

    .left-task {
      background: linear-gradient(90deg, #CAFFEC 0%, #EDF5FF 34%, #D4F4FF 63%, #D9D7FE 100%);

      .task-create {
        background: linear-gradient(270deg, rgba(224, 246, 240, 0) 0%, #BDF2E3 100%);
        color: $color-text-gray;
        padding: 8px;
        margin-top: 5px;
        border-radius: 14px;
        width: 66px;
      }
    }

    .left-invita {
      background: linear-gradient(134deg, #ECEFFF 0%, #FFECFF 100%);

      .invita-create {
        background: linear-gradient(270deg, rgba(218, 218, 255, 0) 0%, #DADAFF 100%);
        color: $color-text-gray;
        padding: 8px;
        margin-top: 5px;
        border-radius: 14px;
        width: 66px;
      }
    }

    .left-button {
      flex: 1;
      padding-top: 15px;
      padding-left: 18px;
      border-radius: 21px;
      height: 90px;
    }
  }

  .task-list {
    height: 80vh;
    gap: 10px;

    .task-item {
      background-color: $bg-gray-light;
      padding: 10px;
      color: $color-text-lightest;
    }

    .task-item-title .task-img {
      width: 40px;
      height: 40px;
    }

    .task-item-active {
      background-color: $bg-blue-light !important;
      border: 1px solid $color-primary;
    }

    .task-item-status {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 10px;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 400;
      white-space: nowrap;

      .status-dot {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        display: inline-block;
      }

      .status-text {
        line-height: 1;
      }

      &.status-progress {
        background-color: $bg-progress;
        color: $color-progress;

        .status-dot {
          background-color: $color-progress;
        }
      }

      &.status-completed {
        background-color: $bg-completed;
        color: $color-completed;

        .status-dot {
          background-color: $color-completed;
        }
      }

      &.status-incomplete {
        background-color: $bg-incomplete;
        color: $color-incomplete;

        .status-dot {
          background-color: $color-incomplete;
        }
      }
    }
  }
}

.center-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  @include scrollbar;

  .center-top {
    flex: 0.7;
    min-height: 0;

    .upload-demo {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;

      .el-upload__text {
        color: $color-text-light;
      }

      :deep(.el-upload),
      :deep(.el-upload-dragger) {
        width: 100%;
        height: 100%;
      }

      :deep(.el-upload-dragger) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
      }
    }

    .upload-img {
      width: 93px;
      height: 67px;
    }

    .display-img {
      height: 100%;
      background-color: #F7F8FA;
      border-radius: 8px;
      position: relative;

      .img-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .img-center {
        width: auto;
        max-width: 65%;
        height: 100%;
        margin: auto;
      }

      .delete-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 32px;
        height: 32px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        z-index: 10;

        &:hover {
          background-color: rgba(0, 0, 0, 0.7);
          transform: scale(1.1);
        }

        .delete-icon {
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
          line-height: 1;
          user-select: none;
        }
      }
    }
  }

  .center-comment {
    flex: 1.3;
    display: flex;
    flex-direction: column;
    min-height: 0;

    .comment-top {
      .comment-tab-item {
        gap: 30px;
        padding: 20px 0;

        .tag-item {
          transition: color 0.2s;
          position: relative;
          color: $color-text-light;
        }

        .tag-item-active {
          color: $color-primary;
          border-bottom: 4px solid $color-primary;
        }
      }

      .comment-time {
        color: $color-text-light;
      }
    }

    .comment-content {
      background-color: $bg-gray-light;
      border-radius: 20px;
      min-height: 50px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-height: calc(100vh - 400px);
      overflow-y: auto;

      .comment-list {
        display: flex;
        flex-direction: column;
        gap: 20px;
        flex: 1;
        overflow-y: auto;

        .comment-item {
          gap: 15px;
          padding-bottom: 20px;

          &:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }

          .comment-avatar {
            width: 60px;
            height: 60px;
            min-width: 60px;
            border-radius: 50%;
            overflow: hidden;
            background-color: $bg-gray-lightest;

            .avatar-img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
            }
          }

          .comment-info {
            min-width: 0;

            .comment-header {
              .comment-name {
                color: $color-text;
              }

              .comment-date {
                color: $color-text-lighter;
                white-space: nowrap;
              }
            }

            .comment-text {
              color: $color-text;
              line-height: 1.6;
              word-break: break-word;
              white-space: pre-wrap;
            }
          }
        }
      }

      .comment-input-wrapper {
        background-color: $bg-white;
        border-radius: 24px;
        padding: 8px 10px;
        gap: 12px;
        margin-top: auto;

        .comment-input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          color: $color-text;
          padding: 0;

          &::placeholder {
            color: $color-text-lighter;
          }
        }

        .comment-send-btn {
          width: 40px;
          height: 40px;
          min-width: 40px;
          background-color: $color-primary;
          border-radius: 50%;
          @include button-interaction;

          &:hover {
            background-color: $color-primary-hover;
            transform: scale(1.05);
          }

          .send-icon {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}

.right-column {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-y: auto;
  padding-right: 10px;
  padding-bottom: 40px;
  @include scrollbar;

  .evidence-chain {
    flex: 0.5;
    display: flex;
    flex-direction: column;
    min-height: 0;
    background-color: $bg-gray-light;
    padding: 10px 12px;
    border-radius: 10px;

    .evidence-header {
      margin-bottom: 20px;

      .evidence-title {
        color: $color-text;
      }

      .upload-evidence-btn {
        color: $color-primary;
        background-color: $bg-blue-light;
        padding: 8px 16px;
        border-radius: 16px;
        @include button-interaction;
      }
    }

    .evidence-list {
      flex: 1;
      overflow-y: auto;
      gap: 8px;

      .evidence-item {
        padding: 3px 10px;
        background-color: $bg-white;
        border-radius: 12px;
        transition: all 0.3s;

        &:hover {
          background-color: $bg-gray-light;
        }

        .evidence-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;

          &.dashed::after {
            border: 1px dashed #DDD;
            border-radius: 8px;
          }

          .evidence-icon {
            width: 32px;
            height: 32px;
          }
        }

        .evidence-info {
          min-width: 0;
          position: relative;
          padding: 4px 5px;

          &.dashed::after {
            border: 1px dashed #DDD;
            border-radius: 4px;
          }

          .evidence-name {
            color: $color-text;
            margin-bottom: 4px;
          }

          .evidence-date {
            color: $color-text-lighter;
          }
        }

        .evidence-share-btn {
          color: $color-text-gray;
          background-color: $bg-gray-light;
          padding: 6px 14px;
          border-radius: 6px;
          white-space: nowrap;
          @include button-interaction;
        }
      }
    }
  }

  .tools-section {
    flex: 0.7;
    min-height: 0;
    padding: 18px 20px;
    background-color: $bg-gray-light;
    border-radius: 12px;

    .tools-title {
      color: $color-text;
      margin-bottom: 20px;
    }

    .tools-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;

      .tool-item {
        aspect-ratio: 1;
        background-color: $bg-gray-lighter;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;
        min-height: 0;

        &:hover {
          background-color: $bg-gray-lightest;
        }

        .tool-icon {
          width: 40px;
          height: 40px;
        }
      }
    }
  }
}

::v-deep .el-upload-dragger:hover {
  background: $bg-blue-lightest;
  border: 1px dashed $color-primary !important;
}

// 创建任务弹窗样式
:deep(.create-task-dialog) {
  .el-dialog__header {
    padding: 20px 20px 10px;
    border-bottom: none;

    .el-dialog__title {
      font-size: 16px;
      font-weight: 500;
      color: $color-text;
    }
  }

  .el-dialog__body {
    padding: 20px;
  }

  .el-dialog__footer {
    padding: 10px 20px 20px;
    border-top: none;
  }
}

.create-task-content {
  display: flex;
  flex-direction: column;
  gap: 20px;

  .task-tabs {
    :deep(.el-tabs__header) {
      margin: 0 0 10px 0;
    }

    :deep(.el-tabs__nav-wrap::after) {
      display: none;
    }

    :deep(.el-tabs__item) {
      padding: 0 20px;
      font-size: 14px;
      color: $color-text-light;
      height: 40px;
      line-height: 40px;

      &.is-active {
        color: $color-primary;
        font-weight: 500;
      }
    }

    :deep(.el-tabs__active-bar) {
      background-color: $color-primary;
    }
  }

  .task-name-section {
    display: flex;
    flex-direction: column;
    gap: 10px;

    .task-name-label {
      font-size: 14px;
      color: $color-text;
      font-weight: 400;
    }

    .task-name-input {
      :deep(.el-input__wrapper) {
        border-radius: 8px;
        background-color: $bg-gray-light;
        box-shadow: none;
        padding: 0 15px;

        &:hover {
          box-shadow: none;
        }

        &.is-focus {
          box-shadow: 0 0 0 1px $color-primary inset;
        }
      }

      :deep(.el-input__inner) {
        height: 40px;
        line-height: 40px;
        color: $color-text;

        &::placeholder {
          color: $color-text-lighter;
        }
      }
    }
  }

  .task-upload-section {
    .task-upload {
      width: 100%;

      :deep(.el-upload) {
        width: 100%;
      }

      :deep(.el-upload-dragger) {
        width: 100%;
        height: 200px;
        border-radius: 8px;
        background-color: $bg-gray-light;
        border: 1px dashed $bg-gray-lightest;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          background-color: $bg-gray-lighter;
          border-color: $color-primary;
        }
      }

      .upload-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;

        .upload-text {
          font-size: 14px;
          color: $color-text-lighter;
          margin-top: 10px;
        }
      }
    }
  }
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;

  .el-button {
    padding: 10px 20px;
    border-radius: 6px;
  }
}
</style>