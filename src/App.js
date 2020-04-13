import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Surveit from './components/Surveit';
import { BrowserRouter, Route } from "react-router-dom"
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function App() {
  return (
    <div className="App">
      <AppBar posiotion="static">
        <Toolbar>
        <Typography variant="h6">KAPYSurvey</Typography>
          <Breadcrumbs style={{ margin: 20}} aria-label="breadcrumb" color="white">
            <Link color="inherit" href="/Surveit" onClick={Surveit}>Surveys</Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/Surveit">Survey</Link>{' '}
          <Route path="/Surveit" component={Surveit} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
