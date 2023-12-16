import {
    Card,
    CardContent,
    Typography,
    Button,
    Rating,
    Divider,
    List,
} from '@mui/material';

import { useSnackbar } from 'notistack';
import DeleteDialog from './DeleteDialog';
import { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';
import useReviews from '../hooks/useReviews.js';

function ReviewCard({ deleteOneReview, tourspotId, review }) {
    const { deleteReview } = useReviews();
    const axiosPrivate = useAxiosPrivate();
    const { auth } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const [isDeleting, setisDeleting] = useState(false);
    const [isDeleteReviewDialogOpen, setIsDeleteReviewDialogOpen] =
        useState(false);
    const openDeleteReviewDialog = () => {
        setIsDeleteReviewDialogOpen(true);
    };

    const closeDeleteReviewDialog = () => {
        setIsDeleteReviewDialogOpen(false);
    };

    async function removeReview() {
        try {
            setisDeleting(true);
            const res = await deleteReview(tourspotId, review._id);
            if (res) {
                if (res.success) {
                    enqueueSnackbar('Review deleted successfully!', {
                        variant: 'success',
                    });
                    deleteOneReview(review._id);
                    setIsDeleteReviewDialogOpen(false);
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
                            {auth?.user_id &&
                            auth?.user_id === review?.author?._id ? (
                                <Button
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={openDeleteReviewDialog}
                                >
                                    Delete
                                </Button>
                            ) : (
                                ''
                            )}
                        </div>
                    </CardContent>
                </div>
            </div>
            <DeleteDialog
                isOpen={isDeleteReviewDialogOpen}
                handleClose={closeDeleteReviewDialog}
                deleteAction={removeReview}
                disabled={isDeleting}
            />
        </Card>
    );
}

export default ReviewCard;
