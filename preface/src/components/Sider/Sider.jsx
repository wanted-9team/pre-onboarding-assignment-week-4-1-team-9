import React from 'react'
import { styled } from '@mui/material'
import NavMenuGroup from './components/NavMenuGroup'
import LogoutButton from './components/LogoutButton'

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
      <LogoutButton />
    </SiderContainer>
  )
}
export default Sider

const SiderContainer = styled('div')({
  position: 'fixed',
  left: 0,
  width: 250,
  height: '100vh',
  backgroundColor: 'rgb(250,250,250)',
  zIndex: 105,
})

const SideLogo = styled('div')({
  width: '100%',
  height: 80,
  backgroundColor: 'blue',
})
