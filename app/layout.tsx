import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/session'

export const metadata = {
  title: 'Flexibble',
  description: 'Showcase and discover remarkable developer projects',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  console.log(session);


  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
