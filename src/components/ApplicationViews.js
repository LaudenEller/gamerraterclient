import React from "react"
import { Route } from "react-router-dom"
import { Game } from "./game/Game.js"
import { GameList } from "./game/GameList.js"
import { GameForm } from "./game/GameForm.js"
import { ReviewForm } from "./review/ReviewForm.js"
import { Review } from "./review/Review.js"


export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/reviews/:reviewId(\d+)">
            <Review />
            </Route>
            <Route exact path="/games/:gameId(\d+)">
            <Game />
            </Route>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            {/* <Route exact path="/games/new/:gameId(\d+)">
                <UpdateForm />
            </Route> */}
            <Route exact path="/games/:gameId(\d+)/review">
            <ReviewForm />
            </Route>

        </main>
    </>
}
