import { QUESTION_TYPE_OPTIONS } from '@/constants';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, FormInstance, Input, InputNumber, Select, Space } from 'antd';
import { FormProps } from 'antd/lib';
import React from 'react';

interface QuestionEditorProps {
  onChange?: FormProps['onValuesChange'];
  form?: FormInstance;
  onFinish?: FormProps['onFinish'];
  [key: string]: any;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
  onChange,
  onFinish,
  form
}) => {

  return (
    <div>
      <Form form={form} labelCol={{ flex: '80px' }} onValuesChange={onChange} onFinish={onFinish}>
        <Form.Item name="id" hidden />
        <Form.Item
          label="类型"
          name="type"
          rules={[{ required: true, message: '请选择题目类型' }]}
        >
          <Select placeholder='请选择' allowClear>
            {
              QUESTION_TYPE_OPTIONS.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))
            }
          </Select>
        </Form.Item>
        <Form.Item
          label="题目"
          name="content"
          rules={[{ required: true, message: '请输入题目' }]}
        >
          <Input placeholder="请输入题目" />
        </Form.Item>
        <Form.Item label="选项" required>
          <Form.List name="options" rules={[{
            validator(rule, value) {
              if (value.length < 2) {
                return Promise.reject('至少需要两个选项');
              }
              return Promise.resolve();
            }
          }]}>
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map((field) => (
                    <Space className="w-full" align="baseline" key={field.key}>
                      <Form.Item
                        {...field}
                        rules={[{ required: true, message: '请输入选项' }]}
                      >
                        <Input placeholder="请输入选项" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(field.name)} />
                    </Space>
                  ))}
                  <Button icon={<PlusOutlined />} onClick={() => add()}>
                    新增
                  </Button>
                </>
              );
            }}
          </Form.List>
        </Form.Item>
        <Form.Item
          label="答案"
          name="answer"
          rules={[{ required: true, message: '请输入答案' }]}
        >
          <Input placeholder="请输入答案" />
        </Form.Item>
        <Form.Item
          label="解析"
          name="analysis"
          rules={[{ required: true, message: '请输入解析' }]}
        >
          <Input placeholder="请输入解析" />
        </Form.Item>
        <Form.Item
          label="分数"
          name="score"
          rules={[{ required: true, message: '请输入分数' }]}
        >
          <InputNumber min={0} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default QuestionEditor;
