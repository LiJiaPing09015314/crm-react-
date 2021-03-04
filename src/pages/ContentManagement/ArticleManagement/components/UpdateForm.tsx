import React, { useState } from 'react';
import { Form, Button,  Input, Modal, Radio,  Steps } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {


}

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
  const [formVals, setFormVals] = useState<FormValueType>({
    classifyid:  props.values.classifyid,
    type:  props.values.type,
    title:  props.values.title,
    content:  props.values.content,
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
      handleUpdate({...formVals,...fieldsValue});
      console.log({...formVals,...fieldsValue})
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
        <FormItem
          {...formLayout}
          label="标题"
          name="title"
          rules={[{ required: true, message: '请输入规则名称' }]}
        >
          <Input placeholder="请输入" />
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
          label="分类id"
          name="classifyid"
          rules={[{ required: true, message: '请输入规则名称' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          label="语言类型"
          name="type"
          rules={[{ required: true, message: '请输入规则名称' }]}
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
      title="规则配置"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="基本信息" />
        <Step title="配置规则属性" />
        <Step title="设定调度周期" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          classifyid:  props.values.classifyid,
          type:  props.values.type,
          title:  props.values.title,
          content:  props.values.content,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
