import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  const { conversationId } = await req.json()

  const { error } = await supabase
    .from("conversations")
    .delete()
    .eq("id", conversationId)

  if (error) return Response.json({ error })

  return Response.json({ success: true })
}