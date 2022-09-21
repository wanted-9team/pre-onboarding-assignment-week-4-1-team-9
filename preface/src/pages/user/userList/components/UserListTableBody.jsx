import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
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

  const isSelected = name => selected.indexOf(name) !== -1

  const handleSelectUser = name => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }
    setSelected(newSelected)
  }
  return (
    <TableBody>
      {stableSort(userData, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((user, index) => {
          const labelId = `enhanced-table-checkbox-${index}`
          const isItemSelected = isSelected(user.name)
          return (
            user.uuid && (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={user.uuid}
                aria-checked={isItemSelected}
                selected={isItemSelected}
              >
                <TableCell
                  id="selectbox"
                  padding="checkbox"
                  onClick={() => handleSelectUser(user.name)}
                >
                  <Checkbox
                    color="primary"
                    checked={isItemSelected}
                    inputProps={{
                      'aria-labelledby': labelId,
                    }}
                  />
                </TableCell>
                <TableCell id={labelId} scope="row" padding="normal">
                  {user.name}
                </TableCell>
                <TableCell align="left">보유중인 계좌수</TableCell>
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
