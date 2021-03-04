import React, { useState, useEffect} from 'react';
import { Form, Input, Modal, Radio, TreeSelect } from 'antd';
import { addlist } from '../service';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TreeNode } = TreeSelect;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    id: number,
    username: string,
    title: string,
    roleid: number,
    key: string,
    password: number,
    status:number
   }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const [roleid, setquanlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  // 获取角色下拉框
  useEffect(() => {
    addlist({}).then(res => {
      const data = res.data;
      return setData(data);
    });
  }, []);

  // 角色选择
  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(info.title);
    const roleid = info.id;
    setquanlist(roleid)

  };

  // 默认显示状态
  const [status,setstatus] =useState(1)
  const onChange = e =>(
      setstatus(e.target.value)
  )

  // 提交数据
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd({...fieldsValue, roleid ,status});
  };

  return (
    <Modal
      destroyOnClose
      title="新建管理员"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          {...formLayout}
          label="登录名"
          name="title"
          rules={[{ required: true, message: '请输入描述！'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
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
          label="密码"
          name="password"
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
          label="	角色"
          name="rolelist"
          rules={[{ }]}
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
          >
            {data.map((items) => (
              <TreeNode
                value={items.id}
                key={items.id}
                id={items.id}
                systemid={items.id}
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
        <FormItem
           {...formLayout}
          rules={[{ message: '请选择状态！'}]}
          name="status" label="是否禁用">
            <RadioGroup onChange= {onChange} defaultValue={status}>
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
      </Form>
    </Modal>
  );
};

export default CreateForm;
