import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Radio, TreeSelect, InputNumber } from 'antd';
import { menuRule } from '../service';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TreeNode } = TreeSelect;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    name: string;
    password: any;
    username: string;
    memberid: number;
    email: string;
    status: number;
    id: number;
    key: number;
    redate: any;
    type:number;

  }) => void;
  onCancel: () => void;
}
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const validateMessages = {
    types: {
      email: 'email is not validate email!',
      number: 'rebate is not a validate number!',
    },
    number: {
      range: 'rebate must be between ${min} and ${max}',
    },
  };
  const [memberid, setquanlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [data, setData] = useState([]);

  const [redates, setredates] = useState(1);
  const [rebate, setredate] = useState('');
  const [status, setisRadio] = useState(1);
  const [type, settype] = useState(1);
  

  // 判断返佣显示隐藏身份
  const btnredate = (info) => {
    setredates(info);
    
  };
  // 切换身份
  const onsystemtitle=(e)=>{
    settype(e.target.value)
    if(e.target.value===0){
      setredate(null)
    }
  }
  // 输出numberinput
  const isredate = (value) => {
    setredate(value);
  };
  // 判断选择
  const onRadio = (e) => {
    console.log(e.target.value);
    setisRadio(e.target.value);
  };
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const password:any = JSON.stringify(Math.floor(Math.random() * 1000000));
  const okHandle = async () => {
  const fieldsValue = await form.validateFields();
  form.resetFields();
  const memberid=JSON.parse(localStorage.getItem('userdata')).id 
  // 提交数据
  handleAdd({ ...fieldsValue,password, rebate, status,type,memberid });
  };
  return (
    <Modal
      destroyOnClose
      title="新增开户"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form} validateMessages={validateMessages}>
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
              message: '请输入！',
            },
          ]}
        >
          <Input placeholder={password} disabled />
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
          ]}
        >
          <Input placeholder="确定不能修改" />
        </FormItem>
        <FormItem
          {...formLayout}
          name="email"
          label="邮件"
          rules={[
            {
              required: true,
              message: '',
              type: 'email',
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        {/* <FormItem
          {...formLayout}
          label="身份"
          rules={[{ required: true, message: '', type: 'number', min: 0, max: 1 }]}
        >
          <TreeSelect
            onSelect={btnredate}
            onChange={onsystemtitle}
            // style={{ width: '100%' }}
            value={type}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            // placeholder="Please select"
            allowClear
            treeDefaultExpandAll
          >
            <TreeNode value={0} key={0} id={0} redates={0} title="会员" />
            <TreeNode value={1} key={1} id={1} redates={1} title="代理" />
          </TreeSelect>
        </FormItem> */}

        <FormItem label="身份" {...formLayout}>
          <Radio.Group value={type} onChange={onsystemtitle}>
            <Radio value={0}>会员</Radio>
            <Radio value={1}>代理</Radio>
          </Radio.Group>
        </FormItem>
        {type === 1 ? (
          <FormItem
            {...formLayout}
            label="返佣"
            rules={[{ required: true, message: '', type: 'number', min: 0, max: 1 }]}
          >
            <InputNumber onChange={isredate} step={0.01} style={{ width: 255 }} />
          </FormItem>
        ) : null}

        <FormItem label="状态" {...formLayout}>
          <Radio.Group value={status} onChange={onRadio}>
            <Radio value={0}>待审核</Radio>
            <Radio value={1}>成功</Radio>
            <Radio value={2}>冻结</Radio>
          </Radio.Group>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
