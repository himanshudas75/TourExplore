import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress } from '@mui/material';

// Custom FileInput component
const FileInput = ({ field, form, ...props }) => {
    const handleChange = (event) => {
        form.setFieldValue(field.name, event.currentTarget.files);
    };

    return (
        <div>
            <input
                type="file"
                onChange={handleChange}
                multiple
                style={{ display: 'none' }}
                {...field}
                {...props}
            />
            <Button variant="contained" component="label" htmlFor={field.name}>
                Upload Files
            </Button>
            {field.value && field.value.length > 0 && (
                <div>
                    {field.value.map((file, index) => (
                        <div key={index}>{file.name}</div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Temp = () => {
    const initialValues = {
        files: [],
    };

    const handleSubmit = (values, { setSubmitting }) => {
        console.log('Submitted files:', values.files);
        setSubmitting(false);
    };

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
                <Form>
                    <Field name="files" component={FileInput} />
                    {isSubmitting && <LinearProgress />}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        style={{ marginTop: '16px' }}
                    >
                        Submit
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default Temp;
