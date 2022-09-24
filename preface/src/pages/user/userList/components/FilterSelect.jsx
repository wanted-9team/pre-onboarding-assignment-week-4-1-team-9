import React from 'react'

import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import { useDispatch, useSelector } from 'react-redux'
import { filterUserAction } from 'redux/slice/FilterUserSlice'
import { FILTER_TAG } from './UserListTableBody'
const FilterSelect = () => {
  const filterTag = useSelector(state => state.filterUser.filterValue)
  const dispatch = useDispatch()
  const handleFilterUser = ({ target }) => {
    dispatch(filterUserAction(target.value))
  }

  return (
    <Box sx={{ width: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="user-select-label" size="small">
          filter
        </InputLabel>
        <Select
          size="small"
          labelId="user-select-label"
          id="user-select"
          value={filterTag}
          label="filter"
          onChange={handleFilterUser}
        >
          <MenuItem value={FILTER_TAG.ALL}>전체 보기</MenuItem>
          <MenuItem value={FILTER_TAG.IS_ACTIVE}>활성화 여부</MenuItem>
          <MenuItem value={FILTER_TAG.IS_STAFF}>임직원 계좌 여부</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default FilterSelect
