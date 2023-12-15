import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileInput from './FileInput.jsx';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Rating from '@mui/material/Rating';

import axios from '../api/axios';
import { useEffect, useState } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { useSnackbar } from 'notistack';

import { reviewSchema } from '../schemas.js';

function ReviewForm() {
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = {
        title: '',
        body: '',
        rating: 1,
    };

    async function onSubmit(e) {
        console.log(e);
    }

    return (
        <>
            <Typography
                className="fw-medium mb-1"
                gutterBottom
                variant="h5"
                component="div"
            >
                Leave a Review
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={reviewSchema}
                onSubmit={onSubmit}
            >
                {({ values, handleChange, errors, touched }) => (
                    <Form noValidate>
                        <div className="mb-3">
                            <Rating
                                id="rating"
                                name="rating"
                                label="rating"
                                value={values.rating}
                                onChange={handleChange}
                                required
                                size="large"
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="title"
                                label="Title"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                                value={values.title}
                                fullWidth
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <TextField
                                id="body"
                                label="Body"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={touched.body && Boolean(errors.body)}
                                helperText={touched.body && errors.body}
                                value={values.body}
                                fullWidth
                                multiline
                                rows={4}
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Add Review
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default ReviewForm;
