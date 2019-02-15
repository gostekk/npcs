import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { withSnackbar } from 'notistack';

// Material-ui
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

// Image preview
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

const styles = theme => ({
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
});

const abilities = [
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

// const languagesList = [
//   'Common',
//   'Dwarvish',
//   'Elvish',
//   'Giant',
//   'Gnomish',
//   'Goblin',
//   'Halfling',
//   'Orc',
//   'Abyssal',
//   'Celestial',
//   'Draconic',
//   'Deep Speech',
//   'Infernal',
//   'Primordial',
//   'Sylvan',
//   'Undercommon',
//   'Druidic',
// ];

class AddRecap extends Component {
  state = {
    name: '',
    race: '',
    sex: '',
    job: '',
    specialSign: '',
    appearance: '',
    abilityHigh: '',
    abilityLow: '',
    profficiency: '',
    languages: '',
    talent: '',
    manners: '',
    conversation: '',
    ideal: '',
    bond: '',
    flaw: '',
    kin: '',
    imgFile: null,
    errors: {},
  }

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleImageSelect = (event) => {
    this.setState({
      imgFile: event.target.files[0],
    });
  };

  ClearImgFile = () => {
    this.setState({
      imgFile: null,
    });
  };

  handleSubmit = () => {
    const { fetchData, history, enqueueSnackbar } = this.props;
    const {
      name,
      race,
      sex,
      job,
      specialSign,
      appearance,
      abilityHigh,
      abilityLow,
      profficiency,
      languages,
      talent,
      manners,
      conversation,
      ideal,
      bond,
      flaw,
      kin,
      imgFile,
    } = this.state;

    const data = new FormData();
    data.append('file', imgFile);
    data.append('name', name);
    data.append('race', race);
    data.append('sex', sex);
    data.append('job', job);
    data.append('specialSign', specialSign);
    data.append('appearance', appearance);
    data.append('abilityHigh', abilityHigh);
    data.append('abilityLow', abilityLow);
    data.append('profficiency', profficiency);
    data.append('languages', languages);
    data.append('talent', talent);
    data.append('manners', manners);
    data.append('conversation', conversation);
    data.append('ideal', ideal);
    data.append('bond', bond);
    data.append('flaw', flaw);
    data.append('kin', kin);

    axios.post('http://back.gostekk.pl/api/npcs', data)
      .then(() => {
        fetchData();
        enqueueSnackbar('Nowa postać została pomyślnie dodana', { variant: 'success' });
        this.setState({
          name: '',
          race: '',
          sex: '',
          job: '',
          specialSign: '',
          appearance: '',
          abilityHigh: '',
          abilityLow: '',
          profficiency: '',
          languages: '',
          talent: '',
          manners: '',
          conversation: '',
          ideal: '',
          bond: '',
          flaw: '',
          kin: '',
          imgFile: null,
          errors: {},
        });
        history.push('/');
      })
      .catch((err) => {
        enqueueSnackbar('Wystąpił błąd walidacji', { variant: 'error' });
        this.setState({ errors: err.response.data ? err.response.data : '' });
      });
  };

  render() {
    const { classes, history } = this.props;

    const {
      name,
      race,
      sex,
      job,
      specialSign,
      appearance,
      abilityHigh,
      abilityLow,
      profficiency,
      languages,
      talent,
      manners,
      conversation,
      ideal,
      bond,
      flaw,
      kin,
      imgFile,
      errors,
    } = this.state;

    return (
      <Paper className={classes.root}>
        <form noValidate autoComplete="off">
          <div className={classes.section1}>
            <Grid container justify="space-between">
              <Grid container item sm={12} md={6}>
                <Grid item xs={12}>
                  <TextField
                    id="name"
                    label="Imię postaci"
                    fullWidth
                    error={!!errors.name}
                    helperText={errors.name ? errors.name : undefined}
                    value={name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="race"
                    label="Rasa"
                    fullWidth
                    value={race}
                    onChange={this.handleChange('race')}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    id="sex"
                    select
                    label="Płeć"
                    fullWidth
                    value={sex}
                    onChange={this.handleChange('sex')}
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
                    id="job"
                    label="Zawód"
                    fullWidth
                    value={job}
                    onChange={this.handleChange('job')}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="specialSign"
                    label="Znak szczególny wyglądu"
                    fullWidth
                    value={specialSign}
                    onChange={this.handleChange('specialSign')}
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
                    image={imgFile ? URL.createObjectURL(imgFile) : '/image.jpg'}
                    title="Obraz Postaci"
                  />
                  <CardActions className={classes.actions} disableActionSpacing>
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={imgFile === null}
                      className={classes.button}
                      onClick={this.ClearImgFile}
                    >
                      Usuń
                    </Button>
                    <div className={classes.rightActions}>
                      <input
                        type="file"
                        accept="image/*"
                        className={classes.input}
                        id="imgFile"
                        name="imgFile"
                        onChange={this.handleImageSelect}
                      />
                      <label htmlFor="imgFile">
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
                  id="appearance"
                  fullWidth
                  multiline
                  label="Wygląd postaci"
                  placeholder="Krótki opis wyglądu postaci (kolor włosów, oczu, karnacji lub znaki szczególne)"
                  value={appearance}
                  onChange={this.handleChange('appearance')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="abilityHigh"
                  select
                  label="Wysoka statystyka"
                  fullWidth
                  value={abilityHigh}
                  onChange={this.handleChange('abilityHigh')}
                  SelectProps={{
                    native: true,
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  {abilities.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="abilityLow"
                  select
                  label="Niska statystyka"
                  fullWidth
                  value={abilityLow}
                  onChange={this.handleChange('abilityLow')}
                  SelectProps={{
                    native: true,
                  }}
                  margin="normal"
                  variant="outlined"
                >
                  {abilities.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="profficiency"
                  label="Biegłość"
                  fullWidth
                  value={profficiency}
                  onChange={this.handleChange('profficiency')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="languages"
                  label="Języki"
                  fullWidth
                  value={languages}
                  onChange={this.handleChange('languages')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="talent"
                  label="Talent"
                  fullWidth
                  value={talent}
                  onChange={this.handleChange('talent')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="manners"
                  label="Maniery"
                  fullWidth
                  value={manners}
                  onChange={this.handleChange('manners')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="conversation"
                  label="Zachowanie podczas rozmowy"
                  fullWidth
                  value={conversation}
                  onChange={this.handleChange('conversation')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="ideal"
                  label="Ideał"
                  fullWidth
                  value={ideal}
                  onChange={this.handleChange('ideal')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="bond"
                  label="Więź/Zobowiązanie"
                  fullWidth
                  value={bond}
                  onChange={this.handleChange('bond')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="flaw"
                  label="Wada/sekret"
                  fullWidth
                  value={flaw}
                  onChange={this.handleChange('flaw')}
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="kin"
                  label="Krewni"
                  fullWidth
                  value={kin}
                  onChange={this.handleChange('kin')}
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
                <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                  Zapisz
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Paper>
    );
  }
}

AddRecap.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
};

export default withStyles(styles)(withSnackbar(AddRecap));
