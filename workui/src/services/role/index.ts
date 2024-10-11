import { request } from '@umijs/max';

export const add = async (data: Role.Role) => request('/api/role/add', { method: 'POST', data });

export const list = async () => request<{ list: Role.Role[], total: number }>('/api/role/list');

export const update = async (data: Role.Role) => request('/api/role/update', { method: 'POST', data });

export const del = async (id: number) => request(`/api/role/delete/${id}`, { method: 'DELETE' });

export const userRoles = async () => request<Role.Role[]>(`/api/role/findByUser`);