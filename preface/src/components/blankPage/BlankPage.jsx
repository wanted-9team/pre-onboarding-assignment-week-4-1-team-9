import React from 'react'
import { Navigate } from 'react-router-dom'

const BlankPage = () => {
  return <Navigate to={'/main/accountlist'} replace />
}

export default BlankPage
