import React, { useRef, useCallback, useState } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { searchAccounts, getAccountListByConditions, getTotalUserList } from 'api'

function AccountSearchBar({ concatName, fetchAccountsData, setTotalAccountLength }) {
  const inputRef = useRef(null)
  const [query, setQuery] = useState('')
  const handleSearchClick = useCallback(
    async e => {
      e.preventDefault()
      if (!query) {
        fetchAccountsData()
        return
      }
      try {
        const searchAccountsRes = await searchAccounts(query)
        const totalUserResponse = await getTotalUserList()
        setTotalAccountLength(searchAccountsRes.data.length)
        concatName(searchAccountsRes.data, totalUserResponse.data)
      } catch (err) {
        throw new Error(err)
      }
    },

    [concatName, fetchAccountsData, setTotalAccountLength, query],
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
