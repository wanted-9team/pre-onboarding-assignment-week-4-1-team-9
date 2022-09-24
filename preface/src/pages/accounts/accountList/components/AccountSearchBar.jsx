import React, { useRef, useCallback, useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'


function AccountSearchBar({
  accountsOption,
  setAccountsOption,
  concatName,
  fetchAccountsData,
  setTotalAccountLength,
}) {
  const inputRef = useRef('')
  const handleSearchSubmit = useCallback(
    e => {
      e.preventDefault()
      setAccountsOption({ ...accountsOption, query: inputRef.current.value })
      fetchAccountsData()
    },
    [accountsOption, setAccountsOption, fetchAccountsData],

  )
  return (
    <form onSubmit={handleSearchClick}>

      <Stack direction="row" spacing={1}>
        <input
          placeholder="Enter"
          size="small"
          type="text"
          ref={inputRef}
          onChange={({ target }) => setQuery(target.value)}
        />
        <Button type="submit" variant="contained" disableElevation>
          검색
        </Button>
      </Stack>
    </form>
  )
}

export default AccountSearchBar
