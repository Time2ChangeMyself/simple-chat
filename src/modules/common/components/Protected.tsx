import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

interface IProtected {
  isAccessible: boolean;
  accessibleLevel: boolean;
  children: ReactElement;
  to: string;
}

export function Protected({
  isAccessible,
  accessibleLevel,
  children,
  to,
}: IProtected) {
  if (isAccessible !== accessibleLevel) {
    return <Navigate to={to} />;
  }

  return children;
}
