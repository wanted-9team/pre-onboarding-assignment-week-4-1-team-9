import * as accountStatus from '../data/accountStatus.json'

export const toStatusString = number => {
  return Object.keys(accountStatus).find(key => accountStatus[key] === parseInt(number))
}

export const toStatusNumber = status => {
  return accountStatus[status]
}

export const accountStatusList = Object.keys(accountStatus)
