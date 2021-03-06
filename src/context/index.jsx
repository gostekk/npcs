import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider } from 'notistack';
import { MuiThemeProvider } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../styles/theme';
import { CharactersProvider } from './CharactersContext';
import { AppProvider } from './AppContext';

function Provider(props) {
  const { children } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <AppProvider>
            <CharactersProvider>
              {children}
            </CharactersProvider>
          </AppProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}

Provider.propTypes = ({
  children: PropTypes.object.isRequired,
});

export default Provider;
