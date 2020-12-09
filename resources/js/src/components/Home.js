import React, {useEffect} from "react";
import {
  Layout,
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
import SideMenu from "./SideMenu"
import useGlobalPost from "../global_hooks/post";
import Post from "./Post";
import WriteNewPost from "./WriteNewPost";
import useGlobalAuthUser from "../global_hooks/auth_user";
import NavBar from "./NavBar";

const Home = () => {
  const [globalPost, globalPostActions] = useGlobalPost()
  const [globalUser,] = useGlobalAuthUser()

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
        {
          globalUser.user &&
          (
            <Header style={{backgroundColor: 'white'}}>
              <div style={{backgroundColor: 'black'}}>
                <NavBar />
              </div>
              {/*Hello {globalUser.user.name}*/}
            </Header>
          )
        }
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
