import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

const Card = ({ title, description, link, btn, onClick }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{description}</p>
      {link ? (
        <Link to={link}>
          <button>{btn}</button>
        </Link>
      ) : (
        <button onClick={onClick}>{btn}</button>
      )}
    </div>
  );
};

export default Card;