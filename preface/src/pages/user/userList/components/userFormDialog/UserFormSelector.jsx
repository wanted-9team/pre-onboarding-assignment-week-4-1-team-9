import React from 'react'
import { DialogContentText, InputLabel, MenuItem, FormControl, Select, Stack } from '@mui/material'

const YEAR = (() => {
  const years = []
  const thisYear = new Date().getFullYear()
  for (let i = thisYear; i >= 1950; i--) {
    years.push(i)
  }
  return years
})()
const MONTH = Array.from(Array(12), (_, i) => i + 1)
const DATE = Array.from(Array(31), (_, i) => i + 1)

const UserPostFormSelector = ({ selected, setBirthDate, birthDate, handleUserData }) => {
  const handleBirthDate = ({ target }) => {
    const { name, value } = target
    setBirthDate(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Stack direction="row" alignItems="center" spacing={2} pt={2}>
      <DialogContentText>생년월일</DialogContentText>
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel id="year-select-label">년도</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={birthDate.year}
          onChange={handleBirthDate}
          name="year"
        >
          {YEAR.map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel id="month-select-label">월</InputLabel>
        <Select
          labelId="month-select-label"
          id="month-select"
          name="month"
          value={birthDate.month}
          onChange={handleBirthDate}
        >
          {MONTH.map(month => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel id="date-select-label">일</InputLabel>
        <Select
          labelId="date-select-label"
          id="date-select"
          name="date"
          value={birthDate.date}
          onChange={handleBirthDate}
        >
          {DATE.map(date => (
            <MenuItem key={date} value={date}>
              {date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <DialogContentText>성별</DialogContentText>
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel id="gender-select-label">성별</InputLabel>
        <Select
          labelId="gender-select-label"
          id="gender-select"
          name="gender_origin"
          value={selected.gender_origin}
          onChange={handleUserData}
        >
          <MenuItem value={1}> 1</MenuItem>
          <MenuItem value={2}> 2</MenuItem>
          <MenuItem value={3}> 3</MenuItem>
          <MenuItem value={4}> 4</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}

export default UserPostFormSelector
