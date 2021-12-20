import React from 'react';
import stack from '../../assets/stack.png';

export type Stack = {
  stackSizeName: number
  stackClass: 'player' | 'opponent'

}

const TableItemStack = ({ stackSizeName, stackClass }: Stack) => (

  <div className={`${stackClass}-stack-wrapper`}>
    <div className="stack-inner-wrapper">
      { stackSizeName > 0 ? <img className="player-stack-1" src={stack} alt="Chip stack" /> : null }
      { stackSizeName > 2000 ? <img className="player-stack-2" src={stack} alt="Chip stack" /> : null }
      { stackSizeName > 4000 ? <img className="player-stack-3" src={stack} alt="Chip stack" /> : null }
      { stackSizeName > 6000 ? <img className="player-stack-4" src={stack} alt="Chip stack" /> : null }
      { stackSizeName > 8000 ? <img className="player-stack-5" src={stack} alt="Chip stack" /> : null }
      { stackSizeName > 10000 ? <img className="player-stack-6" src={stack} alt="Chip stack" /> : null }
      { stackSizeName > 20000 ? <img className="player-stack-7" src={stack} alt="Chip stack" /> : null }
      { stackSizeName > 30000 ? <img className="player-stack-8" src={stack} alt="Chip stack" /> : null }
    </div>
  </div>
);

export default TableItemStack;
