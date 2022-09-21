import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import { toLocaleDateFunc, transLoginTimeFunc } from 'utils/transDate'
import { maskingPhoneNumber } from 'utils/maskingNumber'
import Comparator from 'utils/Comparator'
import { useNavigate } from 'react-router-dom'
const { stableSort, getComparator } = Comparator

const UserListTableBody = ({
  userData,
  order,
  orderBy,
  page,
  rowsPerPage,
  selected,
  setSelected,
}) => {
  const navigate = useNavigate()

  const goUserDetails = user => {
    navigate(`${user.id}`, { state: user })
  }

  const handleSelectUser = user => {
    setSelected(user)
  }

  const isSelected = (selected, userUuid) => selected === userUuid

  return (
    <TableBody>
      {stableSort(userData, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((user, index) => {
          const labelId = `enhanced-table-checkbox-${index}`
          const isItemSelected = isSelected(selected.uuid, user.uuid)
          return (
            user.uuid && (
              <TableRow
                hover
                tabIndex={-1}
                key={user.uuid}
                aria-checked={isItemSelected}
                selected={isItemSelected}
              >
                <TableCell padding="checkbox">
                  <Radio
                    checked={isItemSelected}
                    onChange={() => handleSelectUser(user)}
                    value="a"
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'A' }}
                  />
                </TableCell>
                <TableCell id={labelId} scope="row" padding="normal">
                  {user.name}
                </TableCell>
                <TableCell align="left">{user.accountList.length}</TableCell>
                <TableCell align="left">{user.email}</TableCell>
                <TableCell align="left">{toLocaleDateFunc(user.birth_date)}</TableCell>
                <TableCell align="left">{maskingPhoneNumber(user.phone_number)}</TableCell>
                <TableCell align="left">{user.gender_origin}</TableCell>
                <TableCell align="left">{transLoginTimeFunc(user.last_login)}</TableCell>
                <TableCell align="left">{user.allow_marketing_push ? 'Yes' : 'No'}</TableCell>
                <TableCell align="left">{user.is_active ? 'Yes' : 'No'}</TableCell>
                <TableCell align="left">{toLocaleDateFunc(user.created_at)}</TableCell>
                <TableCell align="left">
                  <Button variant="outlined" size="small" onClick={() => goUserDetails(user)}>
                    상세 보기
                  </Button>
                </TableCell>
              </TableRow>
            )
          )
        })}
    </TableBody>
  )
}

export default UserListTableBody
