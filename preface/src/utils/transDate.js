export const toLocaleDateFunc = date => {
  const localeDate = new Date(date)
  return localeDate.toLocaleString()
}
