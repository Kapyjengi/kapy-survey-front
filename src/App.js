import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Surveys from './components/Surveys';
import { BrowserRouter, Route } from "react-router-dom"
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function App() {
  return (
    <div className="App">
      <AppBar posiotion="static">
        <Toolbar>
          <Typography variant="h6">KÄPYSurvey</Typography>
          <Breadcrumbs style={{ marginLeft: 30, marginTop: 3 }} aria-label="breadcrumb" color="white">
            <Link color="inherit" href="/Surveys" onClick={Surveys}>Surveys</Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/Surveys">Survey</Link>{' '}
          <Route path="/Surveys" component={Surveys} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
