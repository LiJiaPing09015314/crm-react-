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
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
         {...formlayout}
          label="名称"
          name="title"
          rules={[{ required: true, message: '请输入' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
           {...formlayout}
          label="次数"
          name="callNo"
          rules={[{ required: true, message: '请输入'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formlayout}
          label="描述"
          name="desc"
          rules={[{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formlayout}
          label="状态"
          name="status"
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
