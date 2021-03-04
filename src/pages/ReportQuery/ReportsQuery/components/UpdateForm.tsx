import React, { useState } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
  target?: string;
  template?: string;
  type?: string;
  time?: string;
  frequency?: string;
}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formlayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    title: props.values.title,
    desc: props.values.desc,
    callNo: props.values.callNo,
    status: props.values.status,
    key: props.values.key,
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });
      handleUpdate({ ...formVals, ...fieldsValue});
  };

  const renderContent = () => {
    return (
      <>
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
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
        完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formlayout}
        form={form}
        initialValues={{
          title: formVals.title,
          desc: formVals.desc,
          status: formVals.status,
          callNo: formVals.callNo,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
