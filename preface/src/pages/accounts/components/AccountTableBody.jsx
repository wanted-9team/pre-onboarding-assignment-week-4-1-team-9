import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import Comparator from 'utils/Comparator'

function AccountTableBody({
  rows,
  order,
  orderBy,
  page,
  isSelected,
  dense,
  rowsPerPage,
  handleClick,
}) {
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
              onClick={event => handleClick(event, row.name)}
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

              <TableCell component="th" id={labelId} scope="row" padding="none" align="right">
                {row.user_name}
              </TableCell>
              <TableCell align="right">{row.broker_name}</TableCell>
              <TableCell align="right">{row.account_number}</TableCell>
              <TableCell align="right">{row.account_status}</TableCell>
              <TableCell align="right">{row.account_name}</TableCell>
              <TableCell align="right">{row.assets}</TableCell>
              <TableCell align="right">{row.payments}</TableCell>
              <TableCell align="right">{row.ratio}</TableCell>
              <TableCell align="right">{row.is_active}</TableCell>
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
