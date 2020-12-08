import React, {useEffect} from "react";
import {
  Layout,
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SideMenu from "./SideMenu"
import useGlobalPost from "../global_hooks/post";
import Post from "./Post";
import WriteNewPost from "./WriteNewPost";

const Home = () => {
  const [globalPost, globalPostActions] = useGlobalPost()

  useEffect(() => {
    const getPosts = async () => {
      await globalPostActions.getPosts()
    }
    getPosts()
  }, [])

  return (
    <Layout>
      <Sider style={{backgroundColor: 'white'}}>
        <SideMenu />
      </Sider>
      <Layout>
        <Header style={{color: 'white'}}>Header</Header>
        <Content style={{height: '100%'}}>
          <div style={{padding: '40px'}}>

            <WriteNewPost />

            <div style={{marginTop: '50px'}}>
              {
                globalPost.posts &&
                (
                  globalPost.posts.map(post => (
                    <Post key={post.id} post={post} />
                  ))
                )
              }
            </div>

          </div>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

export default Home;
