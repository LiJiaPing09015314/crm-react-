import React, { useState , useEffect} from 'react';
import { Form, Button,Input, Modal, Radio} from 'antd';
import {searchRule} from '../service';
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
  // 编辑用户时数据列表展示
  const [data, setData] = useState([]);
  useEffect(() => {
    searchRule({
      id: props.values.id,
    }).then(res => {
      setData(res);
    });
  }, []);

  const [form] = Form.useForm();

  const {
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const renderContent = () => {
    return (
      <>
       <FormItem {...formLayout} name="type" label="通知类型">
          <RadioGroup>
            <Radio value={0}>email</Radio>
            <Radio value={1}>sms</Radio>
            <Radio value={2}>站内信</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem
          {...formLayout}
          name="username"
          label="接受人"
          rules={[{ message: '请输入！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem {...formLayout} name="operation" label="业务类型">
          <RadioGroup>
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
          rules={[{message: '请输入至少五个字符的规则描述！', min: 5 }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="查看"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          type: props.values.type,
          username: props.values.username,
          operation: props.values.operation,
          content: props.values.content,
          key: props.values.key,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
