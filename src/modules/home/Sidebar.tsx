import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../common/components';
import { UsersList } from './UsersList';

export const Sidebar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string | undefined>();

  const handleInputChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearch(value);
  };

  const handleLogout = () => {
    navigate({ pathname: '/' });
  };

  return (
    <div className="col-span-2 bg-blue-500 text-red-400 ">
      <div className="flex justify-center gap-4 items-center py-3 border-b-2">
        <div className="text-xl font-bold">Simple-Chat</div>
        <div>Avatar and name</div>
        <button
          className="text-black bg-white p-1 rounded"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
      <TextInput
        value={search}
        onChange={handleInputChange}
        name="search"
        placeholder="Search"
      />
      <UsersList />
    </div>
  );
};
