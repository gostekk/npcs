import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

// Material-ui
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

// Context
import { CharactersContext } from '../context/CharactersContext';

// Component
import NpcCard from '../components/NpcCard';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 10,
    overflow: 'hidden',
  },
  grid: {
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
}));

function Home(props) {
  const { fetchCharacters, characters, deleteCharacter } = useContext(CharactersContext);
  const classes = useStyles();

  useEffect(() => {
    fetchCharacters();
  }, []);

  const handleDeleteClick = async (_id) => {
    const { enqueueSnackbar } = props;
    try {
      await deleteCharacter(_id);
      enqueueSnackbar('Postać została usunięta', { variant: 'info' });
    } catch (e) {
      enqueueSnackbar('Wystąpił błąd podczas próby usunięcia postaci.', { variant: 'error' });
    }
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container justify="center" spacing={16}>
        { characters.length
          ? characters.map(npc => (
            <Grid key={npc._id} item>
              <NpcCard npc={npc} handleDelete={handleDeleteClick} />
            </Grid>
          ))
          : undefined
        }
      </Grid>
    </div>
  );
}

Home.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(Home);
