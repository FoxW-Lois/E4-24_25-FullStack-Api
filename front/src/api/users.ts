import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api/users';

export interface User {
	_id: string;
	name: string;
	email: string;
	roles: string[]; // Liste rôles de l'utilisateur
}

// Récupère tous les utilisateurs
export const fetchUsers = async (): Promise<User[]> => {
	const response = await axios.get<User[]>(API_BASE_URL);
	return response.data;
};

// Récupère un utilisateur par ID
export const fetchUserById = async (id: string): Promise<User> => {
	const response = await axios.get<User>(`${API_BASE_URL}/${id}`);
	return response.data;
};
