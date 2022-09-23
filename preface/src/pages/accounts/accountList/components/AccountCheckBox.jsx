import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import brokers from 'data/brokers.json'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />
const checkedIcon = <CheckBoxIcon fontSize="small" />

export default function AccountCheckbox() {
  const makeBrokerData = () => {
    let newArray = []
    for (const broker_number in brokers) {
      newArray.push({ name: brokers[broker_number], number: broker_number })
    }
    return newArray
  }
  const brokerData = makeBrokerData()
  console.log(brokerData)

  return (
    <Autocomplete
      multiple
      id="checkboxes-tags-demo"
      options={brokerData}
      disableCloseOnSelect
      getOptionLabel={option => option.name}
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
      style={{ width: 500 }}
      renderInput={params => <TextField {...params} label="Checkboxes" placeholder="Favorites" />}
    />
  )
}
