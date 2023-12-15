import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FileInput from './FileInput.jsx';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import axios from '../api/axios';
import { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, useFormikContext } from 'formik';
import { useSnackbar } from 'notistack';

import { tourspotSchema } from '../schemas.js';

function NewTourspotForm() {
    const titleRef = useRef();

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

    async function onSubmit(e) {
        console.log(e);
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
                                // label="Expected Budget"
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
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                        >
                            Add Tourist Spot
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default NewTourspotForm;
