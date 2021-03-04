import React,{useState} from 'react';
import { Form, Input, Modal,Radio } from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    id: number,
    title: string,
    type: number,
    operation:  number,
    content: string,
    status: number,
   }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  const [status,onstatus]=useState(1)
  const onStatus = e =>{
    onstatus(e.target.value);
  }
  const [operation,setopera]=useState(1)
  const onOpera = e =>{
    setopera(e.target.value);
  }
  const [type,settype]=useState(1)
  const onType = e =>{
    settype(e.target.value);
  }
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd({...fieldsValue,status,operation,type});
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
            name="title"
            label="名称"
            rules={[{ required: true, message: '请输入规则名称！' }]}
          >
            <Input placeholder="请输入" />
        </FormItem>
        <FormItem {...formLayout} name="type" label="通知类型">
          <RadioGroup defaultValue={type} onChange={onType}>
            <Radio value={0}>email</Radio>
            <Radio value={1}>sms</Radio>
            <Radio value={2}>站内信</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formLayout} name="status" label="状态">
          <RadioGroup defaultValue={status} onChange={onStatus}>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem {...formLayout} name="operation" label="业务类型">
            <RadioGroup  defaultValue={operation} onChange={onOpera}>
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
