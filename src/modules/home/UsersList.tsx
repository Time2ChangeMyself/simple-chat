import Avatar from '../../assets/img/avatar.png';

const users = [
  { name: 'name', avatar: Avatar },
  { name: 'name', avatar: Avatar },
  { name: 'name', avatar: Avatar },
];

const displayedUsers = users.map((el, index) => (
  <li
    key={index}
    className="w-full flex gap-5 items-center p-5 hover:bg-slate-500 cursor-pointer"
  >
    <img className="w-20 object-contain" src={el.avatar} alt="" />
    <div>
      <p>{el.name}</p>
      <p>last message</p>
    </div>
  </li>
));

export const UsersList = () => {
  return (
    <div className="h-full overflow-y-auto ">
      <ul className="w-full flex flex-col">{displayedUsers}</ul>
    </div>
  );
};
