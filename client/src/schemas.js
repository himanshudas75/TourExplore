import * as Yup from 'yup';
import validator from 'validator';

function htmlEscape(message = 'Must not include HTML') {
    return this.test('isHTML', message, function (value) {
        const { path, createError } = this;
        const clean = validator.escape(value);
        if (clean !== value) {
            return createError({ path, message });
        }

        return true;
    });
}

Yup.addMethod(Yup.string, 'escapeHTML', htmlEscape);

const m = {
    required: 'Must not be empty',
    min2: 'Must be greater than 2 characters',
    max50: 'Must be less than 50 characters',
};

export const loginSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .escapeHTML()
        .min(2, m.min2)
        .max(50, m.max50)
        .required(m.required),
    password: Yup.string()
        .trim()
        .min(8, 'Must be greater than 8 characters')
        .max(50, m.max50)
        .required(m.required),
});

export const passwordSchema = Yup.object().shape({
    password: Yup.string()
        .trim()
        .min(8, 'Must be greater than 8 characters')
        .max(50, m.max50)
        .required(m.required),
    confirmPassword: Yup.string()
        .required('Please re-type your password')
        .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

export const registerSchema = Yup.object().shape({
    username: Yup.string()
        .trim()
        .escapeHTML()
        .min(2, m.min2)
        .max(50, m.max50)
        .required(m.required),
    email: Yup.string()
        .trim()
        .escapeHTML()
        .email('Invalid email')
        .required(m.required),
    password: Yup.string()
        .trim()
        .min(8, 'Must be greater than 8 characters')
        .max(50, m.max50)
        .required(m.required),
    confirmPassword: Yup.string()
        .required('Please re-type your password')
        .oneOf([Yup.ref('password'), null], 'Passwords do not match'),
});

export const tourspotSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .escapeHTML()
        .required(m.required)
        .min(2, m.min2)
        .max(50, m.max50),
    location: Yup.string().required(m.required).trim().escapeHTML(),
    images: Yup.mixed().test('fileType', 'Only images are allowed', (value) => {
        if (value && value.length > 0) {
            for (let i = 0; i < value.length; i++) {
                if (
                    value[i].type != 'image/png' &&
                    value[i].type != 'image/jpg' &&
                    value[i].type != 'image/jpeg'
                ) {
                    return false;
                }
            }
        }
        return true;
    }),
    expected_budget: Yup.number()
        .required(m.required)
        .min(0, 'Budget cannot be less than 0')
        .typeError('Must be a number'),
    description: Yup.string().required(m.required).trim().escapeHTML(),
    deleteImages: Yup.array(),
});

export const reviewSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .escapeHTML()
        .required(m.required)
        .min(2, m.min2)
        .max(50, m.max50),
    body: Yup.string().required(m.required).trim().escapeHTML(),
    rating: Yup.number()
        .required(m.required)
        .min(1, 'Rating must have atleast 1 star')
        .max(5, 'Rating cannot have more than 5 stars')
        .typeError('Must be a number'),
});
