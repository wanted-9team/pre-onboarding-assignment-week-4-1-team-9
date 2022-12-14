import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from 'pages/login/Login'
import Main from 'pages/main/Main'
import AccountList from 'pages/accounts/accountList/AccountList'
import AccountFilter from 'pages/accounts/accountFilter/AccountFilter'
import AccountDetails from 'pages/accounts/accountDetails/AccountDetails'
import UserList from 'pages/user/userList/UserList'
import UserDetails from 'pages/user/userDetails/UserDetails'
import BlankPage from 'components/blankPage/BlankPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />}>
          <Route path="/main/" element={<BlankPage />} />
          <Route path="/main/accountlist" element={<AccountList />} />
          <Route path="/main/accountfilter" element={<AccountFilter />} />
          <Route path="/main/accountlist/:id" element={<AccountDetails />} />
          <Route path="/main/userlist" element={<UserList />} />
          <Route path="/main/userlist/:id" element={<UserDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
