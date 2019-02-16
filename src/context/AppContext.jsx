import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AppContext = createContext();

const abilitiesList = [
  {
    value: '',
    label: '',
  },
  {
    value: 'Siła',
    label: 'Siła',
  },
  {
    value: 'Zręczność',
    label: 'Zręczność',
  },
  {
    value: 'Budowa',
    label: 'Budowa',
  },
  {
    value: 'Inteligencja',
    label: 'Inteligencja',
  },
  {
    value: 'Roztropność',
    label: 'Roztropność',
  },
  {
    value: 'Charyzma',
    label: 'Charyzma',
  },
];

const languagesList = [
  'Common',
  'Dwarvish',
  'Elvish',
  'Giant',
  'Gnomish',
  'Goblin',
  'Halfling',
  'Orc',
  'Abyssal',
  'Celestial',
  'Draconic',
  'Deep Speech',
  'Infernal',
  'Primordial',
  'Sylvan',
  'Undercommon',
  'Druidic',
];

function AppProvider(props) {
  const [auth, setAuth] = useState(false);
  const { children } = props;

  function handleChange(e) {
    setAuth(e);
  }

  const authenticate = async (password) => {
    const result = await axios.post('http://back.gostekk.pl/api/npcs/auth', { password });
    if (result.data) {
      handleChange(result.data);
    } else {
      throw Error;
    }
  };

  return (
    <AppContext.Provider
      value={{
        auth,
        authenticate,
        abilitiesList,
        languagesList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = ({
  children: PropTypes.object.isRequired,
});

export { AppContext, AppProvider };
