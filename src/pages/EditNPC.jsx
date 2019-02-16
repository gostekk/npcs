import React, { useState, useContext, useEffect } from 'react';
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

  function handleSet(e) {
    setValue(e);
  }

  return {
    value,
    onChange: handleChange,
    set: handleSet,
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

  function handleSet(e) {
    setValue(e || null);
    setShowValue(e ? `/images/${e}` : '/image.jpg');
  }

  return {
    value,
    onChange: handleChange,
    showValue,
    set: handleSet,
    clearValue,
  };
}


function EditRecap(props) {
  const name = useFormInput('Ładowanie...');
  const race = useFormInput('Ładowanie...');
  const sex = useFormInput('Ładowanie...');
  const job = useFormInput('Ładowanie...');
  const specialSign = useFormInput('Ładowanie...');
  const appearance = useFormInput('Ładowanie...');
  const abilityHigh = useFormInput('Ładowanie...');
  const abilityLow = useFormInput('Ładowanie...');
  const profficiency = useFormInput('Ładowanie...');
  const languages = useFormInput('Ładowanie...');
  const talent = useFormInput('Ładowanie...');
  const manners = useFormInput('Ładowanie...');
  const conversation = useFormInput('Ładowanie...');
  const ideal = useFormInput('Ładowanie...');
  const bond = useFormInput('Ładowanie...');
  const flaw = useFormInput('Ładowanie...');
  const kin = useFormInput('Ładowanie...');
  const imgFile = useImageInput(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const { editCharacter, getCharacter } = useContext(CharactersContext);
  const { abilitiesList } = useContext(AppContext);
  const { history, match, enqueueSnackbar } = props;

  async function fetchCharacter() {
    try {
      const character = await getCharacter(match.params.id);
      name.set(character.name);
      race.set(character.race);
      sex.set(character.sex);
      job.set(character.job);
      specialSign.set(character.specialSign);
      appearance.set(character.appearance);
      abilityHigh.set(character.abilityHigh);
      abilityLow.set(character.abilityLow);
      profficiency.set(character.profficiency);
      languages.set(character.languages);
      talent.set(character.talent);
      manners.set(character.manners);
      conversation.set(character.conversation);
      ideal.set(character.ideal);
      bond.set(character.bond);
      flaw.set(character.flaw);
      kin.set(character.kin);
      imgFile.set(character.imgFile);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCharacter();
  }, []);

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
      const characterId = match.params.id;
      await editCharacter(characterId, data);
      enqueueSnackbar('Edycja postaci przebiegła pomyślnie', { variant: 'success' });
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
                  onChange={name.onChange}
                  value={name.value}
                  id="name"
                  label="Imię postaci"
                  fullWidth
                  disabled={loading}
                  error={!!errors.name}
                  helperText={errors.name ? errors.name : undefined}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  multiline
                  onChange={race.onChange}
                  value={race.value}
                  id="race"
                  label="Rasa"
                  fullWidth
                  disabled={loading}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  multiline
                  onChange={sex.onChange}
                  value={sex.value}
                  id="sex"
                  select
                  label="Płeć"
                  fullWidth
                  disabled={loading}
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
                  onChange={job.onChange}
                  value={job.value}
                  id="job"
                  label="Zawód"
                  fullWidth
                  disabled={loading}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  onChange={specialSign.onChange}
                  value={specialSign.value}
                  id="specialSign"
                  label="Znak szczególny wyglądu"
                  fullWidth
                  disabled={loading}
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
                onChange={appearance.onChange}
                value={appearance.value}
                id="appearance"
                fullWidth
                multiline
                label="Wygląd postaci"
                placeholder="Krótki opis wyglądu postaci (kolor włosów, oczu, karnacji lub znaki szczególne)"
                disabled={loading}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                multiline
                onChange={abilityHigh.onChange}
                value={abilityHigh.value}
                id="abilityHigh"
                select
                label="Wysoka statystyka"
                fullWidth
                disabled={loading}
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
                onChange={abilityLow.onChange}
                value={abilityLow.value}
                id="abilityLow"
                select
                label="Niska statystyka"
                fullWidth
                disabled={loading}
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
                onChange={profficiency.onChange}
                value={profficiency.value}
                id="profficiency"
                label="Biegłość"
                fullWidth
                disabled={loading}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                onChange={languages.onChange}
                value={languages.value}
                id="languages"
                label="Języki"
                fullWidth
                disabled={loading}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                onChange={talent.onChange}
                value={talent.value}
                id="talent"
                label="Talent"
                fullWidth
                disabled={loading}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                onChange={manners.onChange}
                value={manners.value}
                id="manners"
                label="Maniery"
                fullWidth
                disabled={loading}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                onChange={conversation.onChange}
                value={conversation.value}
                id="conversation"
                label="Zachowanie podczas rozmowy"
                fullWidth
                disabled={loading}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                onChange={ideal.onChange}
                value={ideal.value}
                id="ideal"
                label="Ideał"
                fullWidth
                disabled={loading}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                onChange={bond.onChange}
                value={bond.value}
                id="bond"
                label="Więź/Zobowiązanie"
                fullWidth
                disabled={loading}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                onChange={flaw.onChange}
                value={flaw.value}
                id="flaw"
                label="Wada/sekret"
                fullWidth
                disabled={loading}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                onChange={kin.onChange}
                value={kin.value}
                id="kin"
                label="Krewni"
                fullWidth
                disabled={loading}
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
              <Button variant="contained" color="primary" disabled={loading} onClick={handleSubmit}>
                Zapisz
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>
    </Paper>
  );
}

EditRecap.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string.isRequired }) },
  ).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(EditRecap);
