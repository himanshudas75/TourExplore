import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';

import ImageCarousel from './ImageCarousel';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import DeleteDialog from './DeleteDialog';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useData from '../hooks/useData';
import useTourspots from '../hooks/useTourspots';

function TourspotCardVertical({ tourspot }) {
    const { deleteTourspot } = useTourspots();
    const navigate = useNavigate();
    const { auth } = useAuth();
    const { nav } = useData();
    const img_urls = tourspot?.images?.map((img) => img.url);
    const { enqueueSnackbar } = useSnackbar();
    const [isDeleting, setisDeleting] = useState(false);
    const [isDeleteTourspotDialogOpen, setIsDeleteTourspotDialogOpen] =
        useState(false);
    const openDeleteTourspotDialog = () => {
        setIsDeleteTourspotDialogOpen(true);
    };

    const closeDeleteTourspotDialog = () => {
        setIsDeleteTourspotDialogOpen(false);
    };

    async function removeTourspot() {
        try {
            setisDeleting(true);
            const res = await deleteTourspot(tourspot._id);
            if (res) {
                if (res.success) {
                    enqueueSnackbar('Tourspot deleted successfully!', {
                        variant: 'success',
                    });
                    setIsDeleteTourspotDialogOpen(false);
                    navigate(nav.index);
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
        <Card elevation={3} className="mb-4">
            <div className="row">
                <CardMedia>
                    <ImageCarousel images={img_urls} />
                </CardMedia>
                <Divider />
                <div>
                    <CardContent>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            className="fw-bold"
                        >
                            {tourspot?.title}
                        </Typography>
                        <Typography component="p">
                            {tourspot?.description}
                        </Typography>
                    </CardContent>
                    <List>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText secondary={tourspot?.location} />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary={`Submitted by ${tourspot?.author?.username}`}
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary={`₹ ${tourspot?.expected_budget}`}
                            />
                        </ListItem>
                        {auth?.user_id &&
                        auth?.user_id === tourspot?.author?._id ? (
                            <Divider component="li" />
                        ) : (
                            ''
                        )}
                    </List>
                    {auth?.user_id &&
                    auth?.user_id === tourspot?.author?._id ? (
                        <CardActions className="mb-2 ms-2">
                            <Button
                                variant="contained"
                                onClick={() =>
                                    navigate(
                                        `${nav.index}/${tourspot?._id}/edit`
                                    )
                                }
                                className="me-2"
                            >
                                Edit
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={openDeleteTourspotDialog}
                            >
                                Delete
                            </Button>
                        </CardActions>
                    ) : (
                        ''
                    )}
                </div>
            </div>
            <DeleteDialog
                isOpen={isDeleteTourspotDialogOpen}
                handleClose={closeDeleteTourspotDialog}
                deleteAction={removeTourspot}
                disabled={isDeleting}
            />
        </Card>
    );
}

export default TourspotCardVertical;
