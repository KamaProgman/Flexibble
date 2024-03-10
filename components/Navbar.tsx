'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import AuthProvider from './AuthProviders'
import { NavLinks } from '@/constants'
import { auth } from '@/firebase/firebase.config';
import { getCurrentUser } from '@/lib/firebase/auth';
import ProfileMenu from './ProfileMenu'

interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

const Navbar = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      let currentUser = await getCurrentUser()

      setUser(currentUser)
    }
    fetchCurrentUser()
  }, []);

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
        {
          user ? (
            <ProfileMenu session={user} />
          ) : (
            <AuthProvider />
          )
        }
      </div>
    </nav>
  )
}

export default Navbar