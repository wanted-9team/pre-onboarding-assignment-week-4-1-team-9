export const toLocaleDateFunc = date => {
  const localeDate = new Date(date)
  return localeDate.toLocaleDateString()
}

export const transLoginTimeFunc = date => {
  const localeDate = new Date(date)
  return localeDate.toLocaleString()
}
