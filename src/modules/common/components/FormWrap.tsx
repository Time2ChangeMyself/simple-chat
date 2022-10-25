import { ReactElement, FormEvent } from 'react';

interface IFormWrap {
  children: ReactElement | ReactElement[];
  handleSubmit: () => void;
}

export const FormWrap = ({ children, handleSubmit }: IFormWrap) => {
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmit();
  };

  return (
    <form
      onSubmit={onSubmit}
      autoComplete="off"
      className="bg-white bg-opacity-80 shadow-[0_0_10px_2px] shadow-teal-400 p-4 h-fit min-h-[300px] w-96 rounded-md flex flex-col justify-start items-center gap-2"
    >
      {children}
    </form>
  );
};
