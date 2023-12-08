import React, { useState } from 'react';
import { Button, Container, Typography, Grid } from '@mui/material';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(true);

  const toggleForm = () => {
    setShowLoginForm(!showLoginForm);
  };

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Typography variant="h5" style={{ marginBottom: '20px' }}>
          Authentication
        </Typography>
        <Grid item xs={12}>
          {showLoginForm ? <LoginForm /> : <RegisterForm />}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="primary"
            onClick={toggleForm}
            style={{ marginTop: '20px' }}
          >
            {showLoginForm ? 'Not Registered? Signup!' : 'Already registered? Login'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;