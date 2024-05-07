import React from 'react'
import {Link} from 'react-router-dom';
import Card from '../../components/cards/Card'
import Header from '../../components/header/Header'
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/talk`);
  };
  const cardsData = [
    { id: 1, title: 'Practice English', description: 'The answer you speak will be converted as text. You can also correct and enter the answers by typing. ', btn: 'START' }
  ];

  return (
    <div>
      <Header/>
      <div className='main'>
      <div className='main-container'>
          <div className="main">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                btn={card.btn}
                onClick={() => handleCardClick(card.id)} 
              />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Home
