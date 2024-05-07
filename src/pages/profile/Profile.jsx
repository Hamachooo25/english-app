import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import "./Profile.css";
import Header from '../../components/header/Header'


export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
  <>
    <Header/>
    <div className="profPage">
      <h3>My profile</h3>
    </div>
    <div className='myAccContainer'>
      {user ? (
      <div>
        <img src={user.photoURL ? user.photoURL 
                : "https://ionicframework.com/docs/img/demos/avatar.svg"
            } alt="" />
        <p>User Name : {user.displayName || user.email}</p>
        <p>Email : {user.email}</p>
        {/* 他のユーザー情報があればここに表示 */}
      </div>
    ) : (
      <p>You are not logged in</p>
      )}
    </div>
      <Link to="/">
         <p className='backbtn'>Back</p>
      </Link>
  </>
  );
}
