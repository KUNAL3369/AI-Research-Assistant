"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Document = {
  id: string
  title: string
  created_at: string
}

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Load documents
  async function loadDocuments() {
    const res = await fetch("/api/documents")
    const data = await res.json()
    setDocuments(data)
  }

  useEffect(() => {
    async function init() {
      await loadDocuments()
    }
    init()
  }, [])

  // Upload handler
  async function handleUpload(file: File) {
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)

    try {
      await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      await loadDocuments()
    } catch (err) {
      console.error("Upload failed", err)
    }

    setLoading(false)
  }

  // Delete handler
  async function handleDelete(id: string) {
    const confirmDelete = confirm("Delete this file?")
    if (!confirmDelete) return

    try {
      await fetch(`/api/documents?id=${id}`, {
        method: "DELETE",
      })

      await loadDocuments()
    } catch (err) {
      console.error("Delete failed", err)
    }
  }

  // Drag & drop handlers
  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()

    const file = e.dataTransfer.files[0]
    if (file) handleUpload(file)
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#c98f8f]">

      <div className="w-full max-w-3xl">

        <div className="bg-white rounded-xl shadow-2xl p-6">

          {/* HEADER */}
          <h1 className="text-2xl font-bold text-center">
            AI Research Assistant
          </h1>

          <h2 className="text-lg font-semibold text-center mt-2">
            Compress PDF files
          </h2>

          <p className="text-sm text-gray-500 text-center mt-1">
            Reduce file size while optimizing for maximal PDF quality
          </p>

          {/* MAIN SECTION */}
          <div className="mt-6 flex gap-6">

            {/* LEFT PANEL */}
            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className="w-1/2 border-2 border-dashed border-red-300 rounded-lg flex flex-col items-center justify-center p-6 text-center"
            >
              <div className="text-4xl mb-3">📄</div>

              <p className="font-medium">Drag and drop documents</p>

              <p className="text-sm text-gray-500 mb-4">
                or search on your computer
              </p>

              <input
                type="file"
                id="fileUpload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleUpload(file)
                }}
              />

              <label
                htmlFor="fileUpload"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded cursor-pointer"
              >
                Browse computer
              </label>

              {loading && (
                <p className="text-sm mt-3">Uploading...</p>
              )}
            </div>

            {/* RIGHT PANEL */}
            <div className="w-1/2 flex flex-col">
              <h2 className="font-semibold mb-4">Uploaded Files</h2>

              <div className="flex-1 max-h-[300px] overflow-y-auto pr-2 space-y-4">

                {documents.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No files uploaded yet
                  </p>
                )}

                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="text-sm">{doc.title}</p>

                      {/* progress bar */}
                      <div className="w-[180px] bg-gray-200 rounded h-2 mt-1">
                        <div className="bg-orange-500 h-2 rounded w-[99%]" />
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {/* CHAT */}
                      
                      <button
                        onClick={() => router.push(`/chat/${doc.id}`)}
                        className="text-xs bg-black text-white px-3 py-1 rounded hover:bg-gray-800"
                      >
                        Chat
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
