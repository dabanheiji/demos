import { useMemoizedFn } from 'ahooks';
import { Modal } from 'antd';

type Fn = (...args: any) => any;

interface Options {
  message?: any;
}

export const useConfirm = (fn: Fn, options?: Options) => {
  return useMemoizedFn((...args: any) => {
    Modal.confirm({
      title: '提示',
      content: options?.message || '确认要执行此操作？',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        fn(...args);
      },
    });
  });
};
