import React, { useEffect, useState } from 'react';
import { fetchUserById, User } from '../api/users';

interface UserDetailsProps {
  userId: string;
  onBack: () => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ userId, onBack }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await fetchUserById(userId);
      setUser(data);
    };
    loadUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Roles: {user.roles.join(', ')}</p>
      <button onClick={onBack}>Back to List</button>
    </div>
  );
};

export default UserDetails;
