import ReviewCard from './ReviewCard.jsx';

function ReviewCardStack({ reviews }) {
    return (
        <>
            {reviews?.map((review) => (
                <ReviewCard key={review._id} review={review} />
            ))}
        </>
    );
}

export default ReviewCardStack;
