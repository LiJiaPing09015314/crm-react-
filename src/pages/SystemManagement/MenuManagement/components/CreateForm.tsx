import React , {useState ,useEffect} from 'react';
import { Form, Input, Modal,Select ,Radio ,TreeSelect} from 'antd';
import {menuRule} from '../service';

const FormItem = Form.Item;
const { TreeNode } = TreeSelect;
const formLayout={
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
}
const {Option} =Select ;
const RadioGroup = Radio.Group;
interface CreateFormProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: { desc: string }) => void;
  onCancel: () => void;
}

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [systemid, setquanlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  // 类型默认选择
  const [type,setstatus]=useState(1)
  const onChange = value => {
    setstatus(value);
    menuRule({
      type: type
      }).then(res => {
        const data =res.data;
        setData(data);
      });
  };
  // 菜单下拉框
  useEffect(() => {
    menuRule({
      type: type
      }).then(res => {
        const data =res.data;
        setData(data);
      });
  }, []);
  // 菜单选择
   const onSelect = (selectedKeys, info) => {
    setSelectedKeys(info.title);
    const systemid = info.id;
    setquanlist(systemid)
  };
  // 状态默认选择
  const [status,setstatuss]=useState(0)
  const statusChange = e =>{
    setstatuss(e.target.value);
  }
  // const [systemtitle,systemtitle]=useState(0)
  // const onsystemtitle = e =>{
  //   systemtitle(e.target.value);
  // }
  const { modalVisible, onSubmit: handleAdd, onCancel } = props;
  const okHandle = async () => {
    const fieldsValue = await form.validateFields();
    form.resetFields();
    handleAdd({...fieldsValue,systemid ,type});
  };
  return (
    <Modal
      destroyOnClose
      title="新建"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <Form form={form}>
        <FormItem
          {...formLayout}
          label="排序"
          name="indexno"
          rules={[
           ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!/[\d]/g.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject('排序只能是数字!');
            },
          }),
        ]}
        >
          <Input placeholder="请输入"  defaultValue="100"/>
        </FormItem>
        <FormItem
           {...formLayout}
          label="类型"
          name="type"
          // rules={[{ required: true, message: '请输入描述！'}]}
        >
          <Select defaultValue={type} style={{ width: 255 }} onChange={onChange}>
            <Option value={1}>CRM</Option>
            <Option value={2}>USER</Option>
            <Option value={3}>Agent</Option>
          </Select>
        </FormItem>
        <FormItem
           {...formLayout}
          label="上级菜单"
          name="systemtitle"
          rules={[{ required: true, message: '请输入！'}]}
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
           {data.map(items => (
              <TreeNode value={items.id}  key={items.id} id={items.id} systemid={items.id} title={items.title}>
                {/* {items.list.map(item => (
                  <TreeNode value={item.id}  key={item.id} title={item.title} id={item.id} systemid={item.systemid}/>
                ))} */}
              </TreeNode>
            ))}
          </TreeSelect>
        </FormItem>
        <FormItem
           {...formLayout}
          label="菜单名称"
          name="title"
          // rules={[{ required: true, message: '请输入描述！'}]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem
          {...formLayout}
          label="状态"
          name="status"
          // rules={[{ required: true, message: '请输入！' }]}
        >
          <RadioGroup defaultValue={status} onChange={statusChange}>
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>启用</Radio>
          </RadioGroup>
        </FormItem>
        </Form>
    </Modal>
  );
};

export default CreateForm;
