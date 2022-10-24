import { ChangeEvent, useState } from 'react';
import { TextInput } from '../common/components';

export const Sidebar = () => {
  const [search, setSearch] = useState<string | undefined>();
  const handleInputChange = (e: ChangeEvent) => {
    const { value } = e.target as HTMLInputElement;
    setSearch(value);
  };

  return (
    <div className="col-span-2 bg-blue-500 text-red-400 ">
      <div className="flex justify-center gap-4 items-center py-3 border-b-2">
        <div className="text-xl font-bold">Simple-Chat</div>
        <div>Avatar and name</div>
      </div>
      <TextInput
        value={search}
        onChange={handleInputChange}
        name="search"
        placeholder="Search"
      />
    </div>
  );
};
