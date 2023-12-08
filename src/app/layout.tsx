import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ChatPDF POC',
  description: 'ChatPDF proof of concept',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col max-h-screen min-w-full min-h-screen bg-slate-800">
          <nav className="flex justify-between items-center align-baseline h-[60px] px-4 py-8 mx-6">
            <Link
              href={'/'}
              className="text-3xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text hover:cursor-pointer"
            >
             ChatPDF 
            </Link>
            <div className="flex items-center gap-4 align-baseline">
              <Link href={'/about'} className='text-xl text-white'>
                About
              </Link>
            </div>
          </nav>
          <main className="flex flex-grow w-full px-10 py-4">{children}</main>
        </div>
      </body>
    </html>
  );
}
