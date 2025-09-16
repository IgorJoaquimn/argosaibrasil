// src/utils/pairGenerator.ts

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^\w_]+/g, "")
}

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

export function generateRandomPairs(hopes: string[], fears: string[], numPairs = 5, userId?: string) {
  const allPairs = []
  
  // Simple seeded random number generator
  let seed = userId ? hashString(userId) : Math.random() * 1000000
  const seededRandom = () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
  
  const shuffle = (arr: any[]) => arr.sort(() => seededRandom() - 0.5)
  hopes = shuffle([...hopes])
  fears = shuffle([...fears])
  const pairTypes = ['hope+fear', 'hope+hope', 'fear+fear']

  while (allPairs.length < numPairs) {
    const type = pairTypes[Math.floor(seededRandom() * pairTypes.length)]

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
