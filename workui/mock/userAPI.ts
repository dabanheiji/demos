export default {
  'POST /api/user/login': (_req: any, res: any) => {
    res.send({
      code: 200,
      data: {
        token: 'token',
      },
      message: 'success',
    });
  },
};
