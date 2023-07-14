import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'RUET Alumni Database',
  description: 'Created by 1903179_Naeem',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript" async></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
