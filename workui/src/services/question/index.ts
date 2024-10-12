import { request } from '@umijs/max';

export const addQuestion = async (data: IQuestion.Question) => request('/api/question/add', {
    method: 'POST',
    data
});

export const updateQuestion = async (data: IQuestion.Question) => request('/api/question/update', {
    method: 'POST',
    data
});

export const delQuestion = async (id: number) => request(`/api/question/delete/${id}`, { method: 'DELETE' });

export const getQuestionList = async (params?: API.ListRequest) => request<API.ListResponse<IQuestion.Question>>('/api/question/list', { method: 'GET', params });

export const getQuestion = async (id: number) => request<IQuestion.Question>(`/api/question/find/${id}`, { method: 'GET' });

export const findExamsByQuestionId = async (id: number) => request<API.Exam[]>(`/api/exam/findExams/${id}`, { method: 'GET' });