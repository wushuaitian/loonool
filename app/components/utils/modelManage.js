// modelManage.js
export const pageModelFn = (option) => {
  return {
    // 总条目数
    total: 1000,
    // 每页显示条目个数
    pageSize: 10,
    // 当前页数
    pageNum: 1,
    // 组件布局，子组件名用逗号分隔
    layout: "sizes,prev, pager, next,jumper",
    // 每页显示个数选择器的选项设置
    pageSizes: [10, 20, 30, 50, 100, 200, 1000, 5000],

    sizeChange: () => {
      // pageSize 改变时会触发 每页条数size
    },

    currentChange: () => {
      // currentPage 改变时会触发 当前页currentPage
    },
    ...option,
  };
};

export const developPageModelFn = (option) => {
  return {
    // 总条目数
    total: 0,
    // 每页显示条目个数
    pageSize: 10,
    // 当前页数
    pageNum: 1,
    // 组件布局，子组件名用逗号分隔
    layout: "total, sizes,prev, pager, next,jumper",
    // 每页显示个数选择器的选项设置
    pageSizes: [10, 20, 30, 50, 100, 200, 1000, 5000],

    sizeChange: () => {
      // pageSize 改变时会触发 每页条数size
    },

    currentChange: () => {
      // currentPage 改变时会触发 当前页currentPage
    },
    ...option,
  };
};