import { useHistory } from "react-router-dom";

export default function Result(props) {
  const history = useHistory();
  const mypara = history.location.state;
  let data = mypara.userDataCopy;
  console.log(data);
  // console.log(mypara)
  return (
    <div className="result-container">
      <h1>Results</h1>
      <table className="table">
        <tr>
          <th>Question</th>
          <th>Correct Answer</th>
          <th>Your Answer</th>
        </tr>
        {data.map((elem) => {
          return (
            <tr>
              <td>{elem[0]}</td>
              <td>{elem[3]}</td>
              <td
                style={{
                  backgroundColor:
                    elem[2] === null
                      ? "transparent"
                      : elem[1] === elem[2]
                      ? "green"
                      : "red",
                }}
              >
                {elem[4]}
              </td>
            </tr>
          );
        })}
      </table>
      <button className="restart-btn" onClick={() => history.push("/quiz")}>
        Restart Quiz
      </button>
    </div>
  );
}
