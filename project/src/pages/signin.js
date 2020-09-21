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
import { useHistory } from "react-router-dom"
import { login } from '../api';

const useStyles = makeStyles((theme) => ({

    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Login = () => {
    let history = useHistory()
    const { setUser } = useContext(UserContext)
    const [input, setInput] = useState({ email: "", password: "" })

    const handleSubmit = (event) => {
        event.preventDefault()
        if ((input.email.replace(/\s/g, '') === '') || (input.password.replace(/\s/g, '') === '')) {
            alert("Input email or password!")
            return
        }

        login(input.email, input.password)
            .then(
                res => {
                    var user = res.data.user
                    var token = res.data.token
                    var currentUser = { name: user.name, email: user.email, token }
                    setUser(currentUser)
                    localStorage.setItem("user", JSON.stringify(currentUser))
                    history.push("/contestants")
                }
            ).catch((err) => {
                alert(err)
            })
    }

    const handleChange = (name) => (event) => {
        let value = event.target.value
        switch (name) {
            case "email": {
                setInput({ ...input, email: value })
                break;
            }
            case "password": {
                setInput({ ...input, password: value })
                break;
            }
        }
    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" >
                    Login
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <TextField
                        onChange={handleChange("email")}
                        value={input.email}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        color="secondary"
                    />
                    <TextField
                        onChange={handleChange("password")}
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
                        color="secondary"
                    />
                    <Button className={classes.submit}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                    >Login</Button>
                    <Grid container>
                        <Grid item xs>
                            <RouterLink to="/change-password"><Link variant="body2">
                                {"Change Password?"}
                            </Link>
                            </RouterLink>
                        </Grid>
                        <Grid item>
                            <RouterLink to="/register"><Link variant="body2">
                                {"Don't have an account? Register now."}
                            </Link>
                            </RouterLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    );
}

export default Login