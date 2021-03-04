import React, { useState ,useEffect } from 'react';
import { Form, Button, Input, Modal, Radio, TreeSelect, Steps ,InputNumber} from 'antd';
import {editRule,menuRule,setuserinfo} from "../service";
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
  const[userdata,setdata]=useState()
  const validateMessages = {
    types: {
      email: 'email is not validate email!',
      number: 'rebate is not a validate number!',
    },
    number: {
      range: 'rebate must be between ${min} and ${max}',
    },
  };
  const [title, title1Data] = useState([]);
  useEffect(() => {
    // editRule({
    //   id: props.values.id,
    // }).then(res => {
    //   // setData(res);
    //   title1Data(res.pathlist);
    // });
    // setuserinfo({
    //   id:props.values.id
    // }).then(res=>{
    //   setdata(res.list)
    // })
  }, []);

  const [formVals, setFormVals] = useState<FormValueType>({
    name: props.values.name,
    password:props.values.password,
    username:props.values.username,
    memberid:props.values.memberid,
    email:props.values.email,
    status:props.values.status,
    id:props.values.id,
    rebate:props.values.rebate,
    key:props.values.key,

    type:props.values.type ,
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
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [memberid, setquanlist] = useState([]);
  const [data, setData] = useState([]);

  // 身份
  const [type,setType]=useState()
  // 冻结启用
  const [status,setStatus]=useState()
  //返佣
  const[rebate,isredate]=useState(props.values.rebate)  
  
  const onchangs=(e)=>{
    isredate(e)
  }
     const onSelect = (selectedKeys, info) => {
      setSelectedKeys(info.title);
      const memberid = info.id;
      setquanlist(memberid)

      // 选择身份
      props.values.type=info.value
      const type=props.values.type
      formVals.type=type
      //是会员清除返佣数据
      if(!type){
        
        isredate(0)
      }
      
      // setType(info.value)  
    };
    const onRadio=(e)=>{
    props.values.status=e.target.value
    const status:any=props.values.status
      setStatus(status)
      formVals.status=status

      
    }
  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
    if (currentStep < 2) {
      forward();
    } else {
      const test:any=0 
      handleUpdate({...formVals,rebate,test});
    }
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
         <FormItem
          {...formLayout}
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名',
            },
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


        
        </>
      );
    }
    if (currentStep === 2) {
      return (
        <>
        <FormItem label="状态" {...formLayout}>
          {/* <Radio.Group value={status} onChange={onRadio}> */}
          <Radio.Group value={props.values.status} onChange={onRadio}>
            <Radio value={0}>待审核</Radio>
            <Radio value={1}>成功</Radio>
            <Radio value={2}>冻结</Radio>
          </Radio.Group>
        </FormItem>
        </>
      );
    }
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
          label="身份"
          // name="type"
          // rules={[{ required: true, message: '请输入描述！'}]}
        >
          <TreeSelect
            onSelect={onSelect}
            showSearch
            style={{ width: '100%' }}
            value={props.values.type==0?'会员':'代理' ||'请选择'}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            // placeholder="Please select"
            allowClear
            treeDefaultExpandAll
          >
            <TreeNode value={0} key={0} id={0} redates={0} title="会员" />
            <TreeNode value={1} key={1} id={1} redates={1} title="代理" />
          </TreeSelect>
        </FormItem>
        {props.values.type === 1 ? (
          <FormItem
            {...formLayout}
            label="返佣"
            rules={[{ required: true, message: '', type: 'number', min: 0, max: 1 }]}
          >
            <InputNumber value={rebate } onChange={onchangs} step={0.01} style={{ width: 255 }} />
            {/* <InputNumber  step={0.01} style={{ width: 255 }} /> */}
          </FormItem>
        ) : null}
        {/* <FormItem
          {...formLayout}
          name="password"
          label="密码"
          rules={[
            {
              // required: true,
              message: '请输入名称！',
            },
          ]}
        >
          <Input placeholder="123456" disabled />
        </FormItem> */}
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
      title="修改信息"
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
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
      {title.map(items => (
        <Step title={items} key={items}/>
        ))}
      </Steps>
      <Form validateMessages={validateMessages}
        {...formLayout}
        form={form}
        initialValues={{
          name: props.values.name,
          password:props.values.password,
          email:props.values.email,
          status:props.values.status,
          memberid: props.values.memberid,
          id:props.values.id,
          type:props.values.type || '',
          username:props.values.username,

          rebate: props.values.rebate,
          key:props.values.key,
          
        }}
        
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
