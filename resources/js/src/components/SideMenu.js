import React from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const SideMenu = () => {

  const handleClick = e => {
    console.log('click ', e);
  };

  return (
    <>
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '17px'
      }}>
        <h1 style={{marginBottom: '0px'}}>Laravel Twitter</h1>
      </div>
      <Menu
        onClick={handleClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Profile</Menu.Item>
      </Menu>
    </>
  );
}

export default SideMenu;
