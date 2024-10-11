import { useBoolean, useMemoizedFn } from 'ahooks';
import { FormInstance } from 'antd';
import { useImperativeHandle, useRef } from 'react';

export type ModalRef = { show: (values?: any) => Promise<any>; close: () => void };

export const useModal = <T>(
  ref: React.Ref<ModalRef>,
  { form }: { form: FormInstance },
) => {
  const [open, { setTrue, setFalse }] = useBoolean();
  const primiseRef = useRef<{ resolve: (value: T | false) => void }>();

  useImperativeHandle(
    ref,
    () => ({
      show: (values: any) => {
        setTrue();
        if(values) {
          form.setFieldsValue(values);
        }
        return new Promise((resolve) => {
          primiseRef.current = { resolve };
        });
      },
      close: () => {
        setFalse();
      },
    }),
    [],
  );

  const onConfirm = useMemoizedFn(async () => {
    try {
      const values = await form.validateFields();
      primiseRef.current?.resolve(values);
    } catch (error) {
      console.log(error);
    }
  });

  const onCancel = useMemoizedFn(() => {
    setFalse();
    primiseRef.current?.resolve(false);
  });

  return {
    open,
    onCancel,
    onConfirm,
  };
};
