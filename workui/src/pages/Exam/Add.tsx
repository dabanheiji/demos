import { ModalRef, useModal } from '@/hooks';
import { Form, Input, Modal } from 'antd';
import { forwardRef } from 'react';

const Add = forwardRef<ModalRef>((_props, ref) => {
  const [form] = Form.useForm();
  const { open, onCancel, onConfirm } = useModal(ref, { form });

  return (
    <Modal title={'添加考试'} open={open} onCancel={onCancel} onOk={onConfirm} afterClose={() => form.resetFields()}>
      <Form form={form}>
        <Form.Item
          label="考试名称"
          name="name"
          rules={[{ required: true, message: '请输入考试名称' }]}
        >
          <Input placeholder="请输入考试名称" />
        </Form.Item>
      </Form>
    </Modal>
  );
});

export default Add;
