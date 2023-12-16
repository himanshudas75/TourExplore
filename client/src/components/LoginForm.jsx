import { TextField, Button, Typography } from '@mui/material';

import { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form } from 'formik';

import { loginSchema } from '../schemas.js';
import { useSnackbar } from 'notistack';
import useData from '../hooks/useData.js';

import useUser from '../hooks/useUser.js';

function LoginForm() {
    const { login } = useUser();
    const { nav } = useData();

    const userRef = useRef();
    useEffect(() => {
        userRef.current.focus();
    }, []);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || nav.home;

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
            const res = await login(data);
            if (res) {
                if (res.success) {
                    enqueueSnackbar('Logged in successfully!', {
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
