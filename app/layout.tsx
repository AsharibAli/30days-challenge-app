import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '30 Days of 30 Projects',
  description: 'One cool mini project each day using the latest tech stack for the next 30 days.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full bg-black`}>{children}</body>
    </html>
  )
}