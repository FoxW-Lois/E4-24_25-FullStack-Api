import React, { useEffect, useState } from 'react';
import { fetchUsers, User } from '../api/users';

// Type pour les props du composant
interface UserListProps {
  onSelectUser: (id: string) => void;
}

const UserList: React.FC<UserListProps> = ({ onSelectUser }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      const data = await fetchUsers();
      setUsers(data);
    };
    loadUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
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
