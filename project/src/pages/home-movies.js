import React from 'react';
import { getMovies } from '../api';
import { useEffect } from 'react';
import { Link as RouterLink } from "react-router-dom";
import { useMovieContext } from '../context/MovieContext';
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


export default function Movies() {
  const [state, setMovies] = useMovieContext()

  useEffect(
    () => {
      getMovies()
        .then(res => {
          if (res.data) {
            setMovies({
              ...state,
              movies: res.data
            })
          }
        }
        )
    }
    , [])

  const handleFilter = (by, filter) => setMovies({
    ...state,
    [by]: filter === state[by] ? null : filter
  })

  const Movie = ({ id, image_url, title, rating, genre, year }) => (
    <div className={classes.root}>
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
                  {title}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Genre: {genre}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Year: {year}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Rating: {rating}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                </Typography>
              </Grid>
              <Grid item>
                <RouterLink to={`/movies/${id}`}>
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
      <Typography align="center" variant="h4" style={{ marginTop: "20px" }} gutterBottom>
        Movies List
      </Typography>
      <div className="sorting">
        <List>
          <ListItem>
            <ListItemText primary={"Filter Movies"} />
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemText primary={"Rating"} />
          </ListItem>
        </List>
        {["Above 5", "Below 5"].map((label, index) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={state.rating === index}
                onChange={e => handleFilter("rating", index)}
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
        {["Action", "Drama", "Horror"].map((label) => (
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
            <ListItemText primary={"Year"} />
          </ListItem>
        </List>
        {["2010 - 2015", "2016 - 2020"].map((label, index) => (
          <FormControlLabel
            control={
              <Checkbox
                checked={state.year === index}
                onChange={e => handleFilter("year", index)}
                name="checkedA"
                style={{ marginLeft: "20px" }}
              />
            }
            label={label}
          />
        ))}
      </div>

      {state.movies
        .filter(movie => state.rating === null ? true : state.rating === 0 ? movie.rating >= 5 : movie.rating < 5)
        .filter(movie => state.genre === null ? true : state.genre.includes(movie.genre))
        .filter(movie => state.year === null ? true : state.year === 0 ? movie.year >= 2010 && movie.year <= 2015 : movie.year >= 2016 && movie.year <= 2020)
        .map(movie => (
          <Movie key={movie.id} {...movie} />
        ))}

    </>
  )
}