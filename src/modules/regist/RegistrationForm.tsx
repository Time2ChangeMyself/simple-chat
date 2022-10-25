import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormContext, FormContextInterface } from '../../context/FormContext';
import { TextInput } from '../common/components';
import { FormWrap } from '../common/components/FormWrap';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { auth, storage, db } from '../../server/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { metadata } from '../../types/metadata';

export const RegistrationForm = () => {
  const navigate = useNavigate();

  const { formValue, handleFormValueChange } = useContext(
    FormContext,
  ) as FormContextInterface;

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

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is  ${progress} + % done`);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;

              // ...

              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          async () => {
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
                navigate('/home');
              },
            );
          },
        );
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
