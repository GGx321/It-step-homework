import React from 'react';

interface User {
  id: number;
  name: string;
  age: number;
}

interface UserItemProps {
  user: User;
  onUserClick: (user: User) => void;
}

// React.memo для оптимізації - компонент перерендериться
// тільки якщо змінились пропси
const UserItem = React.memo(({ user, onUserClick }: UserItemProps) => {
  console.log(`UserItem рендериться для користувача: ${user.name}`);

  return (
    <div className="rounded-lg border bg-white p-3">
      <button
        onClick={() => onUserClick(user)}
        className="font-medium text-blue-600 underline hover:text-blue-800"
      >
        {user.name}
      </button>
      <span className="ml-2 text-gray-600">({user.age} років)</span>
    </div>
  );
});

UserItem.displayName = 'UserItem';

export default UserItem;
