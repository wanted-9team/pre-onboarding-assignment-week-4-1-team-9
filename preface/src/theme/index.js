import { createTheme } from '@mui/material/styles'
import blue from '@mui/material/colors/blue'
import red from '@mui/material/colors/red'
import { green } from '@mui/material/colors'
const theme = createTheme({
  palette: {
    primary: { main: blue[500] },
    error: { main: red[500] },
    success: { main: green[800] },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: { color: green[800], textDecoration: 'none' },
      },
    },
  },
})
export default theme
