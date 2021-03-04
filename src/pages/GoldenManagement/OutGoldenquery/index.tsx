/* eslint-disable no-irregular-whitespace */
import { DownOutlined, PaperClipOutlined,RedoOutlined,CloseCircleOutlined, SafetyCertificateOutlined,KeyOutlined,ExceptionOutlined,FileDoneOutlined,VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule } from './service';

/**
 * 查看节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({
      desc: fields.desc,
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
      name: fields.name,
      desc: fields.desc,
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
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const account_changeid = 132;
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
      hideInSearch: true,
    },
    {
      title: '上级ID',
      dataIndex: 'ibid',
      hideInTable: true,
    },
    {
      title: '编号',
      dataIndex: 'memberid',
      hideInSearch: true,
    },
    {
      title: '出金账号',
      dataIndex: 'username',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleModalVisible(true);
              // setStepFormValues(record);
            }}
          >
          {account_changeid}
          </a>
        </>
      ),
    },
    {
      title: '出金前金额(美元)',
      dataIndex: 'enter',
      hideInSearch: true,
    },
    {
      title: '出金后金额(美元)',
      dataIndex: 'out',
      hideInSearch: true,
    },
    {
      title: '出金金额(美元)',
      dataIndex: 'money',
      hideInSearch: true,
    },
    {
      title: '手续费(美元)',
      dataIndex: 'poundage',
      hideInSearch: true,
    },
    {
      title: '审核时间',
      dataIndex: 'audit_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      initialValue:'1',
      valueEnum: {
        0: { text: '审核中', status: 'Default' },
        1: { text: '成功', status: 'Success' },
        2: { text: '失败', status: 'Processing' },
      },
    },
    {
      title: '实际出金金额(人民币)',
      dataIndex: 'parities',
      hideInSearch: true,
    },
    {
      title: '申请时间',
      dataIndex: 'apply_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '审核人ID',
      dataIndex: 'applyid',
      hideInSearch: true,
    },
    {
      title: '打款人ID',
      dataIndex: 'playid',
      hideInSearch: true,
    },
    {
      title: '打款时间',
      dataIndex: 'play_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '出金汇率',
      dataIndex: 'parities',
      hideInSearch: true,
    },
    {
      title: '赠金金额',
      dataIndex: 'givegold',
      hideInSearch: true,
    },
    {
      title: '交易量',
      dataIndex: 'tradevolume',
      hideInSearch: true,
    },
    {
      title: '备注',
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
            备注
          </a>
          <Divider type="vertical" />
          <a href="">详情</a>
        </>
      ),
    },
  ];

  return (
    <>
   <ProTable<TableListItem, { keyWord?: string }>
        headerTitle={[
          <Button icon={<KeyOutlined/>}>锁定</Button>,
          <Button icon={<ExceptionOutlined/>}>审核申请</Button>,
          <Button icon={<FileDoneOutlined/>}>打款登记</Button>,
          <Button icon={<SafetyCertificateOutlined/>}>确认打款</Button>
        ]}
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<CloseCircleOutlined/>}type="primary">
            撤销打款
          </Button>,
          <Button icon={<RedoOutlined/>}>重置订单</Button>,
          <Button icon={<PaperClipOutlined/>}>解锁锁定</Button>,
          <Button icon={<VerticalAlignBottomOutlined/>}>导出</Button>,
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
            已选择{' '}
            <a
              style={{
                fontWeight: 600,
              }}
            >
              {selectedRowKeys.length}
            </a>{' '}
            项&nbsp;&nbsp;
          </div>
        )}
        actionRef={actionRef}
        rowKey="id"
        request={(params) => queryRule(params)}
        columns={columns}
        rowSelection={{}}
        footer={()=>`出金前总金额: ${1554}  出金后总金额: ${1554}  出金金额: ${1554}`}
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
