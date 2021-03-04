import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Typography } from 'antd';
import styles from './Welcome.less';

const CodePreview = ({ children }) => (
  <pre className={styles.pre}>
    <code>
      <Typography.Text copyable>{children}</Typography.Text>
    </code>
  </pre>
);

export default () => (
  <>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
    </p>
  </>
);
