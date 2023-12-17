import ReviewCard from './ReviewCard.jsx';

function ReviewCardStack({ deleteOneReview, tourspotId, reviews }) {
    return (
        <>
            {reviews?.map((review) => (
                <ReviewCard
                    key={review._id}
                    review={review}
                    tourspotId={tourspotId}
                    deleteOneReview={deleteOneReview}
                />
            ))}
        </>
    );
}

export default ReviewCardStack;
