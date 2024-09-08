// 运行时配置
import { message } from 'antd';
import './global.css';

import { RequestConfig, history } from '@umijs/max';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '老常' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
  };
};

export const request: RequestConfig = {
  timeout: 60000,
  requestInterceptors: [
    // @ts-ignore
    (config) => {
      config.headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
      return config;
    },
  ],
  responseInterceptors: [
    // @ts-ignore
    [
      (res) => {
        console.log('res', res);
        if (res.status === 401) {
          history.push('/login');
        }
        return res;
      },
      (error) => {
        // @ts-ignore
        message.error(error?.response?.data?.message || '服务器异常');
      },
    ],
  ],
};
