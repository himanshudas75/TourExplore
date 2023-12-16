import { TextField, Button, Typography, Rating } from '@mui/material';
import { Formik, Form, useFormikContext } from 'formik';
import { useSnackbar } from 'notistack';
import useReviews from '../hooks/useReviews.js';
import { reviewSchema } from '../schemas.js';
import useAuth from '../hooks/useAuth.js';
import ClipLoader from 'react-spinners/ClipLoader';
import { useState } from 'react';

function RatingInput({ value, disabled = false }) {
    const { setFieldValue } = useFormikContext();
    const handleRatingChange = (e) => {
        const newRating = parseInt(e.target.value);
        setFieldValue('rating', newRating);
    };
    return (
        <Rating
            id="rating"
            type="number"
            name="rating"
            label="rating"
            value={value}
            onChange={handleRatingChange}
            required
            size="large"
            disabled={disabled}
        />
    );
}

function ReviewForm({ tourspotId, addNewReview }) {
    const { createReview } = useReviews();
    const { enqueueSnackbar } = useSnackbar();
    const { auth } = useAuth();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues = {
        title: '',
        body: '',
        rating: 1,
    };

    async function onSubmit(e, { resetForm }) {
        resetForm(initialValues);
        const data = {
            review: {
                title: e.title,
                body: e.body,
                rating: e.rating,
            },
        };

        try {
            setIsSubmitting(true);
            const res = await createReview(tourspotId, data);
            if (res) {
                if (res.success) {
                    const newReview = {
                        ...data.review,
                        author: { _id: auth.user_id, username: auth.username },
                        _id: res.review,
                    };
                    enqueueSnackbar('Review created successfully!', {
                        variant: 'success',
                    });
                    addNewReview(newReview);
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
        } finally {
            setIsSubmitting(false);
        }
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
                            <RatingInput
                                value={values.rating}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                                value={values.title}
                                fullWidth
                                required
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className="mb-3">
                            <TextField
                                id="body"
                                name="body"
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
                                disabled={isSubmitting}
                            />
                        </div>
                        <Button
                            className="mb-4"
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            Add Review
                        </Button>
                        <ClipLoader
                            className="ms-4 mb-1"
                            size="25px"
                            color="rgb(124,124,124)"
                            loading={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default ReviewForm;
