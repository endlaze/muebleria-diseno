import Cookies from "js-cookie";
import React, {useEffect} from 'react'

const LogoutHandler = ({ history }) => {
  useEffect(
    () => {
      Cookies.remove("session");
      history.push("/login");
    },
    [history]
  );

  return <div>Logging out!</div>;
};

export default LogoutHandler;