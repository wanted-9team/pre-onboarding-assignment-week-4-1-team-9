import React, { forwardRef } from 'react'
import { Snackbar, MuiAlert } from '@mui/material'
import { useSelector, shallowEqual } from 'react-redux'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const MessageSnackBar = () => {
  const { success, failure, message } = useSelector(state => state.snackbar, shallowEqual)

  return (
    <>
      <Snackbar open={failure} autoHideDuration={4000}>
        <Alert severity="error" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Snackbar open={success} autoHideDuration={4000}>
        <Alert severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default MessageSnackBar
