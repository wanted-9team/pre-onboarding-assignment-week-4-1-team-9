import React from 'react'
import DaumPostcode from 'react-daum-postcode'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

const DaumPostAddress = ({ setAddress, setPostDaumVisible, handlePostDaumVisible }) => {
  const handleComplete = data => {
    let fullAddress = data.address
    let extraAddress = ''

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : ''
    }
    setAddress(data.address, data.bname, data.buildingName, fullAddress, data.zonecode)
    setPostDaumVisible(true)
  }

  return (
    <DialogContent>
      <Box>
        <DaumPostcode autoClose onComplete={handleComplete} />
        <DialogActions>
          <Button onClick={handlePostDaumVisible}>취소</Button>
        </DialogActions>
      </Box>
    </DialogContent>
  )
}

export default DaumPostAddress
