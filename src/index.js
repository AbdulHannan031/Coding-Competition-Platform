import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ContextProvider } from './context/context';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
    <App />

    </ContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
// Place this code in your main JavaScript file (e.g., `index.js`)
const consoleError = console.error;
console.error = (...args) => {
  if (args[0].includes('ResizeObserver loop completed')) {
    return; // Ignore this specific error
  }
  consoleError(...args); // Otherwise, log as usual
};
