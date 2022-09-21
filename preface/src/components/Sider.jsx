import React from 'react'
import { styled } from '@mui/system'

const NAV_CONFIG = [
  {
    title: '계좌목록',
    path: '/dashboard/app',
  },
  {
    title: '사용자 정보',
    path: '/dashboard/user',
  },
  {
    title: '로그아웃',
    path: ' ',
  },
]

function Sider() {
  return <SideMenu></SideMenu>
}
export default Sider

const SideMenu = styled('div')({
  width: 300,
  height: '100vh',
  backgroundColor: 'blue',
})
