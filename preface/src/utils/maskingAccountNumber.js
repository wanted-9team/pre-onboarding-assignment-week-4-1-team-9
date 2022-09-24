export const maskingAccount = account => {
  const star = '*'
  let accountArray = account.split('')
  for (let i = 1; i < accountArray.length - 1; i++) {
    if (accountArray[i] !== '-') {
      accountArray[i] = star.repeat(accountArray[i].length)
    }
  }

  return accountArray.join('')
}
