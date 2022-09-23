import React from 'react'
import { ListItemButton, ListItemText } from '@mui/material'
import { storage } from 'utils/storage'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const navigate = useNavigate()

  const logoutHandler = () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      storage.remove()
      navigate('/')
    }
  }
  return (
    <ListItemButton selected={false} onClick={logoutHandler}>
      <ListItemText primary="로그아웃" />
    </ListItemButton>
  )
}

export default LogoutButton
