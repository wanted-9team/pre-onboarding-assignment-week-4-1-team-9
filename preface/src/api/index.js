import axios from 'axios'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld2ZhY2VAZGNvLmNvbSIsImlhdCI6MTY2Mzc2MzE0MCwiZXhwIjoxNjYzNzY2NzQwLCJzdWIiOiIxMDEifQ.6WzywaWHs-geeqH23xYaPhoKwEH5eNWpMGI0GJRMSZ0'

const baseAxios = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const getUserList = async () => {
  const res = await baseAxios({
    method: 'GET',
    url: '/users',
  })

  return res
}

export const getUserSetting = async () => {
  const res = await baseAxios({
    method: 'GET',
    url: '/userSetting',
  })
  return res
}
