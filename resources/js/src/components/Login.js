import React from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Layout
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import useGlobalAuthUser from "../global_hooks/auth_user"
import { useHistory } from "react-router-dom";

const Login = () => {
  const [gau, gauAction] = useGlobalAuthUser()
  const history = useHistory()

  const onFinish = async (values) => {
    await gauAction.login(values)
    history.push('/home')
  };

  const onFinishFailed = (errorInfo) => {

  };

  return (
    <Layout>
      <Header style={{display: "flex", justifyContent: "center"}}>
        <h3 style={{color: "white"}}>Login</h3>
      </Header>
      <Content>
        <Row justify="center" align="middle" style={{ paddingTop: "2%" }}>
          <Col span={12}>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
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
                    required: true,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  );
}

export default Login;
