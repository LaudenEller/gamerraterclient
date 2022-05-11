import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom"
import { getGame } from "./GameManager"

export const Game = () => {
    const [game, setGame] = useState()
    const { gameId } = useParams()

    useEffect(() => {
        getGame(gameId)
            .then((data) => {
                setGame(data)
            })
    },
        [gameId])

    const history = useHistory()

    return (
        <>
            <div className='game-container'>
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
                <button onClick={() => {history.push(`/games/${gameId}/review`)}}>Review Game</button>
                <ul className="game-reviews">Reviews: {game?.reviews?.map((r) => {
                    return <Link to={`/reviews/${r.id}`} key={`event--${r.id}`} className="review"><li>{r.review}</li></Link>
                })}</ul>
            </div>
            {/* <button onClick={() => history.push({ pathname: `./new/${gameId}` })}>Update Game</button> */}
        </>)
}