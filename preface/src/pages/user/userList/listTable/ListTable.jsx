import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import ListTableCell from './ListTableCell'
import Checkbox from '@mui/material/Checkbox'
import { getUserList } from 'api'
import { toLocaleDateFunc } from 'utils/transDate'
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const ListTable = () => {
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [page, setPage] = React.useState(0)
  const [selected, setSelected] = React.useState([])
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [row, setRow] = useState([])

  const fetch = async () => {
    const response = await getUserList()
    setRow(response.data)
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleRequestSort = (event, cellId) => {
    const isAsc = orderBy === cellId && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(cellId)
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
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <ListTableCell
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={row.length}
            />
            <TableBody>
              {stableSort(row, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`
                  const isItemSelected = isSelected(row.name)
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.uuid}
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox" onClick={event => handleClick(event, row.name)}>
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="normal">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">보여중인 계좌수</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{toLocaleDateFunc(row.birth_date)}</TableCell>
                      <TableCell align="left">{row.phone_number}</TableCell>
                      <TableCell align="left">{row.gender_origin}</TableCell>
                      <TableCell align="left">{toLocaleDateFunc(row.last_login)}</TableCell>
                      <TableCell align="left">혜택 수신 동의 여부</TableCell>
                      <TableCell align="left">활성화 여부</TableCell>
                      <TableCell align="left">{toLocaleDateFunc(row.created_at)}</TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={row.length}
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

export default ListTable
