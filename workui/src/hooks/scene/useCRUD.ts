import { useAntdTable, useRequest } from 'ahooks';
import { Data, Params } from 'ahooks/lib/useAntdTable/types';
import { FormInstance, message } from 'antd';
import { useConfirm } from './useConfirm';

export interface CRUD<CP, RP extends Params, UP, DP, CR, RR, UR, DR> {
  create: (params: CP) => Promise<CR>;
  read: (...args: RP) => Promise<RR>;
  update: (params: UP) => Promise<UR>;
  delete: (params: DP) => Promise<DR>;
  form?: FormInstance;
}

export const useCRUD = <
  CP,
  RP extends Params,
  UP,
  DP,
  CR,
  RR extends Data,
  UR,
  DR,
>(
  options: CRUD<CP, RP, UP, DP, CR, RR, UR, DR>,
) => {
  const { create, read, update, delete: _delete, form } = options;

  const { search, tableProps } = useAntdTable<RR, RP>(read, {
    form,
  });

  const onSuccess = () => {
    message.success('操作成功');
    search.submit();
  };

  const { run: createRun, loading: createLoading } = useRequest(create, {
    manual: true,
    onSuccess,
  });
  const { run: updateRun, loading: updateLoading } = useRequest(update, {
    manual: true,
    onSuccess,
  });
  const { run: deleteRun, loading: deleteLoading } = useRequest(_delete, {
    manual: true,
    onSuccess,
  });

  return {
    tableProps,
    search,
    createRun,
    updateRun,
    deleteRun: useConfirm(deleteRun, { message: '确定删除吗?' }),
    deleteLoading,
    updateLoading,
    createLoading,
  };
};
