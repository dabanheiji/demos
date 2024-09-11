import services from '@/services';
import { useBoolean, useMemoizedFn, useRequest } from 'ahooks';
import { FormInstance, message } from 'antd';

export const useExamList = () => {
  return useRequest(services.exam.getExamList, {
    defaultParams: [{ bin: 1 }],
  }); // 获取考试列表
};
