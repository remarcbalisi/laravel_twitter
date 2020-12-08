import React from "react";
import {
  Form,
  Input,
  Button,
  Layout,
  Card
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SideMenu from "./SideMenu"
import useGlobalPost from "../global_hooks/post";

const Home = () => {
  const [globalPost, globalPostActions] = useGlobalPost()
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    await globalPostActions.createPost(values)
    form.resetFields();
  }

  const onFinishFailed = (errorInfo) => {

  };

  return (
    <Layout>
      <Sider style={{backgroundColor: 'white'}}>
        <SideMenu />
      </Sider>
      <Layout>
        <Header style={{color: 'white'}}>Header</Header>
        <Content style={{height: '100vh'}}>
          <div style={{padding: '40px'}}>
            <Card title="Write new Post">
              <Form
                name="post"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
              >
                <Form.Item
                  name="body"
                  rules={[{ required: true, message: 'Please input what\'s happening' }]}
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
