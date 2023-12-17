import { TextField, Button, Typography, Checkbox } from '@mui/material';

import { useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';

import { registerSchema } from '../schemas.js';
import useData from '../hooks/useData.js';
import useUser from '../hooks/useUser.js';
import PersistLoginCheckbox from './PersistLoginCheckbox.jsx';

function RegisterForm() {
    const { register } = useUser();
    const userRef = useRef();
    const { nav } = useData();

    useEffect(() => {
        userRef.current.focus();
    }, []);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || nav.home;

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    async function onSubmit(e) {
        const data = {
            username: e.username,
            email: e.email,
            password: e.password,
        };

        try {
            const res = await register(data);
            if (res) {
                if (res.success) {
                    enqueueSnackbar('User registered successfully!', {
                        variant: 'success',
                    });
                    navigate(from, { replace: true });
                } else {
                    enqueueSnackbar(res.message, {
                        variant: 'error',
                    });
                }
            } else {
                enqueueSnackbar('No response from server', {
                    variant: 'error',
                });
            }
        } catch (err) {
            console.error(err);
            enqueueSnackbar('Something went wrong, please try again', {
                variant: 'error',
            });
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
                        <div className="mb-1">
                            <TextField
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={
                                    touched.confirmPassword &&
                                    Boolean(errors.confirmPassword)
                                }
                                helperText={
                                    touched.confirmPassword &&
                                    errors.confirmPassword
                                }
                                value={values.confirmPassword}
                                fullWidth
                                required
                            />
                        </div>
                        <div className="mb-1">
                            <PersistLoginCheckbox />
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
