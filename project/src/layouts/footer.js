import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
    return (
        <Typography variant="body2" style={{ textAlign: "center", color: "yellow" }} >
            {'Copyright © '}
            {'Moch Andika Haris Saputra'}
            {' '}
            {new Date().getFullYear()}

        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: "200px",
    },
    footer: {
        padding: theme.spacing(3, 2),
        marginTop: 'auto',
        backgroundColor: 'black',
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <footer className={classes.footer}>
                <Container maxWidth="sm">
                    <Copyright />
                </Container>
            </footer>
        </div>
    );
}

