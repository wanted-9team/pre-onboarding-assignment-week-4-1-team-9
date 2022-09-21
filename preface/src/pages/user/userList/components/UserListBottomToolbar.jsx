import React from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import styled from '@emotion/styled'
import Toolbar from '@mui/material/Toolbar'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

const UserListBottomToolbar = ({
  handleSearch,
  setSearchInputData,
  page,
  handleChangePage,
  limit,
  setLimit,
  totalUserLength,
}) => {
  const handleChangeLimit = ({ target }) => {
    setLimit(target.value)
  }

  return (
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Form onSubmit={handleSearch}>
        <Stack direction="row" spacing={1}>
          <TextField
            placeholder="Enter"
            size="small"
            type="text"
            onChange={({ target }) => setSearchInputData(target.value)}
          />
          <Button variant="contained" size="small" disableElevation>
            검색
          </Button>
        </Stack>
      </Form>
      <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Box sx={{ maxWidth: 120, minWidth: 100 }}>
          <FormControl fullWidth>
            <InputLabel id="limit-select-label" size="small">
              number
            </InputLabel>
            <Select
              size="small"
              labelId="limit-select-label"
              id="limit-select"
              value={limit}
              label="number"
              onChange={handleChangeLimit}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Pagination
          count={Math.ceil(totalUserLength / limit)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Toolbar>
  )
}

export default UserListBottomToolbar

const Form = styled.form``
