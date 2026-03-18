import { extractText } from "@/lib/pdfParser"
import { chunkText } from "@/utils/chunkText"
import { generateEmbedding } from "@/lib/embeddings"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return Response.json({ error: "No file uploaded" }, { status: 400 })
  }

  // 📌 Convert file to buffer
  const buffer = Buffer.from(await file.arrayBuffer())

  // 📌 STEP 1 — Upload file to Supabase Storage
  const filePath = `documents/${Date.now()}-${file.name}`

  const { error: uploadError } = await supabase.storage
    .from("documents")
    .upload(filePath, buffer, {
      contentType: file.type,
    })

  if (uploadError) {
    console.error("Upload error:", uploadError)
    return Response.json({ error: uploadError })
  }

  // 📌 STEP 2 — Get public URL (VERY IMPORTANT)
  const { data: publicUrlData } = supabase.storage
    .from("documents")
    .getPublicUrl(filePath)

  const fileUrl = publicUrlData.publicUrl

  // 📌 STEP 3 — Extract text
  const text = await extractText(buffer)

  // 📌 STEP 4 — Chunk text
  const chunks = chunkText(text)

  // 📌 STEP 5 — Insert document (WITH file_url)
  const { data: document, error: docError } = await supabase
    .from("documents")
    .insert({
      title: file.name,
      file_url: fileUrl, // ✅ THIS FIXES PDF PREVIEW
    })
    .select()
    .single()

  if (docError) {
    console.error("Document insert error:", docError)
    return Response.json({ error: docError })
  }

  // 📌 STEP 6 — Store embeddings
  for (let i = 0; i < chunks.length; i++) {
    const embedding = await generateEmbedding(chunks[i])

    const { error: chunkError } = await supabase
      .from("document_chunks")
      .insert({
        document_id: document.id,
        content: chunks[i],
        embedding: embedding,
        chunk_index: i,
      })

    if (chunkError) {
      console.error("Chunk insert error:", chunkError)
    }
  }

  return Response.json({
    message: "Document processed",
    chunks: chunks.length,
    file_url: fileUrl,
  })
}