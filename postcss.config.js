// postcss.config.js
export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 16, // 1rem = 16px
      propList: ['*'], // 所有属性都转换
      exclude: /node_modules/i, // 排除 node_modules
      selectorBlackList: ['.norem'] // 忽略 .norem 开头的类名
    },
    autoprefixer: {}
  }
}