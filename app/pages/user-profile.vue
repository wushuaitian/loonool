<!-- 个人信息页面 -->
<template>
  <div class="user-profile-page">
    <!-- 用户信息卡片 -->
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar" @click="isEditing && handleAvatarEdit()">
          <img :src="userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" 
               alt="用户头像" 
               class="avatar-img">
          <div v-if="isEditing" class="avatar-overlay">
            <span class="avatar-edit-text">编辑</span>
          </div>
        </div>
        <div class="profile-info">
          <div v-if="!isEditing" class="profile-name">{{ userInfo.username || userInfo.email || '用户' }}</div>
          <el-input 
            v-else
            v-model="editForm.username"
            class="profile-name-input"
            placeholder="请输入用户名"
          />
          <div class="profile-details">
            <div class="detail-item">
              <span class="detail-label">ID:</span>
              <span class="detail-value">{{ userId }}</span>
            </div>
            <div class="detail-item">
              <img src="/img/emailIcon.png" alt="邮箱" class="detail-icon-img">
              <span class="detail-value">{{ userInfo.email || '未设置' }}</span>
            </div>
            <div class="detail-item">
              <img src="/img/passwordIcon.png" alt="密码" class="detail-icon-img">
              <span v-if="!isEditing" class="detail-value password-mask">••••••</span>
              <el-input 
                v-else
                v-model="editForm.password"
                type="password"
                class="detail-input"
                placeholder="请输入密码"
                show-password
              />
            </div>
          </div>
        </div>
        <div class="edit-button" @click="handleEdit">{{ isEditing ? '保存' : '编辑' }}</div>
      </div>
    </div>

    <!-- 空间列表 -->
    <div class="spaces-list-container">
      <!-- 标题行 -->
      <div class="spaces-list-header">
        <div class="header-item header-name">空间名称</div>
        <div class="header-item header-id">空间ID</div>
        <div class="header-item header-members">成员</div>
      </div>
      <!-- 列表项 -->
      <div class="spaces-list-body">
        <div 
          v-for="(space, index) in spacesList" 
          :key="index"
          class="space-list-item"
        >
          <div class="list-item-name">{{ space.name || '未命名空间' }}</div>
          <div class="list-item-id">{{ space.id || '-' }}</div>
          <div class="list-item-members">
            <el-dropdown trigger="click" @command="(cmd) => handleMemberAction(cmd, space.id)">
              <div class="members-avatars">
                <img 
                  v-for="(member, mIndex) in getDisplayMembers(space.id)" 
                  :key="mIndex"
                  :src="member.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                  :alt="member.name || '成员'"
                  class="member-avatar"
                />
              </div>
              <template #dropdown>
                <el-dropdown-menu class="members-dropdown-menu">
                  <el-dropdown-item 
                    v-for="(member, mIndex) in getAllMembers(space.id)" 
                    :key="mIndex"
                    :command="`remove-${mIndex}`"
                    class="member-dropdown-item"
                  >
                    <div class="member-item-content">
                      <img 
                        :src="member.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                        :alt="member.name || '成员'"
                        class="member-item-avatar"
                      />
                      <span class="member-item-name">{{ member.name || '成员' }}</span>
                      <span class="member-item-remove">移除</span>
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
      <div v-if="spacesList.length === 0" class="empty-state">
        暂无空间数据
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loonoolWorkspacesMyAll, loonoolWorkspacesMembers, tasksMembersinviteDelete } from "../../composables/login";
import { ElMessage } from 'element-plus';

// 用户信息
const userInfo = ref({
  email: '',
  avatar: '',
  username: ''
});

// 用户ID - 从localStorage或生成
const userId = ref('');

// 编辑状态
const isEditing = ref(false);

// 编辑表单数据
const editForm = ref({
  username: '',
  email: '',
  password: ''
});

// 空间列表
const spacesList = ref([]);

// 空间成员映射
const spaceMembersMap = ref({});

// 获取空间成员（用于显示，最多4个）
const getDisplayMembers = (spaceId) => {
  const members = spaceMembersMap.value[spaceId] || [];
  // 最多显示4个成员头像
  return members.slice(0, 4);
};

// 获取所有空间成员（用于下拉菜单）
const getAllMembers = (spaceId) => {
  return spaceMembersMap.value[spaceId] || [];
};

