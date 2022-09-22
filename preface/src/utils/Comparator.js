const comparator = {
  descendingComparator: function (a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1
    }
    if (b[orderBy] > a[orderBy]) {
      return 1
    }
    return 0
  },
  getComparator: (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => comparator.descendingComparator(a, b, orderBy)
      : (a, b) => -comparator.descendingComparator(a, b, orderBy)
  },
}

export default comparator
