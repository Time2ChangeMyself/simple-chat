import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormContext, FormContextInterface } from '../../context/FormContext';
import { FormWrap, TextInput } from '../common/components/';

export const LoginForm = () => {
  const { formValue, handleFormValueChange } = useContext(
    FormContext,
  ) as FormContextInterface;

  const navigate = useNavigate();

  return (
    <FormWrap
      handleSubmit={() => {
        navigate({ pathname: '/home' });
      }}
    >
      <TextInput
        name="email"
        onChange={handleFormValueChange}
        placeholder="email"
        value={formValue.email}
        type="email"
      />

      <TextInput
        type="password"
        name="password"
        onChange={handleFormValueChange}
        placeholder="password"
        value={formValue.password}
      />
      <button
        className="bg-sky-700 p-2 rounded active:drop-shadow-xl mt-auto w-full"
        type="submit"
      >
        Sign Up
      </button>

      <p className="font-light text-pink-500 mt-auto">
        Already have an account?{' '}
        <Link className="text-purple-700 hover:underline" to="/regist">
          Sign In
        </Link>
      </p>
    </FormWrap>
  );
};
