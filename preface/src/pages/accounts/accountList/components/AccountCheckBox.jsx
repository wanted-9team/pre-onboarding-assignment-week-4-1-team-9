import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import brokers from 'data/brokers.json'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export default function AccountCheckbox({ onSelectBrocker }) {
  const makeBrokerData = () => {
    let newArray = []
    for (const broker_number in brokers) {
      newArray.push({ name: brokers[broker_number], number: broker_number })
    }
    return newArray
  }
  const brokerData = makeBrokerData()

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={brokerData}
      disableCloseOnSelect
      filterSelectedOptions
      getOptionLabel={option => option.name}
      isOptionEqualToValue={(option, value) => option.name === value.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      style={{ width: 350 }}
      onChange={(event, value, reason) => onSelectBrocker(value)}
      renderInput={params => <TextField {...params} label="증권사명" />}
    />
  )
}
