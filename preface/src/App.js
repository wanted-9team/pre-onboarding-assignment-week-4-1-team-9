import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'pages/login/Login'
import AccountList from 'pages/accounts/AccountList'
import UserList from 'pages/userList/UserList'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/accountlist" element={<AccountList />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
