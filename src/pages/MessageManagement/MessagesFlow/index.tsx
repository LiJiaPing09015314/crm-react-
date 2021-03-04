import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, searchRule} from './service';

/**
 * 查看节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await searchRule({
      id: fields.id,
      username:fields.username,
      operation: fields.operation,
      content: fields.content,
      key: fields.key,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '选择时间',
      dataIndex: 'date',
      hideInTable: true,
      sorter: true,
      valueType: 'dateTimeRange',
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '通知类型',
      dataIndex: 'type',
      hideInSearch: true,
      valueEnum: {
        0: { text: 'email', status: 'Success' },
        1: { text: 'sms', status: 'Processing' },
        2: { text: '站内信', status: 'Success' },
      },
    },
    {
      title: '业务类型',
      dataIndex: 'operation',
      hideInSearch: true,
      valueEnum: {
        0: { text: '开户验证码', status: 'Success' },
        1: { text: '客户开户通知', status: 'Processing' },
        2: { text: '代理开户通知', status: 'Success' },
        3: { text: '入金通知', status: 'Processing' },
        4: { text: '出金通知', status: 'Processing' },
      },
    },
    {
      title: '内容',
      dataIndex: 'content',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      hideInSearch: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        0: { text: '禁用', status: 'Success' },
        1: { text: '启用', status: 'Processing' }
      },
    },
    {
      title: '建立时间',
      dataIndex: 'foundtime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '发送时间',
      dataIndex: 'sendtime',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >
            点击查看
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="消息流水"
        actionRef={actionRef}
        rowKey="id"
        // toolBarRender={(action, { selectedRows }) => [
        //   <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
        //     新建
        //   </Button>,
        //   selectedRows && selectedRows.length > 0 && (
        //     <Dropdown
        //       overlay={
        //         <Menu
        //           onClick={async (e) => {
        //             if (e.key === 'remove') {
        //               await handleRemove(selectedRows);
        //               action.reload();
        //             }
        //           }}
        //           selectedKeys={[]}
        //         >
        //           <Menu.Item key="remove">批量删除</Menu.Item>
        //           <Menu.Item key="approval">批量审批</Menu.Item>
        //         </Menu>
        //       }
        //     >
        //       <Button>
        //         批量操作 <DownOutlined />
        //       </Button>
        //     </Dropdown>
        //   ),
        // ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          </div>
        )}
        request={(params) => queryRule(params)}
        columns={columns}
        rowSelection={{}}
      />
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </>
  );
};

export default TableList;
