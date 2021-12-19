import React from 'react';
import { useAppSelector } from '../../store/hooks';
import tableCard from '../../assets/table-card.png';
import stack from '../../assets/stack.png';
import './TableItems.style.scss';

const TableItems = () => {
  const hand = useAppSelector((store) => store.handSlice);
  const playerStack = useAppSelector((store) => store.playerSlice.chips);
  const opponent = useAppSelector((store) => store.handSlice.activeOpponent);
  const opponentStack = useAppSelector((store) => store.AiSlice[opponent as any].chips);
  return (
    <div className="table-cards">
      <div className="stack-wrapper">
        <div className="stack-inner-wrapper">

          {
        playerStack >= 10 ? <img className="player-stack-1" src={stack} alt="Chip stack" /> : null
      }
          {
          playerStack >= 20 ? <img className="player-stack-2" src={stack} alt="Chip stack" /> : null
        }
          {
          playerStack >= 30 ? <img className="player-stack-3" src={stack} alt="Chip stack" /> : null
        }
          {
        playerStack >= 40 ? <img className="player-stack-4" src={stack} alt="Chip stack" /> : null
      }
          {
          playerStack >= 50 ? <img className="player-stack-5" src={stack} alt="Chip stack" /> : null
        }
          {
          playerStack >= 60 ? <img className="player-stack-6" src={stack} alt="Chip stack" /> : null
        }
          {
            playerStack >= 70 ? <img className="player-stack-7" src={stack} alt="Chip stack" /> : null
          }
          {
            playerStack >= 80 ? <img className="player-stack-8" src={stack} alt="Chip stack" /> : null
          }
        </div>
      </div>

      <div className="opponent-stack-wrapper">
        <div className="stack-inner-wrapper">

          {
            opponentStack >= 10 ? <img className="player-stack-1" src={stack} alt="Chip stack" /> : null
          }
          {
            opponentStack >= 20 ? <img className="player-stack-2" src={stack} alt="Chip stack" /> : null
          }
          {
            opponentStack >= 30 ? <img className="player-stack-3" src={stack} alt="Chip stack" /> : null
          }
          {
            opponentStack >= 40 ? <img className="player-stack-4" src={stack} alt="Chip stack" /> : null
          }
          {
            opponentStack >= 50 ? <img className="player-stack-5" src={stack} alt="Chip stack" /> : null
          }
          {
            opponentStack >= 60 ? <img className="player-stack-6" src={stack} alt="Chip stack" /> : null
          }
          {
            opponentStack >= 70 ? <img className="player-stack-7" src={stack} alt="Chip stack" /> : null
          }
          {
            opponentStack >= 80 ? <img className="player-stack-8" src={stack} alt="Chip stack" /> : null
          }
        </div>
      </div>
      {
        hand.pCard ? <img className="pCard" src={tableCard} alt="Card" /> : null
      }

      {
        hand.oCard ? <img className="oCard" src={tableCard} alt="Card" /> : null
      }

    </div>
  );
};

export default TableItems;
