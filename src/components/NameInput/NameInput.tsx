import React, { useState } from 'react';
import './nameInput.style.scss';
import { Player } from '../../App';

type AppProps = {
  onSubmit: (value: {name: string, age: number}) => void
}

const NameInput = ({ onSubmit }: AppProps) => {
  const [nameInput, setNameInput] = useState({ name: '', age: 18 });
  const submitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    onSubmit(nameInput);
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
        </label>
        <input disabled={!isButtonActive()} className="input field" type="submit" value="START GAME" />
      </form>
    </div>
  );
};

export default NameInput;
