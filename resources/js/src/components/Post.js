import React, {useEffect} from "react";
import {Card} from "antd";

const Post = ({post, ...props}) => {
  return (
    <Card key={post.id} title={post.user.name} bordered={false} style={{marginTop: '10px'}} {...props}>
      <p>{post.body}</p>
    </Card>
  );
}

export default Post;
