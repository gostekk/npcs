import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export default function Authenticated({ component: Component, ...rest }) {
  const { auth } = useContext(AppContext);

  return (
    <Route
      {...rest}
      render={props => (
        auth === true
          ? <Component {...props} />
          : <Redirect to="/auth" />
      )}
    />
  );
}
