import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'
import toBrokerName from 'utils/transBroker'
import getEarningsRate from 'utils/getEarningsRate'
import { toStatusString } from 'utils/transAccountStatus'
import getFormattedPrice from 'utils/getFormattedPrice'
import { toLocaleDateFunc } from 'utils/transDate'
import { getFormattedAccountNumber } from 'utils/getFormattedAccountNumber'
import { maskingAccount } from 'utils/maskingAccountNumber'
import theme from 'theme'

function AccountTableBody({ rows, page, rowsPerPage, onClick }) {
  const navigate = useNavigate()

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const goAccountDetail = id => {
    navigate(`/main/accountlist/${id}`)
  }
  return (
    <TableBody>
      {rows
        .slice()
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const earningsRate = getEarningsRate(row.assets, row.payments)

          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index} align="center">
              <TableCell component="th" scope="row" margin="2">
                {row.user_name}
              </TableCell>
              <TableCell>{toBrokerName(row.broker_id)}</TableCell>
              <TableCell onClick={() => goAccountDetail(row.id)}>
                {maskingAccount(getFormattedAccountNumber(row.broker_id, row.number))}
              </TableCell>
              <TableCell
                sx={{
                  color:
                    row.status === 9999 ? theme.palette.error.main : theme.palette.primary.main,
                }}
              >
                {toStatusString(row.status)}
              </TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{getFormattedPrice(row.assets)}</TableCell>
              <TableCell>{getFormattedPrice(row.payments)}</TableCell>
              <TableCell
                sx={{
                  color: earningsRate >= 0 ? theme.palette.primary.main : theme.palette.error.main,
                }}
              >
                {earningsRate}%
              </TableCell>
              <TableCell
                sx={{
                  color: row.is_active ? theme.palette.primary.main : theme.palette.error.main,
                }}
              >
                {row.is_active ? 'Yes' : 'No'}
              </TableCell>
              <TableCell>{toLocaleDateFunc(row.created_at)}</TableCell>
            </TableRow>
          )
        })}
    </TableBody>
  )
}

export default AccountTableBody