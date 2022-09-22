import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAccountDetail, getUserDetail } from 'api'
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
import getKeyByValue from 'utils/getKeyByValue'
import { toLocaleDateFunc } from 'utils/transDate'

function AccountDetails() {
  const accountId = useParams().id
  const [accountDetail, setAccountDetail] = useState({})
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const fetchAccountDetail = async id => {
      try {
        const accountListRes = await getAccountDetail(id)
        const userNameRes = await getUserDetail(accountListRes.data.user_id)
        const newAccountDetail = {
          ...accountListRes.data,
          userName: userNameRes.data.name,
          broker_id: brokers[accountListRes.data.broker_id],
          status: getKeyByValue(accountStatus, accountListRes.data.status),
          created_at: toLocaleDateFunc(accountListRes.data.created_at),
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
      {!editMode ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>사용자명</TableCell>
                <TableCell align="right">브로커 명</TableCell>
                <TableCell align="right">계좌 상태</TableCell>
                <TableCell align="right">계좌번호</TableCell>
                <TableCell align="right">계좌명</TableCell>
                <TableCell align="right">평가 금액</TableCell>
                <TableCell align="right">입금 금액</TableCell>
                <TableCell align="right">계좌 활성화 여부</TableCell>
                <TableCell align="right">계좌 개설일</TableCell>
                <TableCell align="right">Edit</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {accountDetail?.userName}
                </TableCell>
                <TableCell align="right">{accountDetail.broker_id}</TableCell>
                <TableCell align="right">{accountDetail.status}</TableCell>
                <TableCell align="right">{accountDetail.number}</TableCell>
                <TableCell align="right">{accountDetail.name}</TableCell>
                <TableCell align="right">{accountDetail.assets}</TableCell>
                <TableCell align="right">{accountDetail.payments}</TableCell>
                <TableCell align="right">{accountDetail.is_active ? '사용중' : '사용X'}</TableCell>
                <TableCell align="right">{accountDetail.created_at}</TableCell>

                {/* <TableCell align="right">
                  <Button fullWidth variant="contained">
                    Edit
                  </Button>
                  ;
                </TableCell>
                <TableCell align="right">
                  <Button fullWidth variant="contained">
                    Delete
                  </Button>
                  ;
                </TableCell> */}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : null}
    </>
  )
}

export default AccountDetails
