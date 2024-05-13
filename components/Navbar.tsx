import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { NavLinks } from '@/constants'
import ProfileMenu from './ProfileMenu'
import AuthProvider from './AuthProviders'
import { getCurrentUser } from '@/lib/session'

const Navbar = async () => {
  const session = await getCurrentUser()

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href="/">
          <Image
            src="/logo.svg"
            width={115}
            height={43}
            alt='Flexibble' />
        </Link>

        <ul className='xl:flex hidden text-small gap-7'>
          {NavLinks.map(link => (
            <Link key={link.key} href={link.href}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      <div className='flexCenter gap-4'>
        {session?.user ? (
          <>
            <Link href='/create-project'>Share Work</Link>
            <ProfileMenu session={session} />
          </>
        ) : (
          <AuthProvider />
        )}
      </div>
    </nav>
  )
}

export default Navbar