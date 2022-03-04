import { db } from '../firebase.config';
import { updateDoc, doc } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function Profile() {
  const auth = getAuth();

  // updating the users
  const [changeDetails, setChangeDetails] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email
  });

  const navigate = useNavigate();
  const { name, email } = formData;

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // updating the display name in firebase

        await updateProfile(auth.currentUser, {
          displayName: name
        });

        // updating the display name in the firestore database
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, {
          name
        });
      }
    } catch (error) {
      toast.error('Something went wrong with the update');
    }
  };

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">My Profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails(prevState => !prevState);
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className="profileCard">
          <form>
            <input
              type="text"
              id="name"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>
      </main>
    </div>
  );
}
