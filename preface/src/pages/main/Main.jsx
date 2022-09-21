import React from 'react'
import Sider from 'components/Sider'
import { Outlet } from 'react-router-dom'
import { Box, styled } from '@mui/material'
import Header from 'components/Header'
import Footer from 'components/Footer'

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
})

function Main() {
  return (
    <RootStyle>
      <Sider />
      <Box sx={{ width: '100%', height: '100%', overflow: 'scroll' }}>
        <Header />
        <Outlet />
        <Footer />
      </Box>
    </RootStyle>
  )
}

export default Main
