import { useEffect, useState } from 'react';
import { fetchTasks, Task } from '../api/tasks';
import { useNavigate } from 'react-router-dom';

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
		<div>
			<h2>Tâches</h2>
			<ul>
				{tasks.map((task) => (
					<li key={task._id}>
						<span>{task.title}</span>
						<button onClick={() => onSelectTask(task._id)}>Details</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskList;
