import React, {useEffect} from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Layout,
  Row,
  Col
} from "antd";
import {SendOutlined} from '@ant-design/icons';

const Post = ({post, ...props}) => {

  const onFinish = async (values) => {
    console.log(values)
  }

  const onFinishFailed = (errorInfo) => {

  };

  return (
    <Card title={post.user.name} bordered={false} style={{marginTop: '10px'}} {...props}>
      <p>{post.body}</p>

      <div style={{marginTop: '50px'}}>
        <Form
          name="comment"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="content"
            rules={[{ required: true, message: 'Please input your comment!' }]}
          >
            <Row>
              <Col span={20}>
                <Input placeholder={'Comment...'} />
              </Col>
              <Col span={4}>
                <Button icon={<SendOutlined />} type="primary" htmlType="submit">

                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>
    </Card>
  );
}

export default Post;
