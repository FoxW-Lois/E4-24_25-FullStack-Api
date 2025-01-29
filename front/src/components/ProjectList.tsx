import { useEffect, useState } from 'react';
import { fetchProjects, Project } from '../api/projects';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

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
		<Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
			<Typography variant="h6" gutterBottom>
				Liste des projets
			</Typography>
			{projects.map((project) => (
				<Card key={project._id} sx={{ mb: 2 }}>
					<CardContent>
						<Typography variant="body1">{project.name}</Typography>
						<Button
							variant="outlined"
							color="primary"
							onClick={() => onSelectProject(project._id)}
							sx={{ mt: 1 }}
						>
							Détails
						</Button>
					</CardContent>
				</Card>
			))}
		</Box>
	);
};

export default ProjectList;
