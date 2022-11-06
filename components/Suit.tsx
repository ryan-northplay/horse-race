import { PlayerType, SuitType } from "../models/types";
import { useContext, useRef, useState } from "react";
import GameContext from "../context/game-context";

interface Props extends Omit<PlayerType, "suit"> {
  suit: SuitType["type"];
}

export default function Suit(props: Props) {
  const gameCtx = useContext(GameContext);

  // state to control if a suit is checked or not and ref to extract bet input
  const [checked, setChecked] = useState(false);
  const betInputRef = useRef<HTMLInputElement>(null);

  // function to handle onChange event (interacting with checkbox)
  function checkHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
  }

  // onChange handler to reflect most recent entered bet for particular suit
  function changeHandler() {
    const enteredBet = betInputRef.current?.value;
    gameCtx?.addBet(props.id, {
      type: props.suit,
      bets: enteredBet,
    });
  }

  return (
    <>
      <label htmlFor={`${props.name} ${props.suit}`}>{props.suit}</label>
      <input
        type="checkbox"
        id={`${props.name} ${props.suit}`}
        name={`${props.name} ${props.suit}`}
        onChange={checkHandler}
        checked={checked}
      />
      {checked && (
        <input
          onChange={changeHandler}
          ref={betInputRef}
          type="text"
          id={`${props.name} ${props.suit} Bet`}
          name={`${props.name} ${props.suit} Bet`}
          // display name of player conditionally based on entered name, otherwise default to instantiated player id
          placeholder={`${props.suit} Bet`}
        />
      )}
    </>
  );
}
