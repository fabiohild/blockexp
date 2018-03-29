import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

//window.provider="127.0.0.1"
ReactDOM.render( < App / > , document.getElementById('root'));
registerServiceWorker();
