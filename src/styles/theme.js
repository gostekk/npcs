import { createMuiTheme } from '@material-ui/core/styles';

const styledBy = (property, mapping) => mapping[property];

const colors = [
  'default',
  'pink',
  'purple',
  'deepPurple',
  'blue',
  'green',
  // 'blueGrey',
];
const rand = colors[Math.floor(Math.random() * colors.length)];


const theme = createMuiTheme({
  palette: {
    primary: {
      main: styledBy(rand, {
        default: '#e53935',
        pink: '#e91e63',
        purple: '#9c27b0',
        deepPurple: '#673ab7',
        blue: '#2196F3',
        green: '#43a047',
        blueGrey: '#78909c',
      }),
    },
    secondary: {
      main: styledBy(rand, {
        default: '#ef5350',
        pink: '#ec407a',
        purple: '#ab47bc',
        deepPurple: '#7e57c2',
        blue: '#2196f3',
        green: '#388e3c',
        blueGrey: '#607d8b',
      }),
    },
  },
  typography: {
    useNextVariants: true,
  },
  breakpoints: {
    values: {
      xs: 450,
      sm: 600,
      md: 839,
      lg: 1024,
      xl: 1280,
    },
  },
  overrides: {
    MuiAppBar: {
      colorSecondary: {
        background: styledBy(rand, {
          default: 'linear-gradient(45deg, #ef5350 30%, #e53935 90%)',
          pink: 'linear-gradient(45deg, #ec407a 30%, #e91e63 90%)',
          purple: 'linear-gradient(45deg, #ab47bc 30%, #9c27b0 90%)',
          deepPurple: 'linear-gradient(45deg, #ab47bc 30%, #7e57c2 90%)',
          blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          green: 'linear-gradient(45deg, #388e3c 30%, #43a047 90%)',
          blueGrey: 'linear-gradient(45deg, #607d8b 30%, #78909c 90%)',
        }),
      },
    },
  },
});

export default theme;
