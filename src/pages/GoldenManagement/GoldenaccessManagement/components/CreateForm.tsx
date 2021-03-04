import React,{useState} from 'react';
import { Form, Input, Modal, Radio ,InputNumber} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    id: number;
    name: string;
    Interface: string;
    exchange_rate: number;
    parameter: string;
    status: number;
  }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const validateMessages = {
    types: {
      number: '不是有效的数字!',
    },
    number: {
      range: '范围在0~10之间',
    },
  };
  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
   // 状态默认选择
   const [status,setstatuss]=useState(1)
   const statusChange = e =>{
     setstatuss(e.target.value);
   }
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd({...fieldsValue,status});
  };
  return (
    <Modal
      destroyOnClose
      title="新建"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form} validateMessages={validateMessages}>
        <FormItem
          {...formLayout}
          label="通道名称"
          name="name"
          rules={[{ required: true, message: '请输入！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          label="	通道接口"
          name="Interface"
          rules={[{ required: true, message: '请输入！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          label="通道汇率"
          name="exchange_rate"
          rules={[{ required: true, message: '',type: 'number', min: 0, max: 10}]}
        >
          <InputNumber  style={{ width: 255 }}/>
        </FormItem>
        <FormItem
          {...formLayout}
          label="通道相关参数"
          name="parameter"
          rules={[{ required: true, message: '',type: 'number' }]}
        >
          <InputNumber style={{ width: 255 }} />
        </FormItem>
        <FormItem
          {...formLayout}
          label="状态"
          name="status"
          rules={[{ message: '请输入！' }]}
        >
          <RadioGroup defaultValue={status} onChange={statusChange}>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
