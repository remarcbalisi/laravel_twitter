import React, {useState, useEffect} from 'react';
import { Menu } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
import { useHistory, useLocation } from "react-router-dom";
import useGlobalAuthUser from "../global_hooks/auth_user";


const SideMenu = () => {
  const history = useHistory()
  const location = useLocation();
  const [current, setCurrent] = useState('home')
  const [globalUser, globalUserActions] = useGlobalAuthUser()

  useEffect(() => {
    if(location.pathname.includes('user')){
      setCurrent('profile');
    }
  }, [])

  const handleClick = e => {
    setCurrent(e.key);
  };

  const profile = (e) => {
    history.push(`/user/${globalUser.user.id}`)
    setCurrent(e.key);
  }

  const home = (e) => {
    history.push('/home')
    setCurrent(e.key);
  }

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
        selectedKeys={[current]}
        mode="inline"
      >
        <Menu.Item key="home" onClick={home}>Home</Menu.Item>
        <Menu.Item key="profile" onClick={profile}>Profile</Menu.Item>
      </Menu>
    </>
  );
}

export default SideMenu;
