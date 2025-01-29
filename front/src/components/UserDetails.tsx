import { useEffect, useState } from 'react';
import { fetchUserById, User } from '../api/users';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button } from '@mui/material';

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
		<Card sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					{user.name}
				</Typography>
				<Typography variant="body1" color="text.secondary">
					Email: {user.email}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Roles: {user.roles.join(', ')}
				</Typography>
				<Button variant="contained" color="secondary" onClick={handleBack} sx={{ mt: 2 }}>
					Retour à la liste des utilisateurs
				</Button>
			</CardContent>
		</Card>
	);
};

export default UserDetails;
