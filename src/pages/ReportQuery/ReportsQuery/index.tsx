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
      desc: fields.desc,
      callNo: fields.callNo,
      title: fields.title,
      status : fields.status,
      key: fields.key,
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
      desc: fields.desc,
      callNo: fields.callNo,
      title: fields.title,
      status : fields.status,
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
      title: '选择时间',
      dataIndex: 'date',
      sorter:true,
      valueType:'dateRange',
      hideInTable: true
    },
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      hideInSearch:true
    },
    {
      title: '账号',
      dataIndex: 'account',
      hideInSearch:true
    },
    {
      title: '余额',
      dataIndex: 'money',
      hideInSearch:true
    },
    {
      title: '上级id',
      dataIndex: 'fatherid',
      hideInSearch:true
    },
    {
      title: '二元手数',
      dataIndex: 'twonumber',
      hideInSearch:true
    },
    {
      title: '交易量',
      dataIndex: 'changenumber',
      hideInSearch:true
    },
    {
      title: '交易盈亏',
      dataIndex: 'yingkui',
      hideInSearch:true,
      valueEnum: {
        0: { text: '盈利', status: 'Default' },
        1: { text: '亏损', status: 'Success' },
      },
    },
    {
      title: '入金',
      dataIndex: 'entermoney',
      hideInSearch:true
    },
    {
      title: '他人代入金',
      dataIndex: 'otherentermoney',
      hideInSearch:true
    },
    {
      title: '系统内转账',
      dataIndex: 'managemoneys',
      hideInSearch:true
    },
    {
      title: '出金',
      dataIndex: 'outmoney',
      hideInSearch:true
    },
    {
      title: '及时返',
      dataIndex: 'rightnow',
      hideInSearch:true
    },
    {
      title: '月返',
      dataIndex: 'months',
      hideInSearch:true
    },
    {
      title: '赠金',
      dataIndex: 'rebate',
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
            修改
          </a>
          <Divider type="vertical" />
          <a onClick={()=>{
            handleRemove(record)
          }}>删除</a>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        headerTitle="报表查询"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<PlusOutlined />} type="primary" onClick={() => handleModalVisible(true)}>
            新建
          </Button>,
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
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
          </div>
        )}
        request={(params) => queryRule(params)}
        columns={columns}
        rowSelection={{}}
        footer={() => `客户数量:${123} 交易客户余额合计:${123}      交易手数:${123}      交易量:${123}      交易盈亏:${123}      入金:${123}      他人代入金:${123}      系统内转账:${123}      出金:${123}      及时返:${123}      月返:${123}      赠金:${123}`}
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
