import React from 'react'
import { useParams } from 'react-router-dom'

function AccountDetails() {
  const params = useParams()
  return <div>{params.id}</div>
}

export default AccountDetails
