import { useState } from 'react';
import ProjectList from '../components/ProjectList';
import ProjectForm from '../components/ProjectForm';

const ProjectsPage = () => {
	const [isCreating, setIsCreating] = useState<boolean>(false);

	const handleBackToList = () => {
		setIsCreating(false);
	};

	return (
		<div style={{ padding: '20px' }}>
			<h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Projects Management</h1>
			{isCreating ? (
				<div>
					{/* Affiche le formulaire pour créer un projet */}
					<ProjectForm onSuccess={handleBackToList} />
					<button onClick={handleBackToList} style={{ marginTop: '10px' }}>
						Annuler
					</button>
				</div>

			) : (
				<div>
					{/* Affiche la liste des projets */}
					<ProjectList />

					<button onClick={() => setIsCreating(true)} style={{ display: 'block', margin: '20px auto' }}>
						Nouveau projet
					</button>
				</div>
			)}
		</div>
	);
};

export default ProjectsPage;
