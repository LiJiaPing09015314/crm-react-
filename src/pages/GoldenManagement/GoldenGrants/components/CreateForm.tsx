import React, { useState} from 'react';
import { Form, Input, Modal ,Radio} from 'antd';

const FormItem = Form.Item;
const RadioGroup = Radio;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    id: number;
    price: number;
    status: number;
    creator: string;
   }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [value,setstatus]=useState(1)
  // 点击发生状态改变
  const onChange = e => {
    setstatus(e.target.value);
  };

  const [form] = Form.useForm();
  const formLayout ={
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  }
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    const status=value
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
      <Form form={form}>
        <FormItem
        {...formLayout}
        name="price"
        label="增金金额"
        rules={[
          {required: true, message: '请输入！'},
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (/[\d]/g.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject('金额只能是数字!');
            },
          }),
        ]}
        >
        <Input placeholder="请输入"  suffix="$"/>
        </FormItem>
        <FormItem
        {...formLayout}
        name="status"
        label="状态"
        // rules={[{required: true, message: '请输入规则名称！'}]}
        >
        <Radio.Group onChange={onChange}  defaultValue={value}>
          <Radio  value={0}>禁用</Radio>
          <Radio value={1}>启用</Radio>
        </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
