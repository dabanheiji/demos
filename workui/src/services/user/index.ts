import { request } from '@umijs/max';

export const login = async (params: API.LoginRequest) =>
  request<API.LoginResponse>('/api/user/login', { method: 'POST', params });
