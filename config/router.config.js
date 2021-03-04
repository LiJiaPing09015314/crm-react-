export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      // 登录
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      }, // 代理登录
      {
        name: 'agentindex',
        path: '/user/agentlogin',
        component: './user/login/agentindex',
      }, // 注册
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      }, // 注册成功
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        routes: [
          {
            path: '/',
            redirect: '/welcome',
            // authority: ['Agent', 'crm'],
          },
          {
            path: '/welcome',
            name: 'welcome',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['Agent'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
              },
            ],
          }, 
          
           // 系统管理
           {
            name: 'SystemManagement',
            icon: 'DribbbleOutlined',
            path: '/SystemManagement',
            authority: ['crm'],
            // component: './SystemManagement/SystemManagement',
            routes: [
              // 系统参数
              // {
              //   name: 'SystemParameter',
              //   icon: 'DribbbleOutlined',
              //   path: '/systemmanagement/systemparameter',
              //   component: './SystemManagement/SystemParameter',
              // },
              // 用户日志
              {
                name: 'UserLog',
                icon: 'AccountBookOutlined',
                path: '/SystemManagement/UserLog',
                component: './SystemManagement/UserLog',
              }, // 系统日志
              {
                name: 'SystemLog',
                icon: 'AccountBookOutlined',
                path: '/SystemManagement/SystemLog',
                component: './SystemManagement/SystemLog',
              }, // 管理员管理
              {
                name: 'Administrators',
                icon: 'UserOutlined',
                path: '/SystemManagement/Administrators',
                component: './SystemManagement/Administrators',
              }, // 权限管理
              {
                name: 'RightsManagement',
                icon: 'PicLeftOutlined',
                // path: '/systemmanagement/rightsmanagement',
                routes: [
                  //上级菜单管理
                  {
                    name: 'MenuManagement',
                    icon: 'BorderInnerOutlined',
                    path: '/SystemManagement/RightsManagement/MenuManagement',
                    component: './SystemManagement/MenuManagement',
                  }, // 权限添加
                  {
                    name: 'RightsManagement',
                    icon: 'BorderInnerOutlined',
                    path: '/SystemManagement/RightsManagement/RightsManagement',
                    component: './SystemManagement/RightsManagement',
                  }, // 角色管理
                  {
                    name: 'RoleManagement',
                    icon: 'BorderInnerOutlined',
                    path: '/SystemManagement/RightsManagement/RoleManagement',
                    component: './SystemManagement/RoleManagement',
                  },
                ],
              },
            ],
          },
          // 用户管理
          {
            name: 'ListTableList',
            icon: 'TeamOutlined',
            path: '/ListTableList',
            // component: './ListTableList',
            authority: ['crm'],
            routes: [
              // 用户管理
              {
                name: 'ListTableList',
                icon: 'TeamOutlined',
                path: '/ListTableList/ListTableList',
                component: './ListTableList/ListTableList',
              },// 用户测试
              {
                name: 'UserTest',
                icon: 'FileSearchOutlined',
                path: '/ListTableList/UserTest',
                component: './ListTableList/UserTest',
              },// 注销账号
              {
                name: 'CloseAccount',
                icon: 'LogoutOutlined',
                path: '/ListTableList/CloseAccount',
                component: './ListTableList/CloseAccount',
              },
            ]
          },  //代理管理
          {
            name: 'Agentmanagement',
            icon: 'UsergroupAddOutlined',
            path: '/Agentmanagement',
            authority: ['crm'],
            routes: [
              // 代理管理
              {
                name: 'AgentManagement',
                icon: 'UsergroupAddOutlined',
                path: '/Agentmanagement/AgentManagement',
                component: './AgentManagement/AgentManagement',
              }, // 代理测试
              {
                name: 'AgentTest',
                icon: 'FileSearchOutlined',
                path: '/Agentmanagement/AgentTest',
                component: './AgentManagement/AgentTest',
              }, // 注销账号
              {
                name: 'CloseAccount',
                icon: 'LogoutOutlined',
                path: '/Agentmanagement/CloseAccount',
                component: './AgentManagement/CloseAccount',
              },
            ],
          },   //邮箱管理
          {
            name: 'MessageManagement',
            icon: 'CommentOutlined',
            path: '/MessageManagement',
            authority: ['crm'],
            // component: './MessageManagement',
            routes: [
              //账户管理
              {
                name: 'EmailsManagement',
                icon: 'smile',
                path: '/MessageManagement/EmailsManagement',
                component: './MessageManagement/EmailsManagement',
              }, //消息模板
              {
                name: 'MessageTemplate',
                icon: 'smile',
                path: '/MessageManagement/MessageTemplate',
                component: './MessageManagement/MessageTemplate',
              }, //信息流水
              {
                name: 'MessagesFlow',
                icon: 'smile',
                path: '/MessageManagement/MessagesFlow',
                component: './MessageManagement/MessagesFlow',
              },
            ],
          },   //出入金管理
          {
            name: 'GoldenManagement',
            icon: 'DollarCircleOutlined',
            path: '/GoldenManagement',
            authority: ['crm'],
            // component: './GoldenManagement',
            routes: [
              //入金通道管理
              {
                name: 'GoldenaccessManagement',
                icon: 'smile',
                path: '/GoldenManagement/GoldenaccessManagement',
                component: './GoldenManagement/GoldenaccessManagement',
              }, //入金查询
              {
                name: 'GoldenQuery',
                icon: 'smile',
                path: '/GoldenManagement/GoldenQuery',
                component: './GoldenManagement/GoldenQuery',
              },  //出金查询管理
              {
                name: 'OutGoldenquery',
                icon: 'smile',
                path: '/GoldenManagement/OutGoldenquery',
                component: './GoldenManagement/OutGoldenquery',
              },//出金通道管理
              {
                name: 'Outgoldenmanagement',
                icon: 'smile',
                path: '/GoldenManagement/Outgoldenmanagement',
                component: './GoldenManagement/Outgoldenmanagement',
              }, //赠金管理
              {
                name: 'GoldenGrants',
                icon: 'smile',
                path: '/GoldenManagement/GoldenGrants',
                component: './GoldenManagement/GoldenGrants',
              },//入金汇率
              {
                name: 'GoldenParities',
                icon: 'smile',
                path: '/GoldenManagement/GoldenParities',
                component: './GoldenManagement/GoldenParities',
              },
            ],
          },
          // 报表管理
          {
            name: 'ReportQuery',
            icon: 'RadarChartOutlined',
            path: '/ReportQuery',
            // component: './ReportQuery',
            authority: ['crm'],
            routes:[
              //交易管理
              {
                name: 'OrderManagement',
                icon: 'CreditCardOutlined',
                path: '/ReportQuery/OrderManagement',
                component: './ReportQuery/OrderManagement',
              },
              //报表日查询
              {
                name: 'ReportsQuery',
                icon: 'AreaChartOutlined',
                path: '/ReportQuery/ReportsQuery',
                component: './ReportQuery/ReportsQuery',
              },
            ]
          },
           //内容管理
           {
            name: 'ContentManagement',
            icon: 'DropboxOutlined',
            path: '/ContentManagement',
            authority: ['crm'],
            // component: './ContentManagement/ContentManagement',
            routes: [
              //分类管理
              {
                name: 'ClassifyManagement',
                icon: 'smile',
                path: '/ContentManagement/ClassifyManagement',
                component: './ContentManagement/ClassifyManagement',
              }, //文章管理
              {
                name: 'ArticleManagement',
                icon: 'smile',
                path: '/ContentManagement/ArticleManagement',
                component: './ContentManagement/ArticleManagement',
              },
            ],
          },
           // 返佣管理
          // {
          //   name: 'Commission',
          //   icon: 'PayCircleOutlined',
          //   path: '/commission',
          //   component: './Commission',
          //   authority: ['crm'],
          // },
          
          // 个人页面
          {
            name: 'account',
            icon: 'user',
            path: '/account',
            authority: ['Agent'],
            routes: [
              // 个人信息
              // {
              //   name: 'PersonalInfor',
              //   icon: 'smile',
              //   path: '/account/personalinfor',
              //   component: './account/PersonalInfor',
              // },
              // 个人中心
              // {
              //   name: 'center',
              //   icon: 'smile',
              //   path: '/account/center',
              //   component: './account/center',
              // },
              // 个人设置
              {
                name: 'settings',
                icon: 'smile',
                path: '/account/settings',
                component: './account/settings',
              },
            ],
          },
          // 代理后台代理开户
          {
            name: 'individualagent',
            icon: 'UsergroupAddOutlined',
            path: '/individualagent',
            component: './IndividualAgent',
            authority: ['Agent'],
          }, 
          //出入金管理
          {
            name: 'inoutgold',
            icon: 'smile',
            path: '/inoutgold',
            authority:['Agent'],
            // component: './inoutgold',
            routes: [
              //入金查询
              {
                name: 'GoldenQuery',
                icon: 'smile',
                path: '/inoutgold/GoldenQuery',
                component: './inoutgold/GoldenQuery',
              }, 
              // 出金查询
              {
                name: 'OutGoldenquery',
                icon: 'smile',
                path: '/inoutgold/OutGoldenquery',
                component: './inoutgold/OutGoldenquery',
              },
            ],
          },
          
          {
            component: './404',
          },
        ],
      },

      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
