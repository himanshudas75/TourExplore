import {
    TextField,
    Button,
    Typography,
    InputLabel,
    InputAdornment,
} from '@mui/material';

import FileInput from './FileInput.jsx';
import ClipLoader from 'react-spinners/ClipLoader';
import { useEffect, useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';
import useTourspots from '../hooks/useTourspots.js';
import { tourspotSchema } from '../schemas.js';
import { useNavigate } from 'react-router-dom';
import useData from '../hooks/useData.js';

function NewTourspotForm() {
    const navigate = useNavigate();
    const { nav } = useData();
    const titleRef = useRef();
    const { createTourspot } = useTourspots();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        titleRef.current.focus();
    }, []);
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = {
        title: '',
        location: '',
        images: [],
        expected_budget: '',
        description: '',
    };

    function goBack() {
        navigate(nav.index);
    }

    async function onSubmit(e) {
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('tourspot[title]', e.title);
        formData.append('tourspot[location]', e.location);
        formData.append('tourspot[expected_budget]', e.expected_budget);
        formData.append('tourspot[description]', e.description);

        e.images.forEach((image) => {
            formData.append(`tourspot[images]`, image);
        });

        try {
            const res = await createTourspot(formData);
            if (res) {
                if (res.success) {
                    enqueueSnackbar('Tourspot created successfully!', {
                        variant: 'success',
                    });
                    goBack();
                } else {
                    console.log(res);
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
                className="text-center fw-medium mb-4"
                gutterBottom
                variant="h4"
                component="div"
            >
                New Tourist Spot
            </Typography>
            <Formik
                initialValues={initialValues}
                validationSchema={tourspotSchema}
                onSubmit={onSubmit}
            >
                {({ values, handleChange, errors, touched }) => (
                    <Form noValidate>
                        <div className="mb-3">
                            <TextField
                                id="title"
                                inputRef={titleRef}
                                label="Title"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                                value={values.title}
                                fullWidth
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="location"
                                label="Location"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={
                                    touched.location && Boolean(errors.location)
                                }
                                helperText={touched.location && errors.location}
                                value={values.location}
                                fullWidth
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <FileInput
                                value={values.images}
                                field="images"
                                placeholder="Add Images"
                                size="small"
                                multiple={true}
                                fullWidth={true}
                                error={touched.images && Boolean(errors.images)}
                                helperText={touched.images && errors.images}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="mb-3">
                            <InputLabel htmlFor="expected_budget" required>
                                Expected Budget
                            </InputLabel>
                            <TextField
                                id="expected_budget"
                                placeholder="0"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            ₹
                                        </InputAdornment>
                                    ),
                                }}
                                size="small"
                                value={values.expected_budget}
                                onChange={handleChange}
                                error={
                                    touched.expected_budget &&
                                    Boolean(errors.expected_budget)
                                }
                                helperText={
                                    touched.expected_budget &&
                                    errors.expected_budget
                                }
                                fullWidth
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <TextField
                                id="description"
                                label="Description"
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={
                                    touched.description &&
                                    Boolean(errors.description)
                                }
                                helperText={
                                    touched.description && errors.description
                                }
                                value={values.description}
                                fullWidth
                                multiline
                                rows={4}
                                disabled={isSubmitting}
                                required
                            />
                        </div>
                        <Button
                            className="mb-4"
                            type="submit"
                            variant="contained"
                            color="success"
                            disabled={isSubmitting}
                        >
                            Add Tourist Spot
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

export default NewTourspotForm;
