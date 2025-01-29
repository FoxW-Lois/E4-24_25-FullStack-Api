import { useEffect, useState } from 'react';
import { fetchTaskById, Task } from '../api/tasks';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

const TaskDetails = () => {
	const id = useParams().id || '';
	const [task, setTask] = useState<Task | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const loadTask = async () => {
			const data = await fetchTaskById(id);
			setTask(data as Task);
		};
		loadTask();
	}, []);

	if (!task) return <div>Loading...</div>;

	const handleBack = () => {
		navigate('/tasks');
	};

	return (
		<Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					{task.title}
				</Typography>
				<Typography variant="body1" color="text.secondary" paragraph>
					Description: {task.description}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Status: {task.status}
				</Typography>
				<Button variant="contained" color="secondary" onClick={handleBack} sx={{ mt: 2 }}>
					Retour à la liste des tâches
				</Button>
			</CardContent>
		</Card>
	);
};

export default TaskDetails;
