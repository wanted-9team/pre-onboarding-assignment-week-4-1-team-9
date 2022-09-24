import React from 'react'
import { styled } from '@mui/material'
import NavMenuGroup from './components/NavMenuGroup'
import LogoutButton from './components/LogoutButton'

export const NAV_CONFIG = [
  {
    title: '계좌목록',
    path: '/main/accountlist',
  },
  {
    title: '사용자 정보',
    path: '/main/userlist',
  },
]

function Sider() {
  return (
    <SiderContainer>
      <SideLogo src="https://www.fint.co.kr/static/imgs/new/global/logo.svg" alt="logo" />
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

const SideLogo = styled('img')({
  width: '100%',
  height: 80,
  marginTop: 10,
})
