import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'pages/login/Login'

import Main from 'pages/main/Main'
import AccountTableList from 'pages/accounts/AccountList'
import UserList from 'pages/user/userList/UserList'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/main" element={<Main />}>
          <Route path="/main/" element={<AccountTableList />} />
          <Route path="/main/userDetail" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
