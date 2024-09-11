import { PageContainer } from '@ant-design/pro-components';
import { Flex, Tabs } from 'antd';
import { useRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Content from './Content';
import QType from './QType';
import QuestionEditor from './QuestionEditor';
import { createQuestion, QuestionItem, QuestionType } from './utils';

const ExamContent = () => {
  const editorRef = useRef<any>();
  const [questions, setQuestions] = useState<any[]>([]);
  const [activeKey, setActiveKey] = useState<string>('1');

  const onDrop = (item: { type: QuestionType }) => {
    setQuestions((questions) => [...questions, createQuestion(item)]);
  };

  const onClick = (item: QuestionItem) => {
    editorRef.current?.setValues(item);
  };

  return (
    <PageContainer>
      <DndProvider backend={HTML5Backend}>
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
                  children: <QuestionEditor ref={editorRef} />,
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
