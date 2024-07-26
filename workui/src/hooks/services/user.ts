import services from '@/services';
import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';

export const useLogin = (
  options: Options<API.LoginResponse, API.LoginRequest[]> = {},
) => {
  return useRequest(services.user.login, {
    manual: true,
    ...options,
  });
};
