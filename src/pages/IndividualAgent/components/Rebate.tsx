import React, { useState ,useEffect } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps,TreeSelect,InputNumber } from 'antd';
import {grantsEditRule} from '../service'
import { TableListItem } from '../data';

export interface FormValueType extends Partial<TableListItem> {

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  withgoldModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const { TreeNode } = TreeSelect;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const Rebate: React.FC<UpdateFormProps> = (props) => {
  const [formVals, setFormVals] = useState<FormValueType>({
    // id: props.values.id,
    // key: props.values.key,
    // rebate:props.values.rebate,
  });
  const validateMessages = {
    types: {
      number: 'rebate is not a validate number!',
    },
    number: {
      range: 'rebate must be between ${min} and ${max}',
    },
  };
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleRebate,
    onCancel: handleRebateModalVisible,
    withgoldModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({  ...fieldsValue});
    handleRebate({...fieldsValue});
  };

  const renderContent = () => {
    return (
      <>
       <FormItem name="rebate"
          {...formLayout}
          label="返佣"
          rules={[{ required: true, message: '',type: 'number', min: 0, max: 1}]}
        >
          <InputNumber step={0.01} style={{ width: 255 }}/>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleRebateModalVisible(false, values)}>取消</Button>
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
      title="修改返佣"
      visible={withgoldModalVisible}
      footer={renderFooter()}
      onCancel={() => handleRebateModalVisible(false, values)}
      afterClose={() => handleRebateModalVisible()}
    >
      <Form validateMessages={validateMessages}
        {...formLayout}
        form={form}
        initialValues={{
          id: formVals.id,
          rebate:formVals.rebate,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default Rebate;
