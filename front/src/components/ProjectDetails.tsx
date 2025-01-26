import React, { useEffect, useState } from 'react';
import { fetchProjectById } from '../api/projects';

interface Project {
  _id: string;
  name: string;
  description: string;
  leader: {
    name: string;
  };
}

interface ProjectDetailsProps {
  projectId: string;
  onBack: () => void;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ projectId, onBack }) => {
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const loadProject = async () => {
      const data = await fetchProjectById(projectId);
      setProject(data as Project); //setProject(data) has error
    };
    loadProject();
  }, [projectId]);

  if (!project) return <div>Loading...</div>;

  return (
    <div>
      <h3>{project.name}</h3>
      <p>Leader: {project.leader.name}</p>
      <p>Description: {project.description}</p>
      <button onClick={onBack}>Back to List</button>
    </div>
  );
};

export default ProjectDetails;
