import React, {useEffect, useState} from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Layout,
  Row,
  Col,
  Tooltip,
  Modal
} from "antd";
import {CommentOutlined, HeartOutlined, RetweetOutlined, SendOutlined} from '@ant-design/icons';
import useGlobalPost from "../global_hooks/post";
import WriteNewPost from "./WriteNewPost";
import Iframe from "react-iframe";

const Post = ({post, enable_comment=true, ...props}) => {
  const [globalPost, globalPostActions] = useGlobalPost()
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onFinish = async (values) => {
    values['post_id'] = post.id
    await globalPostActions.createComment(values)
    await globalPostActions.getPosts()
  }

  const onFinishFailed = (errorInfo) => {

  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Card title={post.user.name} bordered={false} style={{marginTop: '10px'}} {...props}>

      <Modal
        title={`Re-post`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <WriteNewPost post_id={post.id} handleOk={() => handleOk()} />
        <Iframe url={`${process.env.MIX_APP_URL}post/${post.id}`}
          width="450px"
          height="450px"
          className="myClassname"
          display="initial"
          position="relative"/>
      </Modal>

      <h2>{post.body}</h2>

      {
        post.post_urls &&
        (
          post.post_urls.map(pu => (
            <Iframe
              key={pu.id}
              url={`${pu.url}`}
              width="1200px"
              height="600px"
              display="initial"
              position="relative"/>
          ))
        )
      }

      <div style={{marginTop: '50px'}}>
        <Row>
          <Col span={1}><HeartOutlined /></Col>
          <Col span={1}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Tooltip title="Re-post">
                <RetweetOutlined onClick={showModal} style={{cursor: 'pointer', marginRight: '6px'}} />
              </Tooltip>
              <p style={{marginBottom: '0px'}}>{post.re_posts.length}</p>
            </div>
          </Col>
          <Col span={1}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <CommentOutlined style={{marginRight: '6px'}} />
              <p style={{marginBottom: '0px'}}>{post.comments.length}</p>
            </div>
          </Col>
        </Row>


      </div>

      <div style={{marginTop: '10px'}}>
        <div>
          <h4>Comments</h4>
          {
            post.comments &&
            (
              post.comments.map(comment => (
                <div key={comment.id} style={{paddingLeft: '10px'}}>
                  <h5 style={{color: 'blue'}}>{comment.user.name}</h5>
                  <p>{comment.content}</p>
                </div>
              ))
            )
          }
        </div>
        {
          enable_comment &&
          (
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
          )
        }
      </div>
    </Card>
  );
}

export default Post;
