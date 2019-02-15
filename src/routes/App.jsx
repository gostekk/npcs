import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import { SnackbarProvider } from 'notistack';

// Style
import '../styles/App.css';

// Material-ui
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../styles/theme';

// Components
import Navigation from '../components/Navigation';

// Pages
import Home from '../pages/Home';
import AddNPC from '../pages/AddNPC';
import EditNPC from '../pages/EditNPC';

class App extends Component {
  state = {
    data: [],
    appearHome: true,
  };

  componentWillMount() {
    this.fetchData();
  }

  fetchData = () => {
    axios.get('http://back.gostekk.pl/api/npcs')
      .then((res) => {
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { data, appearHome } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <div>
              <CssBaseline />
              <Navigation />
              <CSSTransition
                in={appearHome}
                appear={true}
                timeout={600}
                classNames="fade"
              >
                <Switch>
                  <Route path="/" exact render={props => <Home {...props} data={data} fetchData={this.fetchData} />} />
                  <Route path="/add" exact render={props => <AddNPC {...props} fetchData={this.fetchData} />} />
                  <Route path="/edit/:id" exact render={props => <EditNPC {...props} fetchData={this.fetchData} />} />
                </Switch>
              </CSSTransition>
            </div>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

export default App;
