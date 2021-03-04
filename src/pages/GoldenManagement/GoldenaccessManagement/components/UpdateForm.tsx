import React, { useState ,useEffect } from 'react';
import { Form, Button, Input, Modal, Radio, Steps ,InputNumber} from 'antd';
import { updateRule } from '../service';
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
  const validateMessages = {
      types: {
      number: '不是有效的数字!',
    },
    number: {
      range: '范围在0~10之间',
    },
  };
  const [data, setData] = useState([]);
  useEffect(() => {
      updateRule({
      id: props.values.id,
    }).then(res => {
      setData(res);
    });
  }, []);
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    name: props.values.name,
    Interface: props.values.Interface,
    exchange_rate: props.values.exchange_rate,
    parameter: props.values.parameter,
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
            rules={[{ required: true, message: '',type: 'number', min: 0, max: 10  }]}
          >
            <InputNumber  style={{ width: 302 }}/>
          </FormItem>
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
          <FormItem
            {...formLayout}
            label="状态"
            name="status"
            rules={[{ required: true, message: '请输入！' }]}
          >
            <RadioGroup>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>启用</Radio>
            </RadioGroup>
          </FormItem>
        </>
      );
    }
    return (
      <>
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
            label="通道相关参数"
            name="parameter"
            rules={[{ required: true, message: '请输入正确的数字！' }]}
          >
            <InputNumber placeholder="请输入"  style={{ width: 302 }}/>
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
      title="修改"
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
          name: props.values.name,
          Interface: props.values.Interface,
          exchange_rate: props.values.exchange_rate,
          parameter: props.values.parameter,
          status: props.values.status,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
