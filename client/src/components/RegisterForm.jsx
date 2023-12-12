import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const registerSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Username must be greater than 2 characters')
        .max(50, 'Username must be less than 50 characters')
        .required('Username must not be empty'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email must not be empty'),
    password: Yup.string()
        .min(2, 'Password must be greater than 8 characters')
        .required('Password must not be empty'),
});

function RegisterForm() {
    const initialValues = {
        username: '',
        email: '',
        password: '',
    };

    function onSubmit(e) {
        console.log(e);
    }

    return (
        <>
            <Typography gutterBottom variant="h6" component="div">
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
