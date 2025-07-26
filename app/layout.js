// app/layout.js
import './globals.css'
import { Orbitron, Audiowide } from 'next/font/google'
import Navbar from './components/navbar'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-orbitron',
})

const audiowide = Audiowide({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-audiowide',
})

export const metadata = {
  title: 'qanzproject',
  description: 'Designed by Rizqan among the stars 🚀',
  icons: {
    icon: '/rocket3.jpeg', // ← ini udah bener sekarang!
  },
}


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${audiowide.variable}`}>
      <body className="bg-black text-white font-orbitron">
        <Navbar />
        {children}
      </body>
    </html>
  )
}
