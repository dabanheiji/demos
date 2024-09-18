import { Checkbox, Input, Radio, Typography } from 'antd';
import React, { useMemo } from 'react';
import { QuestionItem } from './utils';

export interface QuestionProps {
  item: QuestionItem;
  onClick?: (item: QuestionItem) => void;
}

const Question: React.FC<QuestionProps> = ({ item, onClick }) => {
  const content = useMemo(() => {
    switch (item.type) {
      case 'radio':
        return <Radio.Group options={item.options} />;
      case 'checkbox':
        return <Checkbox.Group options={item.options} />;
      case 'textarea':
        return <Input.TextArea />;
    }
  }, [item]);

  return (
    <div
      className="p-4 border border-zinc-200 border-solid rounded-md mb-4 hover:shadow-md delay-150 transition-all cursor-pointer"
      onClick={() => onClick?.(item)}
    >
      <Typography.Paragraph>{item.content || '配置题目'}</Typography.Paragraph>
      {content}
    </div>
  );
};

export default Question;
