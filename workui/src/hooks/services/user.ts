import services from '@/services';
import { useCountDown, useMemoizedFn, useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { FormInstance, message } from 'antd';
import { useState } from 'react';

export const useLogin = (
  options: Options<API.LoginResponse, API.LoginRequest[]> = {},
) => {
  return useRequest(services.user.login, {
    manual: true,
    ...options,
  });
};

type Service = (...args: any[]) => Promise<any>;

export const useCaptcha = ({
  form,
  fetchService,
}: {
  form: FormInstance;
  fetchService: Service;
}) => {
  const [leftTime, setLeftTime] = useState(0);
  const [countdown] = useCountDown({
    leftTime,
  });
  const { run, loading } = useRequest(fetchService, {
    manual: true,
    onSuccess: () => {
      message.success('验证码发送成功');
      setLeftTime(60 * 1000); // 60s
    },
  });

  const send = useMemoizedFn(async () => {
    const { email } = await form.validateFields(['email']);
    run({ address: email });
  });

  return {
    count: Math.round(countdown / 1000),
    send,
    loading,
  };
};

export const useRegisterCaptcha = ({ form }: { form: FormInstance }) => {
  return useCaptcha({ form, fetchService: services.user.registerCaptcha });
};

export const useUpdatePasswordCaptcha = ({ form }: { form: FormInstance }) => {
  return useCaptcha({
    form,
    fetchService: services.user.updatepasswordCaptcha,
  });
};

export const useSave = ({
  fetchService,
  onSuccess,
}: {
  fetchService: Service;
  onSuccess?: (...args: any[]) => void;
}) => {
  const { run, loading } = useRequest(fetchService, {
    manual: true,
    onSuccess: (res) => {
      message.success('操作成功');
      onSuccess?.(res);
    },
  });

  const onFinish = useMemoizedFn(
    async (values: { confirmPassword: string } & API.RegisterRequest) => {
      if (values.password !== values.confirmPassword) {
        message.error('两次密码输入不一致');
        return;
      }
      run(values);
    },
  );

  return {
    onFinish,
    loading,
  };
};

export const useRegister = () =>
  useSave({ fetchService: services.user.register });

export const useUpdatePassword = ({
  onSuccess,
}: {
  onSuccess?: (...args: any[]) => void;
}) => useSave({ fetchService: services.user.updatePassword, onSuccess });
