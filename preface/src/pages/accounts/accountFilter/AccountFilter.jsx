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
  TablePagination,
  Typography,
} from '@mui/material'

import AccountTableHead from './components/AccountTableHead'
import AccountTableBody from './components/AccountTableBody'
import AccountMultiSelectbox from './components/AccountMultiSelectBox'
import AccountSinglebox from './components/AccountSingleBox'
import AccountSearchBar from './components/AccountSearchBar'

import { getTotalUserList, getAccounts } from 'api'
import { findEqualUserName } from 'utils/findEqualData'
import { accountStatusList, toStatusNumber } from 'utils/transAccountStatus'

import { matchSorter } from 'match-sorter'

export default function AccountList() {
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [totalAccountList, setTotalAccountList] = useState([])
  const [accountList, setAccountList] = useState([])
  const [filterOption, setFilterOption] = useState(
    { brokers: [] },
    { isActive: null },
    { accountStatus: '' },
  )

  const IS_ACTIVE_OPTIONS = ['활성화', '비활성화']
  const ACCOUNT_STATUS_OPTIONS = accountStatusList.filter(value => value !== 'default')

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
      const accountResponse = await getAccounts()
      const totalUserResponse = await getTotalUserList()

      concatName(accountResponse.data, totalUserResponse.data)
    } catch (err) {
      throw new Error(err)
    }
  }, [])

  useEffect(() => {
    fetchAccountsData()
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const handleSelectBroker = broker => {
    let tempFilterOption = filterOption
    if (broker.length === 0) {
      tempFilterOption.brokers = []
      setFilterOption(tempFilterOption)
      filterData(totalAccountList, filterOption)
      return
    }
    tempFilterOption.brokers = broker
    setFilterOption(tempFilterOption)
    filterData(totalAccountList, filterOption)
  }

  const filterData = (data, filterOptions) => {
    let matchedData = []
    for (const filterOption in filterOptions) {
      if (filterOption === 'brokers' && filterOptions[filterOption].length > 0) {
        filterOptions[filterOption].map(filter => {
          matchedData = matchedData.concat(
            matchSorter(data, filter.number, { keys: ['broker_id'] }),
          )
        })
      } else if (filterOption === 'isActive' && filterOptions.isActive != null) {
        if (matchedData.length > 0 && matchedData) {
          matchedData = matchSorter(matchedData, filterOptions.isActive, { keys: ['is_active'] })
        } else {
          matchedData = matchSorter(data, filterOptions.isActive, { keys: ['is_active'] })
        }
      } else if (filterOption === 'accountStatus') {
        if (matchedData.length > 0) {
          matchedData = matchSorter(matchedData, filterOptions.accountStatus, {
            keys: ['status'],
          })
        } else {
          matchedData = matchSorter(data, filterOptions.accountStatus, { keys: ['status'] })
        }
      } else if (filterOptions.brokers.length === 0 && filterOptions.isActive === null) {
        matchedData = data
      }
    }

    setAccountList(matchedData)
  }

  const handleSelectActive = selected => {
    let tempFilterOption = filterOption
    if (selected === '활성화') {
      tempFilterOption.isActive = true
    } else if (selected === '비활성화') {
      tempFilterOption.isActive = false
    } else {
      tempFilterOption.isActive = null
    }
    setFilterOption(tempFilterOption)
    filterData(totalAccountList, filterOption)
  }

  const handleSelectStatus = status => {
    let tempFilterOption = filterOption
    if (status === null) {
      tempFilterOption.accountStatus = ''
    } else {
      tempFilterOption.accountStatus = toStatusNumber(status)
    }
    setFilterOption(tempFilterOption)
    filterData(totalAccountList, filterOption)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Container sx={{ display: 'flex', flexDirection: 'row', gap: 5, mb: 2 }}>
            <AccountMultiSelectbox onSelectBrocker={handleSelectBroker}></AccountMultiSelectbox>
            <AccountSinglebox
              onSelect={handleSelectActive}
              options={IS_ACTIVE_OPTIONS}
              title="활성화 여부"
            ></AccountSinglebox>
            <AccountSinglebox
              onSelect={handleSelectStatus}
              options={ACCOUNT_STATUS_OPTIONS}
              title="계좌 상태"
            ></AccountSinglebox>
          </Container>
        </Container>
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

        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={accountList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="페이지별 행 수"
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="좁게 나열하기"
      />
    </Box>
  )
}
