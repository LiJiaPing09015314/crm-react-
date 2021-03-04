import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Radio, TreeSelect,InputNumber} from 'antd';
import {menuRule} from '../service';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TreeNode } = TreeSelect;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    name: string;
    password: number;
    username: string;
    memberid: number;
    email: string;
    status: number;
    id: number;
    key: number;
    redate: number;
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
      email: '不是有效的邮箱!',
      number: '不是有效的数字!',
    },
    number: {
      range: '范围在0~1之间',
    },
  };
  const [memberid, setquanlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [data, setData] = useState([]);
   // 上级id下拉框
   useEffect(() => {
    menuRule({
      // memberid: id,
      type: 1,
      test: 0
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
   // 状态默认选择
   const [status,setstatuss]=useState(1)
   const statusChange = e =>{
     setstatuss(e.target.value);
   }
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const password =  JSON.stringify(Math.floor(Math.random() * 1000000));
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd({...fieldsValue, password,memberid,status});
  };
  return (
    <Modal
      destroyOnClose
      title="新建"
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
          <Input placeholder="" disabled defaultValue={password}/>
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
              type: 'email'
            },
          ]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          name="redate"
          label="返佣"
          rules={[{ required: true, message: '',type: 'number', min: 0, max: 1}]}
        >
          <InputNumber step={0.01} style={{ width: 255 }}/>
        </FormItem>
        <FormItem
           {...formLayout}
          label="上级代理"
          name="systemtitle"
          // rules={[{ required: true, message: '请输入描述！'}]}
        >
        <TreeSelect
            onSelect={onSelect}
            // onChange={onsystemtitle}
            showSearch
            style={{ width: '100%' }}
            value={selectedKeys||'请选项'}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            treeNodeFilterProp="title"
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
          <RadioGroup defaultValue={status} onChange={statusChange}>
            <Radio value={0}>待审核</Radio>
            <Radio value={1}>成功</Radio>
            <Radio value={2}>冻结</Radio>
          </RadioGroup>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
