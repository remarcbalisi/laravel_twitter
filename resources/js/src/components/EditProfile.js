import React, {useEffect} from 'react';
import {Card, Avatar, Layout, Descriptions, Form, Input, Button} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;
import SideMenu from "./SideMenu"
import NavBar from "./NavBar";
import useGlobalAuthUser from "../global_hooks/auth_user";
import { useParams } from "react-router-dom";

const EditProfile = () => {
  const [globalUser, globalUserActions] = useGlobalAuthUser()
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      await globalUserActions.getUser(id)
    }
    getUser()
  }, [])

  const onFinish = async (values) => {
    await globalUserActions.updateUser(values)
  };

  const onFinishFailed = (errorInfo) => {

  };

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
                <Form
                  name="basic"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  initialValues={{
                    name: globalUser.viewUser.name,
                    email: globalUser.viewUser.email,
                  }}
                >

                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your name!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your email!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                      {
                        required: false,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Update
                    </Button>
                  </Form.Item>
                </Form>
              )
            }
          </div>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default EditProfile;
