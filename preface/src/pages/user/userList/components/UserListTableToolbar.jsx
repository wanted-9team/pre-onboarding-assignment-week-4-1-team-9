import React from 'react'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { alpha } from '@mui/material/styles'
import styled from '@emotion/styled'

import FilterIcon from './FilterIcon'

function UserListTableToolbar({ selected, setSearchInputData, handleSearch }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.uuid && {
          bgcolor: theme =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selected.uuid ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {selected.name}
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 50%' }} variant="h6" id="tableTitle" component="div">
          유저 목록
        </Typography>
      )}

      {selected.uuid ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Stack direction="row" spacing={2}>
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
          <FilterIcon />
        </Stack>
      )}
    </Toolbar>
  )
}

export default UserListTableToolbar

const Form = styled.form``
