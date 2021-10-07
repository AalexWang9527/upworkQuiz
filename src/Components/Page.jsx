import Question from "./Question";
import Option from "./Option";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Page() {
  let intervalId;
  let [score, setScore] = useState(0);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [widthe, setWidthe] = useState(100);
  let [viewOptions, setViewOptions] = useState(true);
  let [msg, setMsg] = useState("");
  let [resultIncoming, setResultIncoming] = useState(false);
  const history = useHistory();

  let [userData, setUserData] = useState([]);
  let userDataCopy;
  let questionObj = JSON.parse(localStorage.getItem("questionObj"));
  function checkAns(index) {
    setViewOptions(false);
    if (widthe > 70) setMsg("You're Fast huh!");
    else if (widthe > 30) setMsg("Okayish!!");
    else setMsg("Toughh one!!");
    clearInterval(intervalId);
    userDataCopy = JSON.parse(JSON.stringify(userData));

    userDataCopy.push([
      questionObj[currentIndex].question,
      questionObj[currentIndex].correctOption,
      index,
      questionObj[currentIndex].answers[
        questionObj[currentIndex].correctOption
      ],
      questionObj[currentIndex].answers[index],
    ]);

    setUserData(userDataCopy);

    if (currentIndex < questionObj.length - 1) {
      setTimeout(() => setWidthe(100), 1000);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setViewOptions(true);
      }, 1000);
      if (questionObj[currentIndex].correctOption === index) {
        setScore(score + 1);
        return "#b9f334";
      } else {
        return "#f32c1d";
      }
    } else {
      setTimeout(() => setWidthe(100), 1000);
      if (questionObj[currentIndex].correctOption === index) {
        setScore(score + 1);
        setTimeout(
          () =>{setResultIncoming(true);
            history.push({
              pathname: "/result",
              state: { userDataCopy, score: score + 1 },
            })},
          1000
        );
        return "green";
      } else {
        setTimeout(
          () =>{setResultIncoming(true);
            history.push({
              pathname: "/result",
              state: { userDataCopy, score },
            })},
          1000
        );
        return "#f32c1d";
      }
    }
  }

  useEffect(
    () => {
      if (widthe <= 0) {
        // eslint-disable-next-line
        userDataCopy = JSON.parse(JSON.stringify(userData));

        userDataCopy.push([
          questionObj[currentIndex].question,
          questionObj[currentIndex].correctOption,
          null,
          questionObj[currentIndex].answers[
            questionObj[currentIndex].correctOption
          ],
          "not answered",
        ]);

        setUserData(userDataCopy);

        if (currentIndex === questionObj.length - 1) {
          setTimeout(() => {
            setResultIncoming(true);
            history.push({ pathname: "/result", state: { userDataCopy } });
          }, 2500);
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
        {resultIncoming && <h1>Let's see how you did...</h1>}
        {!resultIncoming && (
          <div className="container">
            <div
              className="timer"
              style={{
                width: widthe + "%",
                backgroundColor:
                  widthe > 70 ? "#b9f334" : widthe > 30 ? "orange" : "#f32c1d",
              }}
            ></div>
            {!viewOptions && (
              <div className="options">
                {" "}
                <h2>{msg}</h2>
              </div>
            )}
            {viewOptions && (
              <div className="options">
                {questionObj[currentIndex].answers.map((choice, index) => {
                  if (index < 4) {
                    return (
                      <Option
                        value={choice}
                        index={index}
                        clickHandler={checkAns}
                        key={currentIndex + "" + index}
                      />
                    );
                  } else return <></>;
                })}
              </div>
            )}

            <Question value={questionObj[currentIndex].question} />
          </div>
        )}
      </>
    )
  );
}

export default Page;
