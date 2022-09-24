import React, { useState } from 'react'

import Select from '@mui/material/Select'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

const UserAccountFilterSelect = ({ highFunction }) => {
  const [filterUser, setFilterUser] = useState('all')

  const handleFilterUser = ({ target }) => {
    setFilterUser(target.value)
    highFunction(target.value)
  }

  return (
    <Box sx={{ width: 120, display: 'inline-block', marginLeft: '20px' }}>
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
          <MenuItem value={'is_active'}>계좌 활성화</MenuItem>
          <MenuItem value={'is_not_active'}>계좌 비활성화</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default UserAccountFilterSelect
