<!-- 历史记录 -->
<template>
    <div class="middle">
        <el-table :data="tableData" style="width: 100%; margin-bottom: 20px" row-key="id" border default-expand-all>
            <el-table-column prop="date" label="Date" sortable />
            <el-table-column prop="name" label="Name" sortable />
            <el-table-column prop="address" label="Address" sortable />
        </el-table>

        <TPage :page-option="pageOption" @search="handleSearch" custom-class="my-pagination" />
    </div>

</template>


<script lang="ts" setup>
import { ref, reactive } from 'vue'
import TPage from '@/components/t-page/t-page.vue'
import { pageModelFn } from '@/components/utils/modelManage.js'


const tableData = [
    {
        id: 1,
        date: '2016-05-02',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 2,
        date: '2016-05-04',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        id: 3,
        date: '2016-05-01',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
        children: [
            {
                id: 31,
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St, Los Angeles',
            },
            {
                id: 32,
                date: '2016-05-01',
                name: 'wangxiaohu',
                address: 'No. 189, Grove St, Los Angeles',
            },
        ],
    },
    {
        id: 4,
        date: '2016-05-03',
        name: 'wangxiaohu',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const pageOption = pageModelFn();
// 分页方法
const loadFirstPage = () => {
    pageOption.pageNum = 1;
    getHistoryData();
}
const handleSearch = () => {
    console.log('分页信息:', pageOption.pageNum,pageOption.pageSize)
    // 在这里执行获取数据的逻辑
}
/**
 *  获取历史数据
 */

const getHistoryData = () => {

}
</script>