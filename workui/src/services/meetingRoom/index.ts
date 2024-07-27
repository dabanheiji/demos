import { request } from '@umijs/max';
import { Params } from 'ahooks/lib/useAntdTable/types';

export const getMeetingRoomList = async (
  pagination: Params[0],
  params: API.MeetingRoomBookRequest,
) =>
  request<API.MeetingRoomListResponse>('/api/meeting/room', {
    method: 'GET',
    params: {
      ...pagination,
      ...params,
    },
  });

export const addMeetingRoom = async (params: API.AddMeetingRoomRequest) =>
  request<API.BaseResponse>('/api/meeting/room', {
    method: 'POST',
    data: params,
  });

export const updateMeetingRoom = async (params: API.UpdateMeetingRoomRequest) =>
  request<API.BaseResponse>(`/api/meeting/room/${params.id}`, {
    method: 'PUT',
    data: params,
  });

export const deleteMeetingRoom = async (params: API.UpdateMeetingRoomRequest) =>
  request<API.BaseResponse>(`/api/meeting/room/${params.id}`, {
    method: 'DELETE',
  });
