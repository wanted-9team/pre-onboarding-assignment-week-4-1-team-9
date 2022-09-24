import React, { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import AccountTableHead from './components/AccountTableHead'
import AccountTableToolbar from './components/AccountTableToolbar'
import AccountTableBody from './components/AccountTableBody'
import AccountCheckbox from './components/AccountCheckBox'
import AccountSearchBar from './components/AccountSearchBar'

import { getAccounts, getTotalUserList } from 'api'
import { findEqualUserName } from 'utils/findEqualData'

import { matchSorter } from 'match-sorter'

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
  const [page, setPage] = useState(0)
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [accountList, setAccountList] = useState([])
  const [totalAccountList, setTotalAccountList] = useState([])
  const [selectedBroker, setSelectedBroker] = useState([])

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

  const fetchAccountsData = async () => {
    try {
      const accountResponse = await getAccounts()
      const totalUserResponse = await getTotalUserList()

      concatName(accountResponse.data, totalUserResponse.data)
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    fetchAccountsData()
  }, [])

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

  const isSelected = name => selected.indexOf(name) !== -1

  const handleSelectBroker = broker => {
    if (broker.length === 0) {
      setSelectedBroker([])
      fetchAccountsData()
      return
    }
    setSelectedBroker(broker)
    filterBroker(totalAccountList, broker)
  }

  const filterBroker = (data, brokers) => {
    let matchedData = []
    brokers.map(broker => {
      matchedData = matchedData.concat(matchSorter(data, broker.number, { keys: ['broker_id'] }))
    })
    setAccountList(matchedData)

    return
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <AccountCheckbox onSelectBrocker={handleSelectBroker}></AccountCheckbox>
        <AccountSearchBar></AccountSearchBar>
        <Button variant="contained">검색하기</Button>

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
              rowCount={accountList.length}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={accountList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onClick={handleClick}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  )
}
