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

function AccountTableBody({ rows, onClick }) {
  const navigate = useNavigate()

  const goAccountDetail = id => {
    navigate(`/main/accountlist/${id}`)
  }
  const goUserDetail = id => {
    navigate(`/main/userlist/${id}`)
  }
  return (
    <TableBody>
      {rows.map((row, index) => {
        const earningsRate = getEarningsRate(row.assets, row.payments)

        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={index} align="center">
            <TableCell
              align="center"
              component="th"
              scope="row"
              padding="none"
              onClick={() => goUserDetail(row.user_id)}
              sx={{ cursor: 'pointer' }}
            >
              {row.user_name}
            </TableCell>

            <TableCell align="center">{toBrokerName(row.broker_id)}</TableCell>
            <TableCell
              sx={{ cursor: 'pointer' }}
              align="center"
              onClick={() => goAccountDetail(row.id)}
            >
              {maskingAccount(getFormattedAccountNumber(row.broker_id, row.number))}
            </TableCell>
            <TableCell align="center">{toStatusString(row.status)}</TableCell>
            <TableCell align="center">{row.name}</TableCell>
            <TableCell align="center">{getFormattedPrice(row.assets)}</TableCell>
            <TableCell align="center">{getFormattedPrice(row.payments)}</TableCell>
            <TableCell
              align="center"
              sx={{
                color: `${
                  earningsRate >= 0 ? theme.palette.primary.main : theme.palette.error.main
                }`,
              }}
            >
              {earningsRate}%
            </TableCell>
            <TableCell align="center">{row.is_active ? 'Yes' : 'No'}</TableCell>
            <TableCell align="center">{toLocaleDateFunc(row.created_at)}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default AccountTableBody
