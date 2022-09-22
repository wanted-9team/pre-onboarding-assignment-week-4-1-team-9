import * as accountStatus from '../data/accountStatus.json'

const toStatusString = number => {
  return Object.keys(accountStatus).find(key => accountStatus[key] === number)
}

export default toStatusString
