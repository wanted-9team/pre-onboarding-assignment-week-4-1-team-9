function getEarningsRate(assets, payments) {
  return Math.round((((assets - payments) * 100) / payments) * 100) / 100
}

export default getEarningsRate
