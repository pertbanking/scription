// -*- encoding: utf-8 -*-
//
// (c) Joshua Petrin 2024. All rights reserved.
//
// File creation date: 13 November 2024
// File creator: Joshua Petrin

import './css/app.css';
import App from './app';
import reportWebVitals from './reportWebVitals';

import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
