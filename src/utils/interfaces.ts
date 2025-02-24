import { message } from 'antd';
import axios, { type Method } from 'axios';

const baseURL = 'http://localhost:3005/';
const instance = axios.create({
  baseURL, // 基地址
  timeout: 10000, // 超时时间
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // const store = useUserStore()
    // if (store.user?.token) {
    //   config.headers.Authorization = `Bearer ${store.user.token}`
    // }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.data.code !== 200) {
      message.error(response.data.message || '业务处理失败');
      // 中断代码执行
      return Promise.reject(response.data);
    }
    return response.data;
  },
  function (error) {
    if (error.response.data.code !== 200) {
      message.error(error.response.data.data || '业务处理失败');
      // 中断代码执行
      return Promise.reject(error.response.data);
    }
    if (error.response.status === 401) {
    }
    return Promise.reject(error);
  }
);

type Data<T> = {
  code: number;
  message: string;
  data: T;
};

const request = <T>(
  url: string,
  method: Method = 'GET',
  submitData?: object
) => {
  // return instance.request<{ name: 'jack'; age: 20 }, { name: 'jack'; age: 20 }>(
  return instance.request<T, Data<T>>({
    url,
    method,
    // 针对的get -> params / post -> data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  });
};

export { baseURL, instance, request };
