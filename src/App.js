import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./components/pages/Home";
import MainComp from "./components/pages/MainComp";

import "./App.scss";

export default function App() {
  return (
    <div className="App">
      <Router>
        <NavLink to="/">
          <button className="main-nav-link">Home</button>
        </NavLink>
        <NavLink to="/main-comp">
          <button className="main-nav-link">Find some star wars peeps</button>
        </NavLink>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/main-comp" component={MainComp} />
        </Switch>
      </Router>
    </div>
  );
}
