import { useEffect, useState } from 'react';
import { fetchUsers, User } from '../api/users';
import { useNavigate } from 'react-router-dom';

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
		<div>
			<h2>Utilisateurs</h2>
			<ul>
				{users.map((user) => (
					<li key={user._id}>
						<span>{user.name} - {user.email}</span>
						<button onClick={() => onSelectUser(user._id)}>Details</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default UserList;
