import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Username must be greater than 2 characters')
        .max(50, 'Username must be less than 50 characters')
        .required('Username must not be empty'),
    password: Yup.string()
        .min(2, 'Password must be greater than 8 characters')
        .required('Password must not be empty'),
});

export const registerSchema = Yup.object().shape({
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
