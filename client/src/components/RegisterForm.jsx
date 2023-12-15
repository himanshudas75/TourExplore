import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import axios from '../api/axios';
import { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { useSnackbar } from 'notistack';

import { registerSchema } from '../schemas.js';

function RegisterForm() {
    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    async function onSubmit(e) {
        const data = {
            username: e.username,
            email: e.email,
            password: e.password,
        };

        try {
            const res = await axios.post('/register', JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            enqueueSnackbar('User registered successfully!', {
                variant: 'success',
            });
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
            <Typography
                gutterBottom
                variant="h6"
                component="div"
                className="mb-3"
            >
                Register
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={registerSchema}
                onSubmit={onSubmit}
            >
                {({ values, handleChange, errors, touched }) => (
                    <Form noValidate>
                        <div className="mb-3">
                            <TextField
                                id="username"
                                inputRef={userRef}
                                label="Username"
                                variant="outlined"
                                size="small"
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
                                id="email"
                                label="Email"
                                type="email"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                value={values.email}
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
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default RegisterForm;
