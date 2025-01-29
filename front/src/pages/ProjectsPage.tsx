import { useState } from 'react';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';
import { Container, Box, Button, Typography } from '@mui/material';

const ProjectsPage = () => {
	const [isCreating, setIsCreating] = useState<boolean>(false);

	const handleBackToList = () => {
		setIsCreating(false);
	};

	return (
		<Container maxWidth="md">
			<Box textAlign="center" my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Gestion des Projets
				</Typography>
			</Box>
			{isCreating ? (
				<Box textAlign="center">
					<ProjectForm onSuccess={handleBackToList} />
					<Button variant="contained" color="secondary" onClick={handleBackToList} sx={{ mt: 2 }}>
						Annuler
					</Button>
				</Box>
			) : (
				<Box textAlign="center">
					<ProjectList />
					<Button variant="contained" color="primary" onClick={() => setIsCreating(true)} sx={{ mt: 3 }}>
						Nouveau projet
					</Button>
				</Box>
			)}
		</Container>
	);
};

export default ProjectsPage;
