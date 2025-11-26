<template>
  <div class="page-pagination">
    <el-pagination 
      background 
      @size-change="changeSize" 
      @current-change="changPage"
      :current-page="pageOption.pageNum" 
      :page-sizes="pageOption.pageSizes" 
      :page-size="pageOption.pageSize"
      :total="pageOption.total" 
      :layout="pageOption.layout" 
      :pager-count="5" 
      :class="customClass">
    </el-pagination>
  </div>
</template>

<script setup>
// 定义 props
const props = defineProps({
  pageOption: {
    type: Object,
    required: true
  },
  customClass: {
    type: String,
    default: ''
  }
});

// 定义 emits
const emit = defineEmits(['search']);

// 处理页面大小改变
const changeSize = (val) => {
  props.pageOption.pageSize = val;
  props.pageOption.pageNum = 1;
  emit("search", props.pageOption);
};

// 处理页码改变
const changPage = (val) => {
  props.pageOption.pageNum = val;
  emit("search", props.pageOption);
};
</script>