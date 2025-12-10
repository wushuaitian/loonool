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
            邀请好友
            <div class="invita-create text-12" @click="openInviteFriendsDialog">点击邀请 </div>
          </div>

        </div>
        <!-- 任务列表 -->
        <div class="task-list flex flex-column">
          <!-- 任务列表为空时显示 -->
          <div v-if="taskList.length === 0" class="empty-task-list flex align-center justify-center">
            <div class="empty-text text-16 text-gray">暂无任务</div>
          </div>
          <div v-else class="task-item b-r-8 flex justify-between align-center" v-for="(item, index) in taskList"
            :key="index" @click="taskItemClick(item, index)" :class="index == taskCurrentId ? 'task-item-active' : ''">
            <div class="task-item-title text-16 text-bold-400 flex align-center">
              <img src="/img/introduc-one.png" alt="" class="task-img">
              <div class="text-14 m-l-10 text-bold-500">{{item.title}} </div>
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
              <span class="tag-item text-bold-500 text-18" @click="commentTab('support')"
                :class="activeComment === 'support' ? 'tag-item-active' : ''">
                支持 <span class="text-14" v-show="activeComment == 'support'">11111</span>
              </span>
              <span class="tag-item text-bold-500 text-18" @click="commentTab('suggestion')"
                :class="activeComment === 'suggestion' ? 'tag-item-active' : ''">
                建议 <span class="text-14" v-show="activeComment == 'suggestion'">11111</span>
              </span>
            </div>
            <div class="comment-time text-14 text-14">任务结束时间: <span class="m-l-5 ">2025-09-23</span></div>
          </div>

          <!-- 评论内容 -->
          <div class="comment-content">
            <div class="comment-list">
              <!-- 暂无评论 -->
              <div v-if="commentList.length === 0" class="empty-comment flex align-center justify-center">
                <div class="empty-text text-14 text-gray">暂无评论</div>
              </div>
              <div v-else class="comment-item flex" v-for="(item, index) in commentList" :key="index">
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
                <svg class="send-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 2L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
                </svg>
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
            <!-- 暂无证据链 -->
            <div v-if="evidenceList.length === 0" class="empty-evidence flex align-center justify-center">
              <div class="empty-text text-14 text-gray">暂无证据链</div>
            </div>
            <div v-else class="evidence-item flex align-center" v-for="(item, index) in evidenceList" :key="index">
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
    <div v-if="createTaskDialogVisible" class="modal-overlay" @click.self="closeCreateTaskDialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">创建任务</h2>
          <button class="modal-close-btn" @click="closeCreateTaskDialog">×</button>
        </div>

        <!-- 标签页 -->
        <div class="modal-tabs">
          <div v-for="tab in taskTabs" :key="tab.value" :class="['modal-tab', { active: activeTaskTab === tab.value }]"
            @click="activeTaskTab = tab.value" class="text-bold-500 text-14">
            {{ tab.label }}
          </div>
        </div>

        <!-- 任务名称输入 -->
        <div class="modal-form-item flex align-center">
          <label class="form-label m-r-10 text-bold-500 text-16">任务名称</label>
          <input v-model="taskName" type="text" class="form-input" placeholder="请输入任务名称" />
        </div>

        <!-- 上传区域 -->
        <div class="modal-upload-section">
          <div v-if="!uploadedTaskFile" class="modal-upload-area" @click="triggerTaskFileInput">
            <div class="modal-upload-text">点击上传</div>
          </div>
          <div v-else class="modal-upload-preview">
            <img v-if="isImageFile" :src="uploadedTaskFile" alt="预览" class="modal-preview-image" />
            <div v-else class="modal-file-info">
              <span class="modal-file-name">{{ uploadedTaskFileName }}</span>
            </div>
            <button class="modal-remove-btn" @click="removeTaskFile">×</button>
          </div>
          <input ref="taskFileInput" type="file" :accept="getFileAccept()" style="display: none"
            @change="handleTaskFileUpload" />
        </div>

        <!-- 操作按钮 -->
        <div class="modal-actions">
          <button class="modal-btn modal-btn-cancel" @click="closeCreateTaskDialog">取消</button>
          <button class="modal-btn modal-btn-confirm" @click="confirmCreateTask">确认</button>
        </div>
      </div>
    </div>
    <!-- 邀请好友弹窗 -->
    <div v-if="inviteFriendsVisible" class="modal-overlay" @click.self="closeInviteFriendsDialog"
      @click="activeRoleDropdownIndex = null">
      <div class="modal-content invite-modal-content">
        <div class="modal-header">
          <h2 class="modal-title">邀请好友</h2>
          <button class="modal-close-btn" @click="closeInviteFriendsDialog">×</button>
        </div>

        <!-- 现有成员列表 -->
        <div class="invite-members-section m-auto b-r-8">
          <div class="members-table">
            <div class="members-table-header">
              <div class="table-col-member">成员</div>
              <div class="table-col-email">邮箱</div>
              <div class="table-col-role">项目角色</div>
            </div>
            <div class="members-table-body">
              <div class="members-table-row" v-for="(member, index) in membersList" :key="index"
                :class="{ 'row-selected': selectedMemberIndex === index }">
                <div class="table-col-member">
                  <img :src="member.avatar" :alt="member.name" class="member-avatar">
                  <span class="member-name">{{ member.name }}</span>
                </div>
                <div class="table-col-email">{{ member.email }}</div>
                <div class="table-col-role" v-if="member.canEdit">
                  <div class="role-select-wrapper" @click.stop="toggleRoleDropdown(index)">
                    <span class="role-text">{{ member.role }}</span>
                    <span class="role-dropdown-icon">▼</span>
                    <div v-if="activeRoleDropdownIndex === index" class="role-dropdown-menu" @click.stop>
                      <div class="role-dropdown-item" :class="{ 'role-dropdown-item-active': member.role === '项目管理人' }"
                        @click="updateMemberRole(index, '项目管理人')">
                        项目管理人
                      </div>
                      <div class="role-dropdown-item" :class="{ 'role-dropdown-item-active': member.role === '发言人' }"
                        @click="updateMemberRole(index, '发言人')">
                        发言人
                      </div>
                    </div>
                  </div>
                </div>
                <div class="table-col-role" v-else>
                  <span class="role-text">{{ member.role }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 新邀请输入区域 -->
        <div class="invite-input-section">
          <div class="invite-form-item">
            <label class="invite-label">邮箱</label>
            <input v-model="inviteEmail" type="email" class="invite-email-input" placeholder="请输入邮箱号"
              @keyup.enter="handleInvite" />
          </div>
          <button class="invite-btn" @click="handleInvite">立即邀请</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { ref, computed, onMounted, watch } from 'vue';
import { loonoolUploadImage, loonoolWorkspacesTasks, tasksgetTaskComments, tasksgetTaskDetail } from "../../composables/login";
import { get } from '@nuxt/ui/runtime/utils/index.js';


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
  console.log(typeof (workspaceId.value), 'ptypeof');
  const res = await loonoolWorkspacesTasks({
    workspaceId: workspaceId.value
  })

  if (res.code == 200) {
    taskList.value = res.data || []
    // 如果有任务列表，默认选中最新创建的任务
    // 如果API返回的是倒序（最新的在前面），则选中第一个（index 0）
    // 如果API返回的是正序（最新的在后面），则选中最后一个
    if (taskList.value.length > 0) {
      // 默认选中最后一个任务（假设新创建的任务会被添加到列表末尾）
      // 如果API返回的是倒序，可以改为 0
      const selectedIndex = taskList.value.length - 1
      taskCurrentId.value = selectedIndex
      currentTask.value = taskList.value[selectedIndex]
      // 获取选中任务的评论和证据链
      await getCommentList()
      await getEvidenceList()
    } else {
      // 没有任务时清空评论和证据链
      commentList.value = []
      evidenceList.value = []
      taskCurrentId.value = null
      currentTask.value = null
    }
  }
}


