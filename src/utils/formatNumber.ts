export const addCommasInsideNumber = (item: number, afterEvery: number): string => {
  if (!item) return ''

  const numStr: string = item.toString()
  let result: string = ''
  let count: number = 0

  if (numStr.startsWith('0')) return numStr

  for (let i = numStr.length - 1; i >= 0; i--) {
    result = numStr[i] + result
    count++
    if (count % afterEvery === 0 && i !== 0) {
      result = ',' + result
    }
  }

  return result
}
