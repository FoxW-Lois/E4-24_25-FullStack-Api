import { useEffect, useState } from 'react';
import { fetchProjectById, Project } from '../api/projects';
import { useParams, useNavigate } from 'react-router-dom';

const ProjectDetails = () => {
	const id = useParams().id || '';
	const [project, setProject] = useState<Project | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const loadProject = async () => {
			const data = await fetchProjectById(id);
			setProject(data as Project);
		};
		loadProject();
	}, []);

	if (!project) return <div>Loading...</div>;

	const handleBack = () => {
		navigate('/projects');
	};

	return (
		<div>
			<h3>{project.name}</h3>d
			<p>Description: {project.description}</p>
			{/* <p>Leader: {project.leader.name}</p> */}

			<button onClick={handleBack}>Retour à la liste des projets</button>
		</div>
	);
};

export default ProjectDetails;
