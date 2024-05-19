import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { useAuthState} from 'react-firebase-hooks/auth';

const Card = ({ title, description, link, btn }) => {
  const [user] = useAuthState(auth);
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={link}>
          <button className='startBtn'>{btn}</button>
      </Link>
        <div className='herobtn'>
        {user ? (
        <></>
          ):(
            <Link to = "/signup">
            <button>Login</button>
            </Link>
        )
        }
        </div>
    </div>
  );
};

export default Card;