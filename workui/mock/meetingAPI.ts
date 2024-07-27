// @ts-ignore
import mock from 'mockjs';

export default {
  'POST /api/meeting/room': (_req: any, res: any) => {
    res.send({
      code: 200,
      data: {},
      message: 'success',
    });
  },
  'GET /api/meeting/room': (_req: any, res: any) => {
    res.send({
      code: 200,
      data: mock.mock({
        'list|5': [
          {
            id: 1,
            name: '@cword(3,5)',
            'status|1': [0, 1, 2],
            'capacity|1-10': 10,
            location: '@county(true)',
            equipment: '@cword(3,5)',
            description: '@cword(3,5)',
            isBooked: false,
            createTime: '@date("yyyy-MM-dd HH:mm:ss")',
            updateTime: '@date("yyyy-MM-dd HH:mm:ss")',
          },
        ],
        total: 10,
      }),
      message: 'success',
    });
  },
  'DELETE /api/meeting/room/1': (_req: any, res: any) => {
    res.send({
      code: 200,
      data: {},
      message: 'success',
    });
  },
  'PUT /api/meeting/room/1': (_req: any, res: any) => {
    res.send({
      code: 200,
      data: {},
      message: 'success',
    });
  },
};
