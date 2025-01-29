import React, { useState } from 'react';
import { createTask, updateTask } from '../api/tasks';
import { Button, Box, TextField } from '@mui/material';

interface TaskFormProps {
	taskId?: string;
	onSuccess: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskId, onSuccess }) => {
	const [formTaskData, setFormTaskData] = useState({ title: '', description: '', status: '' });
	console.log(formTaskData);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (taskId) {
			// Si tâche existe, mise à jour
			await updateTask(taskId, formTaskData);
		} else {
			// Sinon nouvelle tâche
			await createTask(formTaskData);
		}
		onSuccess();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target;
		setFormTaskData({ ...formTaskData, [name]: value });
	};

	// return (
	// 	<form onSubmit={handleSubmit}>
	// 		<input name="title" value={formTaskData.title} onChange={handleChange} placeholder="Titre de la tâche" />
	// 		<textarea
	// 			name="description"
	// 			value={formTaskData.description}
	// 			onChange={handleChange}
	// 			placeholder="Description de la tâche"
	// 		/>
	// 		{/* <input name="status" value={formTaskData.status} onChange={handleChange} placeholder="Status de la tâche" /> */}
	// 		<select name="status" value={formTaskData.status} onChange={handleChange}>
	// 			<option value="New">New</option>
	// 			<option value="In Progress">In Progress</option>
	// 			<option value="Completed">Completed</option>
	// 		</select>
	// 		<button type="submit">{taskId ? 'Mettre à jour' : 'Créer'} Tâche</button>
	// 	</form>
	// );

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ maxWidth: 600, margin: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
		>
			<TextField
				label="Titre de la tâche"
				name="title"
				value={formTaskData.title}
				onChange={handleChange}
				fullWidth
				required
			/>
			<TextField
				label="Description de la tâche"
				name="description"
				value={formTaskData.description}
				onChange={handleChange}
				fullWidth
				multiline
				rows={4}
				required
			/>

			{/* <Select name="status" value={formTaskData.status} onChange={handleChange} fullWidth>
			<MenuItem value="New">New</MenuItem>
			<MenuItem value="In Progress">In Progress</MenuItem>
			<MenuItem value="Completed">Completed</MenuItem>
		  </Select> */}
			<select name="status" value={formTaskData.status} onChange={handleChange}>
				<option value="New">New</option>
				<option value="In Progress">In Progress</option>
				<option value="Completed">Completed</option>
			</select>

			<Button type="submit" variant="contained" color="primary">
				{taskId ? 'Mettre à jour' : 'Créer'} Tâche
			</Button>
		</Box>
	);
};

export default TaskForm;
