import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTourspots from '../hooks/useTourspots.js';
import TourspotCardVertical from '../components/TourspotCardVertical';
import DisplayMap from '../components/DisplayMap.jsx';
import ReviewForm from '../components/ReviewForm.jsx';
import ReviewCardStack from '../components/ReviewCardStack.jsx';

import PageNotFound from '../views/PageNotFound.jsx';
import useAuth from '../hooks/useAuth.js';
import Loading from '../components/Loading.jsx';
import { useSnackbar } from 'notistack';

function ShowTourspotPage() {
    const { enqueueSnackbar } = useSnackbar();
    const { auth } = useAuth();
    const { tourspotId } = useParams();
    const { getTourspot } = useTourspots();

    const [tourspot, setTourspot] = useState({ not_set: true });
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const res = await getTourspot(tourspotId);
            try {
                if (res) {
                    if (res.success) {
                        setTourspot(res.tourspot);
                        setReviews(res.tourspot.reviews);
                    } else {
                        if (res.message === 'Tourspot not found')
                            setTourspot(null);
                        else
                            enqueueSnackbar(res.message, {
                                variant: 'error',
                            });
                    }
                }
            } catch (err) {
                console.error(err);
                enqueueSnackbar('Something went wrong', {
                    variant: 'error',
                });
            }
        }
        fetchData();
    }, []);

    // Client side update reviews
    const addNewReview = (newReview) => {
        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
    };

    const deleteOneReview = (reviewId) => {
        const updatedReviews = reviews.filter(
            (review) => review._id != reviewId
        );
        setReviews(updatedReviews);
    };

    return (
        <>
            {tourspot ? (
                !tourspot.not_set ? (
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <TourspotCardVertical tourspot={tourspot} />
                            </div>
                            <div className="col-md-6">
                                <div
                                    className="container-flex"
                                    style={{
                                        height: '300px',
                                        width: '100%',
                                    }}
                                >
                                    <DisplayMap
                                        action="single"
                                        tourspot={tourspot}
                                        div_id="map-single"
                                    />
                                </div>
                                <div className="container-flex">
                                    {auth?.user_id ? (
                                        <div className="mt-3 mb-4">
                                            <ReviewForm
                                                addNewReview={addNewReview}
                                                tourspotId={tourspotId}
                                            />
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </div>
                                <div className="container-flex mt-3 mb-4">
                                    <ReviewCardStack
                                        reviews={reviews}
                                        tourspotId={tourspotId}
                                        deleteOneReview={deleteOneReview}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Loading />
                )
            ) : (
                <PageNotFound />
            )}
        </>
    );
}

export default ShowTourspotPage;
