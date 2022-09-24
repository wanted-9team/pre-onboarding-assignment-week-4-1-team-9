import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAccountDetail, getUserDetail, editAccount, deleteAccount } from 'api'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import brokers from 'data/brokers.json'
import toStatusString from 'utils/transAccountStatus'
import { toLocaleDateFunc } from 'utils/transDate'
import getEarningsRate from 'utils/getEarningsRate'
import getFormattedPrice from 'utils/getFormattedPrice'

const ariaLabel = { 'aria-label': 'description' }

function AccountDetails() {
  const navigate = useNavigate()
  const accountId = useParams().id
  const [accountDetail, setAccountDetail] = useState({})
  const [editMode, setEditMode] = useState(false)

  const onClickEditMode = () => {
    setEditMode(prev => !prev)
  }

  const onChangeHandler = event => {
    const { value, name } = event.target
    setAccountDetail({ ...accountDetail, [name]: value })
  }

  const onClickEditComplete = async detail => {
    await editAccount(detail)
    setEditMode(false)
  }

  const onClickDeleteDetail = async id => {
    await deleteAccount(id)
    await navigate(-1)
  }

  useEffect(() => {
    const fetchAccountDetail = async id => {
      try {
        const accountListRes = await getAccountDetail(id)
        const userNameRes = await getUserDetail(accountListRes.data.user_id)
        const newAccountDetail = {
          ...accountListRes.data,
          userName: userNameRes.data.name,
        }
        setAccountDetail(newAccountDetail)
      } catch (e) {
        throw new Error(e)
      }
    }
    fetchAccountDetail(accountId)
  }, [])

  return (
    <>
      <TableContainer component={Paper} sx={{ width: '100%', height: '100%', margin: '60px 0' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">사용자명</TableCell>
              <TableCell align="center">증권사명</TableCell>
              <TableCell align="center">계좌 상태</TableCell>
              <TableCell align="center">계좌번호</TableCell>
              <TableCell align="center">계좌명</TableCell>
              <TableCell align="center">평가 금액</TableCell>
              <TableCell align="center">입금 금액</TableCell>
              <TableCell align="center">계좌 활성화 여부</TableCell>
              <TableCell align="center">수익률</TableCell>
              <TableCell align="center">계좌 개설일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              {!editMode ? (
                <>
                  <TableCell component="th" scope="row">
                    {accountDetail?.userName}
                  </TableCell>
                  <TableCell align="center">{brokers[accountDetail.broker_id]}</TableCell>
                  <TableCell align="center">{toStatusString(accountDetail.status)}</TableCell>
                  <TableCell align="center">{accountDetail.number}</TableCell>
                  <TableCell align="center">{accountDetail.name}</TableCell>
                  <TableCell align="center">{getFormattedPrice(accountDetail.assets)}</TableCell>
                  <TableCell align="center">{getFormattedPrice(accountDetail.payments)}</TableCell>
                  <TableCell align="center">{accountDetail.is_active ? 'YES' : 'NO'}</TableCell>
                  <TableCell align="center">
                    {getEarningsRate(accountDetail.assets, accountDetail.payments)}
                  </TableCell>
                  <TableCell align="center">{toLocaleDateFunc(accountDetail.created_at)}</TableCell>
                </>
              ) : (
                <>
                  <TableCell align="center">
                    <Input
                      name="userName"
                      defaultValue={accountDetail.userName}
                      inputProps={ariaLabel}
                      onChange={onChangeHandler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      sx={{ width: '100%' }}
                      name="broker_id"
                      onChange={onChangeHandler}
                      defaultValue={accountDetail.broker_id}
                    >
                      <MenuItem value="209">유안타증권</MenuItem>
                      <MenuItem value="218">현대증권</MenuItem>
                      <MenuItem value="230">미래에셋증권</MenuItem>
                      <MenuItem value="238">대우증권</MenuItem>
                      <MenuItem value="240">삼성증권</MenuItem>
                      <MenuItem value="243">한국투자증권</MenuItem>
                      <MenuItem value="247">우리투자증권</MenuItem>
                      <MenuItem value="261">교보증권</MenuItem>
                      <MenuItem value="262">하이투자증권</MenuItem>
                      <MenuItem value="263">HMC투자증권</MenuItem>
                      <MenuItem value="264">키움증권</MenuItem>
                      <MenuItem value="265">이베스트투자증권</MenuItem>
                      <MenuItem value="266">SK증권</MenuItem>
                      <MenuItem value="267">대신증권</MenuItem>
                      <MenuItem value="268">아이엠투자증권</MenuItem>
                      <MenuItem value="269">한화투자증권</MenuItem>
                      <MenuItem value="270">하나대투자증권</MenuItem>
                      <MenuItem value="279">동부증권</MenuItem>
                      <MenuItem value="280">유진투자증권</MenuItem>
                      <MenuItem value="288">카카오페이증권</MenuItem>
                      <MenuItem value="287">메리츠종합금융증권</MenuItem>
                      <MenuItem value="290">부국증권</MenuItem>
                      <MenuItem value="291">신영증권</MenuItem>
                      <MenuItem value="292">LIG투자증권</MenuItem>
                      <MenuItem value="271">토스증권</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      sx={{ width: '100%' }}
                      name="status"
                      onChange={onChangeHandler}
                      defaultValue={accountDetail.status}
                    >
                      <MenuItem value="1">입금대기</MenuItem>
                      <MenuItem value="2">운용중</MenuItem>
                      <MenuItem value="3">투자중지</MenuItem>
                      <MenuItem value="4">해지</MenuItem>
                      <MenuItem value="9999">관리자확인필요</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell align="center">
                    <Input
                      name="number"
                      defaultValue={accountDetail.number}
                      inputProps={ariaLabel}
                      onChange={onChangeHandler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Input
                      name="name"
                      defaultValue={accountDetail.name}
                      inputProps={ariaLabel}
                      onChange={onChangeHandler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Input
                      name="assets"
                      defaultValue={accountDetail.assets}
                      inputProps={ariaLabel}
                      onChange={onChangeHandler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Input
                      name="payments"
                      defaultValue={accountDetail.payments}
                      inputProps={ariaLabel}
                      onChange={onChangeHandler}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Select
                      sx={{ width: '100%' }}
                      name="is_active"
                      onChange={onChangeHandler}
                      defaultValue={accountDetail.is_active}
                    >
                      <MenuItem value={true}>YES</MenuItem>
                      <MenuItem value={false}>NO</MenuItem>
                    </Select>
                  </TableCell>
                </>
              )}
            </TableRow>
          </TableBody>
        </Table>
        {!editMode ? (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Box>
              <Button variant="contained" onClick={onClickEditMode}>
                편집
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  onClickDeleteDetail(accountId)
                }}
              >
                삭제
              </Button>
            </Box>
          </Box>
        ) : (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  onClickEditComplete(accountDetail)
                }}
              >
                저장
              </Button>
            </Box>
            <Box>
              <Button variant="contained" color="error" onClick={onClickEditMode}>
                취소
              </Button>
            </Box>
          </Box>
        )}
      </TableContainer>
    </>
  )
}

export default AccountDetails
