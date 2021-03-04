import React, { useState } from 'react';
import { Form, Button, Modal, Card } from 'antd';

import { TableListItem } from '../data.d';

export interface FormValueType extends Partial<TableListItem> {
 
}
export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}
const { Meta } = Card;

export interface UpdateFormState {
  formVals: FormValueType;
  
}

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [formVals] = useState<FormValueType>({
    name: props.values.name,
    id: props.values.id,
    desc: props.values.desc,
    key: props.values.key,
    userip:props.values.userip,
    updatedAt:props.values.updatedAt,
  });
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;

  const renderContent = () => {
      return (
        <>
          <Card>
            <Meta
              avatar={
                <span>ID:</span>
              }
              description={formVals.id}
            />
          </Card>
          <Card>
            <Meta
              avatar={
                <span>用户名:</span>
              }
              description={formVals.name}
            />
          </Card>
          <Card>
            <Meta
              avatar={
                <span>标题:</span>
              }
              description={formVals.desc}
            />
          </Card>
          <Card>
            <Meta
              avatar={
                <span>Ip:</span>
              }
              description={formVals.userip}
            />
          </Card>
          <Card>
            <Meta
              avatar={
                <span>创建时间:</span>
              }
              description={formVals.updatedAt}
            />
          </Card>
        </>
      );
  };
  const renderFooter = () => {
      return (
        <>
          <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        </>
      ); 
  };
  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="系统日志详情"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}
    >  
      <Form
        {...formLayout}
        form={form}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
