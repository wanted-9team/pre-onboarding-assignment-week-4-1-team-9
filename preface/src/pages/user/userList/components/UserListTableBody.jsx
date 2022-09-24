import React, { useState, useEffect } from 'react'
import { TableBody, TableRow, TableCell, Checkbox } from '@mui/material'
import { toLocaleDateFunc, transLoginTimeFunc } from 'utils/transDate'
import { maskingPhoneNumber } from 'utils/maskingNumber'
import { maskingName } from 'utils/maskingName'
import { useNavigate } from 'react-router-dom'
import { INITIAL_USER_DATA } from '../UserList'
import { useSelector } from 'react-redux'
import theme from 'theme'

export const FILTER_TAG = {
  ALL: 'all',
  IS_ACTIVE: 'is_active',
  IS_STAFF: 'is_staff',
}
const UserListTableBody = ({ userData, selected, setSelected }) => {
  const navigate = useNavigate()
  const filterTag = useSelector(state => state.filterUser.filterValue)
  const [filterData, setFilterData] = useState([])

  useEffect(() => {
    if (filterTag === FILTER_TAG.ALL) {
      setFilterData(userData)
    } else if (filterTag === FILTER_TAG.IS_ACTIVE) {
      setFilterData(userData.filter(item => item.is_active))
    } else if (filterTag === FILTER_TAG.IS_STAFF) {
      setFilterData(userData.filter(item => item.is_staff))
    }
  }, [filterTag, userData])

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
      {filterData.map((user, index) => {
        const labelId = `enhanced-table-checkbox-${index}`
        const isItemSelected = isSelected(selected.uuid, user.uuid)
        return (
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
            <TableCell
              align="center"
              sx={{ color: user.is_active ? theme.palette.primary.main : theme.palette.error.main }}
            >
              {user.is_active ? 'Yes' : 'No'}
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: user.allow_marketing_push
                  ? theme.palette.primary.main
                  : theme.palette.error.main,
              }}
            >
              {user.allow_marketing_push ? 'Yes' : 'No'}
            </TableCell>
            <TableCell align="center">{toLocaleDateFunc(user.created_at)}</TableCell>
            <TableCell align="center">{transLoginTimeFunc(user.last_login)}</TableCell>
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default UserListTableBody
