import { useHistory } from "react-router-dom";
import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Confetti from "react-confetti";

export default function Result(props) {
  const history = useHistory();
  const mypara = history.location.state;
  let data = mypara.userDataCopy;
  let [loading, setLoading] = useState(true);
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      borderBottom: 1,
    },
  }));
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

  function saveNewSet() {
    let questionObj = [
      { ...generateNewQuestionAnswerPair() },
      { ...generateNewQuestionAnswerPair() },
      { ...generateNewQuestionAnswerPair() },
      { ...generateNewQuestionAnswerPair() },
      { ...generateNewQuestionAnswerPair() },
    ];
    localStorage.clear();
    localStorage.setItem("questionObj", JSON.stringify(questionObj));
  }
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);
  if (!loading) {
    return (
      <div className="container" style={{ gap: "20px" }}>
        <h1>Results</h1>
        <div className="score">{"Score: " + mypara.score}</div>

        <Table sx={{ width: "80%" }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Questions</StyledTableCell>
              <StyledTableCell align="center">Correct Answers</StyledTableCell>
              <StyledTableCell align="center">Your Answer</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((elem) => (
              <StyledTableRow key={elem[0]}>
                <StyledTableCell component="th" scope="row" align="center">
                  {elem[0]}
                </StyledTableCell>
                <StyledTableCell align="center">{elem[3]}</StyledTableCell>
                <StyledTableCell
                  style={{
                    backgroundColor:
                      elem[2] === null
                        ? "transparent"
                        : elem[1] === elem[2]
                        ? "#38b801"
                        : "#f32c1d",
                  }}
                  align="center"
                >
                  {elem[4]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={() => {
            saveNewSet();
            history.push("/quiz");
          }}
          variant="contained"
        >
          Restart Game
        </Button>
        <Confetti startVelocity="190"/>

      </div>
    );
  }

  if (loading) {
    return (
      <>
        <div className="loading-body">
          <div className="loading-div"></div>
          <div className="loading-div"></div>
          <div className="loading-div"></div>
        </div>
      </>
    );
  }
}
