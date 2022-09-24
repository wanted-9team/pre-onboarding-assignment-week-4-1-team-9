import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import { useNavigate } from 'react-router-dom'
import comparator from 'utils/comparator'
import toBrokerName from 'utils/transBroker'
import getEarningsRate from 'utils/getEarningsRate'
import { toStatusString } from 'utils/transAccountStatus'
import getFormattedPrice from 'utils/getFormattedPrice'
import { toLocaleDateFunc } from 'utils/transDate'

function AccountTableBody({ rows, order, orderBy, page, dense, rowsPerPage, onClick }) {
  const navigate = useNavigate()
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const goAccountDetail = id => {
    navigate(`/main/accountlist/${id}`)
  }
  return (
    <TableBody>
      {rows
        .slice()
        .sort(comparator.getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          return (
            <TableRow
              hover
              onClick={event => onClick(event, row.name)}
              role="checkbox"
              tabIndex={-1}
              key={index}
              align="center"
            >
              <TableCell component="th" scope="row" padding="none" align="right">
                {row.user_name}
              </TableCell>
              <TableCell align="right">{toBrokerName(row.broker_id)}</TableCell>
              <TableCell align="right" onClick={() => goAccountDetail(row.id)}>
                {row.number}
              </TableCell>
              <TableCell align="right">{toStatusString(row.status)}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{getFormattedPrice(row.assets)}</TableCell>
              <TableCell align="right">{getFormattedPrice(row.payments)}</TableCell>
              <TableCell align="right">{getEarningsRate(row.assets, row.payments)}%</TableCell>
              <TableCell align="center">{row.is_active ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{toLocaleDateFunc(row.created_at)}</TableCell>
            </TableRow>
          )
        })}
      {emptyRows > 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}
        >
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}

export default AccountTableBody
