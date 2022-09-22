import React, { useState, useEffect } from 'react'

import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

const FilterSelect = () => {
  const [filterUser, setFilterUser] = useState('all')

  const handleFilterUser = ({ target }) => {
    setFilterUser(target.value)
  }
  useEffect(() => {
    console.log(filterUser)
  }, [filterUser])
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
          value={filterUser}
          label="filter"
          onChange={handleFilterUser}
        >
          <MenuItem value={'all'}>전체 보기</MenuItem>
          <MenuItem value={'is_active'}>활성화 여부</MenuItem>
          <MenuItem value={'is_staff'}>임직원 계좌 여부</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default FilterSelect
