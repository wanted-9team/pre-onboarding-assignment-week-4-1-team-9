import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'

import { Link } from 'react-router-dom'
import comparator from 'utils/Comparator'
import toBrokerName from 'utils/transBroker'
import getEarningsRate from 'utils/getEarningsRate'
import toStatusString from 'utils/transAccountStatus'
import getFormattedPrice from 'utils/getFormattedPrice'

function AccountTableBody({ rows, order, orderBy, page, isSelected, dense, rowsPerPage, onClick }) {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <TableBody>
      {rows
        .slice()
        .sort(comparator.getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.name)
          const labelId = `enhanced-table-checkbox-${index}`

          return (
            <TableRow
              hover
              onClick={event => onClick(event, row.name)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={index}
              selected={isItemSelected}
              align="center"
            >
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={isItemSelected}
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </TableCell>

              <TableCell component="th" scope="row" padding="none" align="right">
                {row.user_id}
              </TableCell>
              <TableCell align="right">{toBrokerName(row.broker_id)}</TableCell>
              <TableCell align="right">
                <Link to={`/main/accountlist/${row.id}`}>{row.number}</Link>
              </TableCell>
              <TableCell align="right">{toStatusString(row.status)}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{getFormattedPrice(row.assets)}</TableCell>
              <TableCell align="right">{getFormattedPrice(row.payments)}</TableCell>
              <TableCell>{getEarningsRate(row.assets, row.payments)}%</TableCell>
              <TableCell>{row.is_active ? '활성화' : '비활성화'}</TableCell>
              <TableCell align="right">{row.created_at.split('T')[0]}</TableCell>
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
