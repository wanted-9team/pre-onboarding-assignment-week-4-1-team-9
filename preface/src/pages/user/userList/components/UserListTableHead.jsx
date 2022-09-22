import React from 'react'

import TableHead from '@mui/material/TableHead'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

const UserListTableHead = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox" align="center" />
        {HEAD_CELLS.map(headCell => (
          <TableCell key={headCell.id} align="center" padding="normal" sx={{ minWidth: '50px' }}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default UserListTableHead

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
  createHeadCell('phone_number', '전화번호'),
  createHeadCell('birth_date', '생년월일'),
  createHeadCell('gender_origin', '성별'),
  createHeadCell('is_active', '활성화'),
  createHeadCell('marketing_push', '혜택 수신 동의'),
  createHeadCell('created_at', '가입일'),
  createHeadCell('last_login', '최근 로그인'),
]
