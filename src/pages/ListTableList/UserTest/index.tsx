import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Dropdown, Menu, message, Modal, Popconfirm , Input} from 'antd';
import React, { useState, useRef, useEffect } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';
import Withgold from './components/Withgold';
import { TableListItem } from './data.d';
import { queryRule, grantsRule, addRule, removeRule,statusRule } from './service';
import { List } from 'antd/es/form/Form';

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: FormValueType) => {
  // const hide = message.loading('正在添加');
  try {
    addRule({
      name: fields.name,
      password: fields.password,
      username: fields.username,
      redate: fields.redate,
      memberid: fields.memberid,
      email: fields.email,
      status: fields.status,
      key: fields.key,
      id: fields.id,
    }).then(res => {
      if(res.code===200){
        // hide();
        message.success(res.msg);
      }else{
        message.error('添加失败请重试！');
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
const handleUpdate = async (fields) => {
  // const hide = message.loading('正在配置');
  try {
    await addRule({
      id: fields.id,
      key: fields.key,
      name: fields.name,
      username: fields.username,
      redate: fields.redate,
      memberid: fields.memberid,
      status: fields.status,
      password: fields.password,
      email: fields.email,
    }).then(res => {
      if(res.code===200){
        // hide();
        message.success(res.msg);
      }else{
        message.error('配置失败请重试！');
      }
    });
    // hide();
    return true;
  } catch (error) {
    message.error('配置失败请重试！');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [type,setType]=useState();
  const actionRef = useRef<ActionType>();
  const [createModalVisible, handleModalVisible] = useState(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState(false);
  const [withgoldModalVisible, handleWithgoldModalVisible] = useState(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const [price, setData] = useState();
  // 合计金额
  useEffect(() => {
    queryRule({
      current: 1,
      pageSize: 20,
      system_menuid: 1
    }).then(res => {
      setData(res.sum[0].price);
    });
  }, []);
  const sum =price;

  /**
    *修改状态
    *
  */
  const handleChange = async (selectedRows) => {
    if (!selectedRows) return true;
    try {
    if (selectedRows.length > 1) {
          statusRule({
            id: selectedRows.map((row) => row.id),
            status: selectedRows.map((row) => row.status),
          }).then((res) => {
            if (actionRef.current) {
              actionRef.current.reload();
            }
            message.success(res.msg);
          });
        } else {
          const id = selectedRows.id;
          const status = selectedRows.status;
          statusRule({
            id,
            status
          }).then((res) => {
            if (actionRef.current) {
              actionRef.current.reload();
            }
            message.success(res.msg);
          });
      }
      return true;
    } catch (error) {
      message.error('修改失败，请重试');
      return false;
    }
  };

  /**
   * 修改赠金
   * @param fields
   */
  const handleWithgold = async (selectedRows) => {
    if (!selectedRows) return true;
    try {
    if (selectedRows.length > 1) {
      grantsRule({
            id: selectedRows.map((row) => row.id),
            price: selectedRows.map((row) => row.price),
          }).then((res) => {
            message.success(res.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          });
        } else {
          const id = selectedRows.id ;
          const price = selectedRows.price;
          const mid = selectedRows.type;
          grantsRule({
            id,
            price,
            mid
          }).then((res) => {
            message.success(res.msg);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          });
      }
      return true;
    } catch (error) {
      message.error('修改失败，请重试');
      return false;
    }
  };
    /**
   *  删除节点
   * @param selectedRows
   */
  const handleRemove = async (selectedRows) => {
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
            const id = selectedRows.id;
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
    } catch (error) {
      message.error('删除失败，请重试');
      return false;
    }
  };
  // 金额总和
  // const formatMoney = async(price) =>{
  //   for(var i=1;i<=5;i++){
  //     price += i;
  //   }
  //   console.log(price);
  // }
  // 列表
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
          title: '路径',
          dataIndex: 'path',
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
          hideInSearch: true,
          rules: [
            {
              required: true,
              message: '名称为必填项',
            },
          ],
        },
        {
          title: '赠金',
          dataIndex: 'withgold',
          hideInSearch: true,
          rules: [
            {
              required: true,
              message: '名称为必填项',
            },
          ],
          render: (_, record) => (
            <>
              <Button
                onClick={() => {
                  setType(record.id)
                  handleWithgoldModalVisible(true);
                }}
              >
                赠金
              </Button>
            </>
          ),
        },
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
        {
          title: '状态',
          dataIndex: 'status',
          initialValue: '1',
          valueEnum:{
            0: {text:'待审核'},
            1: {text:'成功'},
            2: {text:'冻结'}
          },
          render: (text, record) =>
            // data.length >= 1 ? (
            <Popconfirm title="Sure to change?" onConfirm={() => handleChange(record)}>
              <a>{record.status === 0 ? "待审核" :(record.status === 1 ?"成功" : "冻结")}</a>
            </Popconfirm>
            // ) : null,
        },
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
            if (`${status}` === '1') {
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
                  handleUpdateModalVisible(true);
                  setStepFormValues(record);
                }}
              >
                修改
              </a>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  handleRemove(record);
                }}
              >
                删除
              </a>
            </>
          ),
        },


  ];

  return (
    <>
      <ProTable<TableListItem, { keyWord?: string }>
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={() => handleModalVisible(true)}>
            <PlusOutlined /> 新建
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
        request={(params) => queryRule(params)}
        columns={columns}
        headerTitle="用户测试"
        actionRef={actionRef}
        rowKey="id"
        rowSelection={{}}
        footer={() => `合计金额:  ${sum}`}
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
              handleUpdateModalVisible(false);
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
      <Withgold
        onSubmit={async (value) => {
          const values={
            ...value,
            type
          }
          const success = await handleWithgold(values);
          if (success) {
            handleWithgoldModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => handleWithgoldModalVisible(false)}
        withgoldModalVisible={withgoldModalVisible}
      />
    </>
  );
};

export default TableList;
