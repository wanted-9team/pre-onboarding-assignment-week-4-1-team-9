import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import DialogTitle from '@mui/material/DialogTitle'

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

const UserFormDialog = ({ setOpenDialog, openDialog }) => {
  const [year, setYear] = useState(YEAR)
  const [month, setMonth] = useState(MONTH)
  const [day, setDay] = useState(DAY)

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <div>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>사용자 등록</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="이름"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="이메일"
            type="email"
            fullWidth
            variant="standard"
            placeholder="example@mail.com"
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="비밀번호"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="phone_number"
            label="전화번호 "
            type="number"
            fullWidth
            variant="standard"
            placeholder="010-1234-5678"
          />
          <FormControl>
            <Select labelId="year-select-label" id="year-select" value={''}>
              {YEAR.map(year => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select labelId="month-select-label" id="month-select" value={''}>
              {MONTH.map(month => (
                <MenuItem key={month} value={month}>
                  {month}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select labelId="day-select-label" id="day-select" value={''}>
              {DAY.map(day => (
                <MenuItem key={day} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={handleClose}>등록</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UserFormDialog
