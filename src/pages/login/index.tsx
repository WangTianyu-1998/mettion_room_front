import { Button, Form, Input, message } from 'antd';
import './index.css';
import { loginApi } from './servers';

interface LoginUser {
  username: string;
  password: string;
}

const onFinish = async (values: LoginUser) => {
  try {
    const res = await loginApi(values.username, values.password);
    console.log('🚀 ~ onFinish ~ res:', res);
    message.success('登录成功');
  } catch (error) {
    console.log('🚀 ~ onFinish ~ error:', error);
  }
};
const layout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const layout2 = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export function Login() {
  return (
    <div id="login-container">
      <h1>会议室预订系统</h1>
      <Form {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...layout2}>
          <div className="links">
            <a href="/create-account">创建账号</a>
            <a href="/forgot-password">忘记密码</a>
          </div>
        </Form.Item>

        <Form.Item {...layout2}>
          <Button className="btn" type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
