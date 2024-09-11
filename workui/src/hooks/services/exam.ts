import services from '@/services';
import { useBoolean, useMemoizedFn, useRequest } from 'ahooks';
import { FormInstance, message } from 'antd';

export const useExamList = () => {
  return useRequest(services.exam.getExamList, {
    defaultParams: [{ bin: 1 }],
  }); // 获取考试列表
};

export const useAddExam = ({ form }: { form: FormInstance }) => {
  const [open, { setTrue, setFalse }] = useBoolean();
  const { run, loading } = useRequest(services.exam.addExam, {
    manual: true,
    onSuccess: () => {
      message.success('操作成功');
    },
  });

  const handleConfirm = useMemoizedFn(async () => {
    const values = await form.validateFields();
    run(values);
  });

  return {
    open,
    onOpen: setTrue,
    onClose: setFalse,
    handleConfirm,
    loading,
  };
};
