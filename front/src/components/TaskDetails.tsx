import { useEffect, useState } from 'react';
import { fetchTaskById, Task } from '../api/tasks';
import { useParams, useNavigate } from 'react-router-dom';

const TaskDetails = () => {
	const id = useParams().id || '';
	const [task, setTask] = useState<Task | null>(null);
	
	const navigate = useNavigate();

	useEffect(() => {
		const loadTask = async () => {
			if (id) {
				const data = await fetchTaskById(id);
				setTask(data);
			}
		};
		loadTask();
	}, [id]);

	if (!task) return <div>Loading...</div>;

	const handleBack = () => {
		navigate('/tasks');
	};

	return (
		<div>
			<h3>{task.title}</h3>
			<p>Description : {task.description}</p>
			<p>Status : {task.status}</p>
			{/* <p>Sprint : {task.sprint}</p> */}

			<button onClick={handleBack}>Back to Task List</button>
		</div>
	);
};

export default TaskDetails;
