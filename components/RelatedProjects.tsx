import { ProjectInterface } from '@/common.types';
import { getUserProjects } from '@/lib/actions';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

interface props {
  userId: string;
  projectId: string;
  userName: string;
}

const RelatedProjects: React.FC<props> = async ({ userId, projectId, userName }) => {
  const projects = await getUserProjects(userId)

  return (
    <section className='flex flex-col mt-32 w-full'>
      <div className='flexBetween'>
        <p className='text-base font-bold'>
          More by {userName}
        </p>
        <Link href={`/profile/${userId}`} className='text-primary-purple text-base'>
          View All
        </Link>
      </div>

      <div className="related_projects-grid">
        {projects?.map((project: ProjectInterface) => (
          <div key={project.id} className='flexCenter related_project-card drop-shadow-card'>
            <Link href={`/project/${project?.id}`} className='flexCenter group relative  w-full h-full'>
              <Image
                src={project?.imageUrl}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="project image"
              />

              <div className='hidden group-hover:flex related_project-card_title'>
                <p className='w-full'>{project?.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default RelatedProjects