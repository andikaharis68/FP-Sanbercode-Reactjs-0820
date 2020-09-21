import React, { useEffect, useContext } from 'react';
import { editGame, createGame } from "../api"
import { useParams, useHistory } from "react-router-dom";
import { useGameContext } from "../context/GameContext";
import FormGame from './form-games';
import { UserContext } from "../context/UserContext";

const EditGame = () => {
    let { id } = useParams();
    let history = useHistory();
    const [state, setGames] = useGameContext()
    const { user } = useContext(UserContext)

    const handleChange = (game) => setGames({
        ...state,
        game
    })

    useEffect(() => {
        let gameId = parseInt(id)
        if (gameId > 0) {
            setGames({
                ...state,
                game: state.games.find(game => game.id === gameId)
            })
        }

    }, [id])

    const handleSubmit = (game) => {
        if (game.id) {
            editGame(game, { headers: { "Authorization": `Bearer ${user.token}` } })
                .then(res => {
                    if (res.data) {
                        setGames({
                            ...state,
                            games: state.games.map(_game => _game.id === game.id ? game : _game)
                        })
                        history.goBack()
                    }
                })
        } else {
            createGame(game, { headers: { "Authorization": `Bearer ${user.token}` } })
                .then(res => {
                    if (res.data) {
                        setGames({ ...state, games: [...state.games, game] })
                        history.goBack()
                    }

                })
        }
    }
    return (
        <>
            <FormGame handleSubmit={() => handleSubmit(state.game)} game={state.game} handleChange={handleChange} />
        </>
    )
}

export default EditGame