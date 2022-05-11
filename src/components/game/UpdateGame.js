import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from 'react-router-dom'
import { updateGame, getGame } from './GameManager.js'



export const UpdateForm = () => {
    const history = useHistory()
    const { gameId } = useParams()
    const [game, setGame] = useState({})

    
    useEffect(() => {
        getGame(gameId).then((d) => setGame(d))
    }, [gameId])

    const changeGameState = (domEvent) => {
        const copy = { ...game }
            copy[domEvent.target.name] = domEvent.target.value
            setGame(copy)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={game.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="year_released">Year Released: </label>
                    <input type="text" name="year_released" required autoFocus className="form-control"
                        value={game.year_released}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="number_of_players">Number of Players: </label>
                    <input type="integer" name="number_of_players" required autoFocus className="form-control"
                        value={game.number_of_players}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estimated_time_to_play">Estimated Time to Play: </label>
                    <input type="text" name="estimated_time_to_play" required autoFocus className="form-control"
                        value={game.estimated_time_to_play}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="age_recommendation">Age Recommendation: </label>
                    <input type="text" name="age_recommendation" required autoFocus className="form-control"
                        value={game.age_recommendation}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={game.maker}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const updatedGame = {
                        title: game.title,
                        description: game.description,
                        year_released: game.year_released,
                        estimated_time_to_play: game.estimated_time_to_play,
                        number_of_players: parseInt(game.number_of_players),
                        age_recommendation: game.age_recommendation,
                        maker: game.maker,
                        id: game.id
                    }

                    // Send POST request to your API
                    updateGame(updatedGame)
                        .then(() => history.push(`/games/${gameId}`))
                }}
                className="btn btn-primary">Update</button>
        </form>
    )
}