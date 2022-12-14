import React, { useState } from 'react'
import { styled, Button } from '@mui/material'
import InputCommon from './components/InputCommon'
import { login } from 'api'
import { storage } from 'utils/storage'
import { useDispatch } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const Login = () => {
  const [inputValue, setInputValue] = useState({ email: '', password: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loginHandler = async event => {
    event.preventDefault()
    const response = await login(inputValue)
    storage.set(response.data.accessToken)
    dispatch({ type: 'Auth/getAuth', payload: response.data.user.email })
    navigate('/main')
  }

  if (storage.get()) return <Navigate to="/main" replace />

  return (
    <LoginContainer onSubmit={loginHandler}>
      <LogoImage src="https://www.fint.co.kr/static/imgs/new/global/logo.svg" alt="logo" />
      <InputSection>
        <LoginTitle>로그인</LoginTitle>
        <InputContainer>
          <InputCommon type="text" label="Email" value={inputValue} setState={setInputValue} />
        </InputContainer>
        <InputContainer>
          <InputCommon
            type="password"
            label="Password"
            value={inputValue}
            setState={setInputValue}
          />
        </InputContainer>
      </InputSection>
      <Button type="submit" sx={{ width: '100%', height: 50 }} variant="contained">
        로그인
      </Button>
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled('form')({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  top: '50%',
  left: '50%',
  width: 300,
  height: 400,
  padding: '30px',
  border: '1px solid rgb(220,220,220)',
  borderRadius: 10,
  transform: 'translate(-50%,-50%)',
})

const LogoImage = styled('img')({
  width: '100%',
  height: 100,
  margin: '10 0',
})

const InputSection = styled('section')({
  boxSizing: 'border-box',
  flex: 1,
  width: '100%',
  padding: '10px 20px',
})

const InputContainer = styled('div')({
  display: 'flex',
  width: '100%',
  marginBottom: 10,
})

const LoginTitle = styled('p')({
  margin: 0,
  marginBottom: 20,
  fontWeight: 'bold',
})
