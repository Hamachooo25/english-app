import React, { useState } from 'react';
import "./Auth.css";
import { Link } from 'react-router-dom';
import {
  signInWithPopup,
  updateProfile,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth, provider } from '../../firebase';
import Google from "../../components/img/google_logo.png"
import toast from "react-hot-toast"


function SignUp() {
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
    const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      await createUserWithEmailAndPassword(auth, email, password);
  
      updateProfile(auth.currentUser, {
        displayName: name,
      });
  
      setLoading(false);
      toast.success("TalkReadyにようこそ!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
  <>
    <div className='auth'>
      <div className='auth-form'>
        <h1>Sign Up</h1>
        <div className="register">
        <div className="withEmail">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Name"
              id="name"
              value={name}
              required
              onChange={onChange}
            />
            <input
              type="email"
              placeholder="Email"
              id="email"
              value={email}
              required
              onChange={onChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              value={password}
              required
              onChange={onChange}
            />
            <button className='submit-btn' type="submit" disabled={loading}>
              {loading ? 'Signing up ...' : 'Create Account'}
            </button>
          </form>
        </div>
        <div className="withGoogle">
          <h3>or</h3>
          <button className="googleBtn" onClick={signInWithGoogle} disabled={loading}>
            <img className="google_logo" src={Google} alt="#" />
            <p>{loading ? "Signing up ..." : "Sign Up with Google"}</p>
          </button>
        </div>
        </div>
        <Link to ="/login" className='backToLanding'>
          <p >Already have an account?</p>
        </Link>
        <Link to ="/" className='backToLanding'>
          <p >Back to Home</p>
        </Link>
      </div>
    </div>
  </>
  );
}

export default SignUp;