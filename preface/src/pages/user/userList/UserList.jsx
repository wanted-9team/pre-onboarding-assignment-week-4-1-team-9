import React, { useEffect, useState, useCallback } from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import UserListTableToolbar from './components/UserListTableToolbar'
import UserListTableHead from './components/UserListTableHead'
import UserListTableBody from './components/UserListTableBody'
import UserListBottomToolbar from './components/UserListBottomToolbar'

import { useSelector, useDispatch } from 'react-redux'
import { setPagination } from 'redux/slice/PageSlice'
import { GET_USER_LIST_PAGE } from 'redux/saga/actionType'

const UserList = () => {
  const [selected, setSelected] = useState({})
  const [dense, setDense] = useState(false)
  const [limit, setLimit] = useState(10)
  const [searchInputText, setSearchInputText] = useState('')

  const dispatch = useDispatch()
  const page = useSelector(state => state.page.page)
  const userData = useSelector(state => state.userList.userList)

  useEffect(() => {
    dispatch({ type: GET_USER_LIST_PAGE, payload: { limit, page } })
    setSelected({})
    setSearchInputText('')
  }, [page, limit, dispatch])

  const handleChangePage = useCallback(
    (_, newPage) => {
      dispatch(setPagination(newPage))
    },
    [dispatch],
  )

  const handleChangeDense = useCallback(({ target }) => {
    setDense(target.checked)
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <UserListTableToolbar selected={selected} />
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
          setLimit={setLimit}
          limit={limit}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  )
}

export default UserList
