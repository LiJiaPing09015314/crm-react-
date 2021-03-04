import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message,Modal } from 'antd';
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
              id: selectedRows.map((row) => row.id),
            }).then((res) => {
              message.success(res.msg);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            });
            hide();
          } else {
            const id = [{id:selectedRows.id}]
            removeRule({
              id,
            }).then((res) => {
              message.success(res.msg);
              if (actionRef.current) {
                actionRef.current.reload();
              }
              hide();
            });
          }
        },
      });
      return true;
    }catch (error) {
      message.error('删除失败，请重试');
      return false;
    }
  };
   /**
 *  恢复节点
 * @param selectedRows
 */
const handleUpdated = async (selectedRows: TableListItem[]) => {
  if (!selectedRows) return true;
  try {
    Modal.confirm({
      title: '警告',
      content: '确定恢复该条记录?',
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        const hide = message.loading('正在恢复');
        if (selectedRows.length > 1) {
          updateRule({
            id: selectedRows.map((row) => row.id),
          }).then((res) => {
            message.success(res.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          });
          hide();
        } else {
          const id = [{id:selectedRows.id}]
          const deletes = 0
          updateRule({
            id,
            deletes
          }).then((res) => {
            message.success(res.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
            hide();
          });
        }
      },
    });
    return true;
  }catch (error) {
    message.error('恢复失败，请重试');
    return false;
  }
};
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
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    {
      title: '名称',
      dataIndex: 'name',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    {
      title: '用户名',
      dataIndex: 'username',
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    // {
    //   title: '路径',
    //   dataIndex: 'path',
    //   hideInSearch: true,
    //   rules: [
    //     {
    //       required: true,
    //       message: '名称为必填项',
    //     },
    //   ],
    // },
    // {
    //   title: '赠金',
    //   dataIndex: 'withgold',
    //   hideInSearch: true,
    //   rules: [
    //     {
    //       required: true,
    //       message: '名称为必填项',
    //     },
    //   ],
    //   render: (_, record) => (
    //     <>
    //       <Button
    //         onClick={() => {
    //           handleWithgoldModalVisible(true);
    //           setType(record.id)
    //         }}
    //       >
    //         赠金
    //       </Button>
    //     </>
    //   ),
    // },
    {
      title: '上级ID',
      dataIndex: 'memberid',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    {
      title: '邮件',
      dataIndex: 'email',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    // {
    //   title: '返佣',
    //   dataIndex: 'rebate',
    //   hideInSearch: true,
    //   rules: [
    //     {
    //       required: true,
    //       message: '名称为必填项',
    //     },
    //   ],
    //   render: (_,record) =>
    //   <>
    //   <Input value={record.rebate} style={{ width: '60px' }} disabled/>
    //     <Button
    //       onClick={() => {
    //         handleRebateModalVisible(true);
    //         rebateType(record.id)
    //       }}
    //     >
    //       修改
    //     </Button>
    //     </>
    // },
    {
      title: '余额',
      dataIndex: 'price',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '余额',
        },
      ],
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   valueEnum:{
    //     0: {text:'待审核'},
    //     1: {text:'成功'},
    //     2: {text:'冻结'}
    //   },
    //   render: (text, record) =>
    //     // data.length >= 1 ? (
    //       <Popconfirm title="Sure to change?" onConfirm={() => handleChange(record)}>
    //         <a>{record.status === 0 ? "待审核" :(record.status === 1 ?"成功" : "冻结")}</a>
    //       </Popconfirm>
    //     // ) : null,
    // },
    {
      title: '创建人',
      dataIndex: 'creator',
      hideInSearch: true,
      rules: [
        {
          required: true,
          message: '创建人',
        },
      ],
    },
    {
      title: '创建时间',
      dataIndex: 'creation_time',
      sorter: true,
      valueType: 'dateTime',
      hideInSearch: true,
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
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
              handleUpdated(record);
            }}
          >
            恢复
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
        headerTitle="注销账号"
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
                    if (e.key === 'update') {
                      await handleUpdated(selectedRows);
                      action.reload();
                    }
                  }}
                  selectedKeys={[]}
                >
                  <Menu.Item key="remove">批量删除</Menu.Item>
                  <Menu.Item key="update">批量恢复</Menu.Item>
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
