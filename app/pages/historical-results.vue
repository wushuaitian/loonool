<template>
    <div class="historical-results-page">
        <!-- 顶部导航栏 -->
        <div class="top-navigation">
            <div class="nav-button b-r-40 text-bold-500 text-16" v-for="(el, idnex) in toolList" @click="toolSelect(el)"
                :class="currentTool == el ? 'nav-button-active' : ''">{{ el }}</div>
        </div>

        <!-- 主内容区域 -->
        <div class="main-content m-t-10">
            <el-card class="table-card" shadow="always">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="projectId" label="项目ID" />
                    <el-table-column prop="detectionTime" label="检测时间" />
                    <el-table-column prop="lastCompletionTime" label="最后完成时间" />
                    <el-table-column prop="thumbnail" label="缩略图">
                        <template #default="{ row }">
                            <div class="thumbnail-container">
                                <img :src="row.thumbnail" alt="缩略图" class="thumbnail-image" />
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="riskLevel" label="风险等级">
                        <template #default="{ row }">
                            <div class="risk-level">
                                <span class="risk-dot red"></span>
                                <span class="risk-text">{{ row.riskLevel }}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="similarity" label="相似度">
                        <template #default="{ row }">
                            <span class="similarity-text">{{ row.similarity }}%</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operations" label="操作" width="180">
                        <!-- <template #default="{ row, $index }">
                            <div class="operations">
                                <el-button
                                    :class="['operation-btn', 'view-btn', { 'hover-active': hoveredRow === $index && hoveredBtn === 'view' }]"
                                    :icon="View" circle size="small"
                                    @mouseenter="hoveredRow = $index; hoveredBtn = 'view'"
                                    @mouseleave="hoveredRow = null; hoveredBtn = null" @click="handleView(row)" />
                                <el-button :class="['operation-btn', 'download-btn']" :icon="Download" circle
                                    size="small" @click="handleDownload(row)" />
                                <el-button :class="['operation-btn', 'delete-btn']" :icon="Delete" circle size="small"
                                    @click="handleDelete(row)" />
                            </div>
                        </template> -->
                        <template #default="{ row, $index }">
                            <div class="operations">
                                <el-button
                                    :class="['operation-btn', 'view-btn', { 'hover-active': hoveredRow === $index && hoveredBtn === 'view' }]"
                                    :icon="View" circle size="small" @click="handleView(row)" />
                                <el-button :class="['operation-btn', 'download-btn']" :icon="Download" circle
                                    size="small" @click="handleDownload(row)" />
                                <el-button :class="['operation-btn', 'delete-btn']" :icon="Delete" circle size="small"
                                    @click="handleDelete(row)" />
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-card>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { View, Download, Delete } from '@element-plus/icons-vue'

// 工具栏数组
const toolList = ref(['LOGO', 'VI', 'WEB', 'APP']);
// 当前选择工具
const currentTool = ref('LOGO');
// 工具栏点击事件
const toolSelect = (el) => {
    currentTool.value = el;
};

const activeTab = ref('LOGO')
const hoveredRow = ref(null)
const hoveredBtn = ref(null)

// 生成示例缩略图（紫色和粉色的抽象人物头像）
const placeholderThumbnail = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iNCIgZmlsbD0idXJsKCNncmFkaWVudCkiLz4KPGNpcmNsZSBjeD0iMzAiIGN5PSIyMCIgcj0iOCIgZmlsbD0iI0I0OERGRSIvPgo8cGF0aCBkPSJNMTggNDBDMTggMzYgMjIgMzIgMjYgMzJIMzRDMzggMzIgNDIgMzYgNDIgNDBINDBIMjBIMThWNDBaIiBmaWxsPSIjRkY4OENCIi8+CjxwYXRoIGQ9Ik0yMCA0MEMyMCAzNiAyNCAzMiAyOCAzMkgzMkMzNiAzMiA0MCAzNiA0MCA0MEg0MEgyMEgyMFY0MFoiIGZpbGw9IiM5QzJBRkUiLz4KPGRlZnM+CjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZGllbnQiIHgxPSIwIiB5MT0iMCIgeDI9IjYwIiB5Mj0iNjAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agc3RvcC1jb2xvcj0iIzlDMkFGRSIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGRjg4Q0IiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4='

