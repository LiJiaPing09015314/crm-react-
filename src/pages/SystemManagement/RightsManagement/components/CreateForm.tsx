import React, { useState, useEffect } from 'react';
import { Form, Input, Modal, Radio, Checkbox, TreeSelect } from'antd';
import { menulist } from '../service';

const FormItem = Form.Item;
const { TreeNode } = TreeSelect;
interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: {
    title:string,
    key: number,
    url:string,
    id:number,
    indexno:number,
    nodelist: any
  }) => void;
  onCancel: () => void;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  // 分配权限的下拉框数据
  useEffect(() => {
    menulist ({}).then(res => {
      setData(res);
    });
  }, []);

  const [system_menuid, setquanlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  // 点击下拉框选中
  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(info.title);
    const system_menuid = info.id;
    setquanlist(system_menuid)

  };
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd({...fieldsValue, system_menuid});
  };
  return (
    <Modal
      destroyOnClose
      title="新建节点"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          name="title"
          label="权限名称"
          {...formLayout}
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
            name="url"
            label="url路径"
            {...formLayout}
            rules={[{ required: true, message: '请输入路径！' }]}
          >
            <Input placeholder="请输入" />
        </FormItem>
        <FormItem
            name="indexno"
            label="排序"
            {...formLayout}
            rules={[
              { required: true, message: '请输入排序！' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (/[\d]/g.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('排序只能是数字!');
                },
              }),
            ]}
          >
            <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          label="上级菜单"
          {...formLayout}
          name="system_menutitle"
          rules={[{ required: true, message: '请输入！'}]}
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
            {data.map(items => (
              <TreeNode value={items.id}  key={items.id} id={items.id} systemid={items.id} title={items.title} cao={items.cao}>
                {items.list.map(item => (
                  <TreeNode value={item.id} key={item.id} title={item.title} id={item.id} systemid={item.systemid} cao={item.cao}/>
                ))}
              </TreeNode>
            ))}
          </TreeSelect>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
