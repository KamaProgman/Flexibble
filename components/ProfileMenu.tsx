import { signOut } from '@/lib/firebase/auth';
import { User } from 'next-auth'
import React from 'react'

interface props {
  session: User;
}

const ProfileMenu: React.FC<props> = ({ session }) => {
  const handleSignOut = async () => {
    try {
      await signOut()
      window.location.reload()

      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div>
      {session.email}
      <button className='ml-4' onClick={handleSignOut}>Sign Out</button>
    </div>
  )
}

export default ProfileMenu