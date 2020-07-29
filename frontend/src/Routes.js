import React, { useEffect, useState, useContext } from "react";
import { SessionContext, getSessionCookie, setSessionCookie } from "./session";
import SignIn from './pages/SignIn'
import {  Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import ProtectedHandler from './ProtectedHandler'
import LogoutHandler from './LogoutHandler'
const history = createBrowserHistory();


const Routes = () => {
  const [session, setSession] = useState(getSessionCookie());
  useEffect(
    () => {
      setSession(getSessionCookie());
    },
    [session]
  );

  return (
    <SessionContext.Provider value={session}>
      <Router history={history}>
        <div className="navbar">
          <h6 style={{ display: "inline" }}>Nav Bar</h6>
          <h6 style={{ display: "inline", marginLeft: "5rem" }}>
            {session.email || "No user is logged in"}
          </h6>
        </div>
        <Switch>
          <Route path="/login" component={SignIn} />
          <Route path="/logout" component={LogoutHandler} />
          <Route path="*" component={ProtectedHandler} />
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
};

export default Routes;