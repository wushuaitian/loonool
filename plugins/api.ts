
import axios from 'axios';

// 基本配置
const instance = axios.create({
  baseURL: 'http://192.168.0.77:8080/', // 根据实际情况修改API地址
  timeout: 50000000 // 设置超时时间，单位为ms
});

// 请求拦截器建议增加认证头处理
instance.interceptors.request.use(config => { 
  // 示例：添加token
  const token = localStorage.getItem('token');
  if (token) {
    // config.headers.Authorization = `Bearer${token}`;
    config.headers.token = `${token}`;

  }
  return config;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

// 响应拦截器
instance.interceptors.response.use(response => {
  const data = response.data;
  return data;
}, error => {
  // 更安全的错误处理
  try {
    const errorMessage = error.response?.data?.message;

    // 检查登录过期 - 多种可能的情况
    if (errorMessage === '当前用户登录已过期' ||
      error.status === 401 ||
      error.response?.status === 401) {

    }
  } catch (e) {
    console.log('处理错误时发生异常:', e);
  }

  console.log(error);
  return Promise.reject(error);
});

export default instance;
