import React, { useState, useEffect, useCallback } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Stack from '@mui/material/Stack'
import DaumPostAddress from '../daumPost/DaumPostAddress'
import UserFormSelector from './UserFormSelector'
import { EMAIL_REGEX, PHONE_REGEX } from 'utils/userFormRegex'
import { v4 as uuidv4 } from 'uuid'

const INITIAL_USER_DATA = {
  name: '',
  email: '',
  password: '',
  phone_number: '',
  detail_address: '',
}
const INITIAL_BIRTH_GENDER_DATA = {
  year: '',
  month: '',
  day: '',
  gender_origin: '',
}
const UserFormDialog = ({ setOpenDialog, openDialog }) => {
  const [birthAndGender, setBirthAndGender] = useState(INITIAL_BIRTH_GENDER_DATA)
  const [postDaumVisible, setPostDaumVisible] = useState(true)
  const [address, setAddress] = useState('')
  const [userData, setUserData] = useState(INITIAL_USER_DATA)
  const handleClose = () => {
    setOpenDialog(false)
  }

  useEffect(() => {
    console.log(birthAndGender)
    console.log(userData)
  }, [birthAndGender, userData])
  const handlePostDaumVisible = () => {
    setPostDaumVisible(!postDaumVisible)
  }
  const handleUserData = useCallback(({ target }) => {
    const { id, value } = target
    setUserData(prev => ({ ...prev, [id]: value }))
  }, [])

  const handleBirthAndGender = useCallback(({ target }) => {
    const { name, value } = target
    setBirthAndGender(prev => ({ ...prev, [name]: value }))
  }, [])
  const handlePostUser = () => {
    const postBody = { ...birthAndGender }
  }
  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>사용자 등록</DialogTitle>
      {postDaumVisible ? (
        <>
          <DialogContent>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              label="이름"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleUserData}
              error={userData.name.length === 0}
            />
            <TextField
              required
              margin="dense"
              id="email"
              label="이메일"
              type="email"
              fullWidth
              variant="standard"
              placeholder="example@mail.com"
              onChange={handleUserData}
              error={!EMAIL_REGEX.test(userData.email)}
            />
            <TextField
              required
              margin="dense"
              id="password"
              label="비밀번호"
              type="password"
              fullWidth
              variant="standard"
              onChange={handleUserData}
              error={userData.password.length <= 6}
            />
            <TextField
              required
              margin="dense"
              id="phone_number"
              label="전화번호"
              type="text"
              fullWidth
              variant="standard"
              placeholder="010-1234-5678"
              onChange={handleUserData}
              error={!PHONE_REGEX.test(userData.phone_number)}
            />
            <Stack direction="row" alignItems="center" spacing={2}>
              <TextField
                aria-readonly
                value={address}
                required
                margin="dense"
                id="address"
                label="주소"
                type="text"
                fullWidth
                variant="standard"
              />
              <Button
                onClick={handlePostDaumVisible}
                sx={{ minWidth: 80 }}
                variant="contained"
                size="small"
              >
                주소검색
              </Button>
            </Stack>
            <TextField
              margin="dense"
              id="detail_address"
              label="상세주소"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleUserData}
            />
            <UserFormSelector
              birthAndGender={birthAndGender}
              handleBirthAndGender={handleBirthAndGender}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button onClick={handlePostUser}>등록</Button>
          </DialogActions>
        </>
      ) : (
        <DaumPostAddress
          setAddress={setAddress}
          setPostDaumVisible={setPostDaumVisible}
          handlePostDaumVisible={handlePostDaumVisible}
        />
      )}
    </Dialog>
  )
}

export default UserFormDialog
