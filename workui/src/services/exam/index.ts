import { request } from '@umijs/max';

export const addExam = async (data: API.AddExamRequest) =>
  request('/api/exam/add', { method: 'POST', data });

export const getExamList = async (params?: any) =>
  request<API.Exam[]>('/api/exam/list', { method: 'GET', params });

export const delExam = async (id: number) =>
  request(`/api/exam/delete/${id}`, { method: 'DELETE' });

export const saveExamContent = async (data: API.SaveExamContentRequest) =>
  request('/api/exam/save', { method: 'POST', data });

export const publishExam = async (id: number) =>
  request(`/api/exam/publish/${id}`, { method: 'GET' });

export const unpublishExam = async (id: number) =>
  request(`/api/exam/unpublish/${id}`, { method: 'GET' });

export const getExamDetail = async (id: number) =>
  request(`/api/exam/find/${id}`, { method: 'GET' });
