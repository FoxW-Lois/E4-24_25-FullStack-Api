import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../api/projects';

// Type pour représenter un projet
interface Project {
  _id: string;
  name: string;
}

interface ProjectListProps {
  onSelectProject: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    loadProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <span>{project.name}</span>
            <button onClick={() => onSelectProject(project._id)}>Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
