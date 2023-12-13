import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import '../stylesheets/LoginForm.css';

const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Username must be greater than 2 characters')
        .max(50, 'Username must be less than 50 characters')
        .required('Username must not be empty'),
    password: Yup.string()
        .min(2, 'Password must be greater than 8 characters')
        .required('Password must not be empty'),
});

function LoginForm() {
    const initialValues = {
        username: '',
        password: '',
    };

    async function getTourspots() {
        await axios.get('/tourspots').then((res) => {
            setTourspots(res.data);
        });
    }

    async function onSubmit(e) {
        const data = {
            username: e.username,
            password: e.password,
        };
        await axios
            .post('/login', data)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
            })
            .catch((err) => {
                console.log(err);
            });
        console.log(e);
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
