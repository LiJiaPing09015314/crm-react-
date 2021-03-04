import React, { useState ,useEffect} from 'react';
import { Form, Button,  Input, Modal, Radio,  Steps ,TreeSelect} from 'antd';
import { editRule ,addlist} from '../service';
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
const { TreeNode } = TreeSelect;
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
  const [edit, seteditData] = useState([]);
  useEffect(() => {
    editRule({
      id: props.values.id,
    }).then(res => {
      seteditData(res);
    });
  }, []);
  const [formVals, setFormVals] = useState<FormValueType>({
    id:props.values.id,
    username: props.values.username,
    title: props.values.title,
    roleid: props.values.roleid,
    password: props.values.password,
    status: props.values.status,
    key: props.values.key,
  });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [roleid , setquanlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  // 获取角色下拉框
  useEffect(() => {
    addlist({}).then(res => {
      const data = res.data;
      return setData(data);
    });
  }, []);

  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(info.title);
    const roleid = info.id;
    setquanlist(roleid)

  };
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
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
        <FormItem
           {...formLayout}
          label="密码"
          name="password"
          rules={[
            {  message: '不修改请留空！'},
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
          <Input placeholder="不修改请留空！" />
        </FormItem>
        <FormItem
           {...formLayout}
          label="	角色"
          name="roleid"
          // rules={[{ required: true}]}
        >
          <TreeSelect
            onSelect={onSelect}
            showSearch
            style={{ width: '100%' }}
            value={selectedKeys||'请选项'}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            treeNodeFilterProp="title"
          >
            {data.map((items) => (
              <TreeNode
                value={items.id}
                key={items.id}
                id={items.id}
                roleid={items.id}
                title={items.title}
                cao={items.cao}
              >
                {/* {items.list.map((item) => (
                  <TreeNode
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    systemid={item.id}
                    cao={item.cao}
                  />
                ))} */}
              </TreeNode>
            ))}
          </TreeSelect>
        </FormItem>

        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
        <FormItem
           {...formLayout}
          rules={[{ required: true, message: '请输入描述！'}]}
          name="status" label="是否禁用">
            <RadioGroup>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>启用</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem
          {...formLayout}
          label="谷歌密钥"
          name="key"
          rules={[{ message: '请输入描述！'}]}
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
          label="用户名"
          name="username"
          rules={[
            { required: true, message: '请输入描述！'},
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
          {...formLayout}
          label="登录名"
          name="title"
          rules={[{ required: true, message: '请输入描述！'}]}
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
      title="修改管理员"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="基本信息" />
        <Step title="具体信息" />
        <Step title="提交" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          id:props.values.id,
          username: props.values.username,
          roletitle: props.values.roletitle,
          title: props.values.title,
          roleid: props.values.roleid,
          // password: props.values.password,
          status: formVals.status,
          key: props.values.key,

        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
