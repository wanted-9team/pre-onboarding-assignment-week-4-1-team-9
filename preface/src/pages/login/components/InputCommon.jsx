import React from 'react'
import { styled, TextField } from '@mui/material'

const InputCommon = ({ type, label, value, setState }) => {
  const inputHandler = ({ target }) => {
    setState(prev => ({ ...prev, [label.toLowerCase()]: target.value }))
  }

  return (
    <InputWrapper>
      <TextField
        sx={{ width: '100%' }}
        id={label}
        label={label}
        type={type}
        onChange={inputHandler}
        value={value[label.toLowerCase()]}
        variant="standard"
      />
    </InputWrapper>
  )
}

export default InputCommon

const InputWrapper = styled('div')({
  display: 'flex',
  alignItems: 'flex-end',
  width: '100%',
})
