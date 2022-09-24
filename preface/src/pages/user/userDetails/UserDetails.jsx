import React, { useEffect, useState } from 'react'
import { toLocaleDateFunc } from 'utils/transDate'
import {
  Typography,
  Paper,
  TablePagination,
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

import UserAccountTableBody from './components/UserAccountTableBody'
import UserAccountTableHead from './components/UserAccountTableHead'
import { useLocation } from 'react-router'
import { maskingPhoneNumber } from 'utils/maskingNumber'

import UserAccountFilterSelect from './components/UserAccountFilterSelect'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router'

export const headCells = [
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

const UserDetails = () => {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [rows, setRows] = useState([])

  const [filterSelectOne, setFilterSelectOne] = useState('all')

  useEffect(() => {
    setRows(state.accountList)
  }, [state])

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Box>
      <Box sx={{ marginBottom: '50px' }}>
        <Typography
          sx={{ flex: '1 1 100%', display: 'flex', alignItems: 'center' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          <ArrowBackIcon sx={{ cursor: 'pointer', mr: 2 }} onClick={() => navigate(-1)} />
          사용자 정보
        </Typography>

        <Paper sx={{ mb: 2 }}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="th">이름</TableCell>
                  <TableCell>{state.name}</TableCell>
                  <TableCell>성별</TableCell>
                  <TableCell>{state.gender_origin}</TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>나이</TableCell>
                  <TableCell>{state.age}</TableCell>
                  <TableCell>생년월일</TableCell>
                  <TableCell>{toLocaleDateFunc(state.birth_date)}</TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>주소</TableCell>
                  <TableCell>
                    {state.address}
                    {state.detail_address}
                  </TableCell>
                  <TableCell>이메일</TableCell>
                  <TableCell>{state.email}</TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell>핸드폰</TableCell>
                  <TableCell>{maskingPhoneNumber(state.phone_number)}</TableCell>
                  <TableCell>혜택 정보 수신</TableCell>
                  <TableCell>{state.is_active === true ? '동의' : '비동의'}</TableCell>
                </TableRow>
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell className="">가입 경로</TableCell>
                  <TableCell>{state.name}</TableCell>
                  <TableCell>가입 시각</TableCell>
                  <TableCell>{toLocaleDateFunc(state.created_at)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Box sx={{ width: '100%' }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          계좌 목록
          <UserAccountFilterSelect
            filterSelectOne={filterSelectOne}
            setFilterSelectOne={setFilterSelectOne}
          />
        </Typography>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <UserAccountTableHead />
              <UserAccountTableBody
                rows={rows}
                page={page}
                rowsPerPage={rowsPerPage}
                filterData={filterSelectOne}
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
          />
        </Paper>
      </Box>
    </Box>
  )
}

export default UserDetails
