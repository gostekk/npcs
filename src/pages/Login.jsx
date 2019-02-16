import React, { useContext, useState } from 'react';

// Material-ui
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';

// Context
import { AppContext } from '../context/AppContext';

const useStyles = makeStyles(theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up('xs')]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    position: 'absolute',
    top: '40%',
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
  const password = useFormInput('');
  const [error, setError] = useState('');
  const { authenticate } = useContext(AppContext);
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authenticate(password.value);
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <form noValidate onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
          <FormControl margin="normal" fullWidth variant="outlined">
            <InputLabel htmlFor="password">Hasło</InputLabel>
            <Input
              {...password}
              name="password"
              type="password"
              id="password"
              autoFocus
            />
            { error
              ? (
                <FormHelperText error>
                  {error}
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
            Odblokuj
          </Button>
        </form>
      </Paper>
    </main>
  );
}

export default Login;
