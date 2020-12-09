import React, {useState} from 'react';
import { Menu } from 'antd';
import {LogoutOutlined, UserOutlined} from '@ant-design/icons';
const { SubMenu } = Menu;
import useGlobalAuthUser from "../global_hooks/auth_user";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const [gau, gauActions] = useGlobalAuthUser()
  const [current, setCurrent] = useState('profile')
  const history = useHistory()

  const handleClick = e => {
    setCurrent(e.key);
  };

  const logout = async (e) => {
    await gauActions.logout()
    history.push('/login')
  }

  const rightStyle = {position: 'absolute', top: 0, right: 40}

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" style={rightStyle}>
      <SubMenu
        key="profile"
        icon={<UserOutlined />}
        title={`${gau.user.name}`}
      >
        <Menu.Item icon={<LogoutOutlined />} key="logout" onClick={logout}>Logout</Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default NavBar;
