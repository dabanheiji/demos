import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, InputNumber, Space } from 'antd';
import React, { forwardRef, useImperativeHandle } from 'react';

const QuestionEditor: React.FC<any> = forwardRef((_props, ref) => {
  const [form] = Form.useForm();

  useImperativeHandle(
    ref,
    () => ({
      setValues: (values: any) => {
        form.setFieldsValue(values);
      },
    }),
    [],
  );

  return (
    <div>
      <Form form={form} labelCol={{ flex: '80px' }}>
        <Form.Item name="id" hidden />
        <Form.Item
          label="题目"
          name="question"
          rules={[{ required: true, message: '请输入题目' }]}
        >
          <Input placeholder="请输入题目" />
        </Form.Item>
        <Form.Item label="选项" required>
          <Form.List name="options">
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
});

export default QuestionEditor;
