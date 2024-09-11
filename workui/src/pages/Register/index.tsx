import { useRegister, useRegisterCaptcha } from '@/hooks';
import { Button, Card, Flex, Form, Input, Space, Typography } from 'antd';
import React from 'react';

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const { count, send, loading } = useRegisterCaptcha({
    form,
  });
  const { onFinish, loading: registerLoading } = useRegister();

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-sky-100">
      <Card title="注册">
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
            label="昵称"
            name="nickname"
            rules={[{ required: true, message: '请输入昵称' }]}
          >
            <Input placeholder="请输入昵称" />
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
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码长度不能少于6位' },
            ]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            rules={[
              { required: true, message: '请确认密码' },
              { min: 6, message: '密码长度不能少于6位' },
            ]}
          >
            <Input.Password placeholder="请确认密码" />
          </Form.Item>
          <Space.Compact className="w-full">
            <Form.Item
              className="flex-1"
              label="验证码"
              name="captcha"
              rules={[{ required: true, message: '请输入验证码' }]}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
            <Button onClick={send} disabled={count > 0} loading={loading}>
              {count ? `${count}s 后重新获取` : '获取验证码'}
            </Button>
          </Space.Compact>
          <Form.Item>
            <Flex justify="end">
              <Typography.Text>
                已有账号？
                <Typography.Link href="/login">{'去登录'}</Typography.Link>
              </Typography.Text>
            </Flex>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={registerLoading}
            block
          >
            注册
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
