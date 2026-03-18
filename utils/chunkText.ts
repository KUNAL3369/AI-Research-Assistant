export function chunkText(text: string, size = 800) {
  const cleaned = text
    .replace(/\s+/g, " ")           // remove extra spaces
    .replace(/[_]{2,}/g, "")       // remove long underscores
    .trim()

  const chunks = []

  for (let i = 0; i < cleaned.length; i += size) {
    chunks.push(cleaned.slice(i, i + size))
  }

  return chunks
}