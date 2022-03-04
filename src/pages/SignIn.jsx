import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { email, password } = formData;

  const onSubmit = async e => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCred = await signInWithEmailAndPassword(auth, email, password);

      if (userCred.user) {
        navigate('/');
      }
    } catch (error) {
      toast.error('Incorrect User Credentials');
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
          <div className="signInBar">
            <p className="signInText">Sign In</p>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="35px" height="35px" />
            </button>
          </div>
        </form>

        <Link to="/sign-up" className="registerLink">
          Sign Up Instead
        </Link>
      </div>
    </>
  );
}
