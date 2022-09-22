import React, { useState } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FilterListIcon from '@mui/icons-material/FilterList'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'

const FilterIcon = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const filterOpen = Boolean(anchorEl)

  const handleFilterOpen = ({ currentTarget }) => {
    setAnchorEl(currentTarget)
  }

  const handleFilterClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Tooltip title="Filter list">
        <IconButton onClick={handleFilterOpen} id="filterButton">
          <FilterListIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={filterOpen}
        onClose={handleFilterClose}
        MenuListProps={{
          'aria-labelledby': 'filterButton',
        }}
      >
        <MenuItem>임직원 계좌 보기</MenuItem>
        <MenuItem>활성화만 보기</MenuItem>
      </Menu>
    </>
  )
}

export default FilterIcon
