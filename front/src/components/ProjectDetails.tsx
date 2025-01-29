import { useEffect, useState } from 'react';
import { fetchProjectById, Project } from '../api/projects';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

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
		<Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					{project.name}
				</Typography>
				<Typography variant="body1" color="text.secondary" paragraph>
					Description: {project.description}
				</Typography>
				<Button variant="contained" color="secondary" onClick={handleBack}>
					Retour à la liste des projets
				</Button>
			</CardContent>
		</Card>
	);
};

export default ProjectDetails;
