import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
import "./Auth.css";
import { Link} from 'react-router-dom';
import Google from "../../components/img/google_logo.png"
import toast from "react-hot-toast";

function Login() {
  const [loading, setLoading] = useState(false);
  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      toast.success("ログインしました");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("ログインしました");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  return (
  <>
    <div className='auth'>
      <div className='auth-form'>
        <h1>Login</h1>
        <div className="register">
        <div className="withEmail">
          <form onSubmit={onSubmit}>
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
            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Loging in ..." : "Login"}
            </button>
          </form>
        </div>
        <div className="withGoogle">
          <h3>or</h3>
          <button className="googleBtn" onClick={signInWithGoogle} disabled={loading}>
            <img className="google_logo" src={Google} alt="#" />
            <p>{loading ? "Loging in ..." : "Login with Google"}</p>
          </button>
        </div>
        </div>
        <Link to ="/signup"  className='backToLanding'>
          <p>Don't have account?</p>
        </Link>
        <Link to ="/" className='backToLanding'>
          <p>Back to home</p>
        </Link>
      </div>
    </div>
  </>
  );
}

export default Login;