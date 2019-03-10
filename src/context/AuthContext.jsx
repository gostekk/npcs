import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

// Context
import { AppContext } from './AppContext';

const AuthContext = createContext();

const host = 'http://127.0.0.1:5001';

function AuthProvider(props) {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState(undefined);
  const { initApp } = useContext(AppContext);
  const { children } = props;

  function setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = token;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }

  async function registerUser(newUser) {
    const result = await axios.post(`${host}/api/auth/register`, newUser);
    return result;
  }

  async function login(loginUser) {
    const result = await axios.post(`${host}/api/auth/login`, loginUser);
    const { token } = result.data;
    localStorage.setItem('jwtToken', token);
    setAuthToken(token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    setAuth(true);
    initApp(decoded.id);
    return result;
  }

  async function logout() {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    setAuth(false);
    setUser(undefined);
  }

  async function checkToken(token) {
    try {
      await axios.post(`${host}/api/auth/check`, { token });
    } catch (e) {
      logout();
    }
  }

  useEffect(() => {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken;
      setAuthToken(token);
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout();
      }
      setUser(decoded);
      setAuth(true);
      checkToken(token);
      initApp(decoded.id);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        registerUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = ({
  children: PropTypes.object.isRequired,
});

export { AuthContext, AuthProvider };
