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
import useGlobalPost from "../global_hooks/post";

const Post = ({post, ...props}) => {
  const [globalPost, globalPostActions] = useGlobalPost()

  const onFinish = async (values) => {
    values['post_id'] = post.id
    await globalPostActions.createComment(values)
    await globalPostActions.getPosts()
  }

  const onFinishFailed = (errorInfo) => {

  };

  return (
    <Card title={post.user.name} bordered={false} style={{marginTop: '10px'}} {...props}>
      <h2>{post.body}</h2>

      <div style={{marginTop: '50px'}}>
        <div>
          <h4>Comments</h4>
          {
            post.comments &&
            (
              post.comments.map(comment => (
                <div key={comment.id} style={{paddingLeft: '10px'}}>
                  <h5 style={{color: 'blue'}}>{comment.post.user.name}</h5>
                  <p>{comment.content}</p>
                </div>
              ))
            )
          }
        </div>
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
