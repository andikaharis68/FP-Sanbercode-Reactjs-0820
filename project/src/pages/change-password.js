import React, { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { register } from '../api';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ChangePassword = () => {
    const { setUser } = useContext(UserContext)
    const [input, setInput] = useState({ name: "", email: "", password: "" })
    const [messages, setMessages] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        if ((input.name.replace(/\s/g, '') === '') ||
            (input.email.replace(/\s/g, '') === '') ||
            (input.password.replace(/\s/g, '') === '')) {
            setMessages("Data harus diisi dengan lengkap")
            return
        }

        register(input.name, input.email, input.password)
            .then(
                (res) => {
                    console.log(res)
                    var user = res.data.user
                    var token = res.data.token
                    var currentUser = { name: user.name, email: user.email, token }
                    setUser(currentUser)
                    localStorage.setItem("user", JSON.stringify(currentUser))
                }
            ).catch((err) => {
                alert(err)
            })

    }


    const handleChange = (event) => {
        let value = event.target.value
        let name = event.target.name
        switch (name) {
            case "name": {
                setInput({ ...input, name: value })
                break;
            }
            case "email": {
                setInput({ ...input, email: value })
                break;
            }
            case "password": {
                setInput({ ...input, password: value })
                break;
            }
            default: {
                break;
            }
        }
    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        onChange={handleChange}
                        value={input.name}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Username"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        onChange={handleChange}
                        value={input.email}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="email"
                        label="email"
                        type="email"
                        id="email"
                        autoComplete="email"
                    />
                    <TextField
                        onChange={handleChange}
                        value={input.password}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="password"
                    />
                    <Typography component="p" variant="p" align="center" color="primary">
                        {messages}
                    </Typography>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>Register</Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <RouterLink to="/login"><Link variant="body2">
                                {"Already have an account? Login."}
                            </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
export default ChangePassword