import React, { useEffect, useState } from 'react';
import { fetchTasks, Task } from '../api/tasks';
import { Link } from 'react-router-dom';

const TaskList: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	useEffect(() => {
		const loadTasks = async () => {
			const data = await fetchTasks();
			setTasks(data);
		};
		loadTasks();
	}, []);

	return (
		<div>
			<h2>Tasks</h2>
			<ul>
				{tasks.map((task) => (
					<li key={task._id}>
						<Link to={`/tasks/${task._id}`}>{task.title}</Link> - {task.status}
					</li>
				))}
			</ul>
		</div>
	);
};

export default TaskList;
