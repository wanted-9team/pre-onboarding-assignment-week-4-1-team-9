import React from 'react'
import { styled } from '@mui/material'

function Header() {
  return (
    <HeaderContainer>
      <SideOverlap />
      <HeaderSection>Header</HeaderSection>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled('div')({
  boxSizing: 'border-box',
  position: 'fixed',
  top: 0,
  left: 0,
  display: 'flex',
  width: '100%',
  height: 80,
  backgroundColor: 'white',
  zIndex: 100,
})

const SideOverlap = styled('div')({
  flexBasis: 250,
  width: 250,
})

const HeaderSection = styled('div')({
  flex: 0,
  width: '100%',
})
