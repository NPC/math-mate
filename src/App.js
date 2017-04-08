import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import MathTest from './components/MathTest';

class App extends Component {
  render() {
    return (
      <div className="page-container">
        <MathTest total="5" />
      </div>
    );
  }
}

export default App;
