import { useEffect, useState } from 'react';
import { fetchTasks, Task } from '../api/tasks';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const TaskList = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const loadTasks = async () => {
			const data = await fetchTasks();
			setTasks(data);
		};
		loadTasks();
	}, []);

	const navigate = useNavigate();
	function onSelectTask(id: string) {
		navigate(`/tasks/${id}`);
	}

	return (
		<Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
			<Typography variant="h6" gutterBottom>
				Liste des tâches
			</Typography>
			{tasks.map((task) => (
				<Card key={task._id} sx={{ mb: 2 }}>
					<CardContent>
						<Typography variant="body1">{task.title}</Typography>
						<Button
							variant="outlined"
							color="primary"
							onClick={() => onSelectTask(task._id)}
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

export default TaskList;
