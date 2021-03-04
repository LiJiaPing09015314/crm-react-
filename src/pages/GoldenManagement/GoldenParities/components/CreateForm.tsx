import React from 'react';
import { Form, Input, Modal,Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formLayout ={
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    type: string;
    rate: number;
    status: number;
    id: number;
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
          {...formLayout}
          name="type"
          label="货币种类"
          rules={[
            {
              required: true,
              message: '请输入！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          name="rate"
          label="兑换比例"
          rules={[
            {
              required: true,
              message: '请输入！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          name="status"
          label="状态"
        >
          <RadioGroup>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
