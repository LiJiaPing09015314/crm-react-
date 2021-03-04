import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Radio,TreeSelect} from 'antd';
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
    email: string;
    status: number;
    redate: number;
    id: number;
    key: number;
  }) => void;
  onCancel: () => void;
}
const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  // 邮箱验证
  const validateMessages = {
    types: {
      email: '不是有效的邮箱!',
    },
  };
  const [form] = Form.useForm();
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const [memberid, setquanlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [data, setData] = useState([]);
   // 上级id下拉框
   useEffect(() => {
    menuRule({
      // memberid: props.values.id,
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
  // 默认显示状态
  const [status,setstatus] =useState(1)
  const onChange = e =>(
      setstatus(e.target.value)
  )
  // 自定义六位随机密码
  const password = JSON.stringify(Math.floor(Math.random() * 1000000));
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd({...fieldsValue , password, memberid , status});
  };
  return (
    <Modal
      destroyOnClose
      title="新建用户"
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
              message: '请输入名称！',
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
          label="上级代理"
          name="systemtitle"
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
          <RadioGroup onChange= {onChange} defaultValue={status}>
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
