import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export async function GET() {

  const chat = await groq.chat.completions.create({
    messages: [
      { role: "user", content: "Explain RAG in software engineering in one sentence" }
    ],
    model: "llama-3.1-8b-instant"
  })

  return Response.json({
    response: chat.choices[0].message.content
  })
}