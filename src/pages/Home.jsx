import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withSnackbar } from 'notistack';

// Material-ui
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import NpcCard from '../components/NpcCard';

const styles = theme => ({
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
});

class Home extends React.Component {
  handleDeleteClick = (_id) => {
    const { fetchData, enqueueSnackbar } = this.props;

    axios.post('http://127.0.0.1:5001/api/npcs/delete', { _id })
      .then(() => {
        enqueueSnackbar('Postać została usunięta', { variant: 'info' });
        fetchData();
      })
      .catch(() => enqueueSnackbar('Wystąpił błąd podczas próby usunięcia postaci.', { variant: 'error' }));
  }

  render() {
    const {
      classes,
      data,
    } = this.props;

    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container justify="center" spacing={16}>
          { data.length
            ? data.map(npc => (
              <Grid key={npc._id} item>
                <NpcCard npc={npc} handleDelete={this.handleDeleteClick} />
              </Grid>
            ))
            : undefined
          }
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchData: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withStyles(styles)(withSnackbar(Home));
