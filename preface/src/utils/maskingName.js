export const maskingName = name => {
  const star = '*'
  let nameArray = name.split(' ').join('').split('')
  if (nameArray.length === 2) {
    nameArray[0] = star.repeat(nameArray[0].length)
  } else if (nameArray.length === 3) {
    nameArray[1] = star.repeat(nameArray[0].length)
  } else if (nameArray.length >= 4) {
    for (let i = 1; i < nameArray.length - 1; i++) {
      nameArray[i] = star.repeat(nameArray[i].length)
    }
  }
  return nameArray.join('')
}
