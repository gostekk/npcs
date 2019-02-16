import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Material-ui
import AppBar from '@material-ui/core/AppBar';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';

// Context
import { AppContext } from '../context/AppContext';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

function Navigation(props) {
  const classes = useStyles();
  const { auth } = useContext(AppContext);
  const { history, location } = props;

  return (
    <div>
      <AppBar color="secondary" position="static" variant="regular">
        <Toolbar>
          { location.pathname !== '/'
            ? (
              <IconButton aria-label="Back" color="inherit" hidden onClick={() => history.push('/')}>
                <ArrowBack />
              </IconButton>
            )
            : undefined }
          <Typography variant="h6" align={location.pathname === '/' ? 'left' : 'center'} color="inherit" className={classes.grow}>
            NPC Sheet
          </Typography>
          { auth
            ? <Button color="inherit" onClick={() => history.push('/add')}>Dodaj postać</Button>
            : <Button color="inherit" onClick={() => history.push('/auth')}>Odblokuj</Button>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

Navigation.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired,
};

export default (withRouter(Navigation));
