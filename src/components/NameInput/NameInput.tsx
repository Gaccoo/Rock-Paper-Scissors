import React, { useEffect, useState } from 'react';
import './nameInput.style.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setPlayerName } from '../../store/playerSlice';
import { goToGame } from '../../store/gameSlice';
import { setOpponent } from '../../store/handSlice';
import { selectRandomOpponent } from '../../App';

const NameInput = () => {
  // Redux store
  const dispatch = useAppDispatch();
  const AI = useAppSelector((store) => store.AiSlice);
  const opponent = useAppSelector((store) => store.handSlice.activeOpponent);
  // Local state
  const [nameInput, setNameInput] = useState({ name: '', age: 18 });

  useEffect(() => {
    if (!opponent) {
      dispatch(setOpponent(selectRandomOpponent(AI)));
    }
  }, []);

  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    dispatch(setPlayerName(nameInput));
    dispatch(goToGame());
  };

  const isButtonActive = () => {
    const isNameEntered = !!nameInput.name;
    const isAgeOver18 = nameInput.age >= 18;
    return isAgeOver18 && isNameEntered;
  };

  return (
    <div className="name-input">
      <form className="form" onSubmit={submitHandler}>
        <h2>Please enter your name</h2>
        <label className="label">
          <span>Name:</span>
          <input
            className="input field"
            value={nameInput.name}
            onChange={(e) => setNameInput({ ...nameInput, name: e.target.value })}
            type="text"
            placeholder="Enter your name..."
          />
        </label>

        <label className="label">
          <span>Age:</span>
          <input
            className="input"
            type="number"
            placeholder="Enter your age..."
            value={nameInput.age}
            onChange={(e) => setNameInput({ ...nameInput, age: +e.target.value })}
          />
          <span style={nameInput.age < 18 ? { opacity: 1 } : { opacity: 0 }} className="error">You must be 18 or older to gamble...</span>
        </label>
        <input disabled={!isButtonActive()} className="input button" type="submit" value="START GAME" />
      </form>
    </div>
  );
};

export default NameInput;
