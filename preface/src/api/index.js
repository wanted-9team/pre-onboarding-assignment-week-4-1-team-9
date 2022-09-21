import axios from 'axios'
import { storage } from 'util/storage'

const BACKEND_PORT_NUMBER = process.env.REACT_APP_SERVER_PORT || '4000'
const SERVER_URL =
  process.env.REACT_APP_SERVER_URL + ':' + BACKEND_PORT_NUMBER + '/' ||
  'http://localhost:' + BACKEND_PORT_NUMBER + '/'
const ACCESS_TOKEN =
  storage.get().access_token ||
  `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld2ZhY2VAZGNvLmNvbSIsImlhdCI6MTY2Mzc2NjQwOSwiZXhwIjoxNjYzNzcwMDA5LCJzdWIiOiIxMDEifQ.pY9luavVBaWZqZ-bpLGHVJJPWgdpCAB9HotWpmXKOhQ`

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

export const editAccount = async editedData => {
  const bodyData = JSON.stringify(editedData)
  return await Axios.put('accounts', editedData)
}

export const deleteAccount = async uuid => {
  return await Axios.delete(`accounts?uuid=${uuid}`)
}

export const getUserList = async () => {
  return await Axios.get('users')
}

export const addUser = async userData => {
  const bodyData = JSON.stringify(userData)
  return await Axios.post('users', bodyData)
}

export const editUser = async editedData => {
  const bodyData = JSON.stringify(editedData)
  return await Axios.put('users', bodyData)
}

export const deleteUser = async uuid => {
  return await Axios.delete(`users?uuid=${uuid}`)
}

export const getUserSetting = async () => {
  return await Axios.get('userSetting')
}

export const searchUsers = async word => {
  return await Axios.get(`users?q=${word}`)
}
