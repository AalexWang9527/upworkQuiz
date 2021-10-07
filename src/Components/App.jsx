import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Result from "./Result";
import Page from "./Page";
import Home from "./Home";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/quiz">
          <Page/>
        </Route>
        <Route path="/result">
          <Result />
        </Route>
      </Switch>
    </Router>
  );
}
