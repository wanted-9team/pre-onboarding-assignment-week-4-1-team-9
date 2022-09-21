import axios from 'axios'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ld2ZhY2VAZGNvLmNvbSIsImlhdCI6MTY2Mzc0MjU4NywiZXhwIjoxNjYzNzQ2MTg3LCJzdWIiOiIxMDEifQ.AJcA64RoRad9qahdGYH9lod2rWUuOb7K12pRVb6cJXU'

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
  console.log(res)
  return res
}
