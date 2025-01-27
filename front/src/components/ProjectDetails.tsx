import { useEffect, useState } from 'react';
import { fetchProjectById } from '../api/projects';
import { useParams } from 'react-router-dom';

interface Project {
	_id: string;
	name: string;
	description: string;
	leader: {
		name: string;
	};
}

const ProjectDetails = () => {
	const [project, setProject] = useState<Project | null>(null);

	const id = useParams().id || '';

	useEffect(() => {

		const loadProject = async () => {
			const data = await fetchProjectById(id);
			setProject(data as Project);
		};
		loadProject();
	}, []);

	if (!project) return <div>Loading...</div>;

	return (
		<div>
			<h3>{project.name}</h3>
			<p>Description: {project.description}</p>
			{/* <p>Leader: {project.leader.name}</p> */}
		</div>
	);
};

export default ProjectDetails;
