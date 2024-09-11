import { useCRUD } from '@/hooks';
import {
  addMeetingRoom,
  deleteMeetingRoom,
  getMeetingRoomList,
  updateMeetingRoom,
} from '@/services/meetingRoom';
import { FormInstance } from 'antd';

export const useMeetingRoom = ({ form }: { form: FormInstance }) => {
  return useCRUD({
    create: addMeetingRoom,
    read: getMeetingRoomList,
    update: updateMeetingRoom,
    delete: deleteMeetingRoom,
    form,
  });
};
