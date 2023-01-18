import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT,
  transition: transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <App />
  </AlertProvider>
);


