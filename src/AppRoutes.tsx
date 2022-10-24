import { Route, Routes } from 'react-router-dom';
import { UnauthPagesWrap } from './modules/common/components/UnauthPagesWrap';
import { Login, Regist, Home } from './pages';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<UnauthPagesWrap />}>
        <Route path="/" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
};
