import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board/Board';
import '../src/assets/index.css';
import {BrowserRouter, NavLink, Route} from 'react-router-dom';
import Settings from './components/App/Settings';
import Credits from './components/App/Credits';
import Rules from './components/App/Rules';

// ========================================

ReactDOM.render(
  <BrowserRouter>
    <div>
      <h1>Welcome to the battleship game!</h1>
      <p>What would you like to do?</p>
      <ul className="nav">
        <li><NavLink to="/board">Play</NavLink></li>
        <li><NavLink to="/settings">Settings</NavLink></li>
        <li><NavLink to="/credits">Credits</NavLink></li>
        <li><NavLink to="/rules">Rules</NavLink></li>
      </ul>
      <div className="content">
        <Route path="/board" component={Board}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/credits" component={Credits}/>
        <Route path="/rules" component={Rules}/>
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
