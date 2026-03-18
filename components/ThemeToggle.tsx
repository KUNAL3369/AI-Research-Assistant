"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark)
  }, [dark])

  return (
    <button
      onClick={() => setDark(!dark)}
      className="px-3 py-1 border rounded bg-white dark:bg-black"
    >
      {dark ? "Light" : "Dark"}
    </button>
  )
}