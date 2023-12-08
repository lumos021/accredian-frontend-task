import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Grid,
    Container,
    Snackbar,
} from '@mui/material';
import { Alert } from '@mui/lab';
import { login } from '../../services/api';

const formStyle = {
    width: '300px',
    margin: 'auto',
    marginTop: '100px',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

function LoginForm() {
    const [username, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [serverError, setServerError] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setServerError('');

        if (!password) {
            setError('Password cannot be empty');
            return;
        }

        try {
            const response = await login({ login: username, password });
            console.log(response);
            setLoginSuccess(true);
            setSuccessMessage('Login successful!');
        } catch (err) {
            setServerError(err.message);
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setLoginSuccess(false);
      };

    return (
        <Container>
            <Box sx={formStyle} >
                <Typography variant="h5" sx={{ textAlign: 'center', mb: 2.5 }}>
                    Login
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email or Username"
                                variant="outlined"
                                value={username}
                                onChange={(event) => {
                                    setLogin(event.target.value);
                                }}
                                error={!!error}
                                helperText={error}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setError('');
                                }}
                                error={!!error}
                                helperText={error}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {serverError && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {serverError}
                    </Typography>
                )}
            </Box>
            <Snackbar
                open={loginSuccess}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default LoginForm;
