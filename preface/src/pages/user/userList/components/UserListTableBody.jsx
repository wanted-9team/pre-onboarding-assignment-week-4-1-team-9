import React from 'react'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Checkbox from '@mui/material/Checkbox'
import { toLocaleDateFunc, transLoginTimeFunc } from 'utils/transDate'
import { maskingPhoneNumber } from 'utils/maskingNumber'
import { maskingName } from 'utils/maskingName'
import { useNavigate } from 'react-router-dom'
import { INITIAL_USER_DATA } from '../UserList'
const UserListTableBody = ({ userData, selected, setSelected }) => {
  const navigate = useNavigate()

  const goUserDetails = user => {
    navigate(`${user.id}`, { state: user })
  }

  const handleSelectUser = user => {
    if (selected.uuid === user.uuid) {
      setSelected(INITIAL_USER_DATA)
      return
    }
    setSelected(user)
  }

  const isSelected = (selected, userUuid) => selected === userUuid

  return (
    <TableBody>
      {userData.map((user, index) => {
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
              <TableCell padding="checkbox" role={'checkbox'}>
                <Checkbox
                  checked={isItemSelected}
                  onChange={() => handleSelectUser(user)}
                  name="checkbox-buttons"
                />
              </TableCell>
              <TableCell
                id={labelId}
                scope="row"
                align="center"
                onClick={() => goUserDetails(user)}
                sx={{ cursor: 'pointer' }}
              >
                {maskingName(user.name)}
              </TableCell>
              <TableCell align="center">{user.accountList.length}</TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">{maskingPhoneNumber(user.phone_number)}</TableCell>
              <TableCell align="center">{toLocaleDateFunc(user.birth_date)}</TableCell>
              <TableCell align="center">{user.gender_origin}</TableCell>
              <TableCell align="center">{user.is_active ? 'Yes' : 'No'}</TableCell>
              <TableCell align="center">{user.allow_marketing_push ? 'Yes' : 'No'}</TableCell>
              <TableCell align="center">{toLocaleDateFunc(user.created_at)}</TableCell>
              <TableCell align="center">{transLoginTimeFunc(user.last_login)}</TableCell>
            </TableRow>
          )
        )
      })}
    </TableBody>
  )
}

export default UserListTableBody
