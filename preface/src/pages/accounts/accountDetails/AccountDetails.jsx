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
            ?????? ?????? ??????
          </Typography>
          <Paper sx={{ mb: 2 }}>
            <TableContainer sx={{ overflow: 'hidden' }}>
              <Table>
                {!editMode ? (
                  <>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell className="th" align="center">
                          ????????????
                        </TableCell>
                        <TableCell>{accountDetail?.userName}</TableCell>
                        <TableCell align="center">????????????</TableCell>
                        <TableCell>{brokers[accountDetail.broker_id]}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">?????? ??????</TableCell>
                        <TableCell>{toStatusString(accountDetail.status)}</TableCell>
                        <TableCell align="center">????????????</TableCell>
                        <TableCell>{accountDetail.number}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">?????????</TableCell>
                        <TableCell>{accountDetail.name}</TableCell>
                        <TableCell align="center">?????? ??????</TableCell>
                        <TableCell>{getFormattedPrice(accountDetail.assets)}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">?????? ??????</TableCell>
                        <TableCell>{getFormattedPrice(accountDetail.payments)}</TableCell>
                        <TableCell align="center">?????? ????????? ??????</TableCell>
                        <TableCell>{accountDetail.is_active ? 'YES' : 'NO'}</TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">?????????</TableCell>
                        <TableCell>
                          {getEarningsRate(accountDetail.assets, accountDetail.payments)}
                        </TableCell>
                        <TableCell align="center">?????? ?????????</TableCell>
                        <TableCell>{toLocaleDateFunc(accountDetail.created_at)}</TableCell>
                      </TableRow>
                    </TableBody>
                  </>
                ) : (
                  <>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell className="th" align="center">
                          ????????????
                        </TableCell>
                        <TableCell>
                          <Input
                            name="userName"
                            defaultValue={accountDetail.userName}
                            inputProps={ariaLabel}
                            onChange={onChangeHandler}
                          />
                        </TableCell>
                        <TableCell align="center">????????????</TableCell>
                        <TableCell>
                          <Select
                            name="broker_id"
                            onChange={onChangeHandler}
                            defaultValue={accountDetail.broker_id}
                          >
                            <MenuItem value="209">???????????????</MenuItem>
                            <MenuItem value="218">????????????</MenuItem>
                            <MenuItem value="230">??????????????????</MenuItem>
                            <MenuItem value="238">????????????</MenuItem>
                            <MenuItem value="240">????????????</MenuItem>
                            <MenuItem value="243">??????????????????</MenuItem>
                            <MenuItem value="247">??????????????????</MenuItem>
                            <MenuItem value="261">????????????</MenuItem>
                            <MenuItem value="262">??????????????????</MenuItem>
                            <MenuItem value="263">HMC????????????</MenuItem>
                            <MenuItem value="264">????????????</MenuItem>
                            <MenuItem value="265">????????????????????????</MenuItem>
                            <MenuItem value="266">SK??????</MenuItem>
                            <MenuItem value="267">????????????</MenuItem>
                            <MenuItem value="268">?????????????????????</MenuItem>
                            <MenuItem value="269">??????????????????</MenuItem>
                            <MenuItem value="270">?????????????????????</MenuItem>
                            <MenuItem value="279">????????????</MenuItem>
                            <MenuItem value="280">??????????????????</MenuItem>
                            <MenuItem value="288">?????????????????????</MenuItem>
                            <MenuItem value="287">???????????????????????????</MenuItem>
                            <MenuItem value="290">????????????</MenuItem>
                            <MenuItem value="291">????????????</MenuItem>
                            <MenuItem value="292">LIG????????????</MenuItem>
                            <MenuItem value="271">????????????</MenuItem>
                          </Select>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <TableBody>
                      <TableRow sx={{ height: 90 }}>
                        <TableCell align="center">?????? ??????</TableCell>
                        <TableCell>
                          <Select
                            name="status"
                            onChange={onChangeHandler}
                            defaultValue={accountDetail.status}
                          >
                            <MenuItem value="1">????????????</MenuItem>
                            <MenuItem value="2">?????????</MenuItem>
                            <MenuItem value="3">????????????</MenuItem>
                            <MenuItem value="4">??????</MenuItem>
                            <MenuItem value="9999">?????????????????????</MenuItem>
                          </Select>
                        </TableCell>
                        <TableCell align="center">????????????</TableCell>
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
                        <TableCell align="center">?????????</TableCell>
                        <TableCell>
                          <Input
                            name="name"
                            defaultValue={accountDetail.name}
                            inputProps={ariaLabel}
                          />
                        </TableCell>
                        <TableCell align="center">?????? ??????</TableCell>
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
                        <TableCell align="center">?????? ??????</TableCell>
                        <TableCell>
                          <Input
                            name="payments"
                            defaultValue={accountDetail.payments}
                            inputProps={ariaLabel}
                            onChange={onChangeHandler}
                            disabled
                          />
                        </TableCell>
                        <TableCell align="center">?????? ????????? ??????</TableCell>
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
                        <TableCell align="center">?????????</TableCell>
                        <TableCell>
                          {getEarningsRate(accountDetail.assets, accountDetail.payments)}
                        </TableCell>
                        <TableCell align="center">?????? ?????????</TableCell>
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
                      ??????
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
                      ??????
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
                      ??????
                    </Button>
                  </Box>
                  <Box>
                    <Button variant="contained" color="error" onClick={onClickEditMode}>
                      ??????
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
