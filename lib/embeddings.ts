import { pipeline, FeatureExtractionPipeline } from "@xenova/transformers"

let embedder: FeatureExtractionPipeline | null = null

export async function generateEmbedding(text: string) {

  if (!embedder) {
    embedder = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    ) as FeatureExtractionPipeline
  }

  const result = await embedder(text, {
    pooling: "mean",
    normalize: true
  })

  return Array.from(result.data)
}