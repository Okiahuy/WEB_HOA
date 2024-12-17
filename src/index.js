import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="477903384113-7fk5jd7r3uesfu8a4ndrtuo0kjfk4cn3.apps.googleusercontent.com">
    <React.StrictMode>
        <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

reportWebVitals();

            