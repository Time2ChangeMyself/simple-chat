import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormContext, FormContextInterface } from '../../context/FormContext';
import { TextInput } from '../common/components';
import { FormWrap } from '../common/components/FormWrap';

export const RegistrationForm = () => {
  const { formValue, handleFormValueChange } = useContext(
    FormContext,
  ) as FormContextInterface;

  return (
    <FormWrap handleSubmit={() => {}}>
      <TextInput
        name="name"
        onChange={handleFormValueChange}
        placeholder="display name"
        value={formValue.name}
      />

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

      <TextInput
        type="file"
        label="Avatar"
        name="file"
        onChange={handleFormValueChange}
        placeholder="file"
        value={formValue.avatar}
      />

      <button
        className="bg-sky-700 p-2 rounded active:drop-shadow-xl mt-auto w-full"
        type="submit"
      >
        Sign In
      </button>

      <p className="font-light text-pink-500 mt-auto">
        Don&apos;t have an account?{' '}
        <Link className="text-purple-700 hover:underline" to="/">
          Sign Up
        </Link>
      </p>
    </FormWrap>
  );
};
