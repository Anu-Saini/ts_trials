import { AppstoreOutlined, HomeFilled, SettingOutlined, QuestionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
const items = [
  {
    label: 'Login',
    key: 'mail',
  },
];
const LoginMenu = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default LoginMenu;