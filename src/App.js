import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Surveys from './components/Surveys';
import { BrowserRouter, Route } from "react-router-dom"
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Answer from './components/Answer';

function App() {
  return (
    <div className="App">
      <AppBar posiotion="static">
        <Toolbar>
          <Typography variant="h6">KÄPYSurvey</Typography>
          <Breadcrumbs style={{ margin: 20 }} aria-label="breadcrumb" color="white">
            <Link color="inherit" href="/Surveys" onClick={Surveys}>Surveys</Link>
            <Link color="inherit" href="/Answer" onClick={Answer}>Answer question</Link>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <div>
          <Link to="/Surveys">Survey</Link>{' '}
          <Route path="/Surveys" component={Surveys} />
        </div>
        <div>
          <Link to="/Answer">Answer question</Link>{' '}
          <Route path="/Answer" component={Answer} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
