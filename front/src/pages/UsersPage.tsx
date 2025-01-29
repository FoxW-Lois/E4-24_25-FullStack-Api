import UserList from '../components/UserList';
import { Typography, Box, Container } from '@mui/material';

const UsersPage = () => {
	return (
		<Container maxWidth="md">
			<Box textAlign="center" my={4}>
				<Typography variant="h4" component="h1" gutterBottom>
					Gestion des Utilisateurs
				</Typography>
			</Box>
			<UserList />
		</Container>
	);
};

export default UsersPage;
