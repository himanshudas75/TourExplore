import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import DeleteDialog from './DeleteDialog';
import ImageCarousel from './ImageCarousel';
import { colors } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function ReviewCard({ review }) {
    const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] =
        useState(false);
    const openDeleteReviewDialog = () => {
        setIsDeleteReviewDialogOpen(true);
    };

    const closeDeleteReviewDialog = () => {
        setIsDeleteReviewDialogOpen(false);
    };

    async function deleteReview() {}

    return (
        <Card elevation={3} className="mb-4">
            <div className="row">
                <div>
                    <CardContent
                        sx={{ pb: 1, '&:last-child': { pb: 1 } }}
                        className="mb-0"
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            className="fw-semi-bold"
                        >
                            {review.title}
                        </Typography>
                        <Rating value={review.rating} readOnly />
                        <Typography component="p" className="mt-2">
                            {review.body}
                        </Typography>
                        <List>
                            <Divider component="li" />
                        </List>
                        <div className="d-flex justify-content-between align-items-center mt-0">
                            <Typography
                                component="div"
                                className="text-secondary"
                            >
                                {review.author.username}
                            </Typography>

                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={openDeleteReviewDialog}
                            >
                                Delete
                            </Button>
                        </div>
                    </CardContent>
                </div>
            </div>
            <DeleteDialog
                isOpen={isDeleteReviewDialogOpen}
                handleClose={closeDeleteReviewDialog}
                deleteAction={deleteReview}
            />
        </Card>
    );
}

export default ReviewCard;
