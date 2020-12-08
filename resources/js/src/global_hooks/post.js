import React from 'react'
import globalHook from 'use-global-hook'
import API from "../utils/api"

const initialState = {
  posts: []
};

const actions = {
  setState: (store, payload) => {
    store.setState({
      ...store.state,
      payload
    })
  },
  createPost: async (store, payload) => {
    const {data: {data}} = await API.post('user/post', payload);
  },
  getPosts: async (store) => {
    const {data: {data}} = await API.get('user/post')
    store.setState({
      ...store.state,
      posts: data
    })
  },
  createComment: async (store, payload) => {
    const {data: {data}} = await API.post('user/comment', payload)
  }
};

const useGlobalPost = globalHook(React, initialState, actions);

export default useGlobalPost
