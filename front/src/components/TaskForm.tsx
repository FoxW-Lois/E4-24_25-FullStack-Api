import React, { useState } from 'react';
import { createTask, updateTask, Task } from '../api/tasks';

interface TaskFormProps {
	task?: Task; // Si une tâche est fournie, permet de modifier une tâche existante
	onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSuccess }) => {
	const [formTaskData, setFormTaskData] = useState({ title: '', description: '', status:'' });

	const [title, setTitle] = useState(task ? task.title : '');
	const [description, setDescription] = useState(task ? task.description : '');
	const [status, setStatus] = useState(task ? task.status : 'New');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		// const formTaskData = { title, description, status, sprint, createdAt: '', updatedAt: '' };

		if (task) { // Si tâche existe, mise à jour
			await updateTask(task._id, formTaskData);
		} else { // Sinon nouvelle tâche
			await createTask(formTaskData);
		}
		onSuccess();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { title, value } = e.target;
		setFormTaskData({ ...formTaskData, [title]: value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label>Titre</label>
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
			<button type="submit">{task ? 'Mettre à jour' : 'Créer'} Tâche</button>
		</form>
	);
};

export default TaskForm;
