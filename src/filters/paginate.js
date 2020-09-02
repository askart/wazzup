export default function (items, current = 1, size = 10) {
  if (!size) return items
  let from = (current - 1) * size
  let till = current * size
  return items.slice(from, till)
}
