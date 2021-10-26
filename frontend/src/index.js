import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StyledEngineProvider } from '@mui/material/styles';
import 'bootstrap/dist/css/bootstrap.css';
//Whole website color
//document.body.style = "background: #E5E5E5"

ReactDOM.render(
  <React.StrictMode>
  <StyledEngineProvider injectFirst>
    <App />
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
