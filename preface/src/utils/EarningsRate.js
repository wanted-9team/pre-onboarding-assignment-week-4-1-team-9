function EarningsRate(assets, payments) {
  return ((assets - payments) * 100) / payments
}

export default EarningsRate
