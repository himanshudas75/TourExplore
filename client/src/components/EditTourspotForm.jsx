import {
    TextField,
    Button,
    Typography,
    InputLabel,
    InputAdornment,
    Checkbox,
    Box,
    Grid,
} from '@mui/material';
import FileInput from './FileInput.jsx';
import ClipLoader from 'react-spinners/ClipLoader';

import { useEffect, useRef, useState } from 'react';
import { Formik, Form } from 'formik';
import { useSnackbar } from 'notistack';
import { tourspotSchema } from '../schemas.js';
import useData from '../hooks/useData.js';
import { useNavigate } from 'react-router-dom';
import useTourspots from '../hooks/useTourspots.js';

function EditTourspotForm({ tourspot }) {
    const titleRef = useRef();
    const { nav } = useData();
    const navigate = useNavigate();
    const { editTourspot } = useTourspots();
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        titleRef.current.focus();
    }, []);
    const { enqueueSnackbar } = useSnackbar();

    const initialValues = {
        title: tourspot?.title,
        location: tourspot?.location,
        images: [],
        expected_budget: tourspot?.expected_budget,
        description: tourspot?.description,
        deleteImages: [],
    };

    function goBack() {
        navigate(`${nav.index}/${tourspot._id}`);
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

        e.deleteImages.forEach((deleteImage) => {
            formData.append(`deleteImages`, deleteImage);
        });

        try {
            const res = await editTourspot(tourspot._id, formData);
            if (res) {
                if (res.success) {
                    enqueueSnackbar('Tourspot updated successfully!', {
                        variant: 'success',
                    });
                    goBack();
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
                className="text-center fw-medium mb-4"
                gutterBottom
                variant="h4"
                component="div"
            >
                Edit Tourist Spot
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
                                placeholder="Add More Images"
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
                        <Box className="mb-3" sx={{ width: '100%' }}>
                            {tourspot?.images?.length ? (
                                <Typography
                                    className="mb-3"
                                    gutterBottom
                                    variant="h6"
                                    component="div"
                                >
                                    Select the images you want to delete
                                </Typography>
                            ) : (
                                ''
                            )}
                            <Grid
                                container
                                rowSpacing={1}
                                columnSpacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                                {tourspot?.images?.map((img, index) => (
                                    <Grid
                                        item
                                        xs={2}
                                        sm={4}
                                        md={6}
                                        key={`checkbox-${index}`}
                                        justifyContent="center"
                                        display="flex"
                                    >
                                        <label
                                            htmlFor={`image-${index}`}
                                            key={`image-label-${index}`}
                                            className="image-checkbox-container"
                                        >
                                            <img
                                                src={img.thumbnail}
                                                className="img-thumbnail ms-0"
                                                alt=""
                                            />
                                        </label>
                                        <Checkbox
                                            name="deleteImages"
                                            id={`image-${index}`}
                                            key={`image-${index}`}
                                            label="Delete Image"
                                            onChange={handleChange}
                                            value={img.filename}
                                            className="pe-0 me-0"
                                            disabled={isSubmitting}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Grid
                            container
                            rowSpacing={1}
                            columnSpacing={{ xs: 2, md: 3 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                            className="mt-3"
                        >
                            <Grid
                                item
                                xs={2}
                                sm={4}
                                md={6}
                                justifyContent="start"
                                display="flex"
                            >
                                <Button
                                    className="mb-4"
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    disabled={isSubmitting}
                                >
                                    Update Tourist Spot
                                </Button>
                                <ClipLoader
                                    className="ms-4 mb-1"
                                    size="25px"
                                    color="rgb(124,124,124)"
                                    loading={isSubmitting}
                                />
                            </Grid>
                            <Grid
                                item
                                xs={2}
                                sm={4}
                                md={6}
                                justifyContent="end"
                                display="flex"
                            >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className="mb-4 justify-content-end"
                                    onClick={goBack}
                                    disabled={isSubmitting}
                                >
                                    Go Back to Tourist Spot
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    );
}

export default EditTourspotForm;
