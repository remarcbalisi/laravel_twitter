import React from 'react'
import globalHook from 'use-global-hook'
import API from "../utils/api"

const initialState = {
  user: null,
  users: [],
  viewUser: null
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
  },
  logout: async (store) => {
    localStorage.setItem('bearer_token', null);
    store.setState({
      ...store.state,
      user: null,
      users: []
    })
  },
  getUser: async (store, user_id) => {
    const {data: {data}} = await API.get(`user/user/${user_id}`)
    store.setState({
      ...store.state,
      viewUser: data,
    })
  },
  updateUser: async (store, payload) => {
    const {data: {data}} = await API.put(`user/user/${store.state.viewUser.id}`, payload)
    store.setState({
      ...store.state,
      viewUser: data,
    })
  },
};

const useGlobalAuthUser = globalHook(React, initialState, actions);

export default useGlobalAuthUser
