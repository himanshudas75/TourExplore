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

function DeleteDialog({ isOpen, handleClose, deleteAction }) {
    // const { nav } = useData();
    // const navigate = useNavigate();

    // const { enqueueSnackbar } = useSnackbar();
    // const logout = useLogout();
    // const deleteAction = async () => {
    // try {
    //     await logout();
    //     handleClose();
    //     enqueueSnackbar('Logged out successfully', { variant: 'success' });
    //     navigate(nav.login);
    // } catch (err) {
    //     enqueueSnackbar('Something went wrong', { variant: 'error' });
    // }
    // };

    return (
        <Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {'Are you sure that you want to delete?'}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={deleteAction} color="error" autoFocus>
                        Confirm Delete
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default DeleteDialog;
