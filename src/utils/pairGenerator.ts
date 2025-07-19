// src/utils/pairGenerator.ts

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^\w_]+/g, "")
}

export function generateRandomPairs(hopes: string[], fears: string[], numPairs = 5) {
  const allPairs = []
  const shuffle = (arr: any[]) => arr.sort(() => Math.random() - 0.5)
  hopes = shuffle([...hopes])
  fears = shuffle([...fears])
  const pairTypes = ['hope+fear', 'hope+hope', 'fear+fear']

  while (allPairs.length < numPairs) {
    const type = pairTypes[Math.floor(Math.random() * pairTypes.length)]

    let optionA = null, optionB = null
    if (type === 'hope+fear' && hopes.length && fears.length) {
      optionA = hopes.pop()
      optionB = fears.pop()
    } else if (type === 'hope+hope' && hopes.length >= 2) {
      optionA = hopes.pop()
      optionB = hopes.pop()
    } else if (type === 'fear+fear' && fears.length >= 2) {
      optionA = fears.pop()
      optionB = fears.pop()
    } else {
      continue
    }

    allPairs.push({
      optionA: { label: optionA, value: slugify(optionA!) },
      optionB: { label: optionB, value: slugify(optionB!) }
    })
  }

  return allPairs
}
