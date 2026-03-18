import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  const { conversationId } = await req.json()

  const { data, error } = await supabase
    .from("chat_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })

  if (error) return Response.json({ error })

  return Response.json(data)
}