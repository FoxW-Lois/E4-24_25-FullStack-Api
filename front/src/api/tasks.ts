import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/tasks';

export interface Task {
	_id: string;
	title: string;
	description?: string;
	status?: string;
}

// Récupère toutes les tâches
export const fetchTasks = async (): Promise<Task[]> => {
	const response = await axios.get<Task[]>(API_BASE_URL);
	return response.data;
};

// Récupère une tâche par ID
export const fetchTaskById = async (id: string): Promise<Task> => {
	const response = await axios.get<Task>(`${API_BASE_URL}/${id}`);
	return response.data;
};

// Crée une nouvelle tâche
export const createTask = async (taskData: Partial<Task>): Promise<Task> => {
	const response = await axios.post<Task>(API_BASE_URL, taskData);
	return response.data;
};

// Met à jour une tâche
export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
	const response = await axios.put<Task>(`${API_BASE_URL}/${id}`, taskData);
	return response.data;
};

// Supprime une tâche
export const deleteTask = async (id: string): Promise<void> => {
	await axios.delete(`${API_BASE_URL}/${id}`);
};
