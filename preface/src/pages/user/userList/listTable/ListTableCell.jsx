import React from 'react'
import Box from '@mui/material/Box'
import TableHead from '@mui/material/TableHead'
import TableSortLabel from '@mui/material/TableSortLabel'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { visuallyHidden } from '@mui/utils'
import PropTypes from 'prop-types'

const ListTableCell = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = cellId => {
    onRequestSort(cellId)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {HEAD_CELLS.map(headCell => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => createSortHandler(headCell.id)}
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
        <TableCell></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default ListTableCell

const createHeadCell = (id, label) => {
  return {
    id,
    label,
  }
}
const HEAD_CELLS = [
  createHeadCell('name', '이름'),
  createHeadCell('account_count', '보유 계좌수'),
  createHeadCell('email', 'e-mail'),
  createHeadCell('birth_date', '생년월일'),
  createHeadCell('phone_number', '전화번호'),
  createHeadCell('gender_origin', '성별'),
  createHeadCell('last_login', '최근 로그인'),
  createHeadCell('marketing_push', '혜택 수신 동의'),
  createHeadCell('is_active', '활성화'),
  createHeadCell('created_at', '가입일'),
]

ListTableCell.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}
