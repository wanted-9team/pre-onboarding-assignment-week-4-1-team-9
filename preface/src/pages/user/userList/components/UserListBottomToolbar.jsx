import React, { useCallback, useEffect } from 'react'
import {
  TextField,
  Stack,
  Button,
  Toolbar,
  Pagination,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material'
import styled from '@emotion/styled'
import { useDispatch, useSelector } from 'react-redux'
import { setPaginationAction, setLimitAction } from 'redux/slice/PageSlice'
import { GET_SEARCH_USER, GET_USER_LIST_PAGE } from 'redux/saga/actionType'

const UserListBottomToolbar = ({
  searchInputText,
  setSearchInputText,
  page,
  handleChangePage,
  limit,
}) => {
  const totalUserLength = useSelector(state => state.userList.totalResults)
  const MAX_PAGE = Math.ceil(totalUserLength / limit)
  const dispatch = useDispatch()

  const handleChangeLimit = useCallback(
    ({ target }) => {
      dispatch(setLimitAction(target.value))
    },
    [dispatch],
  )

  const handleSearchSubmit = useCallback(
    async e => {
      e.preventDefault()
      if (!searchInputText) {
        dispatch({ type: GET_USER_LIST_PAGE, payload: { page, limit } })
        return
      }
      dispatch({ type: GET_SEARCH_USER, payload: { searchInputText } })
    },
    [searchInputText, dispatch, limit, page],
  )

  useEffect(() => {
    dispatch(setPaginationAction(MAX_PAGE && page > MAX_PAGE ? MAX_PAGE : page))
  }, [MAX_PAGE])

  return (
    <Toolbar
      sx={{
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
      }}
    >
      <Form onSubmit={handleSearchSubmit}>
        <Stack direction="row" spacing={1}>
          <TextField
            placeholder="Enter"
            size="small"
            type="text"
            value={searchInputText}
            onChange={({ target }) => setSearchInputText(target.value)}
          />
          <Button variant="contained" disableElevation>
            검색
          </Button>
        </Stack>
      </Form>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'column', md: 'column', lg: 'row' },
          alignItems: 'center',
        }}
      >
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

        <Pagination count={MAX_PAGE} page={page} onChange={handleChangePage} size="small" />
      </Box>
    </Toolbar>
  )
}

export default UserListBottomToolbar

const Form = styled.form``
