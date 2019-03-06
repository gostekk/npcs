import React, { useContext, useState } from 'react';

// Material-ui
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Context
import { AuthContext } from '../context/AuthContext';

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'flex', // Fix IE 11 issue.
    marginLeft: 0,
    marginRight: 0,
    justify: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    [theme.breakpoints.between('xs', 'sm')]: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    [theme.breakpoints.up('md')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    padding: '0px 8px 8px 8px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit * 1,
  },
  submit: {
    marginTop: theme.spacing.unit * 2,
  },
}));

function useFormInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
  };
}

function Login() {
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState({});
  const { login } = useContext(AuthContext);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: username.value,
      password: password.value,
    };

    try {
      await login(user);
    } catch (err) {
      setError(err.response.data.errors);
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-end"
    >
      <Grid item>
        <Paper className={classes.paper}>
          <form noValidate onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                {...username}
                id="username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              { error.username
                ? (
                  <FormHelperText error>
                    {error.username}
                  </FormHelperText>
                )
                : undefined
              }
            </FormControl>
            <FormControl margin="normal" fullWidth variant="outlined">
              <InputLabel htmlFor="password">Hasło</InputLabel>
              <Input
                {...password}
                name="password"
                type="password"
                id="password"
              />
              { error.password
                ? (
                  <FormHelperText error>
                    {error.password}
                  </FormHelperText>
                )
                : undefined
              }
              { error.error
                ? (
                  <FormHelperText error>
                    {error.error}
                  </FormHelperText>
                )
                : undefined
              }
            </FormControl>
            <Button
              onClick={handleSubmit}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Zaloguj
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
