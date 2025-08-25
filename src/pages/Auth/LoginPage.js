import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Box, Button, TextField, Typography, Container, Paper, Grid } from '@mui/material';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   const result = await login(email, password);
  //   if (!result.success) {
  //     setError(result.message || 'Login failed');
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  const result = await login({ email, password }); // Wrap in object
  if (!result.success) {
    setError(result.message || 'Login failed');
  }
};

   

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      console.log("Google ID token:", credentialResponse.credential);
      const result = await login(credentialResponse.credential, true);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError('Google authentication failed');
      }
    } catch (error) {
      setError('Google authentication failed');
    }
  };

  const handleGoogleFailure = () => {
    setError('Google authentication failed');
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Login
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </GoogleOAuthProvider>
          </Box>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" style={{ textDecoration: 'none' }}>
                <Typography variant="body2" color="primary">
                  Don&apos;t have an account? Sign up
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginPage;