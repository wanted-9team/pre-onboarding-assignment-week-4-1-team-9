import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'

import UserListTableToolbar from './components/UserListTableToolbar'
import UserListTableHead from './components/UserListTableHead'
import UserListTableBody from './components/UserListTableBody'
import { getUserList, getUserSetting, getAccounts, searchUsers } from 'api'
import { findEqualUuidFunc, findEqualUserId } from 'utils/findEqualData'

const UserList = () => {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState({})
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [userData, setUserData] = useState([])
  const [searchInputData, setSearchInputData] = useState('')
  const [userSettingsData, setUserSettingsData] = useState([])
  const [userAccountList, setUserAccountList] = useState([])

  const concatUserFunc = (userList, userSettings, accountList) => {
    const newUserData = userList
      .filter(user => user.uuid)
      .map(user => ({
        ...user,
        ...findEqualUuidFunc(user, userSettings),
        ...findEqualUserId(user, accountList),
      }))
    setUserData(newUserData)
  }

  const handleSearch = async e => {
    e.preventDefault()
    if (!searchInputData) return
    try {
      const searchUserRes = await searchUsers(searchInputData)
      concatUserFunc(searchUserRes.data, userSettingsData, userAccountList)
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userListRes = await getUserList()
        const userSettingRes = await getUserSetting()
        const accountListRes = await getAccounts()
        setUserSettingsData(userSettingRes.data)
        setUserAccountList(accountListRes.data)
        concatUserFunc(userListRes.data, userSettingRes.data, accountListRes.data)
      } catch (err) {
        throw new Error(err)
      }
    }
    fetchUserData()
  }, [])

  const handleRequestSort = cellId => {
    const isAsc = orderBy === cellId && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(cellId)
  }

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = ({ target }) => {
    setRowsPerPage(parseInt(target.value, 10))
    setPage(0)
  }

  const handleChangeDense = ({ target }) => {
    setDense(target.checked)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <UserListTableToolbar
          numSelected={selected.length}
          setSearchInputData={setSearchInputData}
          handleSearch={handleSearch}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <UserListTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={userData.length}
            />

            <UserListTableBody
              userData={userData}
              order={order}
              orderBy={orderBy}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={selected}
              setSelected={setSelected}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={userData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
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
