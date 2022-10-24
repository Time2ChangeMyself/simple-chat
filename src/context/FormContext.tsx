import { createContext, FC, ReactNode, ChangeEvent, useState } from 'react';

// const initialValue = {
//   name: '',
//   password: '',
//   email: '',
//   avatar: '',
// };

interface IFormValue {
  name?: string;
  password?: string;
  email?: string;
  avatar?: string;
}

export interface FormContextInterface {
  formValue: IFormValue;
  handleFormValueChange: (e: ChangeEvent) => void;
}

interface IFormContextProvider {
  children: ReactNode | ReactNode[];
}

export const FormContext = createContext<FormContextInterface | null>(null);

export const FormContextProvider: FC<IFormContextProvider> = ({ children }) => {
  const [formValue, setFormValue] = useState<IFormValue>({});

  const handleFormValueChange = (e: ChangeEvent): void => {
    const { value, name, type } = e.target as HTMLInputElement;

    if (type === 'file') return;

    setFormValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const FormContextValue: FormContextInterface = {
    formValue,
    handleFormValueChange,
  };

  return (
    <FormContext.Provider value={FormContextValue}>
      {children}
    </FormContext.Provider>
  );
};
