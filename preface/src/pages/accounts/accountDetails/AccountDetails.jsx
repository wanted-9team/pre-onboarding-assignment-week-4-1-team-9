import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getAccountDetail, getUserDetail, editAccount, deleteAccount, editUser } from 'api'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { Typography } from '@mui/material'
import brokers from 'data/brokers.json'
import { toStatusString } from 'utils/transAccountStatus'
import { toLocaleDateFunc } from 'utils/transDate'
import getEarningsRate from 'utils/getEarningsRate'
import getFormattedPrice from 'utils/getFormattedPrice'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

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
    if (name === 'status') {
      setAccountDetail({ ...accountDetail, [name]: parseInt(value) })
      return
    }
    setAccountDetail({ ...accountDetail, [name]: value })
  }

  const onClickEditComplete = async detail => {
    const id = detail.user_id
    const user_name = detail.userName
    await editAccount(detail)
    await editUser({ id, name: user_name })
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
      <Box>
        <Box>
          <Typography
            sx={{ flex: '1 1 100%', display: 'flex', alignItems: 'center' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            <ArrowBackIcon sx={{ cursor: 'pointer', mr: 2 }} onClick={() => navigate(-1)} />
            계좌 상세 정보
          </Typography>
          <Paper sx={{ mb: 2 }}>
            <TableContainer sx={{ overflow: 'hidden' }}>
              <Table>
                {!editMode ? (
                  <>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell className="th" align="center">
                          사용자명
                        </TableCell>
                        <TableCell>{accountDetail?.userName}</TableCell>
                        <TableCell align="center">증권사명</TableCell>
                        <TableCell>{brokers[accountDetail.broker_id]}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">계좌 상태</TableCell>
                        <TableCell>{toStatusString(accountDetail.status)}</TableCell>
                        <TableCell align="center">계좌번호</TableCell>
                        <TableCell>{accountDetail.number}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">계좌명</TableCell>
                        <TableCell>{accountDetail.name}</TableCell>
                        <TableCell align="center">평가 금액</TableCell>
                        <TableCell>{getFormattedPrice(accountDetail.assets)}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">입금 금액</TableCell>
                        <TableCell>{getFormattedPrice(accountDetail.payments)}</TableCell>
                        <TableCell align="center">계좌 활성화 여부</TableCell>
                        <TableCell>{accountDetail.is_active ? 'YES' : 'NO'}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">수익률</TableCell>
                        <TableCell>
                          {getEarningsRate(accountDetail.assets, accountDetail.payments)}
                        </TableCell>
                        <TableCell align="center">계좌 개설일</TableCell>
                        <TableCell>{toLocaleDateFunc(accountDetail.created_at)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell className="th" align="center">
                          사용자명
                        </TableCell>
                        <TableCell>
                          <Input
                            name="userName"
                            defaultValue={accountDetail.userName}
                            inputProps={ariaLabel}
                            onChange={onChangeHandler}
                          />
                        </TableCell>
                        <TableCell align="center">증권사명</TableCell>
                        <TableCell>
                          <Select
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
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">계좌 상태</TableCell>
                        <TableCell>
                          <Select
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
                        <TableCell align="center">계좌번호</TableCell>
                        <TableCell>
                          <Input
                            name="number"
                            defaultValue={accountDetail.number}
                            inputProps={ariaLabel}
                            onChange={onChangeHandler}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">계좌명</TableCell>
                        <TableCell>
                          <Input
                            name="name"
                            defaultValue={accountDetail.name}
                            inputProps={ariaLabel}
                          />
                        </TableCell>
                        <TableCell align="center">평가 금액</TableCell>
                        <TableCell>
                          <Input
                            name="assets"
                            defaultValue={accountDetail.assets}
                            inputProps={ariaLabel}
                            onChange={onChangeHandler}
                            disabled
                          />{' '}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">입금 금액</TableCell>
                        <TableCell>
                          <Input
                            name="payments"
                            defaultValue={accountDetail.payments}
                            inputProps={ariaLabel}
                            onChange={onChangeHandler}
                            disabled
                          />
                        </TableCell>
                        <TableCell align="center">계좌 활성화 여부</TableCell>
                        <TableCell>
                          <Select
                            name="is_active"
                            onChange={onChangeHandler}
                            defaultValue={accountDetail.is_active}
                          >
                            <MenuItem value={true}>YES</MenuItem>
                            <MenuItem value={false}>NO</MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">수익률</TableCell>
                        <TableCell>
                          {getEarningsRate(accountDetail.assets, accountDetail.payments)}
                        </TableCell>
                        <TableCell align="center">계좌 개설일</TableCell>
                        <TableCell>{toLocaleDateFunc(accountDetail.created_at)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                )}
              </Table>
              {!editMode ? (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginY: 2,
                    gap: 2,
                  }}
                >
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
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginY: 2,
                    gap: 2,
                  }}
                >
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
          </Paper>
        </Box>
      </Box>
    </>
  )
}

export default AccountDetails
