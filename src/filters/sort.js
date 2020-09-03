export default function (items = [], {key, order} = {key: "", order: 1}) {
  if (!items.length || !key) return items
  let comparator = getComparator(items[0][key])
  return items.slice().sort((a, b) => {
    return (comparator(a[key], b[key]) * order)
  })
}

function getComparator(item) {
  if (typeof item !== "string") {
    return numberComparator
  }
  return stringComparator
}

function numberComparator(a, b) {
  return a - b
}
function stringComparator(a, b) {
  return a.localeCompare(b)
}
