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
import Button from '@mui/material/Button'

import { getUserList, getUserSetting } from 'api'
import { toLocaleDateFunc, transLoginTimeFunc } from 'utils/transDate'

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
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [page, setPage] = useState(0)
  const [selected, setSelected] = useState([])
  const [dense, setDense] = useState(false)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [userData, setUserData] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userListRes = await getUserList()
        const userSettingRes = await getUserSetting()
        concatUserFunc(userListRes.data, userSettingRes.data)
      } catch (err) {
        throw new Error(err)
      }
    }
    fetchUserData()
  }, [])

  const concatUserFunc = (userList, settings) => {
    const newUserData = userList.map(user => ({
      ...user,
      ...settings.find(({ uuid }) => uuid === user.uuid),
    }))
    setUserData(newUserData)
  }

  const handleRequestSort = cellId => {
    const isAsc = orderBy === cellId && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(cellId)
  }

  const handleSelectUser = name => {
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

  const goUserDetails = event => {}

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
              rowCount={userData.length}
            />
            <TableBody>
              {stableSort(userData, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`
                  const isItemSelected = isSelected(user.name)

                  return (
                    user.uuid && (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={user.uuid}
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                      >
                        <TableCell
                          id="selectbox"
                          padding="checkbox"
                          onClick={() => handleSelectUser(user.name)}
                        >
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                        <TableCell id={labelId} scope="row" padding="normal">
                          {user.name}
                        </TableCell>
                        <TableCell align="left">보유중인 계좌수</TableCell>
                        <TableCell align="left">{user.email}</TableCell>
                        <TableCell align="left">{toLocaleDateFunc(user.birth_date)}</TableCell>
                        <TableCell align="left">{user.phone_number}</TableCell>
                        <TableCell align="left">{user.gender_origin}</TableCell>
                        <TableCell align="left">{transLoginTimeFunc(user.last_login)}</TableCell>
                        <TableCell align="left">
                          {user.allow_marketing_push ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align="left">{user.is_active ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="left">{toLocaleDateFunc(user.created_at)}</TableCell>
                        <TableCell align="left">
                          <Button variant="outlined" size="small" onClick={goUserDetails}>
                            상세 보기
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  )
                })}
            </TableBody>
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

export default ListTable
