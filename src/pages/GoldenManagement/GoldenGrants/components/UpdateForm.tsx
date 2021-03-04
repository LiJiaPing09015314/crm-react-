import React, { useState ,useEffect} from 'react';
import { Form, Button, Input, Modal, Radio, Select, Steps } from 'antd';
import {updateRule} from '../service'
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
    id: props.values.id,
    price: props.values.price,
    status: props.values.status,
    creator: props.values.creator,
    key: props.values.key,
  });

  const [data, setData] = useState([]);
  useEffect(()=>{
    updateRule({
      id: props.values.id,
    }).then(res => {
      setData(res);
    });
  }, []);
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });
    handleUpdate({ ...formVals, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
        {...formLayout}
        name="price"
        label="增金金额"
        rules={[
          {required: true, message: '请输入金额！'},
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!/[^\d]/g.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject('金额只能是数字!');
            },
          }),
        ]}
        >
        <Input placeholder="请输入" suffix="$" />
        </FormItem>
        <FormItem
        {...formLayout}
        name="status"
        label="状态"
        rules={[{required: true, message: '请输入规则名称！'}]}
        >
        <RadioGroup>
        <Radio value={0}>禁用</Radio>
        <Radio value={1}>启用</Radio>
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
      title="赠金修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id: props.values.id,
          price: props.values.price,
          status: props.values.status,
          creator: props.values.creator,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
