import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import ClientHome from "./pages/ClientHome/ClientHome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AppNavbar from "./components/Navbar/Navbar";
import Checkout from "./pages/Checkout";
import Furniture from "./components/AddFurniture";



const Routes = () => {
  return (
    <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <PrivateRoute path="/checkout">
            <Checkout/>
          </PrivateRoute>
          <PrivateRoute path="/addfurniture">
            <Furniture/>
          </PrivateRoute>
          <PrivateRoute path="/">
            <ClientHome />
          </PrivateRoute>
          
        </Switch>
    </Router>
  );
}

export default Routes;

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth() ? (
          <>
            <AppNavbar></AppNavbar>
            {children}
          </>
          
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const auth = () => {
  const user = localStorage.getItem('user')
  return user ? true : false
};