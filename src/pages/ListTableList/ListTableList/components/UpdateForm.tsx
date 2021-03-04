import React, { useState ,useEffect } from 'react';
import { Form, Button,Input, Modal, Radio, Steps,TreeSelect ,Row,Col} from 'antd';
import {updateRule,menuRule } from '../service'
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

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  // 邮箱验证
  const validateMessages = {
    types: {
      email: '不是有效的邮箱!',
    },
  };
  const [title, title1Data] = useState([]);
  // 编辑用户时数据列表展示
  useEffect(() => {
    updateRule({
      id: props.values.id,
    }).then(res => {
      // setData(res);
      title1Data(res.pathlist);
    });
  }, []);

  const [formVals, setFormVals] = useState<FormValueType>({
    id: props.values.id,
    key: props.values.key,
    username:props.values.username,
    memberid:props.values.memberid,
    email:props.values.email,
    status:props.values.status,
    name:props.values.name,
    password:props.values.password,
    redate: props.values.redate,
  });
  // const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [memberid, setquanlist] = useState([]);
  const [data, setData] = useState([]);
    // 上级id下拉框
    useEffect(() => {
      menuRule({
        memberid: props.values.id,
        // type:0,
        test:0
        }).then(res => {
          const data =res;
          setData(data);
        });
    }, []);
    // 上级id选择
     const onSelect = (selectedKeys, info) => {
      setSelectedKeys(info.title);
      const memberid = info.id;
      setquanlist(memberid)
    };
  // const forward = () => setCurrentStep(currentStep + 1);

  // const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });

    // if (currentStep < 2) {
    //   forward();
    // } else {
      handleUpdate({...formVals, ...fieldsValue});
    // }
  };

  const renderContent = () => {
    // if (currentStep === 1) {
    //   return (
    //     <>

    //     </>
    //   );
    // }
    // if (currentStep === 2) {
    //   return (
    //     <>

    //     </>
    //   );
    // }
    return (
      <>
      <FormItem
          {...formLayout}
          name="name"
          label="名称"
          rules={[
            {
              required: true,
              message: '请输入名称！',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          name="password"
          label="密码"
          rules={[
            {
              // required: true,
              message: '不修改请留空',
            },
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
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
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
          <Input placeholder="请输入" disabled/>
        </FormItem>
        <FormItem
          {...formLayout}
          name="email"
          label="邮件"
          rules={[
            {
              required: true,
              message: '',
              type: 'email'
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
           {...formLayout}
          label="上级代理"
          name="memberid"
          // rules={[{ required: true, message: '请输入描述！'}]}
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
            treeNodeFilterProp="title" // 搜索
          >
          <TreeNode value={0}  key={0} id={0} memberid={0} title='顶级代理'>
           {data.map(items => (
              <TreeNode value={items.id}  key={items.id} id={items.id} memberid={items.id} title={items.username}>
                {/* {items.list.map(item => (
                  <TreeNode value={item.id}  key={item.id} title={item.title} id={item.id} systemid={item.systemid}/>
                ))} */}
              </TreeNode>
            ))}
          </TreeNode>
          </TreeSelect>
        </FormItem>
        <FormItem name="status" label="状态" {...formLayout}>
          <RadioGroup>
            <Radio value={0}>待审核</Radio>
            <Radio value={1}>成功</Radio>
            <Radio value={2}>冻结</Radio>
          </RadioGroup>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    // if (currentStep === 1) {
    //   return (
    //     <>
    //       <Button style={{ float: 'left' }} onClick={backward}>
    //         上一步
    //       </Button>
    //       <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
    //       <Button type="primary" onClick={() => handleNext()}>
    //         下一步
    //       </Button>
    //     </>
    //   );
    // }
    // if (currentStep === 2) {
    //   return (
    //     <>
    //       <Button style={{ float: 'left' }} onClick={backward}>
    //         上一步
    //       </Button>
    //       <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
    //       <Button type="primary" onClick={() => handleNext()}>
    //         完成
    //       </Button>
    //     </>
    //   );
    // }
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
      title="修改信息"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      {/* <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="基本信息" />
        <Step title="具体信息" />
        <Step title="提交信息" />
      </Steps> */}
      <Row>
        <Col span={5}>
          <Steps style={{ marginBottom: 20 }} size="small" current={0} direction='vertical'>
          {title.map(items => (
            <Step title={items} key={items}/>
            ))}
          </Steps>
        </Col>
        <Col span={19}>
          <Form validateMessages={validateMessages}
            {...formLayout}
            form={form}
            initialValues={{
              id: props.values.id,
              username:props.values.username,
              email:props.values.email,
              status:props.values.status,
              name:props.values.name,
              redate:props.values.redate,
              memberid: props.values.memberid
              // password:props.values.password
            }}
          >
            {renderContent()}
          </Form>
        </Col>
    </Row>
    </Modal>
  );
};

export default UpdateForm;
