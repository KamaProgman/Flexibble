'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface props {
  id: string;
  image: string;
  title: string;
  name: string;
  avatarUrl: string;
  userId: string
}

const ProjectCard: React.FC<props> = ({ id, title, image, name, userId, avatarUrl }) => {
  const [randomLikes, setRandomLikes] = useState<number>(0);
  const [randomViews, setRandomViews] = useState<string>('');

  useEffect(() => {
    setRandomLikes(Math.floor((Math.random() * 10000)))
    setRandomViews(String((Math.floor(Math.random() * 10000) / 1000).toFixed(1) + 'k'))
  }, []);

  return (
    <div className='flexCenter flex-col rounded-2xl drop-shadow-card duration-200 ease-in-out'>
      <Link href={`/project/${id}`} className='flexCenter group relative w-full h-full'>
        <Image
          src={image}
          width={414}
          height={314}
          className='w-full h-full rounded-2xl object-cover'
          alt='Project Image'
        />

        <div className='opacity-0 group-hover:opacity-100 profile_card-title'>
          <p className='w-full'>{title}</p>
        </div>
      </Link>

      <div className='flexBetween w-full px-2 mt-3 font-semibold text-sm'>
        <Link href={`/profile/${userId}`}>
          <div className='flexCenter gap-2'>
            <Image
              src={avatarUrl}
              width={24}
              height={24}
              className='rounded-full'
              alt='Profile Image'
            />
            <p>{name.split(' ')[0]}</p>
          </div>
        </Link>

        <div className='flexCenter gap-3'>
          <div className='flexCenter gap-2'>
            <Image
              src="/hearth.svg"
              width={13}
              height={12}
              alt='heart'
            />
            <p className='text-sm'>{randomLikes}</p>
          </div>
          <div className='flexCenter gap-2'>
            <Image
              src="/eye.svg"
              width={13}
              height={12}
              alt='eye'
            />
            <p className='text-sm'>{randomViews}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard