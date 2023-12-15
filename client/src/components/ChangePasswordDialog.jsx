import { Fragment, useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';

import useLogout from '../hooks/useLogout.js';
import TextField from '@mui/material/TextField';
import { Formik, Form, Field, useFormikContext } from 'formik';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useData from '../hooks/useData.js';
import { useNavigate } from 'react-router-dom';

function SubmitButton() {
    const { submitForm } = useFormikContext();

    return (
        <Button type="submit" onClick={submitForm}>
            Confirm
        </Button>
    );
}

function ChangePasswordDialog({ isOpen, handleClose }) {
    // const { nav } = useData();
    // const navigate = useNavigate();

    // const { enqueueSnackbar } = useSnackbar();
    // const logout = useLogout();
    // const signOut = async () => {
    //     try {
    //         await logout();
    //         handleClose();
    //         enqueueSnackbar('Logged out successfully', { variant: 'success' });
    //         navigate(nav.login);
    //     } catch (err) {
    //         enqueueSnackbar('Something went wrong', { variant: 'error' });
    //     }
    // };

    // const passwordRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        passwordRef?.current?.focus();
    }, [isOpen]);

    const initialValues = {
        password: '',
    };

    async function onSubmit(e) {
        console.log(e);
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

                {/* <DialogContentText id="alert-dialog-description">
                        You will be redirected to the Login screen.
                    </DialogContentText> */}
                <Formik
                    initialValues={initialValues}
                    // validationSchema={newTourspotSchema}
                    onSubmit={onSubmit}
                    // innerRef={formikRef}
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
                                            autoFocus
                                        />
                                    </div>
                                </Form>
                            </DialogContent>
                            <DialogActions>
                                <SubmitButton />
                                <Button onClick={handleClose}>Cancel</Button>
                            </DialogActions>
                        </>
                    )}
                </Formik>
            </Dialog>
        </Fragment>
    );
}

export default ChangePasswordDialog;
