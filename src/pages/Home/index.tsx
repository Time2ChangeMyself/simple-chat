import { Chat, Sidebar } from '../../modules/home';

export const Home = () => {
  return (
    <div className="w-3/5 h-4/5 border-white border-2 rounded-2xl grid grid-cols-6 overflow-hidden">
      <Sidebar />
      <Chat />
    </div>
  );
};
