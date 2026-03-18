"use client"

import { useEffect, useState, use, useRef } from "react"
import { useRouter } from "next/navigation"

type Document = {
  id: string
  title: string
  file_url: string
}

type Source = {
  content: string
  chunk_index: number
}

type Message = {
  role: "user" | "assistant"
  content: string
  sources?: Source[]
}

type DBMessage = {
  role: "user" | "assistant"
  content: string
}

export default function ChatPage({
  params,
}: {
  params: Promise<{ documentId: string }>
}) {
  const { documentId } = use(params)

  const [documents, setDocuments] = useState<Document[]>([])
  const [currentDoc, setCurrentDoc] = useState(documentId)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [conversationId, setConversationId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const bottomRef = useRef<HTMLDivElement | null>(null)

  // load documents
  useEffect(() => {
    fetch("/api/documents")
      .then((res) => res.json())
      .then(setDocuments)
  }, [])

  // auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // load conversation
  useEffect(() => {
    async function initConversation() {
      const existing = await fetch(`/api/conversations?documentId=${currentDoc}`)
        .then((res) => res.json())

      if (existing.length > 0) {
        setConversationId(existing[0].id)

        const msgs = await fetch("/api/messages", {
          method: "POST",
          body: JSON.stringify({ conversationId: existing[0].id }),
        }).then((res) => res.json())

        const formatted = msgs.map((m: DBMessage) => ({
          role: m.role,
          content: m.content,
        }))

        setMessages(formatted)
      } else {
        const created = await fetch("/api/conversations", {
          method: "POST",
          body: JSON.stringify({ documentId: currentDoc }),
        }).then((res) => res.json())

        setConversationId(created.id)
        setMessages([])
      }
    }

    initConversation()
  }, [currentDoc])

  const currentFile = documents.find((d) => d.id === currentDoc)

  function scrollToChunk(index: number) {
    const el = document.getElementById(`chunk-${index}`)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" })
      el.classList.add("bg-yellow-200")

      setTimeout(() => {
        el.classList.remove("bg-yellow-200")
      }, 1500)
    }
  }

  async function sendMessage() {
    if (!input.trim() || !conversationId || loading) return

    const userMsg: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setLoading(true)

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: input,
        documentId: currentDoc,
        conversationId,
      }),
    })

    const data = await res.json()

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.answer,
        sources: data.sources,
      },
    ])

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#c98f8f] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white/40 backdrop-blur rounded-xl p-4 flex gap-4 h-[85vh]">

        {/* LEFT PANEL */}
        <div className="w-1/4 bg-[#c98f8f] rounded-lg p-3 flex flex-col">

          <h2 className="text-center font-bold mb-3 text-white">
            Documents
          </h2>

          {/* EMPTY STATE */}
          {documents.length === 0 && (
            <p className="text-xs text-white text-center mt-4">
              No documents uploaded yet
            </p>
          )}

          <div className="h-1/2 overflow-y-auto space-y-2 mb-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => {
                  setCurrentDoc(doc.id)
                  setMessages([])
                }}
                className={`p-2 rounded cursor-pointer text-sm ${
                  currentDoc === doc.id
                    ? "bg-white text-black"
                    : "bg-white/80 hover:bg-white"
                }`}
              >
                {doc.title}
              </div>
            ))}
          </div>

          {/* SOURCES */}
          <div className="h-1/2 bg-white/90 rounded p-2 overflow-y-auto">
            <p className="text-xs font-semibold mb-2">Sources</p>

            {messages
              .flatMap((m) => m.sources || [])
              .slice(0, 10)
              .map((s, i) => (
                <button
                  key={i}
                  onClick={() => scrollToChunk(s.chunk_index)}
                  className="block text-left text-xs mb-2 hover:underline"
                >
                  • {s.content.slice(0, 60)}...
                </button>
              ))}
          </div>
        </div>

        {/* CENTER */}
        <div className="w-2/4 bg-white rounded-lg flex flex-col">

          <div className="flex items-center justify-between p-3 border-b">
            <button
              onClick={() => router.push("/")}
              className="text-sm bg-orange-500 text-white px-3 py-1 rounded"
            >
              ← Back
            </button>

            <h2 className="font-bold">AI Research Assistant</h2>
            <div />
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">

            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  className={`p-3 rounded max-w-[80%] text-sm leading-snug ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white ml-auto"
                      : "bg-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* LOADING */}
            {loading && (
              <div className="text-sm text-gray-500">Thinking...</div>
            )}

            {/* AUTO SCROLL TARGET */}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className="flex-1 border-2 border-orange-400 rounded px-3 py-2 text-sm focus:outline-none"
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className={`px-4 py-2 rounded text-white ${
                !input.trim() || loading
                  ? "bg-gray-400"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
            >
              Send
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-1/4 bg-white rounded-lg flex flex-col">

          <h2 className="text-center font-bold p-3 border-b">
            Document Preview
          </h2>

          <div className="flex-1 overflow-hidden">
            {currentFile?.file_url ? (
              <iframe
                src={currentFile.file_url}
                className="w-full h-full"
              />
            ) : (
              <p className="p-4 text-sm text-gray-500">
                No preview available
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}