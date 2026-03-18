import { generateEmbedding } from "@/lib/embeddings"
import { searchChunks } from "@/lib/vectorSearch"
import OpenAI from "openai"
import { supabase } from "@/lib/supabase"

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1"
})

type Chunk = {
  id: string
  content: string
  similarity: number
  chunk_index: number
}

export async function POST(req: Request) {
  const { question, documentId, conversationId } = await req.json()

  // Create embedding
  const questionEmbedding = await generateEmbedding(question)

  // Get relevant chunks
  const chunks: Chunk[] = await searchChunks(
    questionEmbedding,
    documentId
  )

  // Build context
  const context = chunks.map((c) => c.content).join("\n\n")

  // Call LLM 
  const completion = await openai.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are an AI assistant. Answer clearly using the document context. If possible, summarize instead of copying raw text."
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${question}`
      }
    ]
  })

  const answer = completion.choices[0]?.message?.content || ""

  // ✅ SAVE MESSAGES
  if (conversationId) {
    await supabase.from("chat_messages").insert([
      {
        conversation_id: conversationId,
        role: "user",
        content: question,
      },
      {
        conversation_id: conversationId,
        role: "assistant",
        content: answer,
      },
    ])
  }

  // Return  JSON
  return Response.json({
    answer,
    sources: chunks.slice(0, 3) 
  })
}
