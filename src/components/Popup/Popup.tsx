import React from 'react';
import './Popup.style.scss';
import { cards } from '../GameControls/GameControls';
import Card from '../Card/Card';
import { useAppSelector } from '../../store/hooks';

type AppProps = {
  onClick: () => void
  hand: any
}

const Popup = ({ onClick, hand } : AppProps) => {
  const playerCard = cards.find((item) => item.name === hand.pCard);
  const opponentCard = cards.find((item) => item.name === hand.oCard);
  const playerWins = useAppSelector((store) => store.handSlice.winner === hand.pCard);
  const opponentWins = useAppSelector((store) => store.handSlice.winner === hand.oCard);

  const playerCardAnimationClassSelector = () => {
    if (playerWins) {
      return 'static-card left-wins';
    }
    if (opponentWins) {
      return 'static-card left-loses';
    }
    return 'static-card no-wins';
  };

  const opponentCardAnimationClassSelector = () => {
    if (opponentWins) {
      return 'static-card right-wins';
    }
    if (playerWins) {
      return 'static-card right-loses';
    }
    return 'static-card no-wins';
  };

  return (
    <div className="popup" onClick={onClick}>

      {
       playerCard ? (
         <Card
           className={playerCardAnimationClassSelector()}
           name={playerCard.name}
           id={playerCard.id}
           img={playerCard.img}
         />
       ) : null
      }
      {
        opponentCard ? (
          <Card
            className={opponentCardAnimationClassSelector()}
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
