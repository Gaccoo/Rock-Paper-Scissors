import React from 'react';
import './Popup.style.scss';
import { cards } from '../GameControls/GameControls';
import Card from '../Card/Card';

type AppProps = {
  onClick: () => void
  hand: any
}

const Popup = ({ onClick, hand } : AppProps) => {
  const playerCard = cards.find((item) => item.name === hand.pCard);
  const opponentCard = cards.find((item) => item.name === hand.oCard);

  return (
    <div className="popup" onClick={onClick}>

      {
       playerCard ? (
         <Card
           className="static-card"
           name={playerCard.name}
           id={playerCard.id}
           img={playerCard.img}
         />
       ) : null
      }
      {
        opponentCard ? (
          <Card
            className="static-card"
            name={opponentCard.name}
            id={opponentCard.id}
            img={opponentCard.img}
          />
        ) : null
      }

    </div>
  );
};

export default Popup;
