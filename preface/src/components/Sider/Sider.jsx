import React from 'react'
import { styled, ListItemButton, ListItemText } from '@mui/material'
import NavMenuGroup from './components/NavMenuGroup'

const NAV_CONFIG = [
  {
    title: '계좌목록',
    path: '/main/accountList',
  },
  {
    title: '사용자 정보',
    path: '/main/userList',
  },
]

function Sider() {
  return (
    <SiderContainer>
      <SideLogo />
      <NavMenuGroup menuList={NAV_CONFIG} />
      <ListItemButton selected={false}>
        <ListItemText primary="로그아웃" />
      </ListItemButton>
    </SiderContainer>
  )
}
export default Sider

const SiderContainer = styled('div')({
  flex: 2,
  height: '100vh',
  backgroundColor: 'rgb(250,250,250)',
})

const SideLogo = styled('div')({
  width: '100%',
  height: 80,
  backgroundColor: 'blue',
})
