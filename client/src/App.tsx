import React from 'react';
import './App.css';
import Grid from './components/Grid';
import Header from './components/header/Header';
import { Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Router> */}
        <Header/>
        <Grid/>
        {/* <Routes>
          <Route>


          </Route>
        </Routes> */}
      {/* </Router> */}
    </div>
  );
}

export default App;
