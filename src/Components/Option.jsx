import { useState } from "react";
import React from "react";
import Button from "@mui/material/Button";

export default function Option(props) {
  // eslint-disable-next-line
  let [selected, setSelected] = useState(false);

  return (
    <>
        <Button
          onClick={() => {
            setSelected(true);
            props.clickHandler(props.index);
          }}
          key={props.key}
          variant="contained"
          style={{padding:"20px 40px",fontSize:"30px"}}
        >
          {props.value}
        </Button>
    </>
  );
}
