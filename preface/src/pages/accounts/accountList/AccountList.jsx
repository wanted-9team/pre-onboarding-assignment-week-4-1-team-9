import React, { useState, useEffect, useCallback } from 'react'
import {
  Box,
  Container,
  Table,
  TableContainer,
  TablePagination,
  Paper,
  FormControlLabel,
  Switch,
  Button,
  Typography,
  MenuItem,
  Pagination,
  FormControl,
  InputLabel,
  Select
} from '@mui/material'

import AccountTableHead from './components/AccountTableHead'
import AccountTableBody from './components/AccountTableBody'
import AccountMultiSelectbox from './components/AccountMultiSelectBox'
import AccountSinglebox from './components/AccountSingleBox'
import AccountSearchBar from './components/AccountSearchBar'

import { getAccountListByConditions, getTotalUserList, getAccounts } from 'api'
import { findEqualUserName } from 'utils/findEqualData'
import { accountStatusList, toStatusNumber } from 'utils/transAccountStatus'

import { matchSorter } from 'match-sorter'

export default function AccountList() {


  const [selected, setSelected] = useState([])
  const [accountList, setAccountList] = useState([])
  const [totalAccountLength, setTotalAccountLength] = useState(0)
  const [filterOption, setFilterOption] = useState(
    { brokers: [] },
    { isActive: null },
    { accountStatus: '' },
  )
  const [accountsOption, setAccountsOption] = useState({
    page: 0,
    dense: false,
    rowsPerPage: 5,
    query: '',
  })

  const { page, dense, rowsPerPage, query } = accountsOption
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
      const totalLengthRes = await getAccounts()
      const accountResponse = await getAccountListByConditions(page, rowsPerPage, query)
      const totalUserResponse = await getTotalUserList()

      setTotalAccountLength(totalLengthRes.data.length)
      concatName(accountResponse.data, totalUserResponse.data)
    } catch (err) {
      throw new Error(err)
    }
  }, [concatName, accountsOption, totalAccountLength])

  useEffect(() => {
    fetchAccountsData()
  }, [accountsOption, setAccountList])

  const handleChangeLimit = useCallback(
    ({ target }) => {
      setAccountsOption({ ...accountsOption, rowsPerPage: target.value })
    },
    [setAccountsOption],
  )


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = accountList.map(n => n.name)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = useCallback(
    (_, newPage) => {
      setAccountsOption({ ...accountsOption, page: newPage })
    },
    [accountsOption],
  )


  const handleChangeDense = event => {
    setAccountsOption({ ...accountsOption, dense: event.target.checked })
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

  const MAX_PAGE = Math.ceil(totalAccountLength / rowsPerPage)

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
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <AccountSearchBar></AccountSearchBar>
            <Button variant="contained">검색하기</Button>
          </Box>
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
            <Pagination count={MAX_PAGE} page={page} onChange={handleChangePage} size="small" />
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
