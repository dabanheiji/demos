import { PageContainer } from '@ant-design/pro-components';
import { Button, Flex, Form, message, Space, Tabs } from 'antd';
import { useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Content from './Content';
import QType from './QType';
import QuestionEditor from '../../components/QuestionEditor';
import { createQuestion, QuestionItem } from './utils';
import { useDebounceFn, useRequest } from 'ahooks';
import { history, useParams } from '@umijs/max';
import services from '@/services';

const ExamContent = () => {
  const [editorForm] = Form.useForm();
  const params = useParams();
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [activeKey, setActiveKey] = useState<string>('1');
  const { run } = useRequest(services.exam.saveExamContent, {
    manual: true,
    onSuccess: () => {
      message.success('保存成功');
      history.back();
    }
  });
  useRequest(services.exam.getExamDetail, {
    defaultParams: [+(params.id as string)],
    onSuccess: (data) => {
      setQuestions(JSON.parse(data.content));
    }
  })

  const onDrop = (item: { type: IQuestion.QuestionType }) => {
    setQuestions((questions) => [...questions, createQuestion(item)]);
  };

  const onClick = (item: QuestionItem) => {
    flush();
    editorForm.setFieldsValue(item);
  };

  const { run: onEditorChange, flush } = useDebounceFn((_, values) => {
    setQuestions((questions) =>
      questions.map((question) =>
        question.key === values.key ? values : question,
      ),
    );
  }, { wait: 500 })

  const save = () => {
    let content = '';
    try {
      content = JSON.stringify(questions);
    } catch (error) {
      message.error('试卷类型错误')
      return;
    }
    run({ id: +(params.id as string), content })
  }

  return (
    <PageContainer>
      <DndProvider backend={HTML5Backend}>
        <Flex justify='end' className='mb-8'>
          <Space>
            <Button type='primary' onClick={save}>保存</Button>
          </Space>
        </Flex>
        <Flex>
          <div className="w-48 p-4">
            <QType type="radio" label="单选题" />
            <QType type="checkbox" label="多选题" />
            <QType type="textarea" label="简答题" />
          </div>
          <div className="flex-1 bg-white">
            <Content dataSource={questions} onDrop={onDrop} onClick={onClick} />
          </div>
          <div className="w-96 p-4">
            <Tabs
              activeKey={activeKey}
              onChange={setActiveKey}
              items={[
                {
                  label: 'JSON 数据',
                  key: '1',
                  children: (
                    <pre className="bg-white p-4">
                      {JSON.stringify(questions, null, 2)}
                    </pre>
                  ),
                },
                {
                  label: '属性配置',
                  key: '2',
                  children: <QuestionEditor form={editorForm} onChange={onEditorChange} />,
                },
              ]}
            />
          </div>
        </Flex>
      </DndProvider>
    </PageContainer>
  );
};

export default ExamContent;
