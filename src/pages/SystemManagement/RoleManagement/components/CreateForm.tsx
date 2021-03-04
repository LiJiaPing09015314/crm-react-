import React, { useState, useEffect} from 'react';
import { Form, Input, Modal, Radio, Checkbox, Tree } from 'antd';
import { addlist } from '../service';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TreeNode } = Tree;

interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { title: string; status: number; rolelist: any }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [checkedKeys, setcheckedKeys] = useState<any[]>([]);
  const [rolelist, setquanlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeys) => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys, info) => {
    const rolelist = info.checkedNodes;
    setcheckedKeys(checkedKeys);
    setquanlist(rolelist);
  };

  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys);
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    // 添加时权限菜单列表
    addlist({}).then((res) => {
      const data = res.list;
      return setData(data);
    });
  }, []);
  const [form] = Form.useForm();
  const formLayout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 13 },
  };
  // 状态默认选择
  const [status,setstatuss]=useState(1)
  const statusChange = e =>{
    setstatuss(e.target.value);
  }
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd({ ...fieldsValue, rolelist ,status});
  };
  return (
    <Modal
      destroyOnClose
      title="新建角色"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          {...formLayout}
          label="角色名称"
          name="title"
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          name="status"
          label="是否禁用"
          {...formLayout}
          rules={[{ }]}
        >
          <RadioGroup defaultValue={status} onChange={statusChange}>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </RadioGroup>
        </FormItem>
        {/* <span>权限分配</span> */}

        <FormItem label="分配权限" {...formLayout}>
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
          >
            {data.map((items) => (
              <TreeNode
                key={items.id}
                id={items.id}
                systemid={items.systemid}
                title={items.title}
                cao={items.cao}
              >
                {items.list.map((item) => (
                  <TreeNode
                    key={item.id}
                    title={item.title}
                    id={item.id}
                    systemid={item.systemid}
                    cao={item.cao}
                  />
                ))}
              </TreeNode>
            ))}
          </Tree>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CreateForm;
