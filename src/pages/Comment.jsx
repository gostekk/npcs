import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

// Material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

// Context
import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 2,
    },

    display: 'block',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
}));

function Comment(props) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  // const [errors, setErrors] = useState({});
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { getComment, saveComment } = useContext(AppContext);
  const { history, match, enqueueSnackbar } = props;

  async function getElement() {
    try {
      const result = await getComment(match.params.id);
      if (result) {
        setComment(result);
      }
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage[`${match.params.id}-${user.id}`]) {
      setComment(localStorage[`${match.params.id}-${user.id}`]);
    }
    getElement();
  }, []);

  async function handleChange(e) {
    setComment(e.target.value);
    localStorage.setItem(`${match.params.id}-${user.id}`, e.target.value);
  }

  async function handleSubmit() {
    try {
      await saveComment(match.params.id, user.id, comment);
      enqueueSnackbar('Komentarz zapisany', { variant: 'success' });
      history.push('/');
    } catch (e) {
      // const errorsValue = e.response.data ? e.response.data : '';
      // setErrors(errorsValue);
      enqueueSnackbar('Wystąpił błąd walidacji', { variant: 'error' });
    }
  }

  return (
    <Paper className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <TextField
            value={comment}
            onChange={handleChange}
            id="comment"
            fullWidth
            multiline
            disabled={loading}
            label="Komentarz"
            placeholder="Komentarz odnoszący się do danej postaci."
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item container justify="space-between">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => history.push('/')}
            >
              Wstecz
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              onClick={handleSubmit}
            >
              Zapisz
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

Comment.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(Comment);
