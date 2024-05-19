import React, { useState } from 'react';
import { useAuthState} from 'react-firebase-hooks/auth';
import { Link } from "react-router-dom";
import "./Header.css";
import { auth } from '../../firebase';
import toast from 'react-hot-toast';
import LoginBtn from './LoginBtn';

function Header() {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    auth.signOut(); 
    toast.success("ログアウトしました");
  };


  return (
    <header className="header">
        <div>
          <Link to="/" className="logo"> 
            <h1>TalkReady</h1>
          </Link>
        </div>


      {user ? (
        <div className="afterLogin">
          <img
            src={
              user.photoURL
                ? user.photoURL 
                : "https://ionicframework.com/docs/img/demos/avatar.svg"
            }
            alt=""
            className='headerImg'
            onClick={toggleMenu}
          />
          {isOpen && (
            <ul className="menu">
              <Link to={`/profile`} className='accountInfo'>
                <li>アカウント情報</li>
              </Link>
              <li onClick={handleSignOut}>ログアウト</li>
            </ul>
          )}
        </div>
      ) : (
       < LoginBtn/>
      )}
    </header>
  );
}

export default Header
