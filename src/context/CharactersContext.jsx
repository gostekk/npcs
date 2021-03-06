import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const CharactersContext = createContext();

const host = 'http://back.gostekk.pl';

function CharactersProvider(props) {
  const [characters, setCharacters] = useState([]);
  const { children } = props;

  const fetchCharacters = async () => {
    const result = await axios.get(`${host}/api/npcs`);
    setCharacters(result.data);
  };

  const addCharacter = async (character) => {
    const result = await axios.post(`${host}/api/npcs`, character);
    fetchCharacters();
    return result;
  };

  const editCharacter = async (_id, newCharacter) => {
    const result = await axios.post(`${host}/api/npcs/edit/${_id}`, newCharacter);
    fetchCharacters();
    return result;
  };

  const deleteCharacter = async (_id) => {
    const result = await axios.post(`${host}/api/npcs/delete`, { _id });
    fetchCharacters();
    return result;
  };

  const getCharacter = async (_id) => {
    const result = await axios.get(`${host}/api/npcs/${_id}`);
    return result.data;
  };

  return (
    <CharactersContext.Provider
      value={{
        characters,
        fetchCharacters,
        addCharacter,
        editCharacter,
        deleteCharacter,
        getCharacter,
      }}
    >
      {children}
    </CharactersContext.Provider>
  );
}

CharactersProvider.propTypes = ({
  children: PropTypes.object.isRequired,
});

export { CharactersContext, CharactersProvider };
