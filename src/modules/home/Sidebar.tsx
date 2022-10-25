import { ChangeEvent, KeyboardEvent, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput } from '../common/components';
import { UsersList } from './UsersList';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../server/firebase';
import { AuthContext } from '../../context/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';

export const Sidebar = () => {
  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);
  const [search, setSearch] = useState<string>('');
  const [user, setUser] = useState<any>();
  console.log(user);

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('displayName', '==', search));

  const handleInputChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearch(value);
  };

  const handleSearch = async (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      try {
        const queryUsers = await getDocs(q);

        queryUsers.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (error) {
        console.log('no user');
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate({ pathname: '/' });
  };

  return (
    <div className="col-span-2 bg-blue-500 text-red-400 ">
      <div className="flex justify-center gap-4 items-center py-3 border-b-2">
        <div className=" font-bold text-sm">Simple-Chat</div>
        <img
          className="max-w-10 max-h-10 rounded-[50%]"
          src={currentUser?.photoURL ?? ''}
        />
        <p className="capitalize font-bold text-purple-100 underline">
          {currentUser?.displayName}
        </p>
        <button
          className="text-black bg-white p-1 rounded"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>
      <TextInput
        onKeyDown={handleSearch}
        value={search}
        onChange={handleInputChange}
        name="search"
        placeholder="Search"
      />
      <UsersList user={user} />
    </div>
  );
};
