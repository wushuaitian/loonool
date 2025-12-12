<!-- 我的空间 -->
<template>
  <div class="my-space-page">
    <!-- Loading 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <div class="loading-text">正在加载空间数据...</div>
    </div>
    <!-- 内容区域 -->
    <template v-else>
      <div class="space-grid">
        <!-- 空间卡片 -->
        <div v-for="(space, index) in paginatedSpaces" :key="index" class="space-card">
          <div class="space-image-wrapper" @click="spacesDetailsClick(space)">
            <img src="/img/introduc-one.png" alt="空间封面" class="space-image">
          </div>
          <div class="space-name">{{ space.name }}</div>
        </div>
      </div>
      <!-- 分页组件 -->
      <div class="pagination-wrapper">
        <t-page :page-option="pageOption" @search="handlePageChange" />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { loonoolWorkspacesMyAll } from "../../composables/login";
import { pageModelFn } from '../components/utils/modelManage'

const emit = defineEmits(['spaceCreated']); 

// 定义空间数据
const allSpaces = ref([])
// Loading 状态
const loading = ref(true)

// 获取所有空间数据
const getAllSpaces = async () => {
  loading.value = true
  try {
    const res = await loonoolWorkspacesMyAll({})
    if (res.code === 200) {
      allSpaces.value = res.data
    }
  } finally {
    loading.value = false
  }
}


const spacesDetailsClick = (space) => {
  emit('spaceCreated', space.id)
   localStorage.setItem('workspaceId', space.id);
}
// 初始化分页配置（每页显示16个，4x4网格）
const pageOption = ref(pageModelFn({
  total: allSpaces.value.length,
  pageSize: 16,
  pageNum: 1,
  layout: "total, sizes, prev, pager, next, jumper",
  pageSizes: [8, 16, 24, 32]
}))

// 计算当前页显示的空间数据
const paginatedSpaces = computed(() => {
  const start = (pageOption.value.pageNum - 1) * pageOption.value.pageSize
  const end = start + pageOption.value.pageSize
  return allSpaces.value.slice(start, end)
})

// 监听数据变化，更新分页总数
watch(() => allSpaces.value.length, (newLength) => {
  pageOption.value.total = newLength
  // 如果当前页没有数据了，跳转到第一页
  const maxPage = Math.ceil(newLength / pageOption.value.pageSize) || 1
  if (pageOption.value.pageNum > maxPage) {
    pageOption.value.pageNum = 1
  }
})

// 处理分页变化
const handlePageChange = (option) => {
  pageOption.value = { ...option }
}

onMounted(() => {
  getAllSpaces()
})
</script>

<style scoped lang="scss">
// 颜色变量
$bg-white: #ffffff;
$bg-gray-light: #F7F8FA;
$bg-gray-lighter: #F1F3F5;
$color-text: #1D2129;
$color-text-light: #85909C;

.my-space-page {
  padding: 20px;
  background-color: $bg-white;
}

.space-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.space-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
}

.space-image-wrapper {
  width: 100%;
  height: 120px;
  position: relative;
  overflow: hidden;
}

.space-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.space-card:hover .space-image {
  transform: scale(1.05);
}

.space-name {
  padding: 12px 16px;
  font-size: 14px;
  color: $color-text;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background-color: $bg-gray-light;
}

.pagination-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  padding: 24px 0;
  background-color: transparent;
}

// Loading 样式
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 60px 20px;
}

.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid $bg-gray-lighter;
  border-top-color: #2134DE;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 20px;
}

.loading-text {
  font-size: 14px;
  color: $color-text-light;
  font-weight: 400;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>