import React from 'react'
import Sider from 'components/Sider/Sider'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/material'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'

function Main() {
  return (
    <MainContainer>
      <Sider />
      <MainSection>
        <Header />
        <Outlet />
        <Footer />
      </MainSection>
    </MainContainer>
  )
}

export default Main

const MainContainer = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
})

const MainSection = styled('section')({
  padding: '100px 30px 0',
  flex: 8,
  width: '100%',
  height: '100%',
  overflow: 'scroll',
})
