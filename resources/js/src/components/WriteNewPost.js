import React, {useState, useEffect} from 'react';
import useGlobalPost from "../global_hooks/post";
import {
  Form,
  Input,
  Button,
  Card
} from 'antd';
import UploadFile from "./UploadFile";

const WriteNewPost = ({post_id=null, handleOk=null}) => {
  const [globalPost, globalPostActions] = useGlobalPost()
  const [form] = Form.useForm();
  const [fileList, setFL] = useState([])

  const onFinish = async (values) => {
    values['post_id'] = post_id
    values['images'] = JSON.stringify(fileList)
    await globalPostActions.createPost(values)
    await globalPostActions.getPosts()
    if(post_id != null) {
      handleOk()
    }
    form.resetFields();
  }

  const onFinishFailed = (errorInfo) => {

  };

  return (
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
          <UploadFile setFL={setFL} />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default WriteNewPost;
