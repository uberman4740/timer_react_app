import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TimersDashboard from './App.js';
import registerServiceWorker from './registerServiceWorker';
// import TimersDashboard from './'

ReactDOM.render(<TimersDashboard />, document.getElementById('root'));
registerServiceWorker();
