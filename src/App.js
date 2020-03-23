import React from 'react';
import './style.css';

import Navbar from './components/Navbar/index.js';
import Routes from './routes'


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes/>
    </div>
  );
}

export default App;
