import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormContext, FormContextInterface } from '../../context/FormContext';
import { TextInput } from '../common/components';
import { FormWrap } from '../common/components/FormWrap';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage, db } from '../../server/firebase';
import { doc, setDoc } from 'firebase/firestore';

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: 'image/jpeg',
};

export const RegistrationForm = () => {
  const { formValue, handleFormValueChange } = useContext(
    FormContext,
  ) as FormContextInterface;

  console.log(formValue);

  const handleFormSubmit = async () => {
    if (formValue.email === undefined || formValue.password === undefined)
      return;
    if (formValue.email === '' || formValue.password === '') return;

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        formValue.email,
        formValue.password,
      );

      if (formValue.file !== undefined) {
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, formValue.name);
        const uploadTask = uploadBytesResumable(
          storageRef,
          formValue.file,
          metadata,
        );

        uploadTask.on('state_changed', async () => {
          // Upload completed successfully, now we can get the download URL
          await getDownloadURL(uploadTask.snapshot.ref).then(
            async (downloadURL) => {
              await updateProfile(res.user, {
                displayName: formValue.name,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, 'users', res.user.uid), {
                uid: res.user.uid,
                displayName: formValue.name,
                email: formValue.email,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, 'userChat', res.user.uid), {});
            },
          );
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormWrap handleSubmit={handleFormSubmit}>
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
        filename={formValue.file?.name}
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
