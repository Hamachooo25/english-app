import React from 'react'
import Card from '../../components/cards/Card'
import Header from '../../components/header/Header'
import About from '../../components/about/About'
import './Home.css'

const Home = () => {
  const cardsData = [
    { id: 1, title: 'TalkReady', description: 'The answer you speak will be converted as text. You can also correct and enter the answers by typing.', btn: 'START', link: "/talk" }
  ];

  return (
    <div>
      <Header/>
      <div className='main'>
          <div className="main-container">
            {cardsData.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                description={card.description}
                btn={card.btn}
                link = {card.link}
              />
            ))}
        </div>
        <About/>
      </div>

    </div>
  )
}

export default Home
