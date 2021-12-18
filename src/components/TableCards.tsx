import React from 'react';
import tableCard from '../assets/table-card.png';
import { useAppSelector } from '../store/hooks';

const TableCards = () => {
  const hand = useAppSelector((store) => store.handSlice);
  return (
    <div className="table-cards">
      {
        hand.pCard ? <img className="pCard" src={tableCard} alt="Card" /> : null
      }

      {
        hand.oCard ? <img className="oCard" src={tableCard} alt="Card" /> : null
      }

    </div>
  );
};

export default TableCards;
