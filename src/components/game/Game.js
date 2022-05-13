import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getGame } from "./GameManager"
import { createRating } from "../rating/RatingManager"
import { createPicture } from "../picture/PictureManager"

export const Game = () => {
    const [game, setGame] = useState()
    const { gameId } = useParams()
    const [rating, setRating] = useState()
    const [image, updateImage] = useState("")

    useEffect(() => {
        getGame(gameId)
            .then((data) => {
                setGame(data)
            })
    },

        [gameId])

    const history = useHistory()

    const changeRatingState = (domEvent) => {
        const copy = { ...rating }
        copy[domEvent.target.name] = domEvent.target.value
        setRating(copy)
    }

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
    const createGameImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            
            // Update a component state variable to the value of base64ImageString
            const copy = { ...image }
            copy[event.target.name] = event.target.value
            updateImage(copy)
        }); // INSQ: Is this passing a the results of a function as the second parameter? What's that doing??
    }

    return (
        <>
            <div className='game-container'>
            <button onClick={() => { history.push(`/games/${gameId}/review`) }}>Review Game</button>
                <div>
                    <div className="game-title">Title: {game?.title}</div>
                    <div className="game-description">Description: {game?.description}</div>
                    <div className="game-year_released">Year Released: {game?.year_released}</div>
                    <div className="game-number_of_players">Number of Players: {game?.number_of_players}</div>
                    <div className="game-estimated_time_to_play">Estimated Time to Play: {game?.estimated_time_to_play}</div>
                    <div className="game-age_recommendation">Age Recommendation: {game?.age_recommendation}</div>
                    <div className="game-maker">Maker: {game?.maker}</div>
                    <div className="game-organizer">Organizer: {game?.organizer?.user?.first_name} {game?.organizer?.user?.last_name}</div>
                    <div className="game-categories">Categories: {game?.categories.map((c) => {
                        return <li>{c.label}</li>
                    })}</div>
                </div>
                <form className="ratingForm">
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="rating">Rate this game:
                                <select value={rating?.rating} name="rating" required autoFocus className="form-control"
                                    onChange={changeRatingState}>
                                    <option value="0">Rate this game</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </label>
                        </div>
                    </fieldset>
                    <button type="submit" onClick={evt => {

                        const newRating = {
                            game: game?.id,
                            rating: parseInt(rating.rating)
                        }

                        createRating(newRating)
                    }}
                        className="btn btn-primary">
                            Rate this game</button>
                </form>
                <ul className="game-reviews">Reviews: {game?.reviews?.map((r) => {
                    return <Link to={`/reviews/${r.id}`} key={`event--${r.id}`} className="review"><li>{r.review}</li></Link>
                })}</ul>
                 <input type="file" id="game_image" onChange={createGameImageString} />
 <input type="hidden" name="game_id" value={gameId} />
 <button onClick={() => {
     // Upload the stringified image that is stored in state

     const newImage = {
         game: gameId,
         image: image
 }

     createPicture(newImage)
 }}>Upload</button>
            </div>
        </>)
}