// 处理成员操作
const handleMemberAction = async (command, spaceId) => {
  console.log(spaceId)
  if (command.startsWith('remove-')) {
    const index = parseInt(command.split('-')[1]);
    const members = spaceMembersMap.value[spaceId] || [];
    if (index >= 0 && index < members.length) {
      const member = members[index];
      
      // 检查是否有必要的字段
      if (!member.userId) {
        ElMessage.error('成员信息不完整，无法移除');
        return;
      }
      
      try {
        // 调用删除接口
        const res = await tasksMembersinviteDelete({
          memberId: member.userId,
          workspaceId: spaceId
        });
        
        if (res.code === 200 || res.status === 200) {
          // 移除成功，更新本地列表
          members.splice(index, 1);
          spaceMembersMap.value[spaceId] = [...members];
          ElMessage.success('移除成员成功');
        } else {
          ElMessage.error(res.message || '移除成员失败');
        }
      } catch (error) {
        console.error('移除成员失败', error);
        ElMessage.error(error?.response?.data?.message || error?.message || '移除成员失败，请稍后重试');
      }
    }
  }
};

// 获取用户信息
const loadUserInfo = () => {
  const savedUserInfo = localStorage.getItem('userInfo');
  if (savedUserInfo) {
    try {
      userInfo.value = JSON.parse(savedUserInfo);
      // 生成用户ID（如果没有的话，使用邮箱的hash值）
      if (!userInfo.value.id) {
        // 简单生成一个ID（实际应该从API获取）
        const email = userInfo.value.email || '';
        userId.value = email ? String(email.split('@')[0].length * 888832088) : '888832088';
      } else {
        userId.value = userInfo.value.id;
      }
    } catch (e) {
      console.error('解析用户信息失败', e);
      userId.value = '888832088';
    }
  } else {
    userId.value = '888832088';
  }
};

// 模拟数据
const mockSpaces = [
  {
    id: '234999887',
    name: '空间名称空间名称空间名称空间名称空间名称'
  },
  {
    id: '234999888',
    name: '产品设计空间'
  },
  {
    id: '234999889',
    name: '开发团队协作空间'
  },
  {
    id: '234999890',
    name: '市场营销决策空间'
  },
  {
    id: '234999891',
    name: '用户体验研究空间'
  },
  {
    id: '234999892',
    name: '数据分析空间'
  },
  {
    id: '234999893',
    name: '项目管理空间'
  },
  {
    id: '234999894',
    name: '创意设计工作空间'
  },
  {
    id: '234999895',
    name: '技术研发空间'
  },
  {
    id: '234999896',
    name: '客户服务空间'
  }
];

// 模拟成员数据
const mockMembers = [
  {
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    name: '成员1',
    userId: 'mock-user-1',
    memberId: 'mock-member-1'
  },
  {
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    name: '成员2',
    userId: 'mock-user-2',
    memberId: 'mock-member-2'
  },
  {
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    name: '成员3',
    userId: 'mock-user-3',
    memberId: 'mock-member-3'
  },
  {
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    name: '成员4',
    userId: 'mock-user-4',
    memberId: 'mock-member-4'
  },
  {
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    name: '成员5',
    userId: 'mock-user-5',
    memberId: 'mock-member-5'
  }
];

// 获取所有空间
const getAllSpaces = async () => {
   spacesList.value = [...mockSpaces];
      // 为每个模拟空间添加模拟成员
      mockSpaces.forEach(space => {
        spaceMembersMap.value[space.id] = [...mockMembers];
      });
  try {
    const res = await loonoolWorkspacesMyAll({});
    if (res.code === 200 && res.data && res.data.length > 0) {
      spacesList.value = res.data || [];
      // 获取每个空间的成员
      for (const space of spacesList.value) {
        await loadSpaceMembers(space.id);
      }
    } else {
      // 如果 API 返回空数据，使用模拟数据
      console.log('API返回空数据，使用模拟空间数据');
      spacesList.value = [...mockSpaces];
      // 为每个模拟空间添加模拟成员
      mockSpaces.forEach(space => {
        spaceMembersMap.value[space.id] = [...mockMembers];
      });
    }
  } catch (error) {
    console.error('获取空间列表失败，使用模拟数据', error);
    // API 调用失败时使用模拟数据
    spacesList.value = [...mockSpaces];
    // 为每个模拟空间添加模拟成员
    mockSpaces.forEach(space => {
      spaceMembersMap.value[space.id] = [...mockMembers];
    });
  }
};

