import { AppRoutes } from './AppRoutes';
import { FormContextProvider } from './context/FormContext';

function App() {
  return (
    <FormContextProvider>
      <AppRoutes />
    </FormContextProvider>
  );
}

export default App;
