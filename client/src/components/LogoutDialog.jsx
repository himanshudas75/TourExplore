import { Fragment } from 'react';
import { useSnackbar } from 'notistack';

import useLogout from '../hooks/useLogout.js';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import useData from '../hooks/useData.js';
import { useNavigate } from 'react-router-dom';

function LogoutDialog({ isOpen, handleClose }) {
    const { nav } = useData();
    const navigate = useNavigate();

    const { enqueueSnackbar } = useSnackbar();
    const logout = useLogout();
    const signOut = async () => {
        try {
            await logout();
            handleClose();
            enqueueSnackbar('Logged out successfully', { variant: 'success' });
            navigate(nav.login);
        } catch (err) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
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
                    <Button onClick={signOut} color="error" autoFocus>
                        Confirm Logout
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default LogoutDialog;
