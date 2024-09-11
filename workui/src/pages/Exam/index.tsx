import { ModalRef, useExamList } from '@/hooks';
import services from '@/services';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { Button, List, message, Popconfirm, Typography } from 'antd';
import React, { useRef } from 'react';
import Add from './Add';

const Exam: React.FC = () => {
  const addRef = useRef<ModalRef>();
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
              <Popconfirm
                key="confirm"
                title={`是否${item.isPublished ? '取消发布' : '发布'}该考试`}
                onConfirm={() =>
                  item.isPublished ? unpublish(item.id) : publish(item.id)
                }
              >
                {item.isPublished ? (
                  <Typography.Link key={'unpublish'}>
                    {'取消发布'}
                  </Typography.Link>
                ) : (
                  <Typography.Link key={'publish'}>{'发布'}</Typography.Link>
                )}
              </Popconfirm>,
              <Typography.Link key={'content'} href={`/school/exam/${item.id}`}>
                {'添加试卷'}
              </Typography.Link>,
              <Popconfirm
                key="delete"
                title="是否删除该考试"
                onConfirm={() => deleteExam(item.id)}
              >
                <Typography.Link key={'delete'}>{'删除'}</Typography.Link>
              </Popconfirm>,
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
    </PageContainer>
  );
};

export default Exam;
