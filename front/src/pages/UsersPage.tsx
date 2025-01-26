import React, { useState } from 'react';
import UserList from '../components/UserList';
import UserDetails from '../components/UserDetails';

const UsersPage: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  const handleSelectUser = (id: string) => {
    setSelectedUserId(id);
  };

  const handleBack = () => {
    setSelectedUserId(null);
  };

  return (
    <div>
      {!selectedUserId ? (
        <UserList onSelectUser={handleSelectUser} />
      ) : (
        <UserDetails userId={selectedUserId} onBack={handleBack} />
      )}
    </div>
  );
};

export default UsersPage;
