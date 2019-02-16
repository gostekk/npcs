import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';

// Material-ui
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

// Image preview
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

// Context
import { CharactersContext } from '../context/CharactersContext';
import { AppContext } from '../context/AppContext';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 2,
    },

    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  card: {
    [theme.breakpoints.down('xs')]: {
      width: 250,
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      width: 400,
    },
    [theme.breakpoints.up('md')]: {
      width: 365,
    },
  },
  input: {
    display: 'none',
  },
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  section2: {
    margin: theme.spacing.unit * 2,
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  media1: {
    height: 0,
    paddingTop: '70%',
  },
  actions: {
    display: 'flex',
  },
  rightActions: {
    marginLeft: 'auto',
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

function useImageInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [showValue, setShowValue] = useState('/image.jpg');

  const handleChange = (e) => {
    setValue(e.target.files[0]);
    setShowValue(URL.createObjectURL(e.target.files[0]));
  };

  const clearValue = () => {
    setValue(null);
    setShowValue('/image.jpg');
  };

  return {
    value,
    onChange: handleChange,
    showValue,
    clearValue,
  };
}

function AddRecap(props) {
  const name = useFormInput('');
  const race = useFormInput('');
  const sex = useFormInput('');
  const job = useFormInput('');
  const specialSign = useFormInput('');
  const appearance = useFormInput('');
  const abilityHigh = useFormInput('');
  const abilityLow = useFormInput('');
  const profficiency = useFormInput('');
  const languages = useFormInput('');
  const talent = useFormInput('');
  const manners = useFormInput('');
  const conversation = useFormInput('');
  const ideal = useFormInput('');
  const bond = useFormInput('');
  const flaw = useFormInput('');
  const kin = useFormInput('');
  const imgFile = useImageInput(null);
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const { addCharacter } = useContext(CharactersContext);
  const { abilitiesList } = useContext(AppContext);

  const { history, enqueueSnackbar } = props;

  const handleSubmit = async () => {
    const data = new FormData();
    data.append('file', imgFile.value);
    data.append('name', name.value);
    data.append('race', race.value);
    data.append('sex', sex.value);
    data.append('job', job.value);
    data.append('specialSign', specialSign.value);
    data.append('appearance', appearance.value);
    data.append('abilityHigh', abilityHigh.value);
    data.append('abilityLow', abilityLow.value);
    data.append('profficiency', profficiency.value);
    data.append('languages', languages.value);
    data.append('talent', talent.value);
    data.append('manners', manners.value);
    data.append('conversation', conversation.value);
    data.append('ideal', ideal.value);
    data.append('bond', bond.value);
    data.append('flaw', flaw.value);
    data.append('kin', kin.value);
    try {
      await addCharacter(data);
      enqueueSnackbar('Nowa postać została pomyślnie dodana', { variant: 'success' });
      history.push('/');
    } catch (e) {
      const errorsValue = e.response.data ? e.response.data : '';
      setErrors(errorsValue);
      enqueueSnackbar('Wystąpił błąd walidacji', { variant: 'error' });
    }
  };

  return (
    <Paper className={classes.root}>
      <form noValidate autoComplete="off">
        <div className={classes.section1}>
          <Grid container justify="space-between">
            <Grid container item sm={12} md={6}>
              <Grid item xs={12}>
                <TextField
                  multiline
                  {...name}
                  id="name"
                  label="Imię postaci"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name ? errors.name : undefined}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  multiline
                  {...race}
                  id="race"
                  label="Rasa"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  multiline
                  {...sex}
                  id="sex"
                  select
                  label="Płeć"
                  fullWidth
                  SelectProps={{
                    native: true,
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  <option value="" />
                  <option value="Mężczyzna">
                    Mężczyzna
                  </option>
                  <option value="Kobieta">
                    Kobieta
                  </option>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  {...job}
                  id="job"
                  label="Zawód"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  {...specialSign}
                  id="specialSign"
                  label="Znak szczególny wyglądu"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container item sm={12} md={6} justify="center">
              <Card className={classes.card}>
                <CardHeader
                  title="Obraz postaci"
                />
                <CardMedia
                  className={classes.media1}
                  image={imgFile.showValue}
                  title="Obraz Postaci"
                />
                <CardActions className={classes.actions} disableActionSpacing>
                  <Button
                    variant="contained"
                    color="secondary"
                    disabled={imgFile === null}
                    className={classes.button}
                    onClick={imgFile.clearValue}
                  >
                    Usuń
                  </Button>
                  <div className={classes.rightActions}>
                    <label htmlFor="imgFile">
                      <input
                        type="file"
                        accept="image/*"
                        className={classes.input}
                        id="imgFile"
                        name="imgFile"
                        onChange={imgFile.onChange}
                      />
                      <Button
                        component="span"
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                      >
                        Dodaj
                        <CloudUploadIcon className={classes.rightIcon} />
                      </Button>
                    </label>
                  </div>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Grid container justify="space-between">
            <Grid item xs={12}>
              <TextField
                {...appearance}
                id="appearance"
                fullWidth
                multiline
                label="Wygląd postaci"
                placeholder="Krótki opis wyglądu postaci (kolor włosów, oczu, karnacji lub znaki szczególne)"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                multiline
                {...abilityHigh}
                id="abilityHigh"
                select
                label="Wysoka statystyka"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                margin="normal"
                variant="outlined"
              >
                {abilitiesList.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                multiline
                {...abilityLow}
                id="abilityLow"
                select
                label="Niska statystyka"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                margin="normal"
                variant="outlined"
              >
                {abilitiesList.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                {...profficiency}
                id="profficiency"
                label="Biegłość"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                {...languages}
                id="languages"
                label="Języki"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                {...talent}
                id="talent"
                label="Talent"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                {...manners}
                id="manners"
                label="Maniery"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                {...conversation}
                id="conversation"
                label="Zachowanie podczas rozmowy"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                {...ideal}
                id="ideal"
                label="Ideał"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                {...bond}
                id="bond"
                label="Więź/Zobowiązanie"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                {...flaw}
                id="flaw"
                label="Wada/sekret"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                {...kin}
                id="kin"
                label="Krewni"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>
        <div className={classes.section3}>
          <Grid container justify="space-between">
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => history.push('/')}>
                Wstecz
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Zapisz
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </Paper>
  );
}

AddRecap.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(AddRecap);
