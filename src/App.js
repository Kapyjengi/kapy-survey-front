import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Surveylist from './components/Surveylist';
import Questionlist from './components/Questionlist';
import { BrowserRouter, Route } from "react-router-dom"
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

function App() {
  return (
    <div className="App">
      <AppBar posiotion="static">
        <Toolbar>
          <Typography variant="h6">KAPYSurvey</Typography>
          <Breadcrumbs style={{ margin: 20 }} aria-label="breadcrumb" color="white">
            <Link color="inherit" href="/Surveylist" onClick={Surveylist}>Surveys</Link>
            <Link color="inherit" href="/Questionlist" onClick={Questionlist}>Questions</Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/Surveylist">Survey</Link>{' '}
          <Link to="/Questionlist">Questions</Link>{' '}

          <Route path="/Surveylist" component={Surveylist} />
          <Route path="/Questionlist" component={Questionlist} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
