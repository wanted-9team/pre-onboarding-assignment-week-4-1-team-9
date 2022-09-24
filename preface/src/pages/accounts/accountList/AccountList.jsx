import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Pagination from '@mui/material/Pagination'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import AccountTableHead from './components/AccountTableHead'
import AccountTableToolbar from './components/AccountTableToolbar'
import AccountTableBody from './components/AccountTableBody'
import AccountSearchBar from './components/AccountSearchBar'

import { getAccountListByConditions, getTotalUserList, getAccounts } from 'api'
import { findEqualUserName } from 'utils/findEqualData'

export const headCells = [
  {
    id: 'user_name',
    numeric: false,
    disablePadding: true,
    label: '고객명',
  },
  {
    id: 'broker_name',
    numeric: false,
    disablePadding: false,
    label: '증권사명',
  },
  {
    id: 'account_number',
    numeric: true,
    disablePadding: false,
    label: '계좌번호',
  },
  {
    id: 'account_status',
    numeric: false,
    disablePadding: false,
    label: '계좌상태',
  },
  {
    id: 'account_name',
    numeric: false,
    disablePadding: false,
    label: '계좌명',
  },
  {
    id: 'assets',
    numeric: true,
    disablePadding: false,
    label: '평가금액',
  },
  {
    id: 'payments',
    numeric: true,
    disablePadding: false,
    label: '입금금액',
  },
  {
    id: 'ratio',
    numertic: false,
    disablePadding: false,
    label: '수익률',
  },
  {
    id: 'is_active',
    numeric: false,
    disablePadding: false,
    label: '계좌활성화여부',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: '계좌개설일',
  },
]

export default function AccountList() {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('user_name')
  const [selected, setSelected] = useState([])
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

  const isSelected = name => selected.indexOf(name) !== -1

  const MAX_PAGE = Math.ceil(totalAccountLength / rowsPerPage)

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <AccountTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <AccountTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={totalAccountLength}
            />
            <AccountTableBody
              rows={accountList}
              order={order}
              orderBy={orderBy}
              page={page}
              isSelected={isSelected}
              dense={dense}
              rowsPerPage={rowsPerPage}
              onClick={handleClick}
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
        label="Dense padding"
      />
    </Box>
  )
}
