import { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { UnauthPagesWrap } from './modules/common/components/UnauthPagesWrap';
import { Login, Regist, Home } from './pages';
import { Protected } from './modules/common/components/Protected';

export const AppRoutes = () => {
  const currentUser = useContext(AuthContext);
  console.log(currentUser);

  return (
    <Routes>
      <Route element={<UnauthPagesWrap />}>
        <Route path="/" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route
          path="/home"
          element={
            <Protected
              isAccessible={Boolean(currentUser)}
              accessibleLevel={true}
              to="/"
            >
              <Home />
            </Protected>
          }
        />
      </Route>
    </Routes>
  );
};
