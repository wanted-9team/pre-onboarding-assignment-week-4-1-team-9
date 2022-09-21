import React from 'react'
import Box from '@mui/material/Box'
import TableHead from '@mui/material/TableHead'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'

const ListTableCell = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = cellId => event => {
    onRequestSort(event, cellId)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {HEADCELLS.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default ListTableCell

const HEADCELLS = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: '이름',
  },
  {
    id: 'account_count',
    numeric: false,
    disablePadding: false,
    label: '보유 계좌수',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'e-mail',
  },
  {
    id: 'birth_date',
    numeric: false,
    disablePadding: false,
    label: '생년월일',
  },
  {
    id: 'phone_number',
    numeric: false,
    disablePadding: false,
    label: '전화번호',
  },
  {
    id: 'gender_origin',
    numeric: false,
    disablePadding: false,
    label: '성별',
  },
  {
    id: 'last_login',
    numeric: false,
    disablePadding: false,
    label: '최근 로그인',
  },
  {
    id: 'marketing_push',
    numeric: false,
    disablePadding: false,
    label: '혜택 수신 동의',
  },
  {
    id: 'is_active',
    numeric: false,
    disablePadding: false,
    label: '활성화',
  },
  {
    id: 'created_at',
    numeric: false,
    disablePadding: false,
    label: '가입일',
  },
]

ListTableCell.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}
