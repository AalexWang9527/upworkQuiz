import { useState } from "react";
import React from "react";
// import Confetti from "react-dom-confetti";

export default function Option(props) {
  // eslint-disable-next-line
  let [selected, setSelected] = useState(false);

  return (
    <>
      <button
        className="option"
        onClick={() => {
          setSelected(true);
          props.clickHandler(props.index);
        }}
        key={props.key}
      >
        {props.value}
      </button>
      {/* <Confetti active={bgColor === "green"} /> */}
    </>
  );
}
