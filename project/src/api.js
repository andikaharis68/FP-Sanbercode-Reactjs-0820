import Axios from 'axios';

// === Movie ===

export const getMovies = () =>
    Axios.get(`https://backendexample.sanbersy.com/api/data-movie`)

export const getMovieById = (id) =>
    Axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)

export const createMovie = (movie) =>
    Axios.post(`https://backendexample.sanbersy.com/api/data-movie`, movie)

export const editMovie = (movie, aunt) =>
    Axios.put(`https://backendexample.sanbersy.com/api/data-movie/${movie.id}`, movie, aunt)

export const deleteMovie = (id, aunt) =>
    Axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, aunt)

// === Game ===

export const getGames = () =>
    Axios.get(`https://backendexample.sanbersy.com/api/data-game`)

export const getGameById = (id) =>
    Axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)

export const createGame = (game, aunt) =>
    Axios.post(`https://backendexample.sanbersy.com/api/data-game`, game, aunt)

export const editGame = (game, aunt) =>
    Axios.put(`https://backendexample.sanbersy.com/api/data-game/${game.id}`, game, aunt)

export const deleteGame = (id, aunt) =>
    Axios.delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, aunt)

// === USER ===

export const register = (name, email, password) =>
    Axios.post(`https://backendexample.sanbersy.com/api/register`, { name, email, password })

export const login = (email, password) =>
    Axios.post(`https://backendexample.sanbersy.com/api/user-login`, { email, password })

export const getUser = () =>
    Axios.get(`https://backendexample.sanbersy.com/api/users`)