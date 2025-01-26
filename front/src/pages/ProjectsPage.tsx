import React, { useState } from 'react';
import ProjectList from '../components/ProjectList';
import ProjectDetails from '../components/ProjectDetails';
import ProjectForm from '../components/ProjectForm';

const ProjectsPage = () => {
  // const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleBackToList = () => setSelectedProjectId(null);

  return (
    <div>
      {/* {!selectedProjectId && <ProjectList onSelectProject={setSelectedProjectId} />} */}
	    {!selectedProjectId && <ProjectList onSelectProject={(id) => setSelectedProjectId(id)} />}
      {selectedProjectId && (
        <ProjectDetails projectId={selectedProjectId} onBack={handleBackToList} />
      )}
    </div>
  );
};

export default ProjectsPage;
