import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import type React from "react"

export const metadata = {
  title: "Women Empowerment Platform",
  description: "Connecting women with job opportunities and professional events",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

