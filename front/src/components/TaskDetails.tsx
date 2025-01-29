import { useEffect, useState } from 'react';
import { fetchTaskById, Task } from '../api/tasks';
import { useParams, useNavigate } from 'react-router-dom';

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
		<div>
			<h3>{task.title}</h3>
			<p>Description : {task.description}</p>
			<p>Status : {task.status}</p>
			{/* <p>Projet : {task.project}</p> */}

			<button onClick={handleBack}>Retour à la liste des tâches</button>
		</div>
	);
};

export default TaskDetails;
