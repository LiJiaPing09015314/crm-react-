import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Radio, Steps } from 'antd';
import {editRule} from '../service';
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;

const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    editRule({
      id: props.values.id,
    }).then(res=>{
      setData(res.data);
    })
  })
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    title: props.values.title,
    type: props.values.type,
    operation: props.values.operation,
    content: props.values.content,
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

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue });
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem {...formLayout} name="operation" label="业务类型">
            <RadioGroup>
              <Radio value={0}>开户验证码</Radio>
              <Radio value={1}>客户开户通知</Radio>
              <Radio value={2}>代理开户通知</Radio>
              <Radio value={3}>入金通知</Radio>
              <Radio value={4}>出金通知</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem {...formLayout} name="status" label="状态">
          <RadioGroup>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </RadioGroup>
          </FormItem>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
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
        </>
      );
    }
    return (
      <>
        <FormItem
        {...formLayout}
            name="title"
            label="名称"
            rules={[{ required: true, message: '请输入规则名称！' }]}
          >
            <Input placeholder="请输入" />
        </FormItem>
        <FormItem {...formLayout} name="type" label="通知类型">
          <RadioGroup>
            <Radio value={0}>email</Radio>
            <Radio value={1}>sms</Radio>
            <Radio value={2}>站内信</Radio>
          </RadioGroup>
          {/* {console.log( '111',type)} */}
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    if (currentStep === 1) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            下一步
          </Button>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <Button style={{ float: 'left' }} onClick={backward}>
            上一步
          </Button>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
          <Button type="primary" onClick={() => handleNext()}>
            完成
          </Button>
        </>
      );
    }
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => handleNext()}>
          下一步
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="修改模板"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="基本信息" />
        <Step title="具体信息" />
        <Step title="提交信息" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: props.values.id,
          title: props.values.title,
          type: props.values.type,
          operation: props.values.operation,
          content: props.values.content,
          status: props.values.status,
        }}
        >
          {renderContent()}
        </Form>
      </Modal>
    );
  };

  export default UpdateForm;