// 任务列表
const taskList = ref([])

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
// 当前选中的任务对象
const currentTask = ref(null)

const taskItemClick = async (item, index) => {
  taskCurrentId.value = index
  currentTask.value = item
  // 切换任务时重新获取评论和证据链
  await getCommentList()
  await getEvidenceList()
}


// 中间

// 上传的图片URL
const uploadedImageUrl = ref('')

// 上传
const handleFileChange = (file, fileList) => {
  console.log('文件变化:', file, fileList)
  // 生成图片预览URL
  if (file && file.raw) {

    // 如果需要将文件转换为流格式
    const reader = new FileReader()
    reader.onload = (e) => {
      fileStream.value = e.target.result
      console.log('文件已转换为流:', fileStream.value)
      loonoolUploadImage({
        file: fileStream.value,
        workspaceId: String(workspaceId.value),
      }).then(res => {
        getTaskList()
        console.log(res, 'resresres');
      })
    }
    reader.readAsArrayBuffer(file.raw)
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

// 获取评论列表
const getCommentList = async () => {
  if (!currentTask.value || !currentTask.value.id) {
    commentList.value = []
    return
  }
  try {
    const res = await tasksgetTaskComments({
      workspaceId: workspaceId.value,
      taskId: currentTask.value.id
    })
    console.log(res, '评论列表res');
    if (res.code == 200) {
      commentList.value = res.data || []
    } else {
      commentList.value = []
    }
  } catch (error) {
    console.error('获取评论列表失败:', error)
    commentList.value = []
  }
}

// 评论列表数据
const commentList = ref([])

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
// 获取证据链列表
const getEvidenceList = async () => {
  if (!currentTask.value || !currentTask.value.id) {
    evidenceList.value = []
    return
  }
  try {
    const res = await tasksgetTaskDetail({
      workspaceId: workspaceId.value,
      taskId: currentTask.value.id
    })
    console.log(res, '任务详情res');
    if (res.code == 200 && res.data) {
      // 根据实际API返回的数据结构调整，这里假设证据链在evidenceChain字段中
      evidenceList.value = res.data.evidenceChain || res.data.evidences || []
    } else {
      evidenceList.value = []
    }
  } catch (error) {
    console.error('获取证据链失败:', error)
    evidenceList.value = []
  }
}

// 证据链列表
const evidenceList = ref([])

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
const uploadedTaskFile = ref(null)
const uploadedTaskFileName = ref('')
const taskFileInput = ref(null)
const uploadedFile = ref(null) // 存储上传的文件对象
const fileStream = ref(null)   // 存储文件流

const taskTabs = [
  { label: '图片', value: 'image' },
  { label: '文案', value: 'copy' },
  { label: '文档', value: 'document' },
  { label: '视觉图', value: 'visual' },
  { label: 'UI', value: 'ui' }
]

// 获取文件接受类型
const getFileAccept = () => {
  switch (activeTaskTab.value) {
    case 'image':
      return 'image/*'
    case 'document':
      return '.pdf,.doc,.docx,.txt'
    default:
      return '*/*'
  }
}

// 判断是否为图片文件
const isImageFile = computed(() => {
  if (!uploadedTaskFile.value) return false
  return uploadedTaskFile.value.startsWith('data:image/')
})

// 触发文件选择
const triggerTaskFileInput = () => {
  taskFileInput.value?.click()
}

// 打开创建任务弹窗
const createTask = () => {
  createTaskDialogVisible.value = true
  // 重置表单
  taskName.value = ''
  uploadedTaskFile.value = null
  uploadedTaskFileName.value = ''
  activeTaskTab.value = 'image'
  uploadedFile.value = null
  fileStream.value = null
}

// 关闭创建任务弹窗
const closeCreateTaskDialog = () => {
  createTaskDialogVisible.value = false
  // 重置表单
  taskName.value = ''
  uploadedTaskFile.value = null
  uploadedTaskFileName.value = ''
  activeTaskTab.value = 'image'
  uploadedFile.value = null
  fileStream.value = null
}

// 处理文件上传
const handleTaskFileUpload = (event) => {
  const target = event.target
  const file = target.files?.[0]

  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      uploadedTaskFile.value = e.target?.result
      uploadedTaskFileName.value = file.name
    }

    if (file.type.startsWith('image/')) {
      reader.readAsDataURL(file)
    } else {
      // 对于非图片文件，可以显示文件名
      uploadedTaskFile.value = 'file'
      uploadedTaskFileName.value = file.name
    }

    // 将文件转换为流格式用于上传
    const fileReader = new FileReader()
    fileReader.onload = (e) => {
      fileStream.value = e.target?.result
      uploadedFile.value = file
      console.log('文件已转换为流:', fileStream.value)
    }
    fileReader.readAsArrayBuffer(file)

    // 重置input
    target.value = ''
  }
}

