import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/projects';

// Type pour représenter un projet
export interface Project {
  _id: string;
  name: string;
  description?: string;
  leader?: {
    _id: string;
    name: string;
    email: string;
  };
}

// Fonction pour récupérer tous les projets
export const fetchProjects = async (): Promise<Project[]> => {
  const response = await axios.get<Project[]>(API_BASE_URL);
  return response.data;
};

// Fonction pour récupérer un projet spécifique par ID
export const fetchProjectById = async (id: string): Promise<Project> => {
  const response = await axios.get<Project>(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Fonction pour créer un projet
export const createProject = async (projectData: Partial<Project>): Promise<Project> => {
  const response = await axios.post<Project>(API_BASE_URL, projectData);
  return response.data;
};

// Fonction pour mettre à jour un projet
export const updateProject = async (id: string, projectData: Partial<Project>): Promise<Project> => {
  const response = await axios.put<Project>(`${API_BASE_URL}/${id}`, projectData);
  return response.data;
};

// Fonction pour supprimer un projet
export const deleteProject = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
