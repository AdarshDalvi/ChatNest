import type { Metadata } from 'next'
import './globals.css'
import {Roboto} from 'next/font/google'

export const metadata: Metadata = {
  title: 'WhatsApp Clone',
  description: 'WhatsApp Clone created using Next + React',
}

const roboto = Roboto({
  weight:['300','400','500','700'],
  style: 'normal',
  subsets: ['latin']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel='icon' href='/favicon.ico'/>
      </head>
      <body suppressHydrationWarning={true} className={roboto.className}>{children}</body>
    </html>
  )
}
