import React, { useEffect, useState } from 'react';
import './Card.style.scss';
import { CardName } from '../Controls/Controls';

type CardProps = {
  name: CardName
  id: number
  img: string
  onCardSelect?: (cardName: CardName) => void
  activeCard?: CardName | undefined
}

const Card = ({
  name, id, img, onCardSelect, activeCard,
}: CardProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 3500);
  }, [visible]);

  const clickHandler = (selected: CardName) => {
    if (visible && onCardSelect) {
      onCardSelect(selected);
      setVisible(false);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      style={name === activeCard ? { opacity: 0 } : { opacity: 1 }}
      className="card"
      role="img"
      aria-label={name}
      onClick={() => clickHandler(name)}
    >
      <img className="card-image" src={img} alt={name} />
      <span>{name}</span>
    </div>
  );
};

export default Card;
