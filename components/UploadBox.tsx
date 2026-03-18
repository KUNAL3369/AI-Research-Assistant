"use client"

import { useState } from "react"

export default function UploadBox() {
  const [loading, setLoading] = useState(false)

  async function handleUpload(file: File) {
    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)

    await fetch("/api/upload", {
      method: "POST",
      body: formData
    })

    setLoading(false)
    alert("Uploaded!")
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleUpload(file)
  }

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed p-10 text-center rounded bg-white shadow"
    >
      <p className="mb-2">Drag and drop PDF here</p>
      <input
        type="file"
        onChange={(e) => handleUpload(e.target.files![0])}
      />
      {loading && <p>Uploading...</p>}
    </div>
  )
}