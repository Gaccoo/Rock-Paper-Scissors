import React from 'react';
import './Controls.style.scss';
import Card from '../Card/Card';

import Rock from '../../assets/cards/rock.png';
import Paper from '../../assets/cards/paper.png';
import Scissors from '../../assets/cards/scissors.png';
import Lizard from '../../assets/cards/lizard.png';
import Spock from '../../assets/cards/spock.png';

export type CardName = 'Rock' | 'Paper' | 'Scissors' | 'Lizard' | 'Spock'

type CardProps = {
  name: CardName
  id: number
  img: string
  beats: CardName[]
}

export const cards: CardProps[] = [
  {
    name: 'Rock', id: 0, img: Rock, beats: ['Scissors', 'Lizard'],
  },
  {
    name: 'Paper', id: 1, img: Paper, beats: ['Rock', 'Spock'],
  },
  {
    name: 'Scissors', id: 2, img: Scissors, beats: ['Paper', 'Lizard'],
  },
  {
    name: 'Lizard', id: 3, img: Lizard, beats: ['Paper', 'Spock'],
  },
  {
    name: 'Spock', id: 4, img: Spock, beats: ['Rock', 'Scissors'],
  },
];

type GameProps = {
  onCardSelect: (cardName: CardName) => void
  activeCard: CardName | undefined
}

const Controls = ({ onCardSelect, activeCard }: GameProps) => {
  const a = 1;

  return (
    <div className="controls">
      {
        cards.map(({ name, id, img }) => (
          <Card
            activeCard={activeCard}
            name={name}
            id={id}
            img={img}
            key={name}
            onCardSelect={onCardSelect}
          />
        ))
      }
    </div>
  );
};

export default Controls;
