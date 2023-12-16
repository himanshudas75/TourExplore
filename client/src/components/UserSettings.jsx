import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LogoutDialog from './LogoutDialog.jsx';
import ChangePasswordDialog from './ChangePasswordDialog.jsx';
import DeleteDialog from './DeleteDialog.jsx';

import { useState } from 'react';
import useUser from '../hooks/useUser.js';
import useAuth from '../hooks/useAuth.js';
import { useNavigate } from 'react-router-dom';
import useData from '../hooks/useData.js';

import { useSnackbar } from 'notistack';

function UserSettings() {
    const { enqueueSnackbar } = useSnackbar();
    const { nav } = useData();
    const navigate = useNavigate();
    const { deleteUser } = useUser();
    const { auth } = useAuth();
    const [anchorElUser, setAnchorElUser] = useState(null);

    const [isDeleting, setisDeleting] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const openLogoutDialog = () => {
        setIsLogoutDialogOpen(true);
    };

    const closeLogoutDialog = () => {
        setIsLogoutDialogOpen(false);
    };

    const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
        useState(false);
    const openChangePasswordDialog = () => {
        setIsChangePasswordDialogOpen(true);
    };

    const closeChangePasswordDialog = () => {
        setIsChangePasswordDialogOpen(false);
    };

    const [isDeleteUserDialogOpen, setIsDeleteUserDialogOpen] = useState(false);
    const openDeleteUserDialog = () => {
        setIsDeleteUserDialogOpen(true);
    };

    const closeDeleteUserDialog = () => {
        setIsDeleteUserDialogOpen(false);
    };

    const settings = [
        { name: 'Change Password', link: openChangePasswordDialog },
        { name: 'Logout', link: openLogoutDialog },
        { name: 'Delete User', link: openDeleteUserDialog },
    ];

    async function removeUser() {
        try {
            setisDeleting(true);
            const res = await deleteUser();
            if (res) {
                if (res.success) {
                    enqueueSnackbar('User deleted successfully!', {
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
            setisDeleting(false);
        }
    }

    return (
        <Box
            sx={{
                flexGrow: 0,
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} className="ms-3 mb-1">
                    <Avatar alt="Avatar" src="/src/assets/avatar.png" />
                </IconButton>
            </Tooltip>
            <Typography variant="p" className="homebar-username ms-2 mb-1">
                {auth?.username}
            </Typography>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem key={setting.name} onClick={setting.link}>
                        <Typography textAlign="center">
                            {setting.name}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
            <LogoutDialog
                isOpen={isLogoutDialogOpen}
                handleClose={closeLogoutDialog}
            />
            <ChangePasswordDialog
                isOpen={isChangePasswordDialogOpen}
                handleClose={closeChangePasswordDialog}
            />
            <DeleteDialog
                title="Are you sure that you want to delete this user?"
                description="All user data will be deleted. This action cannot be undone."
                isOpen={isDeleteUserDialogOpen}
                handleClose={closeDeleteUserDialog}
                deleteAction={removeUser}
                disabled={isDeleting}
            />
        </Box>
    );
}

export default UserSettings;
