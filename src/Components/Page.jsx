import Question from "./Question";
import Option from "./Option";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function Page() {
  let intervalId;
  let [score, setScore] = useState(0);
  let [currentIndex, setCurrentIndex] = useState(0);
  let [widthe, setWidthe] = useState(100);
  let [btnsDisabled, setBtnsDisabled] = useState(false);
  const history = useHistory();

  let [userData, setUserData] = useState([]);
  let userDataCopy;
  let questionObj = JSON.parse(localStorage.getItem("questionObj"));

  function checkAns(index) {
    //disable options
    setBtnsDisabled(true);
    //stop timer
    clearInterval(intervalId);
    //copy data from state
    userDataCopy = JSON.parse(JSON.stringify(userData));

    //push new data for this question to state
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
    //check if it is the last question
    if (currentIndex < questionObj.length - 1) {
      setTimeout(() => setWidthe(100), 1000);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setBtnsDisabled(false);
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
        
          history.push({
            pathname: "/result",
            state: { userDataCopy, score: score + 1 },
          });
        
        return "green";
      } else {
      
          history.push({
            pathname: "/result",
            state: { userDataCopy, score },
          });
     
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
         
            history.push({ pathname: "/result", state: { userDataCopy } });
         
        } else {
          setCurrentIndex(currentIndex + 1);

          setWidthe(100);
          return;
        }
      }

      // eslint-disable-next-line
      intervalId = setInterval(() => setWidthe(widthe - 0.1), 15);

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
                  widthe > 70 ? "#b9f334" : widthe > 30 ? "orange" : "#f32c1d",
              }}
            ></div>
            <div className="options">
              {questionObj[currentIndex].answers.map((choice, index) => {
                if (index < 4) {
                  return (
                    <Option
                      disabled={btnsDisabled}
                      value={choice}
                      index={index}
                      clickHandler={checkAns}
                      key={currentIndex + "" + index}
                    />
                  );
                } else return <></>;
              })}
            </div>
            
            <Question value={questionObj[currentIndex].question} />
          </div>
        )
      </>
    )
  );
}

export default Page;
