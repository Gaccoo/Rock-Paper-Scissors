import React, { useEffect, useState } from 'react';
import './Card.style.scss';
import { CardName } from '../GameControls/GameControls';

type CardProps = {
  name: CardName
  id: number
  img: string
  onCardSelect?: (cardName: CardName) => void
  activeCard?: CardName | null
  className: string
}

const Card = ({
  name, id, img, onCardSelect, activeCard, className,
}: CardProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 3000);
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
      className={className}
      role="img"
      aria-label={name}
      onClick={() => clickHandler(name)}
    >
      <img className="card-image" id={id.toString()} src={img} alt={name} />
      <span>{name}</span>
    </div>
  );
};

export default Card;
