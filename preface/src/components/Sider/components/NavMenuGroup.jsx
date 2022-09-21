import React from 'react'
import { List, ListItemButton, ListItemText } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const NavMenuGroup = ({ menuList }) => {
  const location = useLocation()
  const navigate = useNavigate()

  const movePage = path => {
    navigate(path)
  }
  return (
    <List component="nav">
      {menuList.map((menuItem, index) => (
        <ListItemButton
          key={index}
          selected={location.pathname === menuItem.path}
          onClick={() => movePage(menuItem.path)}
        >
          <ListItemText primary={menuItem.title} />
        </ListItemButton>
      ))}
    </List>
  )
}

export default NavMenuGroup
