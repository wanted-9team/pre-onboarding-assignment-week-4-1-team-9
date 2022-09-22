import React from 'react'
import Sider from 'components/Sider/Sider'
import { Navigate, Outlet } from 'react-router-dom'
import { styled } from '@mui/material'
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import { storage } from 'utils/storage'

function Main() {
  if (!storage.get()) return <Navigate to="/" replace />
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
