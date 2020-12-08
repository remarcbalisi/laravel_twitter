import React from "react";
import {
  Form,
  Input,
  Button,
  Layout,
  Card
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;

const Home = () => {

  const onFinish = (values) => {
    console.log(values)
  }

  const onFinishFailed = (errorInfo) => {

  };

  return (
    <Layout>
      <Sider style={{color: 'white'}}>Sider</Sider>
      <Layout>
        <Header style={{color: 'white'}}>Header</Header>
        <Content style={{height: '100vh'}}>
          <div style={{padding: '40px'}}>
            <Card title="Write new Post">
              <Form
                name="post"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
                <Form.Item
                  name="content"
                  rules={[{ required: true, message: 'Please input a content' }]}
                >
                  <Input.TextArea placeholder="What's happening?" rows={4} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Post
                  </Button>
                </Form.Item>
              </Form>

            </Card>
          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
