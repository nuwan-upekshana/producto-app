export const handleFilters = (
  { coloumn, value, label },
  setFilters,
  filterQuary
) => {
  debugger
  if (label === "Any") {
    const index = filterQuary.findIndex(filter => filter.coloumn == coloumn)
    let newQFilters = [...filterQuary]
    newQFilters.splice(index, 1)
    setFilters(newQFilters)
    return
  }
  if (!filterQuary.find(filter => filter.coloumn === coloumn)) {
    setFilters([...filterQuary, { coloumn: coloumn, value: value }])
  } else {
    const index = filterQuary.findIndex(filter => filter.coloumn === coloumn)
    const newQFilters = [...filterQuary]
    newQFilters[index] = {
      coloumn: coloumn,
      value: value,
    }
    setFilters(newQFilters)
  }
}
