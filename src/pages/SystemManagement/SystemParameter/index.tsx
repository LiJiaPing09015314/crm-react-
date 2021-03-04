import { InfoCircleOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Input, Form, InputNumber, Radio, Select, Tooltip } from 'antd';
import { connect, Dispatch, FormattedMessage, formatMessage } from 'umi';
import React, { FC } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

interface SystemParameterProps {
  submitting: boolean;
  dispatch: Dispatch<any>;
}

const SystemParameter: FC<SystemParameterProps> = (props) => {
  const { submitting } = props;
  const [form] = Form.useForm();
  const [showPublicUsers, setShowPublicUsers] = React.useState(false);
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 10 },
    },
  };

  const submitFormLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 10, offset: 7 },
    },
  };

  const onFinish = (values: { [key: string]: any }) => {
    const { dispatch } = props;
    dispatch({
      type: 'systemManagementAndSystemParameter/submitRegularForm',
      payload: values,
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const onValuesChange = (changedValues: { [key: string]: any }) => {
    const { publicType } = changedValues;
    if (publicType) setShowPublicUsers(publicType === '2');
  };

  return (
    <PageHeaderWrapper  content={<FormattedMessage id="systemmanagementandsystemparameter.basic.description" />}>
      <Card bordered={false}>
        <Form
          hideRequiredMark
          style={{ marginTop: 8 }}
          form={form}
          name="basic"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          onValuesChange={onValuesChange}
        >
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="systemmanagementandsystemparameter.title.label" />}
            name="title"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'systemmanagementandsystemparameter.title.required' }),
              },
            ]}
          >
            <Input placeholder={formatMessage({ id: 'systemmanagementandsystemparameter.title.placeholder' })} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="systemmanagementandsystemparameter.date.label" />}
            name="date"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'systemmanagementandsystemparameter.date.required' }),
              },
            ]}
          >
            <RangePicker
              style={{ width: '100%' }}
              placeholder={[
                formatMessage({ id: 'systemmanagementandsystemparameter.placeholder.start' }),
                formatMessage({ id: 'systemmanagementandsystemparameter.placeholder.end' }),
              ]}
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="systemmanagementandsystemparameter.goal.label" />}
            name="goal"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'systemmanagementandsystemparameter.goal.required' }),
              },
            ]}
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder={formatMessage({ id: 'systemmanagementandsystemparameter.goal.placeholder' })}
              rows={4}
            />
          </FormItem>
          {/* <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="systemmanagementandsystemparameter.standard.label" />}
            name="standard"
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'systemmanagementandsystemparameter.standard.required' }),
              },
            ]}
          >
            <TextArea
              style={{ minHeight: 32 }}
              placeholder={formatMessage({ id: 'systemmanagementandsystemparameter.standard.placeholder' })}
              rows={4}
            />
          </FormItem> */}
          {/* <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="systemmanagementandsystemparameter.client.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="systemmanagementandsystemparameter.form.optional" />
                  <Tooltip title={<FormattedMessage id="systemmanagementandsystemparameter.label.tooltip" />}>
                    <InfoCircleOutlined style={{ marginRight: 4 }} />
                  </Tooltip>
                </em>
              </span>
            }
            name="client"
          >
            <Input placeholder={formatMessage({ id: 'systemmanagementandsystemparameter.client.placeholder' })} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="systemmanagementandsystemparameter.invites.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="systemmanagementandsystemparameter.form.optional" />
                </em>
              </span>
            }
            name="invites"
          >
            <Input placeholder={formatMessage({ id: 'systemmanagementandsystemparameter.invites.placeholder' })} />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span>
                <FormattedMessage id="systemmanagementandsystemparameter.weight.label" />
                <em className={styles.optional}>
                  <FormattedMessage id="systemmanagementandsystemparameter.form.optional" />
                </em>
              </span>
            }
            name="weight"
          >
            <InputNumber
              placeholder={formatMessage({ id: 'systemmanagementandsystemparameter.weight.placeholder' })}
              min={0}
              max={100}
            />
            <span className="ant-form-text">%</span>
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<FormattedMessage id="systemmanagementandsystemparameter.public.label" />}
            help={<FormattedMessage id="systemmanagementandsystemparameter.label.help" />}
            name="publicType"
          >
            <div>
              <Radio.Group>
                <Radio value="1">
                  <FormattedMessage id="systemmanagementandsystemparameter.radio.public" />
                </Radio>
                <Radio value="2">
                  <FormattedMessage id="systemmanagementandsystemparameter.radio.partially-public" />
                </Radio>
                <Radio value="3">
                  <FormattedMessage id="systemmanagementandsystemparameter.radio.private" />
                </Radio>
              </Radio.Group>
              <FormItem style={{ marginBottom: 0 }} name="publicUsers">
                <Select
                  mode="multiple"
                  placeholder={formatMessage({ id: 'systemmanagementandsystemparameter.publicUsers.placeholder' })}
                  style={{
                    margin: '8px 0',
                    display: showPublicUsers ? 'block' : 'none',
                  }}
                >
                  <Option value="1">
                    <FormattedMessage id="systemmanagementandsystemparameter.option.A" />
                  </Option>
                  <Option value="2">
                    <FormattedMessage id="systemmanagementandsystemparameter.option.B" />
                  </Option>
                  <Option value="3">
                    <FormattedMessage id="systemmanagementandsystemparameter.option.C" />
                  </Option>
                </Select>
              </FormItem>
            </div>
          </FormItem> */}
          
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={submitting}>
              <FormattedMessage id="systemmanagementandsystemparameter.form.submit" />
            </Button>
            <Button style={{ marginLeft: 8 }}>
              <FormattedMessage id="systemmanagementandsystemparameter.form.save" />
            </Button>
          </FormItem>
        </Form>
      </Card>
    </PageHeaderWrapper>
  );
};

export default connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['systemManagementAndSystemParameter/submitRegularForm'],
}))(SystemParameter);
