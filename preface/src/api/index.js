import axios from 'axios'
import { storage } from 'utils/storage'

const BACKEND_PORT_NUMBER = process.env.REACT_APP_SERVER_PORT || '4000'
const SERVER_URL =
  (process.env.REACT_APP_SERVER_URL || 'http://localhost:') + BACKEND_PORT_NUMBER + '/'

const ACCESS_TOKEN = storage.get()

const Axios = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-type': 'application/json',
  },
})

Axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${storage.get()}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response) {
      const {
        config,
        response: { status },
      } = error

      if (status === 401) {
        const newAccessToken = error.response.data.newAccessToken
        storage.set(newAccessToken)
        config.headers.Authorization = `Bearer ${storage.get()}`
        return axios(config)
      }
    }
    return Promise.reject(error)
  },
)

export const login = async loginData => {
  const bodyData = JSON.stringify(loginData)
  return await Axios.post('login', bodyData)
}

export const getAccounts = async () => {
  return await Axios.get('/accounts')
}

export const getAccountDetail = async id => {
  return await Axios.get(`/accounts/${id}`)
}

export const editAccount = async editedData => {
  const bodyData = JSON.stringify(editedData)
  return await Axios.put('accounts', bodyData)
}

export const deleteAccount = async id => {
  return await Axios.delete(`accounts/${id}`)
}

export const getUserList = async (_page, _limit) => {
  return await Axios.get(`users?_page=${_page}&_limit=${_limit}&_order=asc&_sort=id`)
}

export const getTotalUserList = async () => {
  return await Axios.get('users')
}

export const getUserDetail = async id => {
  return await Axios.get(`users/${id}`)
}

export const addUser = async userData => {
  const bodyData = JSON.stringify(userData)
  return await Axios.post('users', bodyData)
}

export const editUser = async editedData => {
  const bodyData = JSON.stringify(editedData)
  return await Axios.put('users', bodyData)
}

export const deleteUser = async id => {
  return await Axios.delete(`users/${id}`)
}

export const getUserSetting = async () => {
  return await Axios.get('userSetting')
}

export const searchUsers = async word => {
  return await Axios.get(`users?q=${word}`)
}
