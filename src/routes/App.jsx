import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Material-ui
import CssBaseline from '@material-ui/core/CssBaseline';

// Components
import Authenticated from '../components/Authenticated';
import Public from '../components/Public';
import Navigation from '../components/Navigation';

// Pages
import Home from '../pages/Home';
import AddNPC from '../pages/AddNPC';
import InfoNPC from '../pages/InfoNPC';
import EditNPC from '../pages/EditNPC';
import Login from '../pages/Login';
import Comment from '../pages/Comment';
import SettingsNPC from '../pages/SettingsNPC';

export default function App() {
  return (
    <Router>
      <div>
        <CssBaseline />
        <Navigation />
        <Switch>
          <Authenticated path="/" exact component={Home} />
          <Public path="/login" exact component={Login} />
          <Authenticated path="/add" exact component={AddNPC} />
          <Authenticated path="/info" exact component={InfoNPC} />
          <Authenticated path="/edit/:id" exact component={EditNPC} />
          <Authenticated path="/comment/:id" exact component={Comment} />
          <Authenticated path="/settings" exact component={SettingsNPC} />
        </Switch>
      </div>
    </Router>
  );
}
