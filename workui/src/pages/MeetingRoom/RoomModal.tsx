import type { FormInstance, ModalProps } from 'antd';
import { Form, Input, InputNumber, Modal } from 'antd';

interface RoomModalProps<T> {
  open: boolean;
  onOk: (args: T) => void;
  onCancel: () => void;
  afterOpen?: (form: FormInstance<T>) => void;
  confirmLoading?: boolean;
}

const RoomModal: React.FC<RoomModalProps<API.UpdateMeetingRoomRequest>> = ({
  open,
  onCancel,
  onOk: onFinish,
  afterOpen,
  confirmLoading,
}) => {
  const [form] = Form.useForm<API.UpdateMeetingRoomRequest>();

  const onOk = () => {
    form.submit();
  };

  const afterClose = () => {
    form.resetFields();
  };

  const afterOpenChange: ModalProps['afterOpenChange'] = (open) => {
    if (open) {
      afterOpen?.(form);
    }
  };

  return (
    <Modal
      title={'会议室详情'}
      open={open}
      onCancel={onCancel}
      onOk={onOk}
      closable={false}
      afterClose={afterClose}
      afterOpenChange={afterOpenChange}
      confirmLoading={confirmLoading}
    >
      <Form
        labelCol={{ flex: '60px' }}
        form={form}
        className="pt-4"
        onFinish={onFinish}
      >
        <Form.Item hidden name={'id'} />
        <Form.Item
          label={'名称'}
          name={'name'}
          rules={[{ required: true, message: '请输入会议室名称' }]}
        >
          <Input placeholder={'请输入会议室名称'} />
        </Form.Item>
        <Form.Item
          label={'容量'}
          name={'capacity'}
          rules={[{ required: true, message: '请输入会议室容量' }]}
        >
          <InputNumber placeholder={'请输入会议室容量'} addonAfter="人" />
        </Form.Item>
        <Form.Item
          label={'地点'}
          name={'location'}
          rules={[{ required: true, message: '请输入会议室地点' }]}
        >
          <Input placeholder={'请输入会议室地点'} />
        </Form.Item>
        <Form.Item
          label={'设备'}
          name={'equipment'}
          rules={[{ required: true, message: '请输入会议室设备' }]}
        >
          <Input placeholder={'请输入会议室设备'} />
        </Form.Item>
        <Form.Item label={'描述'} name={'description'}>
          <Input.TextArea placeholder={'请输入会议室描述'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomModal;
