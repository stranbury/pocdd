import React, { useState, useEffect } from 'react';

// Replace with API call to fetch users
const fetchUsers = async () => {
  return [
    { id: 1, name: 'User 1', email: 'user1@example.com' },
    { id: 2, name: 'User 2', email: 'user2@example.com' },
    { id: 3, name: 'User 3', email: 'user3@example.com' },
  ];
};

// Replace with API call to create a user
const createUser = async (user) => {
  console.log('Creating user:', user);
  return true;
};

// Replace with API call to update a user
const updateUser = async (user) => {
  console.log('Updating user:', user);
  return true;
};

// Replace with API call to delete a user
const deleteUser = async (userId) => {
  console.log('Deleting user with ID:', userId);
  return true;
};

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    }
    loadUsers();
  }, []);

  const handleCreateUser = async (user) => {
    if (await createUser(user)) {
      setUsers([...users, user]);
    }
  };

  const handleUpdateUser = async (user) => {
    if (await updateUser(user)) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    }
  };

  const handleDeleteUser = async (userId) => {
    if (await deleteUser(userId)) {
      setUsers(users.filter((u) => u.id !== userId));
    }
  };

  return (
    <div className="container mx-auto py-16 px-4 font-sans">
      <h2 className="text-3xl font-semibold mb-8">User Management</h2>

      {/* User list */}
      <div className="w-full mb-6">
        <h3 className="text-xl font-semibold mb-4">Users</h3>
        <ul className="divide-y divide-gray-300">
          {users.map((user) => (
            <li key={user.id} className="py-4">
              {user.name} ({user.email})
              <button onClick={() => setSelectedUser(user)}>Edit</button>
              <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>

      {/* User form */}
      <div className="w-full">
        <h3 className="text-xl font-semibold mb-4">
          {selectedUser ? `Editing User: ${selectedUser.name}` : 'Create New User'}
        </h3>
        <UserForm
          user={selectedUser}
          onSubmit={selectedUser ? handleUpdateUser : handleCreateUser}
          onCancel={() => setSelectedUser(null)}
        />
      </div>
    </div>
  );
};

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

    const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: user?.id,
      name,
      email,
    });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex flex-wrap mb-6">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
          Name:
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-wrap mb-6">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="flex flex-wrap">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {user ? 'Update User' : 'Create User'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="ml-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UsersPage;

