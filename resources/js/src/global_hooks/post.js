import React from 'react'
import globalHook from 'use-global-hook'
import API from "../utils/api"

const initialState = {
  post: null
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
    console.log(data)
  }
};

const useGlobalPost = globalHook(React, initialState, actions);

export default useGlobalPost
