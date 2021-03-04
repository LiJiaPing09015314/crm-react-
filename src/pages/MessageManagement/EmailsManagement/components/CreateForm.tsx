import React , { useState}from 'react';
import { Form, Input, Modal, Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    id: string;
    username: string;
    password: number;
    name: string;
    email: string;
    status: number;
    smtp: string;
    port: number;
    // key: number;
  }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const validateMessages = {
    types: {
      email: '不是有效的邮箱!',
    },
  };
  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
   // 默认显示状态
   const [status,setstatus] =useState(1)
   const onChange = e =>(
       setstatus(e.target.value)
   )
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd({...fieldsValue ,status});
  };
  return (
    <Modal
      destroyOnClose
      title="新建邮箱"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form} validateMessages={validateMessages}>
        <FormItem
          {...formLayout}
          name="username"
          label="用户名"
          rules={[{
          required: true, message: '请输入！' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!/[\u4E00-\u9FA5]/g.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject('用户名不能为中文!');
            },
          }),
        ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入！' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!/[\u4E00-\u9FA5]/g.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('密码不能为中文!');
              },
            }),
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          name="email"
          label="发件人email"
          rules={[{ required: true, message: '' ,type: 'email'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          name="name"
          label="发件人姓名"
          rules={[{ required: true, message: '请输入！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          name="port"
          label="端口"
          rules={[
            { required: true, message: '请输入！' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (/[\d]/g.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('端口只能是数字!');
              },
            }),
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          rules={[{  }]}
          name="status"
          label="是否禁用"
        >
          <RadioGroup onChange= {onChange} defaultValue={status}>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          {...formLayout}
          name="smtp"
          label="服务器"
          rules={[
            {  message: '请输入！' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!/[\u4E00-\u9FA5]/g.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('不能是汉字!');
              },
            }),
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>

      </Form>
    </Modal>
  );
};

export default CreateForm;
