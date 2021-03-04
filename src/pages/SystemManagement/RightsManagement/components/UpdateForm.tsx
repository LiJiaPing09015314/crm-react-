import React, { useState, useEffect } from 'react';
import { Form, Button, Input, Modal, Radio, Select, Steps, TreeSelect } from 'antd';
import { TableListItem } from '../data.d';
import { menulist } from '../service';

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
const { TreeNode } = TreeSelect;
const { Step } = Steps;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [data, setData] = useState([]);
  // 编辑时节点展示
  useEffect(() => {
    menulist({
      id: props.values.id,
    }).then(res => {
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
  const [formVals, setFormVals] = useState<FormValueType>({
    title:props.values.title,
    key: props.values.key,
    url:props.values.url,
    id:props.values.id,
    indexno:props.values.indexno,
    system_menutitle: props.values.system_menutitle,
    system_menuid: props.values.system_menuid
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    setFormVals({ ...formVals, ...fieldsValue });
      handleUpdate({...formVals, ...fieldsValue} );
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="title"
          label="权限名称"
          {...formLayout}
          rules={[{ required: true, message: '请输入名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="system_menutitle"
            {...formLayout}
            label="上级菜单"
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
                  <TreeNode value={item.id} key={item.id} title={item.title} id={item.id} systemid={item.id} cao={item.cao}/>
                ))}
              </TreeNode>
            ))}
          </TreeSelect>
          </FormItem>
          <FormItem
            name="url"
            label="url路径"
            {...formLayout}
            rules={[{  }]}
          >
            <Input placeholder="请输入" />
          </FormItem>
          <FormItem
            name="indexno"
            label="排序"
            {...formLayout}
            rules={[
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
      </>
    );
  };

  const renderFooter = () => {
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
      title="修改节点"
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
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          url: formVals.url,
          title: formVals.title,
          indexno:formVals.indexno,
          system_menutitle:formVals.system_menutitle,
          system_menuid: formVals.system_menuid
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
