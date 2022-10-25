import Avatar from '../../assets/img/avatar.png';

const users = [
  { displayName: 'name', photoURL: Avatar },
  { displayName: 'name', photoURL: Avatar },
  { displayName: 'name', photoURL: Avatar },
];

export const UsersList = ({ user }: any) => {
  const displayedUsers = [user, ...users].map(
    (el, index) =>
      Boolean(el) && (
        <li
          key={index}
          className="w-full flex gap-5 items-center p-5 hover:bg-slate-500 cursor-pointer first-of-type:border-b-2"
        >
          <img
            className="w-20 object-contain rounded-[50%]"
            src={el?.photoURL}
            alt=""
          />
          <div>
            <p className="text-xl text-purple-900 font-bold">
              {el?.displayName}
            </p>
            <p>last message</p>
          </div>
        </li>
      ),
  );

  return (
    <div className="h-full overflow-y-auto ">
      <ul className="w-full flex flex-col">{displayedUsers}</ul>
    </div>
  );
};
