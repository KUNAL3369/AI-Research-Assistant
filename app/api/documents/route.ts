import { supabase } from "@/lib/supabase"

export async function GET() {

  const { data, error } = await supabase
    .from("documents")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return Response.json({ error })
  }

  return Response.json(data)
}
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 })
  }

  const { error } = await supabase
    .from("documents")
    .delete()
    .eq("id", id)

  if (error) {
    return Response.json({ error }, { status: 500 })
  }

  return Response.json({ message: "Deleted successfully" })
}