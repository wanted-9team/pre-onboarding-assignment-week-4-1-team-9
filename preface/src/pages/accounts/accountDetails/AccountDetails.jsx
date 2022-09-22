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
import brokers from 'data/brokers.json'
import accountStatus from 'data/accountStatus.json'
import toStatusString from 'utils/transAccountStatus'
import { toLocaleDateFunc } from 'utils/transDate'
import Box from '@mui/material/Box'
import getEarningsRate from 'utils/getEarningsRate'
import getFormattedPrice from 'utils/getFormattedPrice'

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
    const id = detail.id
  }

  const onClickDeleteDetail = async id => {
    await deleteAccount(id)
    await navigate('/main')
  }

  useEffect(() => {
    const fetchAccountDetail = async id => {
      try {
        const accountListRes = await getAccountDetail(id)
        const userNameRes = await getUserDetail(accountListRes.data.user_id)
        const newAccountDetail = {
          ...accountListRes.data,
          userName: userNameRes.data.name,
          broker_id: brokers[accountListRes.data.broker_id],
          status: toStatusString(accountListRes.data.status),
          assets: getFormattedPrice(accountListRes.data.assets),
          payments: getFormattedPrice(accountListRes.data.payments),
          created_at: toLocaleDateFunc(accountListRes.data.created_at),
          earnings_rate: getEarningsRate(accountListRes.data.assets, accountListRes.data.payments),
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
              <TableCell align="center">브로커 명</TableCell>
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
                  <TableCell align="center">{accountDetail.broker_id}</TableCell>
                  <TableCell align="center">{accountDetail.status}</TableCell>
                  <TableCell align="center">{accountDetail.number}</TableCell>
                  <TableCell align="center">{accountDetail.name}</TableCell>
                  <TableCell align="center">{accountDetail.assets}</TableCell>
                  <TableCell align="center">{accountDetail.payments}</TableCell>
                  <TableCell align="center">
                    {accountDetail.is_active ? '사용중' : '사용X'}
                  </TableCell>
                  <TableCell align="center">{accountDetail.earnings_rate}</TableCell>
                  <TableCell align="center">{accountDetail.created_at}</TableCell>
                </>
              ) : null}
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
              <Button variant="contained">저장</Button>
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
