import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';

import axios from 'axios';

import '../stylesheets/LoginForm.css';

import { loginSchema } from '../schemas.js';
import { useSnackbar } from 'notistack';
import useAuth from '../hooks/useAuth.js';

function LoginForm() {
    const { setAuth } = useAuth();
    const userRef = useRef();
    useEffect(() => {
        userRef.current.focus();
    }, []);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const initialValues = {
        username: '',
        password: '',
    };

    async function onSubmit(e) {
        const data = {
            username: e.username,
            password: e.password,
        };

        try {
            const res = await axios.post('/login', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });

            const accessToken = res.data.accessToken;
            const user_id = res.data.user.user_id;
            const username = e.username;
            const password = e.password;

            setAuth({ user_id, username, password, accessToken });
            enqueueSnackbar(res.data.message, {
                variant: 'success',
            });

            navigate(from, { replace: true });
        } catch (err) {
            var message;
            if (!err?.response) {
                message = 'No response from server';
            } else message = err.response.data.message;
            enqueueSnackbar(message, { variant: 'error' });
        }
    }

    return (
        <>
            <Typography gutterBottom variant="h6" component="div">
                Login
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={loginSchema}
                onSubmit={onSubmit}
            >
                {({ values, handleChange, errors, touched }) => (
                    <Form noValidate>
                        <div className="mb-3">
                            <TextField
                                id="username"
                                label="Username"
                                variant="outlined"
                                size="small"
                                inputRef={userRef}
                                onChange={handleChange}
                                error={
                                    touched.username && Boolean(errors.username)
                                }
                                helperText={touched.username && errors.username}
                                value={values.username}
                                fullWidth
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={
                                    touched.password && Boolean(errors.password)
                                }
                                helperText={touched.password && errors.password}
                                value={values.password}
                                fullWidth
                                required
                            />
                        </div>
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="success"
                        >
                            Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default LoginForm;
