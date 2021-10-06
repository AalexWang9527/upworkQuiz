import { useHistory } from "react-router-dom";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
export default function Result(props) {
  const history = useHistory();
  const mypara = history.location.state;
  let data = mypara.userDataCopy;
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

  return (
    <div className="container" style={{ gap: "20px" }}>
      <h1>Results</h1>
      <div className="score">{"Score: " + mypara.score}</div>

      <Table sx={{ width: 500 }} aria-label="customized table">
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
      <Button onClick={() => history.push("/quiz")} variant="contained">
        Restart Game
      </Button>
    </div>
  );
}
