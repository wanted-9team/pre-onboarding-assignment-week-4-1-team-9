import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'pages/login/Login'
import UserList from 'pages/userList/UserList'
import AccountTable from 'pages/accounts/AccountList'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accountlist" element={<AccountTable />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
