import React, { useEffect, useState } from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { toLocaleDateFunc } from '../../../../utils/transDate'
import getEarningsRate from 'utils/getEarningsRate'
import toBrokerName from 'utils/transBroker'
import toStatusString from 'utils/transAccountStatus'
import { Link } from 'react-router-dom'
import getFormattedPrice from 'utils/getFormattedPrice'
import theme from 'theme'
import { earningsRateColor } from 'utils/earningsRateColor'
function UserAccountTableBody({ rows, page, rowsPerPage, filterData }) {
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
        filterList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
          return (
            <TableRow hover role="checkbox" tabIndex={-1} key={index}>
              <TableCell>{toBrokerName(row.broker_id)}</TableCell>
              <TableCell>
                <Link to={`/main/accountlist/${row.id}`}>{row.number}</Link>
              </TableCell>
              <TableCell>{toStatusString(row.status)}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{getFormattedPrice(row.assets)}</TableCell>
              <TableCell>{getFormattedPrice(row.payments)}</TableCell>
              <TableCell
                sx={{ color: earningsRateColor(getEarningsRate(row.assets, row.payments)) }}
              >
                {getEarningsRate(row.assets, row.payments)}%
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

export default UserAccountTableBody
