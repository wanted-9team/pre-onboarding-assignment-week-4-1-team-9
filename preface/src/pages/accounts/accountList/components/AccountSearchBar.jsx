import React, { useRef, useCallback } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

function AccountSearchBar({ accountsOption, setAccountsOption, fetchAccountsData }) {
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
    <form onSubmit={handleSearchSubmit}>
      <Stack direction="row" spacing={1}>
        <input placeholder="Enter" size="small" type="text" ref={inputRef} />
        <Button variant="contained" disableElevation>
          검색
        </Button>
      </Stack>
    </form>
  )
}

export default AccountSearchBar
