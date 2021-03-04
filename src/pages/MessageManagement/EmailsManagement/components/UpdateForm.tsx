import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Radio, Steps } from 'antd';

import { TableListItem } from '../data.d';
import { editRule } from '../service';

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
  const validateMessages = {
    types: {
      email: '不是有效的邮箱!',
    },
  };
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    username: props.values.username,
    password: props.values.password,
    status: props.values.status,
    name: props.values.name,
    email: props.values.email,
    smtp: props.values.smtp,
    port: props.values.port,
    // key: props.values.key,
  });
  const [data, setData] = useState([]);
  useEffect(() => {
    editRule({
      id: props.values.id,
    }).then(res => {
      const data = res.list
      setData(data);
    });
  }, []);
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
          <FormItem
            name="name"
            label="发件人姓名"
            rules={[{ required: true, message: '请输入！' }]}
          >
            <Input placeholder="请输入" />
          </FormItem>
          <FormItem name="status" label="是否禁用">
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
            name="email"
            label="发件人email"
            rules={[{ required: true, message: '',type: 'email' }]}
          >
            <Input placeholder="请输入" />
          </FormItem>
          <FormItem
            {...formLayout}
            name="smtp"
            label="服务器"
            rules={[{ }]}
          >
            <Input placeholder="请输入" />
          </FormItem>
        </>
      );
    }
    return (
      <>
        <FormItem
          name="username"
          label="用户名"
          rules={[
            { required: true, message: '请输入！' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!/[\u4E00-\u9FA5]/g.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('用户名不能为中文!');
              },
            }),
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="password"
          label="密码"
          rules={[
            { required: true, message: '请输入！' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!/[\u4E00-\u9FA5]/g.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('密码不能为中文!');
              },
            }),
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>

        <FormItem
          {...formLayout}
          name="port"
          label="端口"
          rules={[
            { required: true, message: '请输入！' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!/[^\d]/g.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('端口只能是数字!');
              },
            }),
          ]}
        >
          <Input placeholder="请输入" />
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
      title="修改账户"
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
      <Form validateMessages={validateMessages}
        {...formLayout}
        form={form}
        initialValues={{
          id: props.values.id,
          email: props.values.email,
          username: props.values.username,
          status: formVals.status,
          name: props.values.name,
          password: props.values.password,
          smtp: props.values.smtp,
          port: props.values.port,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
