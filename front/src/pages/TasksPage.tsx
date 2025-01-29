import { useState } from 'react';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TasksPage = () => {
	const [isCreating, setIsCreating] = useState<boolean>(false);

	const handleBackToList = () => {
		setIsCreating(false);
	};

	return (
		<div style={{ padding: '20px' }}>
			<h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Tasks Management</h1>
			{isCreating ? (
				<div>
					{/* Formulaire créer une tâche */}
					<TaskForm onSuccess={handleBackToList} />
					<button onClick={handleBackToList} style={{ marginTop: '10px' }}>
						Annuler
					</button>
				</div>
			) : (
				<div>
					{/* Liste des tâches */}
					<TaskList />

					<button onClick={() => setIsCreating(true)} style={{ display: 'block', margin: '20px auto' }}>
						Nouvelle tâche
					</button>
				</div>
			)}
		</div>
	);
};

export default TasksPage;
