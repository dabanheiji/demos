/* eslint-disable @typescript-eslint/no-unused-vars */
namespace API {
  interface BaseResponse {
    [key: string]: any;
  }

  /**
   * 用户
   */
  interface LoginRequest {
    username: string;
    password: string;
  }

  interface LoginResponse {
    token: string;
  }

  interface CaptchaRequest {
    address: string;
  }

  interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    nickName: string;
    captcha: string;
  }

  interface RegisterResponse {
    id: number;
    username: string;
    email: string;
    createdAt: string;
  }

  interface UpdatePasswordRequest {
    username: string;
    password: string;
    email: string;
    captcha: string;
  }

  /**
   * 考试
   */
  interface AddExamRequest {
    name: string;
  }

  interface SaveExamContentRequest {
    id: number;
    content: string;
  }

  interface Exam {
    id: number;
    name: string;
    isPublished: boolean;
    isDeleted: boolean;
    content: string;
    createdAt: string;
    updatedAt: string;
    createUserId: number;
  }

  /**
   * 会议室
   */
  interface MeetingRoom {
    id?: number;
    name: string;
    status?: number;
    capacity: number;
    location: string;
    equipment: string;
    description: string;
    isBooked?: boolean;
    createTime?: string;
    updateTime?: string;
  }

  interface MeetingRoomBookRequest {
    name?: string;
    status?: number;
    location?: string;
  }

  interface MeetingRoomListResponse {
    list: MeetingRoom[];
    total: number;
  }

  interface AddMeetingRoomRequest {
    name: string;
    capacity: number;
    location: string;
    equipment: string;
    description: string;
  }

  interface UpdateMeetingRoomRequest extends AddMeetingRoomRequest {
    id: number;
  }

  interface DeleteMeetingRoomRequest {
    id: number;
  }
}
