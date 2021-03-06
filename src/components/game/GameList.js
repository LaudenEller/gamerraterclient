import React, { useEffect, useState } from "react"
import { getGames } from "./GameManager.js"
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom"

export const GameList = () => {
    const [ games, setGames ] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    const history = useHistory()

    return (
        <>
        <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
        history.push({ pathname: "/games/new" })
    }}
>Register New Game</button>
        <article className="games">
            {
                games.map(game => {
                    if (game.editable) { return <>
                    <Link to={`/games/${game.id}`} key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game-rating">Rating: {game?.average_rating}</div>
                    </Link>
                    <button onClick={() => history.push({ pathname: `./games/new/${game.id}` })}>Update Game</button>
                    </>
} else{
                    return <>
                    <Link to={`/games/${game.id}`} key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game-rating">Average Rating: {game?.average_rating}</div>
                    </Link>
                    </>

}})
            }
        </article>
        </>
    )
}