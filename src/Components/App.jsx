import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Result from "./Result";
import Page from "./Page";
import Home from "./Home";

export default function App() {
  let questionObj = [
    { ...generateNewQuestionAnswerPair() },
    { ...generateNewQuestionAnswerPair() },
    { ...generateNewQuestionAnswerPair() },
    { ...generateNewQuestionAnswerPair() },
    { ...generateNewQuestionAnswerPair() },
  ];
  console.log(questionObj);
  function solve(arr) {
    let res = 0;
    arr.forEach((elem, index) => {
      if (index % 2 === 0) {
        if (index === 0) res += elem;
        else {
          if (arr[index - 1] === "+") res += elem;
          else res -= elem;
        }
      }
    });
    console.log(arr, res);
    return res;
  }
  function generateNewQuestionAnswerPair() {
    let noOfNumbers = Math.floor(Math.random() * (3 - 2 + 1) + 2); //either 2 or 3
    let operator = ["+", "-"];
    let equation = new Array(2 * noOfNumbers - 1);
    for (let index = 0; index < equation.length; index++) {
      if (index % 2 !== 0)
        equation[index] = operator[Math.floor(Math.random() * (1 - 0 + 1) + 0)];
      else equation[index] = Math.floor(Math.random() * (1000 - 0 + 1) + 0);
    }
    let question = equation.join(" ") + " = ?";
    let answer = solve(equation);
    let options = new Array(4);
    for (let i = 0; i < 3; i++) {
      options.push(Math.floor(Math.random() * (1000 + 1000 + 1) - 1000));
    }

    options.push(answer);
    options.sort();
    let correctOption = options.indexOf(answer);
    return {
      question: question,
      answers: options,
      correctOption: correctOption,
      correctAnswer: answer,
    };
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/quiz">
          <Page questionObj={questionObj} />
        </Route>
        <Route path="/result">
          <Result />
        </Route>
      </Switch>
    </Router>
  );
}
