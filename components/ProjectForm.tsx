'use client'

import React, { ChangeEvent } from 'react'
import { Session, User } from 'next-auth';
import Image from 'next/image';
import FormField from './FormField';

interface props {
  type: string;
  session: Session | null;
}

const ProjectForm: React.FC<props> = ({ type, session }) => {

  const handleFormSubmit = (e: React.FormEvent) => { }
  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => { }
  const handleStateChange = (fieldName: string, value: string) => { }

  const form = {
    image: '',
    title: ''
  }

  return (
    <form onSubmit={handleFormSubmit} className='flexStart form'>

      <div className='flexStart form_image-container'>
        <label htmlFor="poster" className='flexCenter form_image-label'>
          {!form.image && 'Choose a poster for your project'}
        </label>
        <input
          type="file"
          id='image'
          accept='image'
          required={type === 'create'}
          className='form_image-input'
          onChange={handleChangeImage} />

        {form.image && (
          <Image
            src={form?.image}
            className='sm:p-10 object-contain z-20'
            alt='Project poster'
            fill
          />
        )}
      </div>

      <FormField
        title="Title"
        state={form.title}
        placeholder="Flexibble"
        setState={(value) => handleStateChange('title', value)}
      />
    </form>
  )
}

export default ProjectForm