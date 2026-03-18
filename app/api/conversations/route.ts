import { supabase } from "@/lib/supabase"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const documentId = searchParams.get("documentId")

  const { data, error } = await supabase
    .from("conversations")
    .select("*")
    .eq("document_id", documentId)
    .order("created_at", { ascending: false })

  if (error) return Response.json({ error })

  return Response.json(data)
}

export async function POST(req: Request) {
  const { documentId } = await req.json()

  const { data, error } = await supabase
    .from("conversations")
    .insert({ document_id: documentId })
    .select()
    .single()

  if (error) return Response.json({ error }, { status: 500 })

  return Response.json(data)
}