import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
        <div>
            <div class="ui three buttons">
                <button class="ui active button">One</button>
                <button class="ui button">Two</button>
                <button class="ui button">Three</button>
            </div>

                <div className="App">
                    <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <h1 className="App-title">Welcome to React</h1>
                    </header>
                    <p className="App-intro">
                        To get started, edit <code>src/App.js</code> and save to reload.
                    </p>
                </div>


        </div>


    );
  }
}

export default App;
