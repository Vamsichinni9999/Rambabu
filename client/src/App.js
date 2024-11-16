import React from 'react';
import Header from '../src/Header/Header.js';
import Page from '../src/MainPages/page.js';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css'; // Ensure you import the CSS file where the background is defined

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        
        <Page/>
      </Router>
    </div>
  );
}

export default App;