// 移除文件
const removeTaskFile = () => {
  uploadedTaskFile.value = null
  uploadedTaskFileName.value = ''
  uploadedFile.value = null
  fileStream.value = null
}

// 确认创建任务
const confirmCreateTask = () => {
  if (!taskName.value.trim()) {
    ElMessage.warning('请输入任务名称')
    return
  }

  if (!fileStream.value) {
    ElMessage.warning('请上传文件')
    return
  }

  loonoolUploadImage({
    file: fileStream.value,
    workspaceId: String(workspaceId.value),
    taskName: taskName.value,
  }).then(async res => {
    console.log(res, 'resresres');
    if (res.code === 200) {
      ElMessage.success('任务创建成功')
      closeCreateTaskDialog()
      await getTaskList() // 刷新任务列表，会自动选中最新创建的任务
    }
  })
}



// 邀请好友弹窗
const inviteFriendsVisible = ref(false)
const inviteEmail = ref('')
const activeRoleDropdownIndex = ref(null)
const selectedMemberIndex = ref(null)

// 成员列表数据
const membersList = ref([
  {
    avatar: '/img/flower.png',
    name: '斯瑶才',
    email: '87231133@163.com',
    role: '项目管理人',
    canEdit: false
  },
  {
    avatar: '/img/flower.png',
    name: '陈博翰',
    email: '87231133@163.com',
    role: '发言人',
    canEdit: true
  },
  {
    avatar: '/img/flower.png',
    name: '富珍功',
    email: '87231133@163.com',
    role: '项目管理人',
    canEdit: false
  },
  {
    avatar: '/img/flower.png',
    name: '艾乐',
    email: '87231133@163.com',
    role: '发言人',
    canEdit: false
  }
])

