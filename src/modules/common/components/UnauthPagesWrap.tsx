import { Outlet } from 'react-router-dom';

export const UnauthPagesWrap = () => {
  return (
    <div className="bg-unauth-texture bg-no-repeat bg-auto w-full h-full">
      <div className="flex justify-center items-center w-full h-full">
        <Outlet />
      </div>
    </div>
  );
};
