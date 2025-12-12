<!-- 个人信息页面 -->
<template>
  <div class="user-profile-page">
    <!-- 用户信息卡片 -->
    <div class="profile-card">
      <div class="profile-header">
        <div class="profile-avatar">
          <img :src="userInfo.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'" 
               alt="用户头像" 
               class="avatar-img">
        </div>
        <div class="profile-info">
          <div class="profile-name">{{ userInfo.username || userInfo.email || '用户' }}</div>
          <div class="profile-details">
            <div class="detail-item">
              <span class="detail-label">ID:</span>
              <span class="detail-value">{{ userId }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">📧</span>
              <span class="detail-value">{{ userInfo.email || '未设置' }}</span>
            </div>
            <div class="detail-item">
              <span class="detail-icon">🔒</span>
              <span class="detail-value password-mask">••••••</span>
            </div>
          </div>
        </div>
        <div class="edit-button" @click="handleEdit">编辑</div>
      </div>
    </div>

    <!-- 空间列表表格 -->
    <div class="spaces-table-container">
      <div class="spaces-table-wrapper">
        <table class="spaces-table">
          <thead>
            <tr>
              <th class="col-name">空间名称</th>
              <th class="col-id">空间ID</th>
              <th class="col-members">成员</th>
            </tr>
          </thead>
        </table>
        <div class="spaces-table-body-wrapper">
          <table class="spaces-table spaces-table-body">
            <tbody>
              <tr v-for="(space, index) in spacesList" :key="index">
                <td class="space-name col-name">{{ space.name || '未命名空间' }}</td>
                <td class="space-id col-id">{{ space.id || '-' }}</td>
                <td class="space-members col-members">
                  <div class="members-avatars">
                    <img 
                      v-for="(member, mIndex) in getSpaceMembers(space.id)" 
                      :key="mIndex"
                      :src="member.avatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'"
                      :alt="member.name || '成员'"
                      class="member-avatar"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
import { loonoolWorkspacesMyAll, loonoolWorkspacesMembers } from "../../composables/login";

// 用户信息
const userInfo = ref({
  email: '',
  avatar: '',
  username: ''
});

// 用户ID - 从localStorage或生成
const userId = ref('');

// 空间列表
const spacesList = ref([]);

// 空间成员映射
const spaceMembersMap = ref({});

// 获取空间成员
const getSpaceMembers = (spaceId) => {
  const members = spaceMembersMap.value[spaceId] || [];
  // 最多显示5个成员头像
  return members.slice(0, 5);
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
    name: '成员1'
  },
  {
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    name: '成员2'
  },
  {
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    name: '成员3'
  },
  {
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    name: '成员4'
  },
  {
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    name: '成员5'
  }
];

// 获取所有空间
const getAllSpaces = async () => {
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
      spacesList.value = mockSpaces;
      // 为每个模拟空间添加模拟成员
      mockSpaces.forEach(space => {
        spaceMembersMap.value[space.id] = mockMembers;
      });
    }
  } catch (error) {
    console.error('获取空间列表失败', error);
    // API 调用失败时使用模拟数据
    spacesList.value = mockSpaces;
    // 为每个模拟空间添加模拟成员
    mockSpaces.forEach(space => {
      spaceMembersMap.value[space.id] = mockMembers;
    });
  }
};

// 获取空间成员
const loadSpaceMembers = async (spaceId) => {
  try {
    const res = await loonoolWorkspacesMembers({ workspaceId: spaceId });
    if (res.code === 200 && res.data) {
      spaceMembersMap.value[spaceId] = res.data.map(member => ({
        avatar: member.avatar || '',
        name: member.name || member.email || ''
      }));
    } else {
      spaceMembersMap.value[spaceId] = [];
    }
  } catch (error) {
    console.error(`获取空间 ${spaceId} 成员失败`, error);
    spaceMembersMap.value[spaceId] = [];
  }
};

// 编辑按钮点击事件
const handleEdit = () => {
  // TODO: 实现编辑功能
  console.log('编辑个人信息');
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
  max-width: 1200px;
  margin: 0 auto;
}

// 用户信息卡片
.profile-card {
  background-color: $bg-gray-light;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 40px;
  display: flex;
  justify-content: flex-start;
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
}

.avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid $bg-white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.profile-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

.profile-name {
  font-size: 28px;
  font-weight: 600;
  color: $color-text;
}

.profile-details {
  display: flex;
  flex-direction: row;
  gap: 24px;
  align-items: center;
  flex-wrap: wrap;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: $color-text;
}

.detail-label {
  font-weight: 500;
  color: $color-text-light;
}

.detail-icon {
  font-size: 18px;
}

.detail-value {
  color: $color-text;
  
  &.password-mask {
    letter-spacing: 4px;
  }
}

.edit-button {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 16px;
  color: #999999;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    color: #666666;
    background-color: rgba(0, 0, 0, 0.05);
  }
}

// 空间列表表格
.spaces-table-container {
  background-color: $bg-white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.spaces-table-wrapper {
  display: flex;
  flex-direction: column;
}

.spaces-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  
  thead {
    background-color: $bg-gray-lighter;
    
    th {
      padding: 16px 24px;
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      color: #666666;
      border-bottom: 2px solid $border-color;
    }
  }
  
  tbody {
    tr {
      border-bottom: 1px solid $border-color;
      transition: background-color 0.2s ease;
      
      &:hover {
        background-color: $bg-gray-light;
      }
      
      &:last-child {
        border-bottom: none;
      }
    }
    
    td {
      padding: 20px 24px;
      font-size: 15px;
      color: $color-text;
    }
  }
}

// 列宽定义 - 确保表头和表体列宽一致
.col-name {
  width: 40%;
}

.col-id {
  width: 30%;
}

.col-members {
  width: 30%;
}

.spaces-table-body-wrapper {
  max-height: 600px;
  min-height: 400px;
  overflow-y: auto;
  
  .spaces-table-body {
    margin-top: 0;
    
    thead {
      display: none;
    }
  }
}

.space-name {
  font-weight: 500;
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.space-id {
  color: $color-text-light;
  font-family: 'Courier New', monospace;
}

.space-members {
  .members-avatars {
    display: flex;
    align-items: center;
    gap: -8px;
    
    .member-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid $bg-white;
      margin-left: -8px;
      
      &:first-child {
        margin-left: 0;
      }
    }
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
  
  .spaces-table {
    font-size: 14px;
    
    thead th,
    tbody td {
      padding: 12px 16px;
    }
  }
  
  .space-name {
    max-width: 150px;
  }
}
</style>