// 切换角色下拉菜单
const toggleRoleDropdown = (index) => {
  if (activeRoleDropdownIndex.value === index) {
    activeRoleDropdownIndex.value = null
  } else {
    activeRoleDropdownIndex.value = index
    selectedMemberIndex.value = index
  }
}

// 更新成员角色
const updateMemberRole = (index, newRole) => {
  membersList.value[index].role = newRole
  activeRoleDropdownIndex.value = null
  // TODO: 调用API更新角色
  ElMessage.success('角色已更新')
}

// 打开邀请好友弹窗
const openInviteFriendsDialog = () => {
  inviteFriendsVisible.value = true
  inviteEmail.value = ''
  activeRoleDropdownIndex.value = null
  selectedMemberIndex.value = null
}

// 关闭邀请好友弹窗
const closeInviteFriendsDialog = () => {
  inviteFriendsVisible.value = false
  inviteEmail.value = ''
  activeRoleDropdownIndex.value = null
  selectedMemberIndex.value = null
}

// 处理邀请
const handleInvite = () => {
  if (!inviteEmail.value.trim()) {
    ElMessage.warning('请输入邮箱地址')
    return
  }

  // 验证邮箱格式
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(inviteEmail.value)) {
    ElMessage.warning('请输入正确的邮箱格式')
    return
  }

  // 检查是否已存在
  const exists = membersList.value.some(member => member.email === inviteEmail.value)
  if (exists) {
    ElMessage.warning('该邮箱已被邀请')
    return
  }

  // 执行邀请逻辑
  console.log('邀请邮箱:', inviteEmail.value)
  // TODO: 调用邀请API
  ElMessage.success('邀请已发送')
  inviteEmail.value = ''
}

// 空间ID
const workspaceId = ref(null)

onMounted(async () => {
  if (props.spaceId) {
    console.log('接收到的 spaceId:', props.spaceId)
    workspaceId.value = String(props.spaceId)
    await getTaskList() // 等待任务列表加载完成
    console.log('任务列表加载完成')
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

<style lang="scss">
@use "../../public/auditSpace.scss";
</style>