import { ProjectInterface } from "@/common.types";
import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/actions";
import React from "react";

type SearchParams = {
  category?: string | null;
}
type props = {
  searchParams: SearchParams
}

const Home: React.FC<props> = async ({ searchParams: { category } }) => {
  const data = await getProjects(category)

  if (data.length === 0) {
    return (
      <div className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No projects found, go create some</p>
      </div>
    )
  }

  return (
    <section className="flex flex-col paddings mb-16">
      <Categories />
      <section className="projects-grid">
        {data?.map((project: ProjectInterface) => (
          <ProjectCard
            key={project?.id}
            id={project?.id}
            image={project?.imageUrl}
            title={project?.title}
            name={project?.createdBy?.name}
            avatarUrl={project?.createdBy?.avatarUrl}
            userId={project?.createdBy?.id}
          />
        ))}
      </section>

    </section>
  );
}

export default Home;