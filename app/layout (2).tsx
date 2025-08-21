import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Khela - Web3 Sport Analysis',
  description: 'Advanced sport analysis platform powered by Web3 technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-primary text-white">
          {children}
        </div>
      </body>
    </html>
  )
} 