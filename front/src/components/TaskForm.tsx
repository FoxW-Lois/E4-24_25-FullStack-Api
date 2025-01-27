import React, { useState } from 'react';
import { createTask, updateTask, Task } from '../api/tasks';
import { useNavigate, useParams } from 'react-router-dom';

interface TaskFormProps {
	task?: Task; // Si une tâche est fournie, cela permettra de modifier une tâche existante
}

const TaskForm: React.FC<TaskFormProps> = ({ task }) => {
	const [title, setTitle] = useState(task ? task.title : '');
	const [description, setDescription] = useState(task ? task.description : '');
	const [status, setStatus] = useState(task ? task.status : 'New');
	const [sprint, setSprint] = useState(task ? task.sprint : '');
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const taskData = { title, description, status, sprint, createdAt: '', updatedAt: '' };

		if (task) {
			// Si une tâche existe, on effectue une mise à jour
			await updateTask(task._id, taskData);
		} else {
			// Sinon, on crée une nouvelle tâche
			await createTask(taskData);
		}

		navigate('/tasks'); // Redirection vers la liste des tâches
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Title</label>
				<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
			</div>
			<div>
				<label>Description</label>
				<textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
			</div>
			<div>
				<label>Status</label>
				<select value={status} onChange={(e) => setStatus(e.target.value)}>
					<option value="New">New</option>
					<option value="In Progress">In Progress</option>
					<option value="Completed">Completed</option>
				</select>
			</div>
			<div>
				<label>Sprint</label>
				<input type="text" value={sprint} onChange={(e) => setSprint(e.target.value)} required />
			</div>
			<button type="submit">{task ? 'Update Task' : 'Create Task'}</button>
		</form>
	);
};

export default TaskForm;
