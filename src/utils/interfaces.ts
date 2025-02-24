import { message } from 'antd';
import axios, { AxiosRequestConfig, type Method } from 'axios';

const baseURL = 'http://localhost:3005/';
const instance = axios.create({
  baseURL, // 基地址
  timeout: 10000, // 超时时间
});
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      config.headers.authorization = 'Bearer ' + accessToken;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
interface PendingTask {
  config: AxiosRequestConfig;
  resolve: Function;
}
let refreshing = false;
const queue: PendingTask[] = [];
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
  async function (error) {
    if (!error.response) {
      return Promise.reject(error);
    }
    let { data, config } = error.response;
    if (refreshing) {
      return new Promise((resolve) => {
        queue.push({
          config,
          resolve,
        });
      });
    }
    if (data.code === 401 && !config.url.includes('/user/refresh')) {
      refreshing = true;

      const res = await refreshToken();

      refreshing = false;

      if (res.status === 200 || res.status === 201) {
        queue.forEach(({ config, resolve }) => {
          resolve(instance(config));
        });

        return instance(config);
      } else {
        message.error(res.data);

        setTimeout(() => {
          window.location.href = '/login';
        }, 1500);
      }
      return Promise.reject(res);
    }

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

const request = <T>(url: string, method: Method = 'GET', submitData?: object) => {
  // return instance.request<{ name: 'jack'; age: 20 }, { name: 'jack'; age: 20 }>(
  return instance.request<T, Data<T>>({
    url,
    method,
    // 针对的get -> params / post -> data
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
  });
};

export { baseURL, instance, request };

async function refreshToken() {
  const res = await instance.get('/user/refresh', {
    params: {
      refresh_token: localStorage.getItem('refresh_token'),
    },
  });
  localStorage.setItem('access_token', res.data.access_token || '');
  localStorage.setItem('refresh_token', res.data.refresh_token || '');
  return res;
}
