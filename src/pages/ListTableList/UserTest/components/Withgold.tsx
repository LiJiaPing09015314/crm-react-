import React, { useState ,useEffect } from 'react';
import { Form, Button, DatePicker, Input, Modal, Radio, Select, Steps,TreeSelect } from 'antd';
import {grantsEditRule} from '../service'
import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {

}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  withgoldModalVisible: boolean;
  values: Partial<TableListItem>;
}
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
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

const Withgold: React.FC<UpdateFormProps> = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
      grantsEditRule({
      system_menuid: 1,
    }).then(res => {
      setData(res);
    });
  }, []);

  const onSelect = (selectedKeys, data) => {
    setSelectedKeys(data.title);
    const withgoldlist = data;
    setquanlist(withgoldlist)
  };

  const [formVals, setFormVals] = useState<FormValueType>({
    // id: props.values.id,
    // key: props.values.key,
    // price:props.values.price,
  });

  const [currentStep, setCurrentStep] = useState<number>(0);

  const [form] = Form.useForm();

  const {
    onSubmit: handleWithgold,
    onCancel: handleWithgoldModalVisible,
    withgoldModalVisible,
    values,
  } = props;
  const [withgoldlist, setquanlist] = useState([]);
  // 赠金静态默认数据
  const defaultprice = data.map((items) => items.price);
  const defaultid = data.map((items) => items.id);

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleNext = async () => {
    const fieldsValue = await form.validateFields();
    const id = withgoldlist.id;
    const price = withgoldlist.price;
    setFormVals({ ...fieldsValue,id});
    handleWithgold({ ...fieldsValue,id});
  };

  const renderContent = () => {
    return (
      <>
       <FormItem name="price"
          {...formLayout}
          label="赠金"
        >
          <TreeSelect
            onSelect={onSelect}
            showSearch
            style={{ width: '100%' }}
            value={selectedKeys||'请选项'}
            defaultValue={defaultprice[0]}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            treeNodeFilterProp="title"
          >
            {data.map(items => (
              <TreeNode value={items.price} key={items.id} id={items.id} systemid={items.id} price={items.price} cao={items.cao} title={items.price}>
                {/* {items.list.map(item => (
                  <TreeNode key={item.id} title={item.title} id={item.id} systemid={item.systemid} cao={item.cao}/>
                ))} */}
              </TreeNode>
            ))}
          </TreeSelect>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleWithgoldModalVisible(false, values)}>取消</Button>
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
      title="修改赠金"
      visible={withgoldModalVisible}
      footer={renderFooter()}
      onCancel={() => handleWithgoldModalVisible(false, values)}
      afterClose={() => handleWithgoldModalVisible()}
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          // price: defaultprice[0]
          price: formVals.price,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default Withgold;
