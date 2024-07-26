export const routes = [
  {
    name: '欢迎登录',
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: '/home',
    component: './Home',
  },
  {
    name: '会议管理',
    path: '/meeting',
    routes: [
      {
        name: '会议室',
        path: '/meeting/room',
        component: './MeetingRoom',
      },
    ],
  },
];