// 获取空间成员
const loadSpaceMembers = async (spaceId) => {
  try {
    const res = await loonoolWorkspacesMembers({ workspaceId: spaceId });
    if (res.code === 200 && res.data && res.data.length > 0) {
      spaceMembersMap.value[spaceId] = res.data.map(member => ({
        avatar: member.avatar || '',
        name: member.name || member.email || '',
        userId: member.userId || member.id || '',
        memberId: member.memberId || member.id || ''
      }));
    } else {
      // API 返回空数据时，使用模拟成员数据
      console.log(`API返回空间 ${spaceId} 成员空数据，使用模拟成员数据`);
      spaceMembersMap.value[spaceId] = [...mockMembers];
    }
  } catch (error) {
    console.error(`获取空间 ${spaceId} 成员失败，使用模拟数据`, error);
    // API 调用失败时，使用模拟成员数据
    spaceMembersMap.value[spaceId] = [...mockMembers];
  }
};

// 编辑按钮点击事件
const handleEdit = () => {
  if (isEditing.value) {
    // 保存逻辑
    console.log('保存个人信息', editForm.value);
    // TODO: 调用API保存数据
    userInfo.value.username = editForm.value.username || userInfo.value.username;
    userInfo.value.email = editForm.value.email || userInfo.value.email;
    if (editForm.value.password) {
      // TODO: 更新密码
      console.log('更新密码');
    }
    isEditing.value = false;
  } else {
    // 进入编辑模式
    editForm.value = {
      username: userInfo.value.username || userInfo.value.email || '',
      email: userInfo.value.email || '',
      password: ''
    };
    isEditing.value = true;
  }
};

// 头像编辑
const handleAvatarEdit = () => {
  // TODO: 实现头像编辑功能
  console.log('编辑头像');
};

onMounted(() => {
  loadUserInfo();
  getAllSpaces();
});
</script>

<style scoped lang="scss">
// 颜色变量
$bg-white: #ffffff;
$bg-gray-light: #F7F8FA;
$bg-gray-lighter: #F1F3F5;
$color-text: #1D2129;
$color-text-light: #85909C;
$color-primary: #2134DE;
$border-color: #E5E7EB;

