import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/tasks';

// Type pour représenter une tâche
export interface Task {
	_id: string;
	title: string;
	description: string;
	status: string;
	sprint: string; // Lien vers le sprint appartenant à la tâche
	createdAt: string;
	updatedAt: string;
}

// Fonction pour récupérer toutes les tâches
export const fetchTasks = async (): Promise<Task[]> => {
	const response = await axios.get<Task[]>(API_BASE_URL);
	return response.data;
};

// Fonction pour récupérer une tâche spécifique par ID
export const fetchTaskById = async (id: string): Promise<Task> => {
	const response = await axios.get<Task>(`${API_BASE_URL}/${id}`);
	return response.data;
};

// Fonction pour créer une nouvelle tâche
export const createTask = async (taskData: Omit<Task, '_id'>): Promise<void> => {
	await axios.post(`${API_BASE_URL}/sprint`, taskData);
};

// Fonction pour mettre à jour une tâche existante
export const updateTask = async (id: string, taskData: Partial<Task>): Promise<void> => {
	await axios.put(`${API_BASE_URL}/${id}`, taskData);
};

// Fonction pour supprimer une tâche
export const deleteTask = async (id: string): Promise<void> => {
	await axios.delete(`${API_BASE_URL}/${id}`);
};
