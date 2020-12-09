import React, {useEffect} from 'react';
import { Card, Avatar, Layout, Descriptions } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;
import SideMenu from "./SideMenu"
import NavBar from "./NavBar";
import useGlobalAuthUser from "../global_hooks/auth_user";
import { useParams, useHistory } from "react-router-dom";

const Profile = () => {
  const [globalUser, globalUserActions] = useGlobalAuthUser()
  const { id } = useParams()
  const history = useHistory()

  useEffect(() => {
    const getUser = async () => {
      await globalUserActions.getUser(id)
    }
    getUser()
  }, [])

  const editUser = () => {
    history.push(`/user/edit/${id}`)
  }

  return (
    <Layout>
      <Sider style={{backgroundColor: 'white'}}>
        <SideMenu />
      </Sider>
      <Layout>
        <Header style={{backgroundColor: 'white'}}>
          <div>
            <NavBar />
          </div>
        </Header>
        <Content style={{height: '100%'}}>
          <div style={{padding: '40px', backgroundColor: 'white', display: 'flex', justifyContent: 'center'}}>
            {
              globalUser.viewUser &&
              (
                <Card
                  style={{ width: 300 }}
                  cover={
                    <img
                      alt="example"
                      src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                  }
                  actions={[
                    <SettingOutlined key="setting" />,
                    globalUser.viewUser.id === globalUser.user.id ? <EditOutlined onClick={editUser} key="edit" /> : null,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  <Meta
                    avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={`${globalUser.viewUser.name}`}
                    description={`${globalUser.viewUser.email}`}
                  />
                </Card>
              )
            }
          </div>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default Profile;
