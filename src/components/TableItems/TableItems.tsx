import React from 'react';
import { useAppSelector } from '../../store/hooks';
import tableCard from '../../assets/table-card.png';
import './TableItems.style.scss';
import TableItemStack from './TableItemStack';

const TableItems = () => {
  const hand = useAppSelector((store) => store.handSlice);
  const playerStack = useAppSelector((store) => store.playerSlice.chips);
  const opponent = useAppSelector((store) => store.handSlice.activeOpponent);
  const opponentStack = useAppSelector((store) => store.AiSlice[opponent as any].chips);
  return (
    <div className="table-cards">

      <TableItemStack stackSizeName={playerStack} stackClass="player" />
      <TableItemStack stackSizeName={opponentStack} stackClass="opponent" />

      {hand.pCard ? <img className="pCard" src={tableCard} alt="Card" /> : null}
      {hand.oCard ? <img className="oCard" src={tableCard} alt="Card" /> : null}

    </div>
  );
};

export default TableItems;
