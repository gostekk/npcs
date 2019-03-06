import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Public({ component: Component, ...rest }) {
  const { auth } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (
        auth === false
          ? <Component {...props} />
          : <Redirect to="/" />
      )}
    />
  );
}
