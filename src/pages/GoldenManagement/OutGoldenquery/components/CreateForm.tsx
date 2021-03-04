import React from 'react';
import { Form, Input, Modal ,Select} from 'antd';

const FormItem = Form.Item;
const formLayout={
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
}
const {Option} =Select ;
interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}
const onChange = e=>{

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
      title="查看用户资料"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
      <FormItem
      {...formLayout}
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
      </FormItem>
      <FormItem
      {...formLayout}
        name="ibid"
        label="IB账号"
        rules={[{ required: true, message: '请输入规则名称！' }]}
      >
        <Input placeholder="请输入" />
      </FormItem>
      <FormItem
           {...formLayout}
          label="账户类型"
          name="type"
          // rules={[{ required: true, message: '请输入描述！'}]}
        >
          <Select defaultValue={1} style={{ width: 255 }} onChange={onChange}>
            <Option value={1}>客户</Option>
            <Option value={2}>IB(方案A)</Option>
          </Select>
        </FormItem>
        <FormItem
           {...formLayout}
          label="账户等级"
          name="type"
          // rules={[{ required: true, message: '请输入描述！'}]}
        >
          <Select defaultValue={1} style={{ width: 255 }} onChange={onChange}>
            <Option value={1}>客户</Option>
          </Select>
        </FormItem>
        <FormItem
           {...formLayout}
          label="证件类别"
          name="type"
          // rules={[{ required: true, message: '请输入描述！'}]}
        >
          <Select defaultValue={1} style={{ width: 255 }} onChange={onChange}>
            <Option value={1}>身份证</Option>
          </Select>
        </FormItem>
        <FormItem
        {...formLayout}
          name="name"
          label="账户姓名"
          rules={[{  message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
        {...formLayout}
          name="ibid"
          label="开户账号"
          rules={[{  message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
        {...formLayout}
          name="ibid"
          label="银行名称"
          rules={[{  message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
