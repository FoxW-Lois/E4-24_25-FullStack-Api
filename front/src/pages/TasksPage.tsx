import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import { Typography, Button, Box, Container } from '@mui/material';

const TasksPage = () => {
	const [isCreating, setIsCreating] = useState<boolean>(false);

	const handleBackToList = () => {
		setIsCreating(false);
	};

	return (
		<Container maxWidth="md">
			<Box textAlign="center" my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Tâches
				</Typography>
			</Box>
			{isCreating ? (
				<Box textAlign="center">
					<TaskForm onSuccess={handleBackToList} />
					<Button variant="contained" color="secondary" onClick={handleBackToList} sx={{ mt: 2 }}>
						Annuler
					</Button>
				</Box>
			) : (
				<Box textAlign="center">
					<TaskList />
					<Button variant="contained" color="primary" onClick={() => setIsCreating(true)} sx={{ mt: 3 }}>
						Nouvelle tâche
					</Button>
				</Box>
			)}
		</Container>
	);
};

export default TasksPage;
