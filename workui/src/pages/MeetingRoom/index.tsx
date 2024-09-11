import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from 'antd';

import { useMeetingRoom } from '@/hooks';
import { useMemoizedFn } from 'ahooks';
import { useState } from 'react';
import RoomModal from './RoomModal';

const MeetingRoom: React.FC = () => {
  const [form] = Form.useForm();
  const [roomForm] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const {
    tableProps,
    search,
    deleteRun,
    createRun,
    updateRun,
    createLoading,
    updateLoading,
  } = useMeetingRoom({
    form,
  });

  const onOpen = useMemoizedFn(
    (values?: API.UpdateMeetingRoomRequest | undefined) => {
      setOpen(true);
      if (values) {
        roomForm.setFieldsValue(values);
      }
    },
  );

  const onClose = useMemoizedFn(() => {
    setOpen(false);
  });

  const onOk = useMemoizedFn((values: API.UpdateMeetingRoomRequest) => {
    if (values.id) {
      updateRun(values);
    } else {
      createRun(values);
    }
    onClose();
  });

  const columns = [
    {
      title: '会议室名称',
      dataIndex: 'name',
    },
    {
      title: '容量',
      dataIndex: 'capacity',
    },
    {
      title: '地点',
      dataIndex: 'location',
    },
    {
      title: '操作',
      dataIndex: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Typography.Link onClick={() => onOpen(record)}>编辑</Typography.Link>
          <Typography.Link onClick={() => deleteRun(record)}>
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <Card>
        <Form form={form} labelCol={{ flex: '80px' }}>
          <Button type={'primary'} onClick={() => onOpen()}>
            {'新增'}
          </Button>
          <Row gutter={[16, 16]} className="mt-4">
            <Col span={8}>
              <Form.Item label={'会议室名称'} name={'name'}>
                <Input placeholder="请输入会议室名称" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'状态'} name={'status'}>
                <Select placeholder="请选择状态" allowClear>
                  <Select.Option value={0}>空闲</Select.Option>
                  <Select.Option value={1}>预约</Select.Option>
                  <Select.Option value={2}>占用</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label={'地点'} name={'location'}>
                <Input placeholder="请输入容量" />
              </Form.Item>
            </Col>
          </Row>
          <Row justify={'end'}>
            <Space>
              <Button onClick={search.reset}>重置</Button>
              <Button type={'primary'} onClick={search.submit}>
                查询
              </Button>
            </Space>
          </Row>
        </Form>
      </Card>

      <Table className="mt-4" columns={columns} {...tableProps} />

      <RoomModal
        open={open}
        onCancel={onClose}
        onOk={onOk}
        confirmLoading={createLoading || updateLoading}
        form={roomForm}
      />
    </PageContainer>
  );
};

export default MeetingRoom;
