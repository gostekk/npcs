import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

// Material-ui
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

// Image preview
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';

// Context
import { CharactersContext } from '../context/CharactersContext';

const useStyles = makeStyles(theme => ({
  root: {
    ...theme.mixins.gutters(),
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
      marginTop: theme.spacing.unit * 2,
    },
    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  card: {
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
    [theme.breakpoints.up('sm')]: {
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

function useImageInput(initialValue) {
  const [value, setValue] = useState(initialValue);
  const [showValue, setShowValue] = useState('/image.jpg');

  function handleSet(e) {
    setValue(e || null);
    setShowValue(e ? `/images/${e}` : '/image.jpg');
  }

  return {
    value,
    showValue,
    set: handleSet,
  };
}

function InfoNPC(props) {
  const imgFile = useImageInput(null);
  const { npc } = useContext(CharactersContext);
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <form noValidate autoComplete="off">
        <div className={classes.section1}>
          <Grid container justify="space-between">
            <Grid container item sm={12} md={6}>
              <Grid item xs={12}>
                <TextField
                  multiline
                  value={npc.name}
                  readOnly
                  id="name"
                  label="Imię postaci"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  value={npc.race}
                  readOnly
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
                  value={npc.sex}
                  readOnly
                  id="sex"
                  label="Płeć"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  value={npc.job}
                  readOnly
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
                  value={npc.specialSign}
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

              </Card>
            </Grid>
          </Grid>
        </div>
        <Divider variant="middle" />
        <div className={classes.section2}>
          <Grid container justify="space-between">
            <Grid item xs={12}>
              <TextField
                value={npc.appearance}
                readOnly
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
                value={npc.abilityHigh}
                readOnly
                id="abilityHigh"
                label="Wysoka statystyka"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                multiline
                value={npc.abilityLow}
                readOnly
                id="abilityLow"
                label="Niska statystyka"
                fullWidth
                SelectProps={{
                  native: true,
                }}
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                value={npc.profficiency}
                readOnly
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
                value={npc.languages}
                readOnly
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
                readOnly
                value={npc.talent}
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
                value={npc.manners}
                readOnly
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
                value={npc.conversation}
                readOnly
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
                value={npc.ideal}
                readOnly
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
                value={npc.bond}
                readOnly
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
                value={npc.flaw}
                readOnly
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
                value={npc.kin}
                readOnly
                id="kin"
                label="Krewni"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </div>
      </form>
    </Paper>
  );
}

InfoNPC.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default InfoNPC;
