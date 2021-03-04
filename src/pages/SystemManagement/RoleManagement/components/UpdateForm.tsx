import React, { useState, useEffect } from 'react';
import { Form, Button,Tree,Input, Modal, Radio, Steps } from 'antd';
import { TableListItem } from '../data.d';
import { updateRule } from '../service';

export interface FormValueType extends Partial<TableListItem> {

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TreeNode } = Tree;
const RadioGroup = Radio.Group;

export interface UpdateFormState {
  formVals: FormValueType;
  currentStep: number;
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {

  const [formVals, setFormVals] = useState<FormValueType>({
    key: props.values.key,
    id: props.values.id,
    status: props.values.status,
    title: props.values.title,
  });
  const [data, setData] = useState([]);
  // 编辑时角色列表展示
  useEffect(() => {
      updateRule({
      id: props.values.id,
    }).then(res => {
      const data = res.list
      setData(data);
    });
  }, []);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [form] = Form.useForm();
  const {
    onSubmit: handleAdd,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const forward = () => setCurrentStep(currentStep + 1);

  const backward = () => setCurrentStep(currentStep - 1);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();

    setFormVals({ ...formVals, ...fieldsValue });

    if (currentStep < 1) {
      forward();
    } else if (currentStep === 1) {
      handleAdd({ ...formVals, ...fieldsValue, rolelist});
    }
  };
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [checkedKeys, setcheckedKeys] = useState<any[]>([]);
  const [rolelist, setquanlist] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = expandedKeys => {
    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys, info) => {
    const rolelist = info.checkedNodes;
    setcheckedKeys(checkedKeys);
    setquanlist(rolelist)
  };

  const onSelect = (selectedKeys, info) => {
    setSelectedKeys(selectedKeys);
  };

  const renderContent = () => {
    if (currentStep === 1) {
      return (
        <>
          <FormItem name="status"
            {...formLayout}
            label="权限配置"
          >
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
              {data.map(items => (
                <TreeNode key={items.id} id={items.id} systemid={items.systemid} title={items.title} cao={items.cao}>
                  {items.list.map(item => (
                    <TreeNode key={item.id} title={item.title} id={item.id} systemid={item.systemid} cao={item.cao}/>
                  ))}
                </TreeNode>
              ))}
            </Tree>
          </FormItem>

        </>
      );
    }
    return (
      <>
        <FormItem
          name="title"
          label="角色名称"
          rules={[{ required: true, message: '请输入规则名称！' }]}
        >
          <Input placeholder="请输入" />
        </FormItem>
        <FormItem name="status"
            label="是否禁用"
            rules={[{ required: true, message: '请输入至少五个字符的规则描述！' }]}
          >
            <RadioGroup>
              <Radio value={0}>禁用</Radio>
              <Radio value={1}>启用</Radio>
            </RadioGroup>
          </FormItem>
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
      title="修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >
      <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
        <Step title="角色名" />
        <Step title="拥有权限" />
      </Steps>
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          creation_time: null,
          creator: formVals.creator,
          id: formVals.id,
          status: formVals.status,
          text: formVals.text,
          title: formVals.title,
          update_time: formVals.update_time,
          rolelist:formVals.rolelist
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
