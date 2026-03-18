import pdf from "pdf-parse/lib/pdf-parse"

export type PDFParseResult = {
  text: string
  numpages: number
  numrender: number
}

export async function extractText(buffer: Buffer): Promise<string> {
  const data = (await pdf(buffer)) as PDFParseResult
  return data.text
}