import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { useParams } from "react-router-dom"
import { getGame } from "../game/GameManager"
import { createReview } from "./ReviewManager"


export const ReviewForm = () => {
    const history = useHistory()
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentReview, setCurrentReview] = useState({
        review: "",
        game: gameId
    })
    const [game, setGame] = useState({})

    useEffect(() => {
        getGame(gameId).then(data => setGame(data))
    }, [gameId])

    const changeReviewState = (domEvent) => {
        const copy = { ...currentReview }
            copy[domEvent.target.name] = domEvent.target.value
            setCurrentReview(copy)
    }

    return (
        <form className="ReviewForm">
            <h2 className="ReviewForm__title">Review {game?.title}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="review">Review: </label>
                    <input type="text" name="review" required autoFocus className="form-control"
                        value={currentReview.review}
                        onChange={changeReviewState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const review = {
                        review: currentReview.review,
                        game: parseInt(currentReview.game)
                    }

                    // Send POST request to your API
                    createReview(review)
                        .then(() => history.push("./"))
                }}
                className="btn btn-primary">Save Review</button>
        </form>
    )
}