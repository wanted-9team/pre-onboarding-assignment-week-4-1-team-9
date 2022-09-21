import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import AccountTableHead from './components/AccountTableHead'
import AccountTableToolbar from './components/AccountTableToolbar'
import AccountTableBody from './components/AccountTableBody'

function createData(
  user_name,
  broker_name,
  account_number,
  account_status,
  account_name,
  assets,
  payments,
  ratio,
  is_active,
  created_at,
) {
  return {
    user_name,
    broker_name,
    account_number,
    account_status,
    account_name,
    assets,
    payments,
    ratio,
    is_active,
    created_at,
  }
}

const rows = [
  createData(
    'Dallas 황',
    '동부증권',
    268639107537,
    '투자중지',
    'checking account',
    '107392043.98',
    '552824077.44',
    '45%',
    true,
    '2021-09-10T22:05:18.146Z',
  ),
  createData(
    'Miss Sonya 예',
    '대우증권',
    174434205385,
    '투자중지',
    'checking account',
    '310458659.66',
    '939990435.06',
    '42%',
    true,
    '2021-09-10T22:05:18.146Z',
  ),
  createData(
    'Milton 온',
    '키움증권',
    994110432822,
    '투자중지',
    'checking account',
    '107392043.98',
    '552824077.44',
    '45%',
    true,
    '2021-09-10T22:05:18.146Z',
  ),
  createData(
    'Warren 피',
    '토스증권',
    76235153734,
    '입금대기',
    'checking account',
    '107392043.98',
    '552824077.44',
    '45%',
    true,
    '2021-09-10T22:05:18.146Z',
  ),
  createData(
    'Becky 동',
    '현대증권',
    98092601061,
    '해지',
    'checking account',
    '107392043.98',
    '552824077.44',
    '45%',
    true,
    '2021-09-10T22:05:18.146Z',
  ),
  createData(
    'Franklin 임',
    '동부증권',
    204108958429,
    '투자중지',
    'checking account',
    '107392043.98',
    '552824077.44',
    '45%',
    true,
    '2021-09-10T22:05:18.146Z',
  ),
]

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

export default function AccountTable() {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('user_name')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.name)
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
              rowCount={rows.length}
            />
            <AccountTableBody
              rows={rows}
              order={order}
              orderBy={orderBy}
              page={page}
              isSelected={isSelected}
              dense={dense}
              rowsPerPage={rowsPerPage}
            />
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          handleClick={handleClick}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  )
}
