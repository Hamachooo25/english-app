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
              {loading ? "ログイン中..." : "ログイン"}
            </button>
          </form>
        </div>
        <div className="withGoogle">
          <h3>or</h3>
          <button className="googleBtn" onClick={signInWithGoogle} disabled={loading}>
            <img className="google_logo" src={Google} alt="#" />
            <p>{loading ? "ログイン中..." : "Googleでログイン"}</p>
          </button>
        </div>
        </div>
        <Link to ="/">
          <p className='backToLanding'>ホームページに戻る</p>
        </Link>
      </div>
    </div>
  </>
  );
}

export default Login;