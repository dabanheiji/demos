import { ModalRef, useConfirm, useExamList } from '@/hooks';
import services from '@/services';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, List, message, Popconfirm, Typography } from 'antd';
import React, { useRef } from 'react';
import Add from './Add';
import Publish from './Publish';

const Exam: React.FC = () => {
  const addRef = useRef<ModalRef>();
  const publishRef = useRef<ModalRef>();

  const { data: examList, run: getExamList } = useExamList();

  const options = {
    manual: true,
    onSuccess: () => {
      message.success('操作成功');
      addRef.current?.close();
      getExamList({ bin: 1 });
    },
  };

  const { run: addExam, loading: addLoading } = useRequest(
    services.exam.addExam,
    options,
  );
  const { run: publish } = useRequest(services.exam.publishExam, options);
  const { run: unpublish } = useRequest(services.exam.unpublishExam, options);
  const { run: deleteExam } = useRequest(services.exam.delExam, options);

  const createExam = async () => {
    const values = await addRef.current?.show();
    if (!values) return;
    addExam(values);
  };

  const publishExam = async (data: any) => {
    const values = await publishRef.current?.show(data);
    if (!values) return;
    publish(values);
  };

  const unpublishExam = useConfirm((id: number) => {
    unpublish(id)
  })

  const del = useConfirm((id: number) => {
    deleteExam(id)
  })

  return (
    <PageContainer>
      <List
        header={
          <Button type="primary" onClick={createExam} loading={addLoading}>
            创建考试
          </Button>
        }
        dataSource={examList}
        itemLayout="horizontal"
        renderItem={(item) => (
          <List.Item
            actions={[
              item.isPublished && (
                <Typography.Link key={'unpublish'} onClick={() => unpublishExam(item.id)}>
                    {'取消发布'}
                  </Typography.Link>
              ),
              !item.isPublished && (
                <Typography.Link key={'publish'} onClick={() => publishExam(item)}>{'发布'}</Typography.Link>
              ),
              <Typography.Link key={'content'} href={`/school/exam/${item.id}`}>
                {'添加试卷'}
              </Typography.Link>,
              <Typography.Link key={'delete'} onClick={() => del(item.id)}>{'删除'}</Typography.Link>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={item.isPublished ? '已发布' : '未发布'}
            />
          </List.Item>
        )}
      />

      <Add ref={addRef as React.MutableRefObject<ModalRef>} />
      <Publish ref={publishRef as React.MutableRefObject<ModalRef>} />
    </PageContainer>
  );
};

export default Exam;
