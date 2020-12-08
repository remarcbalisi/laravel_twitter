import React from 'react'
import globalHook from 'use-global-hook'
import API from "../utils/api"

const initialState = {
  user: null,
  users: []
};

const actions = {
  checkAuth: async (store) => {
    const {data: {data}} = await API.get('auth/user')
    store.setState({ user: data })
  },
  login: async (store, payload) => {
    const {data: {data}} = await API.post('login', payload)
    console.log(data)
  }
};

const useGlobalAuthUser = globalHook(React, initialState, actions);

export default useGlobalAuthUser
