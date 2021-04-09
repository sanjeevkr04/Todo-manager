import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {signInWithGoogle, anonymousAuthentication} from '../firebase'
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        height: '100vh',
        overflow: 'auto',
        background: 'linear-gradient(to bottom, skyblue 0%, white 100%)',
    },
    title: {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 35%, 51% 100%, 49% 100%, 0% 35%)',
        width: "100%",
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(8, 0, 2, 0),
        marginBottom: theme.spacing(2.5),
        '& h3': {
            marginBottom: theme.spacing(2),
        },
        '& p': {
            marginBottom: theme.spacing(6),
        }
    },
    button: {
        margin: theme.spacing(1),
    },
}));

function HomePage() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>
                <Typography variant='h3'>
                    Todo Manager
                </Typography>
                <Typography>
                    Manage your todos
                </Typography>
                <Tooltip title="Github repository">
                    <IconButton href='https://github.com/sanjeevkr04/Todo-manager' target='_blank' style={{color: 'white'}}>
                        <GitHubIcon fontSize='large'/>
                    </IconButton>
                </Tooltip>
            </div>
            <Button variant='contained' className={classes.button} color='primary' onClick={signInWithGoogle}>Sign in with Google</Button>
            <Button variant='contained' className={classes.button} color='primary' onClick={anonymousAuthentication}>Continue as Guest</Button>
        </div>
    )
}

export default HomePage