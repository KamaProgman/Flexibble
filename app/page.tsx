import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { getCollection } from "@/lib/actions";

// ProjectIn

const Home = async () => {
  const data = await getCollection<ProjectInterface>('projects')

  if (data.length === 0) {
    return (
      <div className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">No projects found, go create some</p>
      </div>
    )
  }

  return (
    <section className="flex flex-col paddings mb-16">
      <h1>Categories</h1>
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
      <h1>LoadMore</h1>
    </section>
  );
}

export default Home;