import React, { useState } from 'react';
import { Form, Input, Modal, Select, Radio, Breadcrumb } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 7 },
};

const UpdateForm = (props) => {
  // const [formVals, setFormVals] = useState({
  //   user: props.values.user,
  //   content: props.values.content,
  //   path: props.values.path,
  // });

  const [form] = Form.useForm();

  const {
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;


  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="关系书"
        >
          <Breadcrumb separator=">">

            {props.values.path.map(item => { return <Breadcrumb.Item key={item.id}>{item.title} </Breadcrumb.Item> })}
          </Breadcrumb>
        </FormItem>
        <FormItem
          name="email"
          label="email"
        >
          <Input disabled placeholder={props.values.user.email} />
        </FormItem>
        <FormItem
          name="name"
          label="姓名"
        >
          <Input disabled placeholder={props.values.user.name} />
        </FormItem>

        <FormItem label="状态" >
          <Radio.Group value={props.values.user.status} >
            <Radio value={0}>禁用</Radio>
            <Radio value={1}>成功</Radio>
            <Radio value={2}>冻结</Radio>
          </Radio.Group>
        </FormItem>
        <FormItem
          name="memberid"
          label="上级id"
        >
          <Input disabled placeholder={props.values.user.memberid} />
        </FormItem>
        <FormItem label="身份" >
          <Radio.Group value={props.values.user.type} >
            <Radio value={0}>会员</Radio>
            <Radio value={1}>代理</Radio>
          </Radio.Group>
        </FormItem>
        {props.values.user.type == 1 ? (<FormItem
          name="rebate"
          label="返佣"
        >
          <Input disabled placeholder={props.values.user.rebate} />
        </FormItem>) : ''}

      </>
    );
  };

  return (
    <Modal
      width={'80%'}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="出金详情"
      visible={updateModalVisible}
      footer=''
      onCancel={() => handleUpdateModalVisible(false, values)}
      afterClose={() => handleUpdateModalVisible()}

    >
      {
        props.values.user !== undefined ? (
          <Form
            {...formLayout}
            form={form}
          >
            {renderContent()}
          </Form>
        ) : ''
      }

    </Modal>
  );
};

export default UpdateForm;
