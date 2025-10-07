import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Global error handler for async response errors
window.addEventListener('error', (event) => {
  if (event.error && event.error.message && 
      event.error.message.includes('message channel closed')) {
    event.preventDefault();
    console.log('Prevented async response error:', event.error);
    return false;
  }
});

// Global unhandled rejection handler
window.addEventListener('unhandledrejection', (event) => {
  if (event.reason && event.reason.message && 
      (event.reason.message.includes('message channel closed') ||
       event.reason.message.includes('A listener indicated an asynchronous response'))) {
    event.preventDefault();
    console.log('Prevented async response error:', event.reason);
    return false;
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Service Worker registration removed to fix Netlify deployment issues
