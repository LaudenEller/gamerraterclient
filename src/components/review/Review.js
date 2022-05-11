import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getReview } from "./ReviewManager";

export const Review = () => {
    const [review, setReview] = useState()
    const { reviewId } = useParams()

    useEffect(() => {
        getReview(reviewId)
            .then((d) => { setReview(d) })
    },
        [reviewId])

        const history = useHistory()

    return (
<section className="review-container">
    <div className="review-game">A review of {review?.game?.title}</div>
    <div className="review-player">By {review?.player?.user?.first_name} {review?.player?.user?.last_name}</div>
    <div className="review-review">Review: {review?.review}</div>
</section>
    )
}