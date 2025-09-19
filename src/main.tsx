import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Logger } from './services/loggingService';

// --- Global Error Handling ---

// Catches unhandled synchronous errors and syntax errors
window.onerror = (message, source, lineno, colno, error) => {
  Logger.error('Unhandled global error:', {
    message,
    source,
    lineno,
    colno,
    error,
  });
  // Return true to prevent the error from being shown in the browser's console
  // We return false to allow it for development visibility.
  return false; 
};

// Catches unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
  Logger.error('Unhandled promise rejection:', event.reason);
});

// --- Application Initialization ---

Logger.info('Application starting...');

const rootElement = document.getElementById('root');
if (!rootElement) {
  const err = new Error("Could not find root element to mount to");
  Logger.error('Application Mount Failed:', err);
  throw err;
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);