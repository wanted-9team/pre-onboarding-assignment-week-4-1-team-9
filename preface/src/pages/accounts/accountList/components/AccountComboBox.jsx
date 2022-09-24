import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function ComboBox({ onSelect, options, title }) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={params => <TextField {...params} label={title} />}
      onChange={(event, value, reason) => onSelect(value)}
    />
  )
}
