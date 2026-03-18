import { supabase } from "@/lib/supabase"

export async function searchChunks(
  embedding: number[],
  documentId: string
) {

  const { data, error } = await supabase.rpc("match_chunks", {
    query_embedding: embedding,
    match_count: 5,
    filter_document_id: documentId
  })

  if (error) {
    console.error(error)
    return []
  }

  return data
}