import { FormattedMessage, formatMessage } from 'umi';
import React, { Component } from 'react';
import { List ,Modal , Input } from 'antd';
import {connect} from 'dva'

const passwordStrength = {
  strong: (
    <span className="strong">
      <FormattedMessage id="accountandsettings.security.strong" defaultMessage="Strong" />
    </span>
  ),
  medium: (
    <span className="medium">
      <FormattedMessage id="accountandsettings.security.medium" defaultMessage="Medium" />
    </span>
  ),
  weak: (
    <span className="weak">
      <FormattedMessage id="accountandsettings.security.weak" defaultMessage="Weak" />
      Weak
    </span>
  ),
};

class SecurityView extends Component {
  componentDidMount(){
    const {dispatch}=this.props
    dispatch({
      type: 'accountAndsettings/fetchGoogle',
    })
  }

  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  getData = () => [
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.password',
        },
        {},
      ),
      description: (
        <>
          {formatMessage({
            id: 'accountandsettings.security.password-description',
          })}
          ：{passwordStrength.strong}
        </>
      ),
      actions: [
        <a key="Modify" onClick={this.showModal}>
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
        </a>,
      ],
    },
    // {
    //   title: formatMessage(
    //     {
    //       id: 'accountandsettings.security.phone',
    //     },
    //     {},
    //   ),
    //   description: `${formatMessage(
    //     {
    //       id: 'accountandsettings.security.phone-description',
    //     },
    //     {},
    //   )}：138****8293`,
    //   actions: [
    //     <a key="Modify">
    //       <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />
    //     </a>,
    //   ],
    // },
    // {
    //   title: formatMessage(
    //     {
    //       id: 'accountandsettings.security.question',
    //     },
    //     {},
    //   ),
    //   description: formatMessage(
    //     {
    //       id: 'accountandsettings.security.question-description',
    //     },
    //     {},
    //   ),
    //   actions: [
    //     <a key="Set">
    //       <FormattedMessage id="accountandsettings.security.set" defaultMessage="Set" />
    //     </a>,
    //   ],
    // },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.email',
        },
        {},
      ),
      description: `${formatMessage(
        {
          id: 'accountandsettings.security.email-description',
        },
        {},
      )}：ant***sign.com`,
      actions: [
        <a key="Modify" >
          <FormattedMessage id="accountandsettings.security.modify" defaultMessage="Modify" />

        </a>,
      ],
    },
    {
      title: formatMessage(
        {
          id: 'accountandsettings.security.google',
        },
        {},
      ),
      description: formatMessage(
        {
          id: 'accountandsettings.security.google-description',
        },
        {},
      ),
      actions: [
        <div key="bind">
          <FormattedMessage id="accountandsettings.security.bind" defaultMessage="Bind" />
        </div>,
      ],
    },
  ];

  render() {
    const {accountAndsettings}=this.props
    const {remote}=accountAndsettings
    const data = this.getData();
    return (
      <>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
              <Modal
                  title="修改密码"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                <Input placeholder="修改密码" type="number"/>
              </Modal>
              <div>
              <img src={accountAndsettings.google.image} alt=""/>
              <Input value={accountAndsettings.google.key} readOnly />
              </div>
            </List.Item>
          )}
        />
      </>
    );
  }
}

export default  connect(({accountAndsettings,dispatch})=>({accountAndsettings,dispatch}))(SecurityView)
