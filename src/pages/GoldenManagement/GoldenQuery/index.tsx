/* eslint-disable no-irregular-whitespace */
import { DownOutlined, PaperClipOutlined,RedoOutlined,CloseCircleOutlined, SafetyCertificateOutlined,KeyOutlined,ExceptionOutlined,FileDoneOutlined,VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message,Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule, updateRule, manualRule } from './service';

/**
 * 查看
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  const hide = message.loading('正在添加');
  try {
    await manualRule({
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
  const account_changeid = 132;
  // const [confirm] = useState('该订单为未支付状态，确认后将会把金额存入该MT4账户，是否继续');
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
      title: '商户订单号',
      dataIndex: 'account_changeid',
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
      title: '入金账号',
      dataIndex: 'username',
    },

    {
      title: '入金金额（美金）',
      dataIndex: 'money',
      hideInSearch: true,
    },
    {
      title: '实收金额（人民币）',
      dataIndex: 'money',
      hideInSearch: true,
    },
    {
      title: '应支付金额（人民币）',
      dataIndex: 'money',
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
      title: '支付方式',
      dataIndex: 'way',
      hideInSearch: true,
      valueEnum: {
        1: { text: '手工', status: 'Default' },
        2: { text: '充值', status: 'Success' },
        3: { text: '赠金', status: 'Success' },
        4: { text: '返佣', status: 'Success' },
      },
    },
    {
      title: '支付通道',
      dataIndex: 'parities',
    },

    {
      title: '充值来源',
      dataIndex: 'author',
      hideInSearch: true,
    },
    {
      title: '申请时间',
      dataIndex: 'creation_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '到账时间',
      dataIndex: 'update_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
        footer={()=>`入金金额: ${1554}  实收金额: ${1554}  应支付金额: ${1554}`}
        actionRef={actionRef}
        rowKey="id"
        request={(params) => queryRule(params)}
        columns={columns}
        rowSelection={{}}
        search={{collapsed: false}}
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
