import { styled } from '@mui/material'
import React from 'react'

function Footer() {
  return <FooterContainer>Copyright © December and Company Inc.</FooterContainer>
}

export default Footer

const FooterContainer = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
})
