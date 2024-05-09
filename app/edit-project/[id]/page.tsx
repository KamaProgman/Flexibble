import { ProjectInterface } from '@/common.types';
import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';
import { getProjectDetails } from '@/lib/actions';
import { getCurrentUser } from '@/lib/session';
import { redirect } from 'next/navigation';
import React from 'react';

type params = {
  params: {
    id: string
  }
}

const EditProject: React.FC<params> = async ({ params: { id } }) => {
  let session = await getCurrentUser()
  if (!session?.user) redirect('/')

  const result = await getProjectDetails(id) as ProjectInterface

  return (
    <Modal >
      <h3 className='modal-head-text'>Edit Project</h3>
      <ProjectForm type="edit" session={session} project={result} />
    </Modal>
  )
}

export default EditProject;