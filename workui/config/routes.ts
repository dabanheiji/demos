export const routes = [
  {
    name: '欢迎登录',
    path: '/login',
    component: './Login',
    layout: false,
  },
  {
    name: '欢迎注册',
    path: '/register',
    component: './Register',
    layout: false,
  },
  {
    name: '忘记密码',
    path: '/update-password',
    component: './UpdatePassword',
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
    name: '老常学院',
    path: '/school',
    routes: [
      {
        name: '考试管理',
        path: '/school/exam',
        component: './Exam',
      },
      {
        name: '添加试卷',
        path: '/school/exam/:id',
        component: './ExamContent',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '会议中心',
    path: '/meeting',
    //   layout: false,
    // redirect: '/meeting/room',
    routes: [
      {
        name: '会议室管理',
        path: '/meeting/room',
        component: './MeetingRoom',
      },
      {
        name: '预定管理',
        path: '/meeting/booked',
        component: './Booked',
      },
    ],
  },
];
