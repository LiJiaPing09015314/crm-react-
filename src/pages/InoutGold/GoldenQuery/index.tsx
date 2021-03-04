
import React, {  useRef,useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { DownOutlined, CloseCircleOutlined,SafetyCertificateOutlined} from '@ant-design/icons';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { Button, Dropdown, Menu, } from 'antd';

import { TableListItem } from './data.d';
import { queryRule,withdrawcontent } from './service';

import DataDetails from './components/DataDetails'

const TableList: React.FC<{}> = () => {
  // const [confirm] = useState('该订单为未支付状态，确认后将会把金额存入该MT4账户，是否继续');
  const actionRef = useRef<ActionType>();
  // 显示状态
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  // 传递的数据
  const [stepFormValues, setStepFormValues] = useState({});
  // 设置总数
  const [withdraw,setlist]=useState([])

  const type = JSON.parse(localStorage.getItem('userdata')).type
  const columns: ProColumns<TableListItem>[] = [
    // 在搜索框中显示
    {
      title: 'ID',
      dataIndex: 'search',
      hideInTable: true,
    },
    {
      title: '选择时间',
      dataIndex: 'date',
      hideInTable: true,
      sorter: true,
      valueType: 'dateTimeRange',
    },

    {
      title: '入金查询',
      dataIndex: 'memberid_status',
      initialValue: '0',
      hideInTable:true,
      // type =1为代理 //判断是否显示
      hideInSearch: type===1?false:true,
      valueEnum: {
        0: { text: '本人入金', status: 'Default' },
        1: { text: '下级入金', status: 'Default' },
        2: { text: '全部入金', status: 'Default' },
      },
    },

    //表格中显示
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
    },
    {
      title: '会员id',
      dataIndex: 'memberid',
      hideInSearch: true,
    },
    {
      title: '账变id',
      dataIndex: 'account_changeid',
      hideInSearch: true,
    },
    {
      title: '入金方式',
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
      title: '汇率',
      dataIndex: 'parities',
      hideInSearch: true,
    },
    {
      title: '原币金额',
      dataIndex: 'price',
      hideInSearch: true,
    },
    {
      title: '本位币金额（美金）',
      dataIndex: 'money',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'author',
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
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              let params={
                id:record.id
              }
              withdrawcontent(params).then(res=>{
                setStepFormValues(res)
              })
            }}
          >
            详情
          </a>
        </>
      ),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          selectedRows && selectedRows.length > 0 && (
            <div>
              <span style={{ marginRight: '20px' }}>已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项</span>
            </div>
          )
        )}
        headerTitle={[
          <Button icon={<SafetyCertificateOutlined />}>确认收款</Button>,
          <Button icon={<CloseCircleOutlined />}  > 取消确认</Button>,
          <Button icon={<SafetyCertificateOutlined />}>三方批量确认</Button>,
          <Button icon={<SafetyCertificateOutlined />}>汇款批量确认</Button>, 
        ]}
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<CloseCircleOutlined />}  >
            撤销收款并作废
          </Button>,
          selectedRows && selectedRows.length > 0 && (
            <Dropdown
              overlay={
                <Menu
                  onClick={async (e) => {
                    if (e.key === 'remove') {
                      // await handleRemove(selectedRows);
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
        request={(params) => queryRule(params).then(res=>{return setlist(res.sum),  res})}
        columns={columns}
        rowSelection={{}}
        footer={() => `全部金额（美金）:${withdraw} `}
      />
      <DataDetails 
        
        onCancel={() => {
          handleUpdateModalVisible(false);
          setStepFormValues({})
        }}
        updateModalVisible={updateModalVisible}
        values={stepFormValues}
      />
    </>
  );
};

export default TableList;


