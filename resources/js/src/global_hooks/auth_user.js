import React from 'react'
import globalHook from 'use-global-hook'
import API from "../utils/api"

const initialState = {
  user: null,
  users: []
};

const actions = {
  setState: (store, payload) => {
    store.setState({
      ...store.state,
      payload
    })
  },
  checkAuth: async (store) => {
    const {data} = await API.get('auth/user')
    store.setState({
      ...store.state,
      user: data
    })
  },
  login: async (store, payload) => {
    const {data: {data}} = await API.post('login', payload)
    localStorage.setItem('bearer_token', "Bearer " + data.token);
    store.setState({
      ...store.state,
      user: data.user
    })
  },
  register: async (store, payload) => {
    const {data: {data}} = await API.post('register', payload)
  }
};

const useGlobalAuthUser = globalHook(React, initialState, actions);

export default useGlobalAuthUser
