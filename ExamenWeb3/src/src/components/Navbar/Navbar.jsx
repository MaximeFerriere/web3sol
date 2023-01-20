import Calendar from "components/Calendar/Calendar";
import Settings from "components/Settings/Settings";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Navbar = () => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <>
      <Router>
        <div>
          <div>
            <Link to="/calendar" style={padding}>
              Calendrier
            </Link>
            <Link to="/config" style={padding}>
              Configuration
            </Link>
          </div>
          <hr />
          <Switch>
            <Route path="/config">
              <Settings />
            </Route>
            <Route path="/calendar">
              <Calendar />
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default Navbar;
