import axios from 'axios'
import { storage } from 'utils/storage'

const BACKEND_PORT_NUMBER = process.env.REACT_APP_SERVER_PORT || '4000'
const SERVER_URL =
  (process.env.REACT_APP_SERVER_URL || 'http://localhost:') + BACKEND_PORT_NUMBER + '/'

// 로그인 기능이 구현이 안됐으므로 postman으로 로그인 한 번 한 뒤 response 받은 token으로 대체하세요!
const ACCESS_TOKEN =
  storage.get() ||
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld2ZhY2VAZGNvLmNvbSIsImlhdCI6MTY2Mzg2Mzk2MSwiZXhwIjoxNjYzODY3NTYxLCJzdWIiOiIxMDIifQ.43M4HZPUGoOG7RWAyr2JVuenNuvuoE4oEt-8M-DP71U`

const Axios = axios.create({
  baseURL: SERVER_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`,
    'Content-type': 'application/json',
  },
})

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
