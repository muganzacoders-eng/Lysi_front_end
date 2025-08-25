import React from 'react';
// import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client'; // Updated import
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './styles/global.css';

const container = document.getElementById('root');
const root = createRoot(container); // Create a root

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <App />
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();



//better change
// import { createRoot } from 'react-dom/client';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const container = document.getElementById('root');
// const root = createRoot(container);

// root.render(
//   <React.StrictMode>
//     <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
//       {/* Rest of your providers */}
//     </GoogleOAuthProvider>
//   </React.StrictMode>
// );