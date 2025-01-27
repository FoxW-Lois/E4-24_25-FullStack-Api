import { useEffect, useState } from 'react';
import { fetchProjects } from '../api/projects';
import { useNavigate } from 'react-router-dom';

// Type pour représenter un projet
interface Project {
	_id: string;
	name: string;
}

const ProjectList = () => {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		const loadProjects = async () => {
			const data = await fetchProjects();
			setProjects(data);
		};
		loadProjects();
	}, []);

	const navigate = useNavigate();
	function onSelectProject(id: string) {
		navigate(`/projects/${id}`);
	}

	return (
		<div>
			<h2>Liste des projets</h2>
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
