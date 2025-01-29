import React, { useState } from 'react';
import { createTask, updateTask } from '../api/tasks';

interface TaskFormProps {
	taskId?: string;
	onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskId, onSuccess }) => {
	const [formTaskData, setFormTaskData] = useState({ title: '', description: '', status:'' });
	console.log(formTaskData);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (taskId) { // Si tâche existe, mise à jour
			await updateTask(taskId, formTaskData);
		} else { // Sinon nouvelle tâche
			await createTask(formTaskData);
		}
		onSuccess();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormTaskData({ ...formTaskData, [name]: value });
	};
	return (
		<form onSubmit={handleSubmit}>
			<input name="title" value={formTaskData.title} onChange={handleChange} placeholder="Titre de la tâche" />
			<textarea name="description" value={formTaskData.description} onChange={handleChange} placeholder="Description de la tâche" />
			<input name="status" value={formTaskData.status} onChange={handleChange} placeholder="Status de la tâche" />
			{/* <select value={formTaskData.status} onChange={handleChange}>
				<option value="New">New</option>
				<option value="In Progress">In Progress</option>
				<option value="Completed">Completed</option>
			</select> */}
			<button type="submit">{taskId ? 'Mettre à jour' : 'Créer'} Tâche</button>
		</form>
	);
};

export default TaskForm;
