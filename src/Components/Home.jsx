import { Button } from "@mui/material";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  return (
    <div className="container">
      <p style={{fontSize:"50px"}}>Let's Calculate!</p>
      <Button className="start-btn" onClick={() => history.push("/quiz")} variant="contained" style={{padding:"15px"}}>
        Start Quiz
      </Button>
    </div>
  );
}
