import Question from "./Question";
import Option from "./Option";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Page(props) {
  let intervalId;
  let [score, setScore] = useState(0);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [widthe, setWidthe] = useState(100);
  const history = useHistory();

  let [userData, setUserData] = useState([]);
  let userDataCopy;

  function checkAns(index) {
    clearInterval(intervalId);
    userDataCopy = JSON.parse(JSON.stringify(userData));

    userDataCopy.push([
      props.questionObj[currentIndex].question,
      props.questionObj[currentIndex].correctOption,
      index,
      props.questionObj[currentIndex].answers[
        props.questionObj[currentIndex].correctOption
      ],
      props.questionObj[currentIndex].answers[index],
    ]);

    setUserData(userDataCopy);

    if (currentIndex < props.questionObj.length - 1) {
      setTimeout(() => setWidthe(100), 500);
      setTimeout(() => setCurrentIndex(currentIndex + 1), 500);
      if (props.questionObj[currentIndex].correctOption === index) {
        setScore(score + 1);
        return "green";
      } else {
        return "red";
      }
    } else {
      setTimeout(() => setWidthe(100), 500);
      if (props.questionObj[currentIndex].correctOption === index) {
        setScore(score + 1);
        setTimeout(
          () =>
            history.push({
              pathname: "/result",
              state: { userDataCopy, score: score + 1 },
            }),
          500
        );
        return "green";
      } else {
        setTimeout(
          () =>
            history.push({
              pathname: "/result",
              state: { userDataCopy, score },
            }),
          500
        );
        return "red";
      }
    }
  }

  useEffect(
    () => {
      if (widthe <= 0) {
        // eslint-disable-next-line
        userDataCopy = JSON.parse(JSON.stringify(userData));

        userDataCopy.push([
          props.questionObj[currentIndex].question,
          props.questionObj[currentIndex].correctOption,
          null,
          props.questionObj[currentIndex].answers[
            props.questionObj[currentIndex].correctOption
          ],
          "not answered",
        ]);

        setUserData(userDataCopy);

        if (currentIndex === props.questionObj.length - 1) {
          setTimeout(
            () =>
              history.push({ pathname: "/result", state: { userDataCopy } }),
            2000
          );
        } else {
          setCurrentIndex(currentIndex + 1);

          setWidthe(100);
          return;
        }
      }

      // eslint-disable-next-line
      intervalId = setInterval(() => setWidthe(widthe - 0.1), 20);

      return () => clearInterval(intervalId);
    },

    // eslint-disable-next-line
    [widthe]
  );

  return (
    currentIndex >= 0 && (
      <>
        <div className="container">
          <div
            className="timer"
            style={{
              width: widthe + "%",
              backgroundColor:
                widthe > 70 ? "green" : widthe > 30 ? "orange" : "red",
            }}
          ></div>

          <Question value={props.questionObj[currentIndex].question} />

          <div className="options">
            {props.questionObj[currentIndex].answers.map((choice, index) => {
              return (
                <Option
                  value={choice}
                  index={index}
                  clickHandler={checkAns}
                  key={currentIndex + "" + index}
                />
              );
            })}
          </div>
        </div>
      </>
    )
  );
}

export default Page;
