import { useEffect, useState } from 'react';
import { fetchUserById, User } from '../api/users';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetails = () => {
	const id = useParams().id || '';
	const [user, setUser] = useState<User | null>(null);

	const navigate = useNavigate();

	useEffect(() => {
		const loadUser = async () => {
			const data = await fetchUserById(id);
			setUser(data);
		};
		loadUser();
	}, []);

	if (!user) return <div>Loading...</div>;

	const handleBack = () => {
		navigate('/users');
	};

	return (
		<div>
			<h3>{user.name}</h3>
			<p>Email: {user.email}</p>
			<p>Roles: {user.roles.join(', ')}</p>
			
			<button onClick={handleBack}>Retour à la liste des utilisateurs</button>
		</div>
	);
};

export default UserDetails;
