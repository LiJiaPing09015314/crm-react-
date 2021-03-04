import React from 'react';
import { Form, Input, Modal,Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio;
interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    type: number;
    username: string;
    operation: number;
    content: string;
  }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd(fieldsValue);
  };
  return (
    <Modal
      destroyOnClose
      title="新建"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem {...formLayout} name="type" label="通知类型">
          <RadioGroup>
            <Radio value={0}>email</Radio>
            <Radio value={1}>sms</Radio>
            <Radio value={2}>站内信</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          {...formLayout}
          name="username"
          label="接受人"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem {...formLayout} name="operation" label="业务类型">
          <RadioGroup>
            <Radio value={0}>开户验证码</Radio>
            <Radio value={1}>客户开户通知</Radio>
            <Radio value={2}>代理开户通知</Radio>
            <Radio value={3}>入金通知</Radio>
            <Radio value={4}>出金通知</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          {...formLayout}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 13 }}
          label="内容"
          name="content"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
