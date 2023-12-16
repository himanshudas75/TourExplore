import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from '@mui/material';

import { Fragment, useEffect, useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Formik, Form, useFormikContext } from 'formik';

import { passwordSchema } from '../schemas.js';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';
import useUser from '../hooks/useUser.js';
import ClipLoader from 'react-spinners/ClipLoader';

function SubmitButton({ disabled = false }) {
    const { submitForm } = useFormikContext();

    return (
        <Button type="submit" onClick={submitForm} disabled={disabled}>
            Confirm
        </Button>
    );
}

function ChangePasswordDialog({ isOpen, handleClose }) {
    const axiosPrivate = useAxiosPrivate();
    const { enqueueSnackbar } = useSnackbar();
    const passwordRef = useRef();
    const { changePassword } = useUser();

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        passwordRef?.current?.focus();
    }, [isOpen]);

    const initialValues = {
        password: '',
        confirmPassword: '',
    };

    async function onSubmit(e) {
        const data = {
            password: e.password,
        };

        try {
            setIsSubmitting(true);
            const res = await changePassword(data);
            if (res) {
                if (res.success) {
                    enqueueSnackbar('Password changed successfully!', {
                        variant: 'success',
                    });
                    handleClose();
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
        <Fragment>
            <Dialog
                disableRestoreFocus
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Please enter your new password'}
                </DialogTitle>

                <Formik
                    initialValues={initialValues}
                    validationSchema={passwordSchema}
                    onSubmit={onSubmit}
                >
                    {({ values, handleChange, errors, touched }) => (
                        <>
                            <DialogContent>
                                <Form noValidate>
                                    <div className="mb-3 mt-2">
                                        <TextField
                                            id="password"
                                            type="password"
                                            label="Password"
                                            inputRef={passwordRef}
                                            variant="outlined"
                                            size="small"
                                            onChange={handleChange}
                                            error={
                                                touched.password &&
                                                Boolean(errors.password)
                                            }
                                            helperText={
                                                touched.password &&
                                                errors.password
                                            }
                                            value={values.password}
                                            fullWidth
                                            required
                                            disabled={isSubmitting}
                                            autoFocus
                                        />
                                    </div>
                                    <div className="mb-3 mt-2">
                                        <TextField
                                            id="confirmPassword"
                                            type="password"
                                            label="Confirm Password"
                                            variant="outlined"
                                            size="small"
                                            onChange={handleChange}
                                            error={
                                                touched.confirmPassword &&
                                                Boolean(errors.confirmPassword)
                                            }
                                            helperText={
                                                touched.confirmPassword &&
                                                errors.confirmPassword
                                            }
                                            value={values.confirmPassword}
                                            fullWidth
                                            required
                                            disabled={isSubmitting}
                                            autoFocus
                                        />
                                    </div>
                                </Form>
                            </DialogContent>
                            <DialogActions>
                                <ClipLoader
                                    size="25px"
                                    color="rgb(124,124,124)"
                                    loading={isSubmitting}
                                />
                                <SubmitButton disabled={isSubmitting} />
                                <Button
                                    onClick={handleClose}
                                    disabled={isSubmitting}
                                >
                                    Cancel
                                </Button>
                            </DialogActions>
                        </>
                    )}
                </Formik>
            </Dialog>
        </Fragment>
    );
}

export default ChangePasswordDialog;
