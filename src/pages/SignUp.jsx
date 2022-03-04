import { db } from '../firebase.config';
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword
} from 'firebase/auth';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { name, email, password } = formData;

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const auth = getAuth();

      // Registering the user
      const userCred = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCred.user;

      // updating the display name
      updateProfile(auth.currentUser, {
        displayName: name
      });

      // creating a copy for safety check
      const formDataCopy = { ...formData };
      // removing password so that it does not get submitted to the db
      delete formDataCopy.password;

      // adding a timestamp property to the formDataCopy
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);

      // redirecting to the homepage after submitting
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with the registration');
    }
  };

  const onChange = e => {
    setFormData(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome User!</p>
        </header>

        <form onSubmit={onSubmit}>
          {' '}
          <input
            type="text"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />
            <img
              src={visibilityIcon}
              alt="show password"
              className="showPassword"
              onClick={() => setShowPassword(prevState => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>
          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="35px" height="35px" />
            </button>
          </div>
        </form>

        <Link to="/sign-in" className="registerLink">
          Sign In Instead
        </Link>
      </div>
    </>
  );
}
