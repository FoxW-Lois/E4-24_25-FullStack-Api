import React, { useState } from 'react';
import { createProject, updateProject } from '../api/projects';

interface ProjectFormProps {
	projectId?: string;
	onSuccess: () => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ projectId, onSuccess }) => {
	const [formData, setFormData] = useState({ name: '', description: '' });

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (projectId) {
			await updateProject(projectId, formData);
		} else {
			await createProject(formData);
		}
		onSuccess();
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<form onSubmit={handleSubmit}>
			<input name="name" value={formData.name} onChange={handleChange} placeholder="Nom du projet" />
			<textarea
				name="description"
				value={formData.description}
				onChange={handleChange}
				placeholder="Description du projet"
			/>
			<button type="submit">{projectId ? 'Mettre à jour' : 'Créer'} Projet</button>
		</form>
	);
};

export default ProjectForm;
