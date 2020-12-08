import React, {useEffect} from 'react';
import { useParams } from "react-router-dom";
import Post from "./Post";
import useGlobalPost from "../global_hooks/post";

const PreviewPost = () => {
  const { id } = useParams()
  const [globalPost, globalPostActions] = useGlobalPost()

  useEffect(() => {
    const showPost = async () => {
      await globalPostActions.showPost(id)
    }
    showPost()
  }, [])

  return (
    <>
      {
        globalPost.post &&
        (<Post post={globalPost.post} enable_comment={false}/>)
      }
    </>
  );
}

export default PreviewPost;
