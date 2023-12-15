import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import ImageCarousel from './ImageCarousel';
import { colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import DeleteDialog from './DeleteDialog';
import { useState } from 'react';

function TourspotCardVertical({ tourspot }) {
    const navigate = useNavigate();
    const img_urls = tourspot.images.map((img) => img.url);

    const [isDeleteTourspotDialogOpen, setIsDeleteTourspotDialogOpen] =
        useState(false);
    const openDeleteTourspotDialog = () => {
        setIsDeleteTourspotDialogOpen(true);
    };

    const closeDeleteTourspotDialog = () => {
        setIsDeleteTourspotDialogOpen(false);
    };

    async function deleteTourspot() {}

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
                            {tourspot.title}
                        </Typography>
                        <Typography component="p">
                            {tourspot.description}
                        </Typography>
                    </CardContent>
                    <List>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText secondary={tourspot.location} />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary={`Submitted by ${tourspot.author.username}`}
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary={`₹ ${tourspot.expected_budget}`}
                            />
                        </ListItem>
                        <Divider component="li" />
                    </List>
                    <CardActions className="mb-2 ms-2">
                        <Button
                            variant="contained"
                            onClick={() =>
                                navigate(`/tourspots/${tourspot._id}/edit`)
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
                </div>
            </div>
            <DeleteDialog
                isOpen={isDeleteTourspotDialogOpen}
                handleClose={closeDeleteTourspotDialog}
                deleteAction={deleteTourspot}
            />
        </Card>
    );
}

export default TourspotCardVertical;
