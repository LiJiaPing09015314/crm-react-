import React from 'react';
import { Form, Input, Modal,Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formlayout = {
  labelCol :{ span: 7 },
  wrapperCol: { span: 13 }
}

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
     desc: string ,
     callNo: number,
     title: string,
     status: number
    }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

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
        <FormItem
         {...formlayout}
          label="姓名"
          name="name"
          rules={[{ required: true, message: '请输入' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
           {...formlayout}
          label="账号"
          name="account"
          rules={[{ required: true, message: '请输入'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
         {...formlayout}
          label="余额"
          name="money"
          rules={[{ required: true, message: '请输入' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
           {...formlayout}
          label="上级id"
          name="fatherid"
          rules={[{ required: true, message: '请输入'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
           {...formlayout}
          label="二元手数"
          name="twonumber"
          rules={[{ required: true, message: '请输入'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
           {...formlayout}
          label="交易量"
          name="changenumber"
          rules={[{ required: true, message: '请输入'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formlayout}
          label="交易盈亏"
          name="yingkui"
        >
          <RadioGroup>
            <Radio value={0}>盈利</Radio>
            <Radio value={1}>亏损</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
