import React from 'react'
import { styled } from '@mui/material'

function Header() {
  return <HeaderContainer>Header</HeaderContainer>
}

export default Header

const HeaderContainer = styled('div')({
  position: 'fixed',
  top: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80%',
  height: 80,
})
