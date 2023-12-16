import { Fragment } from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import ClipLoader from 'react-spinners/ClipLoader';

function DeleteDialog({
    isOpen,
    handleClose,
    deleteAction,
    title = 'Are you sure that you want to delete?',
    description = 'This action cannot be undone.',
    disabled = false,
}) {
    return (
        <Fragment>
            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <ClipLoader
                        size="25px"
                        color="rgb(124,124,124)"
                        loading={disabled}
                    />
                    <Button
                        onClick={deleteAction}
                        color="error"
                        autoFocus
                        disabled={disabled}
                    >
                        Confirm Delete
                    </Button>
                    <Button onClick={handleClose} disabled={disabled}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default DeleteDialog;
