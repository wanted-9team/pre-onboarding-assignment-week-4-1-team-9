import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import comparator from 'utils/comparator'
import { toLocaleDateFunc } from '../../../../utils/transDate'
import getEarningsRate from 'utils/getEarningsRate'
import toBrokerName from 'utils/transBroker'
import { toStatusString } from 'utils/transAccountStatus'
import { Link } from 'react-router-dom'

function UserAccountTableBody({
  rows,
  order,
  orderBy,
  page,
  isSelected,
  dense,
  rowsPerPage,
  onClick,
}) {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <TableBody>
      {rows
        .slice()
        .sort(comparator.getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.name)

          return (
            <TableRow
              hover
              onClick={event => onClick(event, row.name)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={index}
            >
              <TableCell>{toBrokerName(row.broker_id)}</TableCell>
              <TableCell>
                <Link to={`/main/accountlist/${row.id}`}>{row.number}</Link>
              </TableCell>
              <TableCell>{toStatusString(row.status)}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.assets}</TableCell>
              <TableCell>{row.payments}</TableCell>
              <TableCell>{getEarningsRate(row.assets, row.payments)}</TableCell>
              <TableCell>{row.is_active === true ? '활성화' : '비활성화'}</TableCell>
              <TableCell>{toLocaleDateFunc(row.created_at)}</TableCell>
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

export default UserAccountTableBody
