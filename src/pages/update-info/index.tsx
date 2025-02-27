import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useCallback, useEffect } from 'react';
import './index.css';
import { getUserInfoApi, updateInfo, updateUserInfoCaptcha } from './servers';
import { HeadPicUpload } from './head-pic-upload';

export interface UserInfo {
  headPic: string;
  nickName: string;
  email: string;
  captcha: string;
}

const layout1 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

export function UpdateInfo() {
  const [form] = useForm();

  const onFinish = useCallback(async (values: UserInfo) => {
    console.log('🚀 ~ onFinish ~ values:', values);
    await updateInfo(values);

    message.success('用户信息更新成功');
  }, []);

  const sendCaptcha = useCallback(async () => {
    const res = await updateUserInfoCaptcha();
    message.success(res.data);
  }, []);

  const getUserInfo = useCallback(async () => {
    const res = await getUserInfoApi();
    console.log(res, '@@res');
    form.setFieldsValue({
      headPic: res.data.headPic,
      nickName: res.data.nickName,
      email: res.data.email,
    });
  }, [form]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  return (
    <div id="updateInfo-container">
      <Form form={form} {...layout1} onFinish={onFinish} colon={false} autoComplete="off">
        <Form.Item label="头像" name="headPic" rules={[{ required: true, message: '请输入头像!' }]}>
          <HeadPicUpload />
        </Form.Item>

        <Form.Item
          label="昵称"
          name="nickName"
          rules={[{ required: true, message: '请输入昵称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="邮箱"
          name="email"
          rules={[
            { required: true, message: '请输入邮箱!' },
            { type: 'email', message: '请输入合法邮箱地址!' },
          ]}
        >
          <Input disabled />
        </Form.Item>

        <div className="captcha-wrapper">
          <Form.Item
            label="验证码"
            name="captcha"
            rules={[{ required: true, message: '请输入验证码!' }]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" onClick={sendCaptcha}>
            发送验证码
          </Button>
        </div>

        <Form.Item {...layout1} label=" ">
          <Button className="btn" type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
