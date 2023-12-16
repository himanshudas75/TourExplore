import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from '@mui/material';

import { Fragment, useState } from 'react';
import { useSnackbar } from 'notistack';

import useUser from '../hooks/useUser.js';

import useData from '../hooks/useData.js';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

function LogoutDialog({ isOpen, handleClose }) {
    const { nav } = useData();
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { enqueueSnackbar } = useSnackbar();
    const { logout } = useUser();
    const signOut = async () => {
        try {
            setIsSubmitting(true);
            const res = await logout();
            if (res) {
                if (res.success) {
                    enqueueSnackbar('Logged out successfully', {
                        variant: 'success',
                    });
                    navigate(nav.login);
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
    };

    return (
        <Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are you sure that you want to Log out?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You will be redirected to the Login screen.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ClipLoader
                        size="25px"
                        color="rgb(124,124,124)"
                        loading={isSubmitting}
                    />
                    <Button
                        onClick={signOut}
                        color="error"
                        disabled={isSubmitting}
                        autoFocus
                    >
                        Confirm Logout
                    </Button>
                    <Button onClick={handleClose} disabled={isSubmitting}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default LogoutDialog;
