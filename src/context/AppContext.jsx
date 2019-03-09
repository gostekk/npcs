import React, { createContext } from 'react';
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

const host = 'http://127.0.0.1:5001';

function AppProvider(props) {
  const { children } = props;

  const saveComment = async (npcId, userId, comment) => {
    const result = await axios.post(`${host}/api/npcs/comment`, { npcId, userId, comment });
    return result.data;
  };

  const getComment = async (_id) => {
    const result = await axios.get(`${host}/api/npcs/comment/${_id}`);
    return result.data.comment;
  };

  return (
    <AppContext.Provider
      value={{
        saveComment,
        getComment,
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
