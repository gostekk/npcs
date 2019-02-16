import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Material-ui
import CssBaseline from '@material-ui/core/CssBaseline';

// Context
import { CharactersContext } from '../context/CharactersContext';
// Components
import Authenticated from '../components/Authenticated';
import Public from '../components/Public';
import Navigation from '../components/Navigation';

// Pages
import Home from '../pages/Home';
import AddNPC from '../pages/AddNPC';
import EditNPC from '../pages/EditNPC';
import Login from '../pages/Login';

export default function App() {
  const { fetchCharacters } = useContext(CharactersContext);

  useEffect(() => {
    fetchCharacters();
  }, []);

  return (
    <Router>
      <div>
        <CssBaseline />
        <Navigation />
        <Switch>
          <Route path="/" exact component={Home} />
          <Public path="/auth" exact component={Login} />
          <Authenticated path="/add" exact component={AddNPC} />
          <Authenticated path="/edit/:id" exact component={EditNPC} />
        </Switch>
      </div>
    </Router>
  );
}
