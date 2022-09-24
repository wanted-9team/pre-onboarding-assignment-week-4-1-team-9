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

function AccountTableBody({ rows, onClick }) {
  const navigate = useNavigate()

  const goAccountDetail = id => {
    navigate(`/main/accountlist/${id}`)
  }
  return (
    <TableBody>
      {rows.map((row, index) => {
        const labelId = `enhanced-table-checkbox-${index}`
        const earningsRate = getEarningsRate(row.assets, row.payments)

        return (
          <TableRow
            hover
            onClick={event => onClick(event, row.name)}
            role="checkbox"
            tabIndex={-1}
            key={index}
            align="center"
          >
            <TableCell component="th" scope="row" padding="none">
              {row.user_name}
            </TableCell>
            <TableCell>{toBrokerName(row.broker_id)}</TableCell>
            <TableCell onClick={() => goAccountDetail(row.id)}>
              {maskingAccount(getFormattedAccountNumber(row.broker_id, row.number))}
            </TableCell>
            <TableCell>{toStatusString(row.status)}</TableCell>
            <TableCell>{row.name}</TableCell>
            <TableCell>{getFormattedPrice(row.assets)}</TableCell>
            <TableCell>{getFormattedPrice(row.payments)}</TableCell>
            <TableCell sx={{ color: `${earningsRate >= 0 ? 'blue' : 'red'}` }}>
              {earningsRate}%
            </TableCell>
            <TableCell>{row.is_active ? 'Yes' : 'No'}</TableCell>
            <TableCell>{toLocaleDateFunc(row.created_at)}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default AccountTableBody