// 表格数据
const tableData = ref([
    {
        projectId: 'D127799018',
        detectionTime: '2025-09-30 15:30',
        lastCompletionTime: '2025-09-30 15:30',
        thumbnail: placeholderThumbnail,
        riskLevel: '红灯',
        similarity: '79'
    },
    {
        projectId: 'D127799018',
        detectionTime: '2025-09-30 15:30',
        lastCompletionTime: '2025-09-30 15:30',
        thumbnail: placeholderThumbnail,
        riskLevel: '红灯',
        similarity: '79'
    },
    {
        projectId: 'D127799018',
        detectionTime: '2025-09-30 15:30',
        lastCompletionTime: '2025-09-30 15:30',
        thumbnail: placeholderThumbnail,
        riskLevel: '红灯',
        similarity: '79'
    },
    {
        projectId: 'D127799018',
        detectionTime: '2025-09-30 15:30',
        lastCompletionTime: '2025-09-30 15:30',
        thumbnail: placeholderThumbnail,
        riskLevel: '红灯',
        similarity: '79'
    },
    {
        projectId: 'D127799018',
        detectionTime: '2025-09-30 15:30',
        lastCompletionTime: '2025-09-30 15:30',
        thumbnail: placeholderThumbnail,
        riskLevel: '红灯',
        similarity: '79'
    }
])

const handleView = (row) => {
    console.log('查看', row)
}

const handleDownload = (row) => {
    console.log('下载', row)
}

const handleDelete = (row) => {
    console.log('删除', row)
}
</script>

<style lang="scss" scoped>
.historical-results-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #e0f2fe 0%, #e9d5ff 50%, #f3e8ff 100%);
    padding: 20px;
}

.top-navigation {
    width: 87%;
    display: flex;
    gap: 12px;
    padding: 0 20px;
    margin: auto;

    .nav-button {
        padding: 10px 24px;
        background: linear-gradient(180deg, #E7E9FF 0%, #949EF5 100%);
        cursor: pointer;
        transition: all 0.3s ease;
        color: #fff;
    }

    .nav-button-active {
        background: linear-gradient(180deg, #DCDFFF 0%, #2134DE 100%);
    }
}

.main-content {
    padding: 0 20px;

    .table-card {
        width: 90%;
        margin: auto;
        background: #fff;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        overflow: hidden;
    }
}

.thumbnail-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;

    .thumbnail-image {
        width: 60px;
        height: 60px;
        border-radius: 4px;
        object-fit: cover;
        display: block;
    }
}

.risk-level {
    display: flex;
    align-items: center;
    gap: 8px;

    .risk-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        display: inline-block;

        &.red {
            background-color: #f56565;
        }
    }

    .risk-text {
        color: #333;
        font-size: 14px;
    }
}

.similarity-text {
    color: #333;
    font-size: 14px;
    font-weight: 500;
}

.operations {
    display: flex;
    align-items: center;
    gap: 8px;

    .operation-btn {
        width: 32px;
        height: 32px;
        padding: 0;
        border: 1px solid #dcdfe6;
        background-color: #fff;
        color: #606266;
        transition: all 0.3s ease;

        &:hover {
            background-color: #409eff;
            border-color: #409eff;
            color: #fff;
        }

        &.view-btn.hover-active {
            // background-color: #4a5568 !important;
            border-color: #4a5568 !important;
            color: #fff !important;
            position: relative;

            &::after {
                content: '查看';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 12px;
                white-space: nowrap;
                z-index: 1;
            }

            :deep(.el-icon) {
                opacity: 0;
            }
        }

        &.download-btn:hover {
            background-color: #67c23a;
            border-color: #67c23a;
            color: #fff;
        }

        &.delete-btn:hover {
            background-color: #f56c6c;
            border-color: #f56c6c;
            color: #fff;
        }
    }
}
</style>