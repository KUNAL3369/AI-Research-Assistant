import "./globals.css"
import { ReactNode } from "react"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#c98f8f] dark:bg-neutral-900 min-h-screen">
        {children}
      </body>
    </html>
  )
}