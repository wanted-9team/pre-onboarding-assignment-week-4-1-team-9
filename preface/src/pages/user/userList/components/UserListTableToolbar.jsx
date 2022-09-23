import React, { useState } from 'react'

import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import { alpha } from '@mui/material/styles'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import Button from '@mui/material/Button'

import FilterSelect from './FilterSelect'
import UserFormDialog from './userFormDialog/UserFormDialog'

import { DELETE_USER, GET_USER_LIST_PAGE } from 'redux/saga/actionType'
import { useDispatch } from 'react-redux'

const UserListTableToolbar = ({ selected, setSelected, page, limit }) => {
  const dispatch = useDispatch()
  const [openDialog, setOpenDialog] = useState(false)

  const handleUserDelete = () => {
    const confirmMessage = window.confirm('정말 삭제 하시겠습니까?')
    if (confirmMessage) {
      dispatch({ type: DELETE_USER, payload: selected.id })
      dispatch({ type: GET_USER_LIST_PAGE, payload: { page, limit } })
      setSelected({})
    }
  }
  const handleClickOpenModal = () => {
    setOpenDialog(true)
  }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.uuid && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selected.uuid ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {selected.name}
        </Typography>
      ) : (
        <Stack
          sx={{ flex: '1 1 50%', alignItems: 'center', flexDirection: 'row' }}
          direction="row"
          spacing={2}
        >
          <Typography variant="h6" id="tableTitle" component="div">
            유저 목록
          </Typography>
          <FilterSelect />
        </Stack>
      )}

      {selected.uuid ? (
        <>
          <Tooltip title="Edit">
            <IconButton>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleUserDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Button variant="contained" disableElevation onClick={handleClickOpenModal}>
          사용자 등록
        </Button>
      )}
      <UserFormDialog
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
        limit={limit}
        page={page}
      />
    </Toolbar>
  )
}

export default UserListTableToolbar
