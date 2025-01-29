import React, { useState } from 'react';
import { createProject, updateProject } from '../api/projects';
import { Button, Box, TextField } from '@mui/material';

interface ProjectFormProps {
	projectId?: string;
	onSuccess: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectId, onSuccess }) => {
	const [formData, setFormData] = useState({ name: '', description: '' });
	console.log(formData);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (projectId) {
			// Si projet existe, mise à jour
			await updateProject(projectId, formData);
		} else {
			// Sinon nouveau projet
			await createProject(formData);
		}
		onSuccess();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{ maxWidth: 600, margin: 'auto', mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
		>
			<TextField
				label="Nom du projet"
				name="name"
				value={formData.name}
				onChange={handleChange}
				fullWidth
				required
			/>
			<TextField
				label="Description du projet"
				name="description"
				value={formData.description}
				onChange={handleChange}
				fullWidth
				multiline
				rows={4}
				required
			/>
			<Button type="submit" variant="contained" color="primary">
				{projectId ? 'Mettre à jour' : 'Créer'} Projet
			</Button>
		</Box>
	);
};

export default ProjectForm;
