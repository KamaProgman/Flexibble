'use client'

import React, { ChangeEvent, useState } from 'react'
import { Session } from 'next-auth';
import Image from 'next/image';
import FormField from './FormField';
import { categoryFilters } from '@/constants';
import CustomMenu from './CustomMenu';
import { FormState, ProjectInterface, SessionInterface } from '@/common.types';
import Button from './Button';
import { createNewProject, updateProject } from '@/lib/actions';
import { useRouter } from 'next/navigation';


interface props {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface
}

const ProjectForm: React.FC<props> = ({ type, session, project }) => {
  const router = useRouter()
  const [form, setForm] = useState<FormState>({
    title: project?.title || '',
    description: project?.description || '',
    image: null,
    imageUrl: project?.imageUrl || '',
    liveSiteUrl: project?.liveSiteUrl || '',
    githubUrl: project?.githubUrl || '',
    category: project?.category || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleStateChange = (fieldName: string, value: string | File) => {
    setForm((prevState) => ({ ...prevState, [fieldName]: value }))
  }

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file = e.target.files?.[0]
    if (!file) return;
    if (!file.type.includes('image')) {
      alert('Please upload an image file')
      return
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;

      setForm((prevState) => ({ ...prevState, image: file, imageUrl: result }))
    };
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (type === 'create') {
        // create project 
        await createNewProject(form, session.user)
        router.push('/')
      }
      // edit project 
      if (project && type === "edit") {
        await updateProject(project?.id, form)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false)
      window.location.reload()
    }
  }

  return (
    <form onSubmit={handleFormSubmit} className='flexStart form'>
      <div className='flexStart form_image-container'>
        <label htmlFor="poster" className='flexCenter form_image-label'>
          {!form.imageUrl && 'Choose a poster for your project'}
        </label>
        <input
          type="file"
          id='image'
          accept='image'
          required={type === 'create'}
          className='form_image-input'
          onChange={handleChangeImage} />

        {form.imageUrl && (
          <Image
            src={form?.imageUrl}
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
        title="Website URL"
        state={form.liveSiteUrl}
        placeholder="https://github.com/KamaProgman"
        setState={(value) => handleStateChange('liveSiteUrl', value)}
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