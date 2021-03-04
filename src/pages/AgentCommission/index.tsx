import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({
      type:fields.type,
      title: fields.title,
      creator: fields.creator,
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    await updateRule({
      type:fields.type,
      title: fields.title,
      creator: fields.creator,
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
  /**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    if (actionRef.current) {
      actionRef.current.reload();
    }
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    if (actionRef.current) {
      actionRef.current.reload();
    }
    return false;
  }
};
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '搜索框',
      dataIndex: 'search',
      hideInTable:true
    },
    {
      title: '选择时间',
      dataIndex: 'date',
      valueType:'dateRange',
      sorter:true,
      hideInTable:true
    },
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch:true
    },
    {
      title: '会员id',
      dataIndex: 'memberid',
      hideInSearch:true
    },
    {
      title: '会员的代理id',
      dataIndex: 'memberids',
      hideInSearch:true
    },
    {
      title: '交易id',
      dataIndex: 'ordersid',
      hideInSearch:true
    },
    {
      title: '帐变id',
      dataIndex: 'account_changeid',
      hideInSearch:true
    },
    {
      title: '交易金额',
      dataIndex: 'price',
      hideInSearch:true
    },
    {
      title: '佣金',
      dataIndex: 'brokerage',
      hideInSearch:true
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      hideInSearch:true
    },
    {
      title: '创建时间',
      dataIndex: 'creation_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch:true
    },
    {
      title: '更新人',
      dataIndex: 'updated',
      hideInSearch:true
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch:true
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
            查询
          </a>
          <Divider type="vertical" />
          {/* <a onClick={()=>{
            handleRemove(record)
          }}>删除</a> */}
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="代理返佣"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, { selectedRows }) => [
          // <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
          //   新建
          // </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      await handleRemove(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="approval">批量审批</Menu.Item>
                </Menu>
              }
            >
              <Button>
                批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
          </div>
        )}
        request={(params) => queryRule(params)}
        columns={columns}
        // rowSelection={{}}
      />
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
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
