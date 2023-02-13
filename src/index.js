//import react
import React from 'react';

//import react dom
import ReactDOM from 'react-dom';

//import component App
import App from './App';

//import BrowserRouter dari react router
import { BrowserRouter } from 'react-router-dom';

//import CSS Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);