import React from 'react'
import DialogContentText from '@mui/material/DialogContentText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Stack from '@mui/material/Stack'

const YEAR = (() => {
  const years = []
  const thisYear = new Date().getFullYear()
  for (let i = thisYear; i >= 1950; i--) {
    years.push(i.toString())
  }
  return years
})()
const MONTH = Array.from(Array(12), (_, i) => i + 1)
const DAY = Array.from(Array(31), (_, i) => i + 1)

const UserFormSelector = ({ birthAndGender, handleBirthAndGender }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2} pt={2}>
      <DialogContentText>생년월일</DialogContentText>
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel id="year-select-label">년도</InputLabel>
        <Select
          labelId="year-select-label"
          id="year-select"
          value={birthAndGender.year}
          onChange={handleBirthAndGender}
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
          value={birthAndGender.month}
          onChange={handleBirthAndGender}
        >
          {MONTH.map(month => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 80 }}>
        <InputLabel id="day-select-label">일</InputLabel>
        <Select
          labelId="day-select-label"
          id="day-select"
          name="day"
          value={birthAndGender.day}
          onChange={handleBirthAndGender}
        >
          {DAY.map(day => (
            <MenuItem key={day} value={day}>
              {day}
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
          value={birthAndGender.gender_origin}
          onChange={handleBirthAndGender}
        >
          <MenuItem value={1}> 남</MenuItem>
          <MenuItem value={2}> 여</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )
}

export default UserFormSelector
