import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  return (
    <div className="result-container">
      <h1>Let's Calculate!</h1>
      <button className="start-btn" onClick={() => history.push("/quiz")}>
        Start Quiz
      </button>
    </div>
  );
}
