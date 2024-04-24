'use client'

import React, { ChangeEvent, useState } from 'react'
import { Session, User } from 'next-auth';
import Image from 'next/image';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import { FormState } from '@/common.types';
import Button from './Button';

interface props {
  type: string;
  session: Session | null;
}

const ProjectForm: React.FC<props> = ({ type, session }) => {
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    image: '',
    liveSiteUrl: '',
    githubUrl: '',
    category: '',

  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStateChange = (fieldName: string, value: string) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }))
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target.files?.[0]

    if (!file) return;
    if (!file.type.includes('image')) {
      alert('Please upload an image file')
    }

    const reader = new FileReader();

    reader.readAsDataURL(file)

    reader.onload = () => {
      const result = reader.result as string
      handleStateChange('image', result)
    }
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      if (type === 'create') {
        // create project
      }
    } catch (error) {

    }
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
      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        setState={(value) => handleStateChange('description', value)}
      />
      <FormField
        type='url'
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/KamaProgman"
        setState={(value) => handleStateChange('githubUrl', value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange('category', value)}
      />

      <div className='flexStart w-full'>
        <Button
          title={
            isSubmitting
              ? `${type === 'create' ? 'Creating' : 'Editing'}`
              : `${type === 'create' ? 'Create' : 'Edit'}`}
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isSubmitting={isSubmitting}
        />
      </div>

    </form>
  )
}

export default ProjectForm