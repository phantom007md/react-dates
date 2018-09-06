import React from 'react';
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import './styles/fonts.css';
import './styles/index.css';
import App from './App';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

if (document.getElementById('datesWrapper')) {
    ReactDOM.render(<App/>, document.getElementById('datesWrapper'));
}
