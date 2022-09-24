import theme from 'theme'
export const earningsRateColor = rate => {
  if (rate === 0) return 'black'
  return rate > 0 ? theme.palette.primary.main : theme.palette.error.main
}
