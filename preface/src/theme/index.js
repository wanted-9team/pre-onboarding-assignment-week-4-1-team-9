import { createTheme } from '@mui/material/styles'
import blue from '@mui/material/colors/blue'
import red from '@mui/material/colors/red'
const theme = createTheme({
  palette: {
    primary: { main: blue[500] },
    error: { main: red[500] },
  },
})
export default theme
