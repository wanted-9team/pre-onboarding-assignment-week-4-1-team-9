import { styled } from '@mui/material'
import React from 'react'

function Header() {
  return <HeaderContainer>Header</HeaderContainer>
}

export default Header

const HeaderContainer = styled('div')({
  width: '100%',
  height: 80,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
