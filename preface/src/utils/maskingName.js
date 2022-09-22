export const maskingName = name => {
  const star = '*'
  const includeKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
  let nameArray = name.split(' ')
  if (nameArray.length === 2) {
    nameArray[0] = star.repeat(nameArray[0].length)
  } else {
    for (let i = 0; i < nameArray.length - 1; i++) {
      if (
        nameArray[i] === 'Mr.' ||
        nameArray[i] === 'Ms.' ||
        nameArray[i] === 'Miss' ||
        nameArray[i] === 'Mrs.' ||
        nameArray[i] === 'Dr.'
      ) {
        continue
      } else if (includeKor.test(nameArray[i])) {
        break
      } else {
        nameArray[i] = star.repeat(nameArray[i].length)
      }
    }
  }
  return nameArray.join(' ')
}
