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
import { register } from '../../services/api';

const formStyle = {
    width: '400px',
    margin: 'auto',
    marginTop: '100px',
    padding: '20px',
    borderRadius: '5px',
    boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            setError(
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
            );
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await register({
                username,
                email,
                password,
                confirmPassword,
            });

            // Display success message
            setSuccessMessage(response.message);
            setOpenSnackbar(true);

            // Clear form fields
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (err) {
            setError(err.message); // Display error message from backend
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container>
            <Box className={formStyle}>
                <Typography variant="h5" sx={{ textAlign: 'center', mb: 2 }}>
                    Register
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Username"
                                variant="outlined"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                type="email"
                                variant="outlined"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                type="password"
                                variant="outlined"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {error && (
                    <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                        {error}
                    </Typography>
                )}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                >
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        {successMessage}
                    </Alert>
                </Snackbar>

            </Box>
        </Container>
    );
}

export default RegisterForm;
