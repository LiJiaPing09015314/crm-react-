import React, { useRef, useState, useEffect } from 'react';
import { DownOutlined, CloseCircleOutlined, KeyOutlined, ExceptionOutlined, FileDoneOutlined, SafetyCertificateOutlined, RedoOutlined, PaperClipOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button,Input, Dropdown, Menu, } from 'antd';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import ExportJsonExcel from 'js-export-excel';

import { TableListItem } from './data.d';
import { queryRule, withdrawcontent } from './service';

import DataDetails from './components/DataDetails'

const TableList: React.FC<{}> = () => {
  // 显示状态
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  // 传递的数据
  const [stepFormValues, setStepFormValues] = useState({});
  // 设置总数
  const [withdraw, setlist] = useState([])
  // 总数据
  const [exceldata, setexceldata] = useState([]);

  const downloadExcel = () => {
    const getRepaymentPlanList = exceldata ? exceldata : '';//表格数据
    let option = {};  //option代表的就是excel文件
    let dataTable = [];  //excel文件中的数据内容
    if (getRepaymentPlanList && getRepaymentPlanList.length > 0) {
      for (let i in getRepaymentPlanList) {  //循环获取excel中每一行的数据
        // let _planDay = formatTime(getRepaymentPlanList[i].createdAt, true);  //格式化日期（自定义方法）
        let obj = {
          'ID': getRepaymentPlanList[i].id,
          '会员id': getRepaymentPlanList[i].memberid,
          '账变id': getRepaymentPlanList[i].account_changeid,
          '出金方式': getRepaymentPlanList[i].way,
          '汇率': getRepaymentPlanList[i].parities,
          '原币金额': getRepaymentPlanList[i].price,
          '本位币金额（美金）': getRepaymentPlanList[i].money,
          '备注': getRepaymentPlanList[i].remark,
          '创建人': getRepaymentPlanList[i].author,
          '创建时间': getRepaymentPlanList[i].creation_time,
          '状态': getRepaymentPlanList[i].status,
          // '事件':_planDay
        }
        dataTable.push(obj);  //设置excel中每列所获取的数据源
      }
    }
    option.fileName = '出金查询数据';  //excel文件名称
    option.datas = [
      {
        sheetData: dataTable,  //excel文件中的数据源
        sheetName: '出金查询数据',  //excel文件中sheet页名称
        sheetFilter: ['ID','会员id','账变id','出金方式','汇率','原币金额','本位币金额（美金）','备注','创建人','创建时间','状态'],  //excel文件中需显示的列数据
        sheetHeader: ['ID','会员id','账变id','出金方式','汇率','原币金额','本位币金额（美金）','备注','创建人','创建时间','状态'],  //excel文件中每列的表头名称
      }
    ]
    let toExcel = new ExportJsonExcel(option);  //生成excel文件
    toExcel.saveExcel();  //下载excel文件
  }

  const actionRef = useRef<ActionType>();
  const type = JSON.parse(localStorage.getItem('userdata')).type
  const columns: ProColumns<TableListItem>[] = [
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
      title: '出金查询',
      dataIndex: 'memberid_status',
      initialValue: '0',
      hideInTable: true,
      // type =1为代理 //判断是否显示
      hideInSearch: type === 1 ? false : true,
      valueEnum: {
        0: { text: '本人出金', status: 'Default' },
        1: { text: '下级出金', status: 'Default' },
        2: { text: '全部出金', status: 'Default' },
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      initialValue: '1',
      hideInTable: true,
      hideInSearch: false,
      valueEnum: {
        1: { text: '成功', status: 'Processing' },
        2: { text: '失败', status: 'Success' },
      },
    },


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
      title: '出金方式',
      dataIndex: 'way',
      hideInSearch: true,
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
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      valueEnum: {
        0: { text: '无操作', status: 'Default' },
        1: { text: '成功', status: 'Processing' },
        2: { text: '失败', status: 'Success' },
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
              let params = {
                id: record.id
              }
              withdrawcontent(params).then(res => {
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
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        headerTitle={[
          <Button icon={<KeyOutlined />}>锁定</Button>,
          <Button icon={<ExceptionOutlined />}>审核申请</Button>,
          <Button icon={<FileDoneOutlined />}>打款登记</Button>,
          <Button icon={<SafetyCertificateOutlined />}>确认打款</Button>
        ]}
        toolBarRender={(action, { selectedRows }) => [
          <Button icon={<CloseCircleOutlined />}  >
            撤销打款
          </Button>,
          <Button icon={<RedoOutlined />}>重置订单</Button>,
          <Button icon={<PaperClipOutlined />}>解锁锁定</Button>,
          <Button onClick={downloadExcel} icon={<VerticalAlignBottomOutlined />}>导出</Button>,
          // selectedRows && selectedRows.length > 0 && (
          //   <Dropdown
          //     overlay={
          //       <Menu
          //         onClick={async (e) => {
          //           if (e.key === 'remove') {
          //             // await handleRemove(selectedRows);
          //             action.reload();
          //           }
          //         }}
          //         selectedKeys={[]}
          //       >
          //         <Menu.Item key="remove">批量删除</Menu.Item>
          //         <Menu.Item key="approval">批量审批</Menu.Item>
          //       </Menu>
          //     }
          //   >
          //     <Button>
          //       批量操作 <DownOutlined />
          //     </Button>
          //   </Dropdown>
          // ),
        ]}
        tableAlertRender={({ selectedRowKeys, selectedRows }) => (
          selectedRows && selectedRows.length > 0 && (
            <div>
              <span style={{ marginRight: '20px' }}>已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项</span>
            </div>
          )
        )}
        request={async (params) => queryRule(params).then(res => { return setexceldata(res.data), setlist(res), res })}
        columns={columns}
        rowSelection={{}}
        footer={() => `全部金额:${withdraw.sum }  本位币金额美元:${withdraw.money } `}
      />
      <DataDetails
        onCancel={() => {
          console.log(withdraw)
          handleUpdateModalVisible(false);
          setStepFormValues({})
        }}
        updateModalVisible={updateModalVisible}
        values={stepFormValues}
      />
    </PageHeaderWrapper>
  );
};

export default TableList;
