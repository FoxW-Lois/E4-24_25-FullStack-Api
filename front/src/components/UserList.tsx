import { useEffect, useState } from 'react';
import { fetchUsers, User } from '../api/users';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const UserList = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const loadUsers = async () => {
			const data = await fetchUsers();
			setUsers(data);
		};
		loadUsers();
	}, []);

	const navigate = useNavigate();
	function onSelectUser(id: string) {
		navigate(`/users/${id}`);
	}

	return (
		<Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
			<Typography variant="h6" gutterBottom>
				Liste des utilisateurs
			</Typography>
			{users.map((user) => (
				<Card key={user._id} sx={{ mb: 2 }}>
					<CardContent>
						<Typography variant="body1">
							{user.name} - {user.email}
						</Typography>
						<Button
							variant="outlined"
							color="primary"
							onClick={() => onSelectUser(user._id)}
							sx={{ mt: 1 }}
						>
							Détails
						</Button>
					</CardContent>
				</Card>
			))}
		</Box>
	);
};

export default UserList;
