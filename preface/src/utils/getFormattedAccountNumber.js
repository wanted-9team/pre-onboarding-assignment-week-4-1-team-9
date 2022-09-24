import * as brokerFormat from '../data/brokerFormat'

export const getFormattedAccountNumber = (brokerId, accountNumber) => {
  const formatSkeleton = brokerFormat[brokerId]
  let formattedAccountNumber = ''
  for (let i = 0; i < formatSkeleton.length; i++) {
    if (formatSkeleton[i] === '0') {
      formattedAccountNumber += accountNumber.substring(0, 1)
      accountNumber = accountNumber.substring(1)
    } else {
      formattedAccountNumber += '-'
    }
  }
  return formattedAccountNumber
}
