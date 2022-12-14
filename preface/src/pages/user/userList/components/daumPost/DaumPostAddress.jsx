import React from 'react'
import DaumPostcode from 'react-daum-postcode'
import { DialogContent, DialogActions, Box, Button } from '@mui/material'

const DaumPostAddress = ({ setSelected, setPostDaumVisible, handlePostDaumVisible }) => {
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
    setSelected(prev => ({ ...prev, address: fullAddress }))
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
