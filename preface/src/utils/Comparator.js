const Comparator = {
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
      ? (a, b) => Comparator.descendingComparator(a, b, orderBy)
      : (a, b) => -Comparator.descendingComparator(a, b, orderBy)
  },
}

export default Comparator
