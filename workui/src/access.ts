const checkAuthorization = (roles: Role.Role[], permission: string) => {
  return roles.map(role => role.code).includes(permission);
};

export default (initialState:  { name: string, userInfo: IUser.UserInfo }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  const { userInfo } = initialState;
  const roles = userInfo?.roles || [];

  return {
    isAdmin: checkAuthorization(roles, 'admin'),
    isTeacher: checkAuthorization(roles, 'teacher'),
    isStudent: checkAuthorization(roles, 'student'),
  };
};
