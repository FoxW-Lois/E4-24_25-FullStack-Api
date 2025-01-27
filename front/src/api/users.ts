import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/users';

// Type pour représenter un utilisateur
export interface User {
	_id: string;
	name: string;
	email: string;
	roles: string[]; // Liste des rôles de l'utilisateur
}

// Fonction pour récupérer tous les utilisateurs
export const fetchUsers = async (): Promise<User[]> => {
	const response = await axios.get<User[]>(API_BASE_URL);
	return response.data;
};

// Fonction pour récupérer un utilisateur spécifique par ID
export const fetchUserById = async (id: string): Promise<User> => {
	const response = await axios.get<User>(`${API_BASE_URL}/${id}`);
	return response.data;
};
