import React, { useState, useEffect } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps, TreeSelect } from 'antd';
import { updateRule, menuRule } from '../service';
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
const { TreeNode } = TreeSelect;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
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
  const [systemid, setquanlist] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [data, setData] = useState([]);
  const [menu, setmenuData] = useState([]);
  // 类型默认选择
  // const [type, setstatus] = useState(1);
  const onChange = (value) => {
    // setstatus(value);
  };
  // 菜单下拉框
  useEffect(() => {
    menuRule({
      type: props.values.type,
    }).then((res) => {
      const data = res.data;
      setmenuData(data);
    });
  }, []);
  // 菜单选择
  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(info.title);
    const systemid = info.id;
    setquanlist(systemid);
  };
  // 编辑数据展示
  useEffect(() => {
    updateRule({
      id: props.values.id,
    }).then((res) => {
      setData(res);
    });
  }, []);
  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    indexno: props.values.indexno,
    systemtitle: props.values.systemtitle,
    systemid: props.values.systemid,
    type: props.values.type,
    title: props.values.title,
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

  // 类型选择
  const handleChange = (value) => {};

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 2) {
      forward();
    } else {
      handleUpdate({ ...formVals, ...fieldsValue});
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem
            {...formLayout}
            label="类型"
            name="type"
            // rules={[{ required: true, message: '请输入描述！'}]}
          >
            <Select style={{ width: 303 }} onChange={onChange}>
              <Option value={1}>CRM</Option>
              <Option value={2}>USER</Option>
              <Option value={3}>Agent</Option>
            </Select>
          </FormItem>
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
    if (currentStep === 2) {
      return (
        <>

          <FormItem
          {...formLayout}
          label="菜单名称"
          name="title"
          rules={[{ message: '请输入描述！' }]}
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
          label="排序"
          name="indexno"
          rules={[
            { required: true, message: '请输入描述！' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (/[\d]/g.test(value)) {
                  return Promise.resolve();
                }
                return Promise.reject('排序只能是数字!');
              },
            })
        ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
            {...formLayout}
            label="上级菜单"
            name="systemtitle"
            // rules={[{ required: true, message: '请输入描述！'}]}
          >
            <TreeSelect
              onSelect={onSelect}
              showSearch
              style={{ width: '100%' }}
              value={selectedKeys || '请选项'}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="Please select"
              allowClear
              treeDefaultExpandAll
              treeNodeFilterProp="title"
            >
              {/* <TreeNode value={0} key={0} id={0} systemid={0} title="顶级菜单"> */}
                {menu.map((items) => (
                  <TreeNode
                    value={items.id}
                    key={items.id}
                    title={items.title}
                    id={items.id}
                    systemid={items.id}
                  />
                ))}
              {/* </TreeNode> */}
            </TreeSelect>
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
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          indexno: props.values.indexno,
          systemtitle: props.values.systemtitle,
          systemid: props.values.systemid,
          type: props.values.type,
          title: props.values.title,
          status: props.values.status,
        }}
        >
          {renderContent()}
        </Form>
      </Modal>
    );
  };

  export default UpdateForm;
