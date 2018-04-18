import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js';
import Main from './components/Main.js';

class App extends Component {

  render() {
    return (
        <div>
        <Header store={this.props.store}/>
        <Main store={this.props.store}/>
        </div>
    );
  }
}

export default App;
