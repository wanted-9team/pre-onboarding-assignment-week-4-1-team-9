import React, { useMemo } from 'react'
import { styled } from '@mui/material'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { NAV_CONFIG } from 'components/Sider/Sider'

function Header() {
  const data = useSelector(state => state.auth)
  const location = useLocation()
  const pageTitle = useMemo(() => {
    const page = NAV_CONFIG.find(page => location.pathname.includes(page.path))
    return page?.title
  }, [location.pathname])

  return (
    <HeaderContainer>
      <SideOverlap />
      <HeaderSection>
        <PageName>{pageTitle}</PageName>
        <UserName>{data.userId}</UserName>
      </HeaderSection>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled('div')({
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 30px',
  flex: 1,
  width: '100%',
})

const PageName = styled('p')({
  fontSize: '1.5rem',
  fontWeight: 'bold',
})

const UserName = styled('p')({
  fontWeight: 'bold',
})
