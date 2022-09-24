import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Container,
  Table,
  TableContainer,
  Paper,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  MenuItem,
  Pagination,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material'

import AccountTableHead from './components/AccountTableHead'
import AccountTableBody from './components/AccountTableBody'
import AccountSearchBar from './components/AccountSearchBar'

import { getAccountListByConditions, getTotalUserList, getAccounts } from 'api'
import { findEqualUserName } from 'utils/findEqualData'
import { accountStatusList, toStatusNumber } from 'utils/transAccountStatus'

export default function AccountList() {
  const [totalAccountList, setTotalAccountList] = useState([])
  const [accountList, setAccountList] = useState([])
  const [totalAccountLength, setTotalAccountLength] = useState(0)
  const [accountsOption, setAccountsOption] = useState({
    page: 0,
    dense: false,
    rowsPerPage: 5,
    query: '',
  })

  const { page, dense, rowsPerPage, query } = accountsOption

  const concatName = useCallback((accountList, userList) => {
    const newAccountData = accountList
      .filter(account => account.user_id)
      .map(account => ({
        ...account,
        ...findEqualUserName(account, userList),
      }))
    setAccountList(newAccountData)
    setTotalAccountList(newAccountData)
  }, [])

  const fetchAccountsData = useCallback(async () => {
    try {
      const totalLengthRes = await getAccounts()
      const accountResponse = await getAccountListByConditions(page, rowsPerPage, query)
      const totalUserResponse = await getTotalUserList()
      setTotalAccountLength(totalLengthRes.data.length)
      concatName(accountResponse.data, totalUserResponse.data)
    } catch (err) {
      throw new Error(err)
    }
  }, [concatName, page, rowsPerPage, query])

  useEffect(() => {
    fetchAccountsData()
  }, [page, rowsPerPage])

  const handleChangeLimit = useCallback(
    ({ target }) => {
      setAccountsOption({ ...accountsOption, rowsPerPage: target.value })
    },
    [setAccountsOption, accountsOption],
  )

  const handleChangePage = useCallback(
    (_, newPage) => {
      setAccountsOption(prev => ({ ...prev, page: newPage }))
    },
    [accountsOption],
  )

  const handleChangeDense = event => {
    setAccountsOption(prev => ({ ...prev, dense: event.target.checked }))
  }

  useEffect(() => {
    console.log(totalAccountLength)
  }, [totalAccountLength])
  const MAX_PAGE = Math.ceil(totalAccountLength / rowsPerPage)
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ ml: 5, mb: 3, mt: 3 }}>
          <Typography variant="h6" id="tableTitle" component="div">
            계좌 목록
          </Typography>
        </Box>

        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <AccountTableHead rowCount={accountList.length} />
            <></>
            <AccountTableBody
              rows={accountList}
              page={page}
              dense={dense}
              rowsPerPage={rowsPerPage}
            />
          </Table>
        </TableContainer>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '10px 0',
          }}
        >
          <Box>
            <AccountSearchBar
              accountsOption={accountsOption}
              setAccountsOption={setAccountsOption}
              concatName={concatName}
              fetchAccountsData={fetchAccountsData}
              setTotalAccountLength={setTotalAccountLength}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl sx={{ minWidth: 75 }}>
              <InputLabel id="limit-select-label" size="small">
                number
              </InputLabel>
              <Select
                size="small"
                labelId="limit-select-label"
                id="limit-select"
                value={rowsPerPage}
                label="number"
                onChange={handleChangeLimit}
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
            </FormControl>
            <Pagination
              count={MAX_PAGE && MAX_PAGE}
              page={page}
              onChange={handleChangePage}
              size="small"
            />
          </Box>
        </Box>
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="좁게 나열하기"
      />
    </Box>
  )
}
