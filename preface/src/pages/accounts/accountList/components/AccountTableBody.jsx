import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import Comparator from 'utils/Comparator'

function AccountTableBody({ rows, order, orderBy, page, isSelected, dense, rowsPerPage, onClick }) {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  return (
    <TableBody>
      {rows
        .slice()
        .sort(Comparator.getComparator(order, orderBy))
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
              <TableCell align="right">{row.broker_id}</TableCell>
              <TableCell align="right">{row.number}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.assets}</TableCell>
              <TableCell align="right">{row.payments}</TableCell>
              <TableCell>45%</TableCell>
              <TableCell>활성화</TableCell>
              <TableCell align="right">{row.created_at}</TableCell>
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
