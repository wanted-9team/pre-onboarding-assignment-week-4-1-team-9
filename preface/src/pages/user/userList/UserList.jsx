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
import { getUserList, getUserSetting, getAccounts, searchUsers, getTotalUserList } from 'api'
import { findEqualUuid, findEqualUserId } from 'utils/findEqualData'

const UserList = () => {
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState({})
  const [dense, setDense] = useState(false)
  const [limit, setLimit] = useState(10)
  const [userData, setUserData] = useState([])
  const [searchInputData, setSearchInputData] = useState('')
  const [userSettingsData, setUserSettingsData] = useState([])
  const [userAccountList, setUserAccountList] = useState([])
  const [totalUserLength, setTotalUserLength] = useState(0)

  const concatUserFunc = useCallback((userList, userSettings, accountList) => {
    const newUserData = userList
      .filter(user => user.uuid)
      .map(user => ({
        ...user,
        ...findEqualUuid(user, userSettings),
        ...findEqualUserId(user, accountList),
      }))
    setUserData(newUserData)
  }, [])

  const fetchUserData = useCallback(async () => {
    try {
      const userListRes = await getUserList(page, limit)
      const totalUserRes = await getTotalUserList()
      const userSettingRes = await getUserSetting()
      const accountListRes = await getAccounts()
      setTotalUserLength(totalUserRes.data.filter(user => user.uuid).length)
      setUserSettingsData(userSettingRes.data)
      setUserAccountList(accountListRes.data)
      concatUserFunc(userListRes.data, userSettingRes.data, accountListRes.data)
    } catch (err) {
      throw new Error(err)
    }
  }, [concatUserFunc, limit, page])

  const handleSearch = useCallback(
    async e => {
      e.preventDefault()
      if (!searchInputData) {
        fetchUserData()
        return
      }
      try {
        const searchUserRes = await searchUsers(searchInputData)
        concatUserFunc(searchUserRes.data, userSettingsData, userAccountList)
      } catch (err) {
        throw new Error(err)
      }
    },
    [concatUserFunc, fetchUserData, searchInputData, userAccountList, userSettingsData],
  )

  useEffect(() => {
    fetchUserData()
  }, [page, limit])

  const handleChangePage = useCallback((_, newPage) => {
    setPage(newPage)
  }, [])

  const handleChangeDense = useCallback(({ target }) => {
    setDense(target.checked)
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <UserListTableToolbar
          selected={selected}
          setSearchInputData={setSearchInputData}
          handleSearch={handleSearch}
        />
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
          handleSearch={handleSearch}
          setSearchInputData={setSearchInputData}
          page={page}
          handleChangePage={handleChangePage}
          setLimit={setLimit}
          limit={limit}
          totalUserLength={totalUserLength}
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
