import React, {useContext} from 'react'
import {SessionContext} from './session'
import { Link } from 'react-router-dom'

const ProtectedHandler = ({ history }) => {
  const session = useContext(SessionContext);
  if (session.email === undefined) {
    history.push("/login");
  }
  return (
    <div>
      <h6>Protected data for {session.email}</h6>
      <Link to="/logout">Logout here</Link>
    </div>
  );
};

export default ProtectedHandler;