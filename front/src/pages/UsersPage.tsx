import UserList from '../components/UserList';

const UsersPage = () => {

	return (
		<div style={{ padding: '20px' }}>
			<h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Users Management</h1>
			<div>
				{/* Liste des utilisateurs */}
				<UserList />
			</div>
		</div>
	);
};

export default UsersPage;
