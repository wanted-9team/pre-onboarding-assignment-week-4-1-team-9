import React, { useEffect, useState } from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import comparator from 'utils/comparator'
import { toLocaleDateFunc } from '../../../../utils/transDate'
import getEarningsRate from 'utils/getEarningsRate'
import toBrokerName from 'utils/transBroker'
import toStatusString from 'utils/transAccountStatus'
import { Link } from 'react-router-dom'
import getFormattedPrice from 'utils/getFormattedPrice'

function UserAccountTableBody({
  rows,
  order,
  orderBy,
  page,
  isSelected,
  dense,
  rowsPerPage,
  onClick,
  filterData,
}) {
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const [filterList, setFilterList] = useState([])

  useEffect(() => {
    if (filterData === 'all') {
      setFilterList(rows)
    } else if (filterData === 'is_active') {
      setFilterList(rows.filter(data => data.is_active))
    } else if (filterData === 'is_not_active') {
      setFilterList(rows.filter(data => !data.is_active))
    }
  }, [filterData, rows])

  return (
    <TableBody>
      {filterData !== undefined &&
        filterList
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
                <TableCell>{getFormattedPrice(row.assets)}</TableCell>
                <TableCell>{getFormattedPrice(row.payments)}</TableCell>
                <TableCell>{getEarningsRate(row.assets, row.payments)}%</TableCell>
                <TableCell>{row.is_active === true ? 'Yes' : 'No'}</TableCell>
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
