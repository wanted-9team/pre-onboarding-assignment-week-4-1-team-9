export const maskingAccount = account => {
  const star = '*'
  let accountArray = account.split('')
  for (let i = 2; i < accountArray.length - 2; i++) {
    if (accountArray[i] !== '-') {
      if (i === accountArray.length - 3 && accountArray[i + 1] === '-') {
        break
      }
      accountArray[i] = star.repeat(accountArray[i].length)
    }
  }

  return accountArray.join('')
}
