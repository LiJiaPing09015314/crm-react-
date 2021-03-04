import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message ,Modal} from 'antd';
import React, { useState,useEffect, useRef } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import { TableListItem } from './data.d';
import { queryRule,  addRule, removeRule } from './service';
/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  try {
    addRule({
      id: fields.id,
      username: fields.username,
      email: fields.email,
      smtp: fields.smtp,
      port: fields.port,
      status: fields.status,
      name: fields.name,
      password: fields.password,
      key: fields.key,
    }).then(res => {
      if(res.code===200){
        // hide();
        message.success(res.msg);
      }else{
        message.error(res.msg);
      }
    });
    return true;
  } catch (error) {
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  // const hide = message.loading('正在配置');
  try {
    await addRule({
      id: fields.id,
      username: fields.username,
      email: fields.email,
      smtp: fields.smtp,
      port: fields.port,
      status: fields.status,
      name: fields.name,
      password: fields.password,
      key: fields.key,
    }).then(res => {
      if(res.code===200){
        // hide();
        message.success(res.msg);
      }else{
        message.error(res.msg);
      }
    });
    return true;
  } catch (error) {
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
  if (!selectedRows) return true;
  try {
    Modal.confirm({
      title: '警告',
      content: '确定删除该条记录?',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        const hide = message.loading('正在删除');
        if (selectedRows.length > 1) {
          removeRule({
            id: selectedRows.map((row) => row.id)
          }).then(res => {
            message.success(res.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          });
          hide();
        } else {
          const id = selectedRows.id
          removeRule({
            id
          }).then(res => {
            message.success(res.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            hide();
          })
        }
      },
    });
    return true;
  } catch (error) {
    message.error('删除失败，请重试');
    return false;
  }
};

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '服务器',
      dataIndex: 'smtp',
    },
    {
      title: '端口',
      dataIndex: 'port',
      hideInSearch: true,
    },
    {
      title: '发件人邮箱',
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: '发件人姓名',
      dataIndex: 'name',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'creation_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新人',
      dataIndex: 'updated',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        0: { text: '关闭', status: 'Default' },
        1: { text: '已启用', status: 'Processing' },
      },
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
          <a onClick={() => {
            handleRemove(record)
          }}>删除</a>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable
        headerTitle="账户管理"
        actionRef={actionRef}
        rowKey="id"
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
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项
          </div>
        )}
        request={(params) => queryRule(params)}
        columns={columns}
        rowSelection={{}}
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
