import React, { useRef, useCallback } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { searchAccounts, getTotalUserList } from 'api'

function AccountSearchBar({
  accountsOption,
  setAccountsOption,
  concatName,
  fetchAccountsData,
  setTotalAccountsLength,
}) {
  const inputRef = useRef('')
  const handleSearchClick = useCallback(async () => {
    setAccountsOption({ ...accountsOption, query: inputRef.current.value })
    if (!accountsOption.query) {
      fetchAccountsData()
      return
    }
    try {
      const searchAccountsRes = await searchAccounts(accountsOption.query)
      const totalUserResponse = await getTotalUserList()
      setTotalAccountsLength(searchAccountsRes.data.length)
      concatName(searchAccountsRes.data, totalUserResponse.data)
    } catch (err) {
      throw new Error(err)
    }
  }, [concatName, fetchAccountsData, accountsOption, setTotalAccountsLength])
  return (
    <form onClick={handleSearchClick}>
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
