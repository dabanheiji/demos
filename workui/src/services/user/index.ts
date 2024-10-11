import { request } from '@umijs/max';

export const login = async (data: API.LoginRequest) =>
  request<API.LoginResponse>('/api/user/login', { method: 'POST', data });

export const register = async (data: API.RegisterRequest) =>
  request<API.RegisterResponse>('/api/user/register', { method: 'POST', data });

export const registerCaptcha = async (params: API.CaptchaRequest) =>
  request('/api/user/register-captcha', { method: 'GET', params });

export const updatepasswordCaptcha = async (params: API.CaptchaRequest) =>
  request('/api/user/update-password-captcha', { method: 'GET', params });

export const updatePassword = async (data: API.UpdatePasswordRequest) =>
  request('/api/user/update-password', { method: 'POST', data });

export const userList = async (params?: any) =>
  request<IUser.User[]>('/api/user/list', { method: 'GET', params });

export const userInfo = async () => request<IUser.User>('/api/user/user-info');
