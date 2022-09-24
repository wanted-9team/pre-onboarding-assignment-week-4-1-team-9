import React, { useEffect, useState, useCallback } from 'react'

import { Box, Table, TableContainer, Paper, FormControlLabel, Switch } from '@mui/material'

import UserListTableToolbar from './components/UserListTableToolbar'
import UserListTableHead from './components/UserListTableHead'
import UserListTableBody from './components/UserListTableBody'
import UserListBottomToolbar from './components/UserListBottomToolbar'
import MessageSnackBar from './components/userFormDialog/MessageSnackBar'

import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { setPaginationAction } from 'redux/slice/PageSlice'
import { GET_USER_LIST_PAGE } from 'redux/saga/actionType'

export const INITIAL_USER_DATA = {
  name: '',
  email: '',
  password: '',
  phone_number: '',
  address: '',
  detail_address: '',
  last_login: '',
  created_at: '',
  updated_at: '',
  age: 0,
  gender_origin: '',
  birth_date: '',
}

const UserList = () => {
  const [selected, setSelected] = useState(INITIAL_USER_DATA)
  const [dense, setDense] = useState(false)
  const [searchInputText, setSearchInputText] = useState('')

  const dispatch = useDispatch()
  const { page, limit } = useSelector(state => state.page, shallowEqual)
  const userData = useSelector(state => state.userList.userList)

  useEffect(() => {
    dispatch({ type: GET_USER_LIST_PAGE, payload: { page, limit } })
    setSelected(INITIAL_USER_DATA)
    setSearchInputText('')
  }, [page, limit, dispatch])

  const handleChangePage = useCallback(
    (_, newPage) => {
      dispatch(setPaginationAction(newPage))
    },
    [dispatch],
  )

  const handleChangeDense = useCallback(({ target }) => {
    setDense(target.checked)
  }, [])

  return (
    <Box>
      <Paper sx={{ mb: 2 }}>
        <UserListTableToolbar selected={selected} setSelected={setSelected} page={page} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <UserListTableHead />
            <UserListTableBody userData={userData} selected={selected} setSelected={setSelected} />
          </Table>
        </TableContainer>
        <UserListBottomToolbar
          searchInputText={searchInputText}
          setSearchInputText={setSearchInputText}
          page={page}
          handleChangePage={handleChangePage}
          limit={limit}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="좁게 나열하게"
      />
      <MessageSnackBar />
    </Box>
  )
}

export default UserList
