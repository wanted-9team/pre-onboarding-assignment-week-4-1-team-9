import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'pages/login/Login'
import Main from 'pages/main/Main'
import AccountList from 'pages/accounts/AccountList'
import UserList from 'pages/userList/UserList'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />}>
          <Route path="/main/" element={<AccountList />} />
          <Route path="/main/userDetail" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