.user-profile-page {
  padding: 40px 20px;
  background-color: $bg-white;
  min-height: calc(100vh - 6vh);
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

// 用户信息卡片
.profile-card {
  width: 1380px;
  height: 182px;
  background: #F7F8FA;
  border-radius: 15px;
  padding: 32px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
}

.profile-header {
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
}

.profile-avatar {
  flex-shrink: 0;
  margin-right: 20px;
  position: relative;
  cursor: pointer;
  
  .avatar-img {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid $bg-white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .avatar-overlay {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    
    .avatar-edit-text {
      color: #FFFFFF;
      font-size: 16px;
      font-weight: 500;
    }
  }
}

.profile-info {
  flex: 1;
  margin-bottom:18px;
}

.profile-name {
  height: 40px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 28px;
  color: #1D2129;
  line-height: 40px;
  text-align: left;
  font-style: normal;
}

.profile-name-input {
  width: 310px;
  height: 54px;
  
  :deep(.el-input__wrapper) {
    width: 310px;
    height: 54px;
    padding: 0 16px;
    background: #E9EBFC;
    border-radius: 8px;
    border: 1px solid #2134DE;
    box-shadow: none;
    
    &.is-focus {
      box-shadow: none;
      border: 1px solid #2134DE;
    }
    
    .el-input__inner {
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 28px;
      color: #1D2129;
      line-height: 54px;
      background: transparent;
    }
  }
}

.profile-details {
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
  margin-top:20px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #4E5969;
  line-height: 22px;
  text-align: left;
  font-style: normal;
  margin-right:80px;
}

.detail-label {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #4E5969;
  line-height: 22px;
  text-align: left;
  font-style: normal;
}

.detail-icon-img {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.detail-value {
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #4E5969;
  line-height: 22px;
  text-align: left;
  font-style: normal;
  
  &.password-mask {
    letter-spacing: 4px;
  }
}

.detail-input {
  width: 196px;
  height: 32px;
  
  :deep(.el-input__wrapper) {
    width: 196px;
    height: 32px;
    padding: 0 12px;
    background: #E9EBFC;
    border-radius: 6px;
    border: 1px solid #2134DE;
    box-shadow: none;
    
    &.is-focus {
      box-shadow: none;
      border: 1px solid #2134DE;
    }
    
    .el-input__inner {
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 16px;
      color: #4E5969;
      line-height: 22px;
      background: transparent;
    }
    
    .el-input__suffix {
      .el-input__password {
        color: #4E5969;
      }
    }
  }
}

.edit-button {
  position: absolute;
  top: 0;
  right: 0;
  width: 70px;
  height: 32px;
  background: #FFFFFF;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  // 按钮文字样式
  font-family: PingFangSC, PingFang SC;
  font-weight: 400;
  font-size: 16px;
  color: #4E5969;
  line-height: 22px;
  text-align: left;
  font-style: normal;
  
  &:hover {
    background-color: #E9EBFC;
    color: #2134DE;
  }
  
  &:active {
    background-color: #E5E7EB;
  }
}

// 空间列表
.spaces-list-container {
  width: 1380px;
  display: flex;
  flex-direction: column;
}

// 标题行
.spaces-list-header {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 14px;
  
  .header-item {
    width: 80px;
    height: 28px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 20px;
    color: #4E5969;
    line-height: 28px;
    text-align: left;
    font-style: normal;
  }
  
  .header-name {
    flex: 1;
    margin-left:60px;
    min-width: 200px;
  }
  
  .header-id {
    flex: 0 0 488px;
  }
  
  .header-members {
    flex: 0 0 145px;
  }
}

// 列表项容器
.spaces-list-body {
  gap: 14px;
  max-height: 600px;
  overflow-y: auto;
}

// 列表项
.space-list-item {
  width: 1380px;
  height: 70px;
  background: #F7F8FA;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  margin-bottom:14px;
  color: #4E5969;
  
  .list-item-name {
    flex: 1;
    margin-left: 60px;
    min-width: 200px;
    font-size: 16px;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .list-item-id {
    flex: 0 0 488px;
font-family: PingFangSC, PingFang SC;
font-weight: 400;
font-size: 16px;
line-height: 22px;
text-align: left;
font-style: normal;
  }
  
  .list-item-members {
    flex: 0 0 145px;
    
    .members-avatars {
      display: flex;
      align-items: center;
      gap: -8px;
      cursor: pointer;
      
      .member-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid $bg-white;
        margin-left: -15px;
        
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
.space-list-item:hover{
  background: #E4E5EA;
  color: #1D2129;
}

// 成员下拉菜单
.members-dropdown-menu {
  width: 262px !important;
  max-height: 324px !important;
  overflow-y: auto;
  padding: 4px 0;
}

.member-dropdown-item {
  height: 42px;
  padding: 0 !important;
  
  .member-item-content {
    width:100%;
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 12px;
    box-sizing: border-box;
    
    .member-item-avatar {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 8px;
      flex-shrink: 0;
    }
    
    .member-item-name {
      flex: 1;
      margin-right: 8px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 14px;
      color: #4E5969;
      line-height: 20px;
      text-align: left;
      font-style: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .member-item-remove {
      width: 28px;
      height: 20px;
      font-family: PingFangSC, PingFang SC;
      font-weight: 400;
      font-size: 14px;
      color: #4E5969;
      line-height: 20px;
      text-align: left;
      font-style: normal;
      flex-shrink: 0;
      cursor: pointer;
      
      &:hover {
        color: #EF4444;
      }
    }
  }
  
  &:hover {
    background-color: #F7F8FA !important;
  }
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
  color: $color-text-light;
  font-size: 16px;
}

// 响应式设计
@media (max-width: 768px) {
  .user-profile-page {
    padding: 20px 16px;
  }
  
  .profile-card {
    padding: 24px;
  }
  
  .profile-header {
    flex-direction: row;
    align-items: flex-start;
  }
  
  .profile-avatar {
    margin-right: 20px;
  }
  
  .edit-button {
    position: absolute;
    top: 0;
    right: 0;
  }
  
  .avatar-img {
    width: 100px;
    height: 100px;
  }
  
  .profile-name {
    font-size: 24px;
  }
  
  .spaces-list-header {
    .header-item {
      font-size: 16px;
    }
  }
  
  .space-list-item {
    width: 100%;
    padding: 0 16px;
    
    .list-item-name {
      min-width: 100px;
      font-size: 14px;
    }
    
    .list-item-id {
      flex: 0 0 120px;
      font-size: 14px;
    }
    
    .list-item-members {
      flex: 0 0 120px;
    }
  }
}
</style>
