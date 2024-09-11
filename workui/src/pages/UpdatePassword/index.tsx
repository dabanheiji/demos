import { useUpdatePassword, useUpdatePasswordCaptcha } from '@/hooks';
import { useNavigate } from '@umijs/max';
import { Button, Card, Form, Input, Space } from 'antd';
import React from 'react';

const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { count, send, loading } = useUpdatePasswordCaptcha({
    form,
  });
  const { onFinish, loading: updatePasswordLoading } = useUpdatePassword({
    onSuccess: () => {
      navigate('/login');
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-sky-100">
      <Card title="修改密码">
        <Form
          className="w-96"
          labelCol={{ flex: '80px' }}
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            label="新密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度不能小于6位' },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度不能小于6位' },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Space.Compact className="w-full">
            <Form.Item
              label="验证码"
              name="captcha"
              className="flex-1"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
            <Button onClick={send} disabled={count > 0} loading={loading}>
              {count ? `${count}s 后重新获取` : '获取验证码'}
            </Button>
          </Space.Compact>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={updatePasswordLoading}
          >
            提交
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default UpdatePassword;
