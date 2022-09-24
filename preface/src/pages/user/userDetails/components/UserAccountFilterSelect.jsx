import React from 'react'
import { Select, Box, InputLabel, MenuItem, FormControl } from '@mui/material'

const UserAccountFilterSelect = ({ setFilterSelectOne, filterSelectOne }) => {
  const handleFilterAccount = ({ target }) => {
    setFilterSelectOne(target.value)
  }

  return (
    <Box sx={{ width: 120, display: 'inline-block', marginLeft: '20px' }}>
      <FormControl fullWidth>
        <InputLabel id="account-select-label" size="small">
          filter
        </InputLabel>
        <Select
          size="small"
          labelId="account-select-label"
          id="account-select"
          value={filterSelectOne}
          label="filter"
          onChange={handleFilterAccount}
        >
          <MenuItem value={'all'}>전체 보기</MenuItem>
          <MenuItem value={'is_active'}>계좌 활성화</MenuItem>
          <MenuItem value={'is_not_active'}>계좌 비활성화</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default UserAccountFilterSelect
