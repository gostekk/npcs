import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { withSnackbar } from 'notistack';
import Select from 'react-select';

// Material-ui
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, useTheme } from '@material-ui/styles';
import Chip from '@material-ui/core/Chip';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

// Context
import { CharactersContext } from '../context/CharactersContext';
import { AppContext } from '../context/AppContext';

// Components
import components from '../components/Select';

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
  form: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  iconButton: {
    padding: 10,
  },
  actions: {
    marginTop: 15,
  },
  input: {
    display: 'flex',
    padding: 0,
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
}));

function SettingsNPC(props) {
  const { npc, updateVisible } = useContext(CharactersContext);
  const { usersOptions } = useContext(AppContext);
  const [visible, setVisible] = useState(npc.visible ? npc.visible.map(el => (
    { value: el._id, label: el.username }
  )) : []);
  // const [errors, setErrors] = useState({});
  const classes = useStyles();
  const theme = useTheme();
  const { history } = props;

  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  };

  async function handleChange(value) {
    const oldVisible = [...visible];
    try {
      setVisible(value);
      await updateVisible(npc._id, value.map(el => ({ _id: el.value })));
    } catch (e) {
      setVisible(oldVisible);
    }
  }

  return (
    <Paper className={classes.root}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <Select
            fullWidth
            classes={classes}
            styles={selectStyles}
            options={usersOptions}
            components={components}
            value={visible}
            onChange={handleChange}
            placeholder="Search a country (start with a)"
            isMulti
          />
        </Grid>
        <Grid item xs={12}>
          { visible.length === -2
            ? visible.map(user => (
              <Chip
                key={user.value}
                label={user.label}
                // onDelete={handleDelete}
                className={classes.chip}
                color="primary"
              />
            ))
            : undefined
          }
        </Grid>
        <Grid item container className={classes.actions} justify="space-between">
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
            >
              Zapisz
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

SettingsNPC.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(SettingsNPC);
