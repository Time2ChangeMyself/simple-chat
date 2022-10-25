import { AppRoutes } from './AppRoutes';
import { AuthContextProvider } from './context/AuthContext';
import { FormContextProvider } from './context/FormContext';

function App() {
  return (
    <AuthContextProvider>
      <FormContextProvider>
        <AppRoutes />
      </FormContextProvider>
    </AuthContextProvider>
  );
}

export default App;
