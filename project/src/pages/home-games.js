import React from 'react';
import { getGames } from '../api';
import { useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { useGameContext } from '../context/GameContext';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        marginLeft: '260px',
        width: '80%',
        marginBottom: '25px',
        backgroundColor: '#999',
    },
    image: {
        width: 200,
        height: 200,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    roots: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'right',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    teks: {
        color: 'yellow',
    },
}));




export default function Games() {
    const [state, setGames] = useGameContext()

    useEffect(
        () => {
            getGames()
                .then(res => {
                    if (res.data) {
                        setGames({
                            ...state,
                            games: res.data
                        })
                    }
                }
                )
        }
        , [])

    const handleFilter = (by, filter) => setGames({
        ...state,
        [by]: filter === state[by] ? null : filter
    })

    const Game = ({ id, name, genre, platform, image_url }) => (
        <div className={classes.root}>
            <Typography align="center" variant="h4" color="primary" gutterBottom>
            </Typography>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <ButtonBase className={classes.image}>
                            <img className={classes.img} alt="" src={image_url} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container className={classes.teks}>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                    {name}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Genre: {genre}
                                </Typography>
                                <Typography variant="subtitle1" gutterBottom>
                                    Platform: {platform}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                </Typography>
                            </Grid>
                            <Grid item>
                                <RouterLink to={`/games/${id}`}>
                                    <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                        Detail
                        </Typography>
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )

    const classes = useStyles();

    return (
        <>
            <Typography align="center" style={{ marginTop: "20px" }} variant="h4" color="primary" gutterBottom>
                Games List
            </Typography>
            <div className="sorting">
                <List>
                    <ListItem>
                        <ListItemText primary={"Filter Games"} />
                    </ListItem>
                </List>
                <List>
                    <ListItem>
                        <ListItemText primary={"Platform"} />
                    </ListItem>
                </List>
                {["PC", "Mobile"].map((label) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.platform === label}
                                onChange={e => handleFilter("platform", label)}
                                name="checkedA"
                                style={{ marginLeft: "20px" }}
                            />
                        }
                        label={label}
                    />
                ))}
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary={"Genre"} />
                    </ListItem>
                </List>
                {["Sport", "Racing", "Adventure"].map((label) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.genre === label}
                                onChange={e => handleFilter("genre", label)}
                                name="checkedA"
                                style={{ marginLeft: "20px" }}
                            />
                        }
                        label={label}
                    />
                ))}
                <Divider />
                <List>
                    <ListItem>
                        <ListItemText primary={"Release"} />
                    </ListItem>
                </List>
                {["2010 - 2015", "2016 - 2020"].map((label, index) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={state.release === index}
                                onChange={e => handleFilter("release", index)}
                                name="checkedA"
                                style={{ marginLeft: "20px" }}
                            />
                        }
                        label={label}
                    />
                ))}
            </div>
            {state.games
                .filter(game => state.platform === null ? true : state.platform.includes(game.platform))
                .filter(game => state.genre === null ? true : state.genre.includes(game.genre))
                .filter(game => state.release === null ? true : state.release === 0 ? game.release >= 2010 && game.release <= 2015 : game.release >= 2016 && game.release <= 2020)
                .map(game => (
                    <Game key={game.id} {...game} />
                ))}
        </>
    )
}