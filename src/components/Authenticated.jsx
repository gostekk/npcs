import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Authenticated({ component: Component, ...rest }) {
  const { auth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (
        auth === true
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  );
}
